import "./App.css";
import Table from "./components/Table/Table";
import { ModalProvider } from "./Context/ModalUserContext";

function App() {
  return (
    <>
      <ModalProvider>
        <Table />
      </ModalProvider>
    </>
  );
}

export default App;
