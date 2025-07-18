import "./App.css";
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import UserModalWindow from "./components/UserModalWindow/UserModalWindow";
import { ModalProvider } from "./Context/ModalUserContext";
import { LangProvider } from "./Context/LangContext";

function App() {
  return (
    <>
      <LangProvider>
        <ModalProvider>
          <Header />
          <Table />
          <UserModalWindow />
        </ModalProvider>
      </LangProvider>
    </>
  );
}

export default App;
