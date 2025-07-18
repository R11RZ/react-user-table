import { createContext, useContext, useEffect, useRef, useState } from "react";
import "./Notification.css";
import { useLang } from "./LangContext";

const NotificationTitle = {
  error: {
    Ru: "Ошибка",
    En: "Error",
  },
};

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const { lang } = useLang();
  const [notification, setNotification] = useState(null);
  const timerRef = useRef(null);

  const setErrorNotif = (msg) => {
    console.log(msg.message);
    setNotification({ msg: msg, type: "error" });
  };
  useEffect(() => {
    if (!notification) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setNotification(null);
    }, 10 * 1000);

    return () => clearTimeout(timerRef.current);
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ setErrorNotif }}>
      {children}
      {notification && (
        <div className={`Notification-Wrapper-${notification.type}`}>
          <h4 className="Notification-title">
            {NotificationTitle[notification.type][lang]}
          </h4>
          <p className="Notification-msg">{notification.msg.message}</p>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
