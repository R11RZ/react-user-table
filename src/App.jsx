import "./App.css";
import Table from "./components/Table/Table";
import UserModalWindow from "./components/UserModalWindow/UserModalWindow";
import { ModalProvider } from "./Context/ModalUserContext";

function App() {
  return (
    <>
      <ModalProvider>
        <Table />
        <UserModalWindow />
      </ModalProvider>
    </>
  );
}

export default App;
