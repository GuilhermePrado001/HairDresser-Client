import "antd/dist/antd.css";
import Layout from "./Pages/Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import SettingsProvider from "./Context/SettingsContext";
import { useEffect, useState } from "react";
import { GetSalonByOwnerId } from "./Models/Salon";
import { AuthProvider } from "./Context/AuthContext";
import AuthService from "./Services/Auth/AuthService";
import UserProvider from "./Context/UserContext";
import { GetSettingsById } from "./Models/Settings";
import { Spin } from "antd";

function App() {
  const [hasSalon, setHasSalon] = useState(false);
  const [salonSettings, setSalonSettings] = useState();
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 300);
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (!isLoad) {
      (async () => {
        const authService = new AuthService();
        const currentUser = await authService?.getUser();
        const data = await GetSalonByOwnerId(currentUser?.profile?.sub);

        if (data?.length && isMounted) {
          const settings = await GetSettingsById(data[0].id);

          if (settings) {
            setSalonSettings(settings);
          }
        }

        if (currentUser && currentUser.profile.role === "Admin" && isMounted) {
          setHasSalon(data.length ? false : true);
        }
      })();
    }

    return () => {
      isMounted = false;
    };
  }, [isLoad]);

  return (
    <AuthProvider>
      <UserProvider settings={salonSettings}>
        <SettingsProvider settings={salonSettings}>
          {!isLoad ? (
            <Layout hasSalon={hasSalon} setHasSalon={setHasSalon} />
          ) : (
            <div className="loading">
              <Spin size="large" />
            </div>
          )}
        </SettingsProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
