import "./App.css";
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import UserModalWindow from "./components/UserModalWindow/UserModalWindow";
import { ModalProvider } from "./Context/ModalUserContext";
import { LangProvider } from "./Context/LangContext";
import { NotificationProvider } from "./Context/NotificationContext";

function App() {
  return (
    <>
      <LangProvider>
        <NotificationProvider>
          <ModalProvider>
            <Header />
            <Table />
            <UserModalWindow />
          </ModalProvider>
        </NotificationProvider>
      </LangProvider>
    </>
  );
}

export default App;
