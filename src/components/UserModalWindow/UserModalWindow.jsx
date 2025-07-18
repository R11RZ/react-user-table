import { useLang } from "../../Context/LangContext";
import { useModal } from "../../Context/ModalUserContext";
import { useUser } from "../../hooks/useUser";
import { getValueObjFromArrayKeys } from "../../utils/parseArrayKeys";
import Loader from "../Loader/Loader";

import "./UserModalWindow.css";

const ModalTable = [
  {
    title: {
      Ru: "Фамилия",
      En: "Last Name",
    },
    key: ["lastName"],
  },
  {
    title: {
      Ru: "Имя",
      En: "First Name",
    },
    key: ["firstName"],
  },
  {
    title: {
      Ru: "Отчество",
      En: "Middle Name",
    },
    key: ["middleName"],
  },
  {
    title: {
      Ru: "Возраст",
      En: "Age",
    },
    key: ["age"],
  },
  {
    title: {
      Ru: "Страна",
      En: "Country",
    },
    key: ["address" , "country"],
  },
  {
    title: {
      Ru: "Город",
      En: "City",
    },
    key: ["address" , "city"] ,
  },
  {
    title: {
      Ru: "Адрес",
      En: "Address",
    },
    key: ["address" , "address"],
  },
  {
    title: {
      Ru: "Рост",
      En: "Height",
    },
    key: ["height"],
  },
  {
    title: {
      Ru: "Вес",
      En: "Weight",
    },
    key: ["weight"],
  },
  {
    title: {
      Ru: "Номер телефона",
      En: "Phone number",
    },
    key: ["phone"],
  },
  {
    title: {
      Ru: "Электронная почта",
      En: "Email",
    },
    key: ["email"],
  },
];

const UserModalWindow = () => {
  const { modalData, closeModal } = useModal();
  const { lang } = useLang();
  const [user, loading, error] = useUser(modalData);
  return (
    <>
      {modalData && (
        <div onClick={() => closeModal()} className="Modal-BG">
          <div onClick={(e) => e.stopPropagation()} className="Modal-Window">
            {!loading && (
              <>
                <div className="Modal-Close-Wrapper">
                  <button onClick={() => closeModal()}>⨯</button>
                </div>
                <img className="Modal-Img" src={user.image}></img>

                {ModalTable.map((ele, index) => {
                  return (
                    <div className="Modal-row">
                      <div className="Modal-cell">{ele.title[lang]}</div>
                      <div className="Modal-cell">
                        {getValueObjFromArrayKeys(user, ele.key) || "-"}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            {loading && <Loader />}
          </div>
        </div>
      )}
    </>
  );
};

export default UserModalWindow;
