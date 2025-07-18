import { useModal } from "../../Context/ModalUserContext";
import { useUser } from "../../hooks/useUser";
import Loader from "../Loader/Loader";

import "./UserModalWindow.css";
const UserModalWindow = () => {
  const { modalData, closeModal } = useModal();

  const [user, loading, error] = useUser(modalData);
  console.log(user);
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
                <div className="Modal-row">
                  <div className="Modal-cell">ФИО</div>
                  <div className="Modal-cell">
                    {user.firstName + " " + user.lastName}
                  </div>
                </div>
                <div className="Modal-row">
                  <div className="Modal-cell">Возраст</div>
                  <div className="Modal-cell">{user.age}</div>
                </div>
                <div className="Modal-row">
                  <div className="Modal-cell">Страна</div>
                  <div className="Modal-cell">{user?.address?.country}</div>
                </div>
                <div className="Modal-row">
                  <div className="Modal-cell">Город</div>
                  <div className="Modal-cell">{user?.address?.city}</div>
                </div>
                <div className="Modal-row">
                  <div className="Modal-cell">Адрес</div>
                  <div className="Modal-cell">{user?.address?.address}</div>
                </div>
                <div className="Modal-row">
                  <div className="Modal-cell">Рост</div>
                  <div className="Modal-cell">{user.height}</div>
                </div>
                <div className="Modal-row">
                  <div className="Modal-cell">Вес</div>
                  <div className="Modal-cell">{user.weight}</div>
                </div>
                <div className="Modal-row">
                  <div className="Modal-cell">Номер Телефона</div>
                  <div className="Modal-cell">{user.phone}</div>
                </div>
                <div className="Modal-row">
                  <div className="Modal-cell">Email</div>
                  <div className="Modal-cell">{user.email}</div>
                </div>
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
