import React, { createContext, useState } from "react";
import moment from "moment";
moment.locale("pt-br");

export const SchedulingContext = createContext();

const schedulingData = {
  sexo: "Feminino",
  services: [],
  date: undefined,
  selectedTime: undefined,
  paymentType: 1,
  userId: undefined,
  salonId: undefined,
};

export default function SchedulingProvider({ children }) {
  const [scheduling, setScheduling] = useState(schedulingData);

  return (
    <SchedulingContext.Provider
      value={{
        scheduling,
        setScheduling,
      }}
    >
      {children}
    </SchedulingContext.Provider>
  );
}
