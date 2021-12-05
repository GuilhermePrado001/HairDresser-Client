import React, { createContext, useState, useEffect } from "react";
import moment from "moment";

import { GetProducts } from "../Models/Products";
import { ticksToHours } from "../Helpers/CommonFunctions";
import { UpdateStore } from "../Models/Store";
import { UpdateDescription } from "../Models/SalonDetails";
moment.locale("pt-br");

export const SettingsContext = createContext();

export default function SettingsProvider({ children, settings }) {
  const [storedSettings, setStoredSettings] = useState();
  const [productList, setProductList] = useState([]);
  const [description, setDescription] = useState(undefined);
  const [workTimeInit, setWorkTimeInit] = useState(moment("08:00", "HH:mm"));
  const [workTimeEnd, setWorkTimeEnd] = useState(moment("18:00", "HH:mm"));

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (settings) {
      setStoredSettings(settings);
      loadSettings(settings);
    }
  }, [settings]);

  const loadSettings = (settings) => {
    setWorkTimeEnd(moment(settings.workTime?.end, "HH:mm"));
    setWorkTimeInit(moment(settings.workTime?.init, "HH:mm"));
    setDescription(settings.salonDetail?.text);
  };

  const loadProducts = async () => {
    const data = await GetProducts();
    setProductList(data);
  };

  return (
    <SettingsContext.Provider
      value={{
        loadSettings,
        loadProducts,
        storedSettings,
        setProductList,
        productList,
        description,
        setDescription,
        workTimeInit,
        setWorkTimeInit,
        workTimeEnd,
        setWorkTimeEnd,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
