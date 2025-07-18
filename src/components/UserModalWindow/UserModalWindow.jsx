import { useEffect } from "react";
import { useLang } from "../../Context/LangContext";
import { useModal } from "../../Context/ModalUserContext";
import { useNotification } from "../../Context/NotificationContext";
import { useUser } from "../../hooks/useUser";
import { getValueObjFromArrayKeys } from "../../utils/parseArrayKeys";
import Loader from "../Loader/Loader";
import { ModalTable } from "./initUserModalInfo";

import "./UserModalWindow.css";

const UserModalWindow = () => {
  const { modalData, closeModal } = useModal();
  const { lang } = useLang();
  const { setErrorNotif } = useNotification();
  const [user, loading, error] = useUser(modalData);

  useEffect(() => {
    if (error) {
      setErrorNotif(error);
      return;
    }
  }, [error]);

  return (
    <>
      {!error && modalData && (
        <div onClick={() => closeModal()} className="Modal-BG">
          <div onClick={(e) => e.stopPropagation()} className="Modal-Window">
            <div className="Modal-Close-Wrapper">
              <button onClick={() => closeModal()}>⨯</button>
            </div>
            <img className="Modal-Img" src={user.image}></img>

            {ModalTable.map((ele, index) => {
              return (
                <div key={index} className="Modal-row">
                  <div className="Modal-cell">{ele.title[lang]}</div>
                  <div className="Modal-cell">
                    {getValueObjFromArrayKeys(user, ele.key) || "-"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default UserModalWindow;
