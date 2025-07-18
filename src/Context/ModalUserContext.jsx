import { createContext, useContext, useState } from "react";


const ModalContext =  createContext();

export const useModal = () => useContext(ModalContext);


export function ModalProvider({children}){
    const [modalData , setModalData] = useState(null);
    const openModal = (user ) => setModalData(user);
    const closeModal = () => setModalData(null);

    return (
        <ModalContext.Provider value={{modalData , openModal , closeModal}} >
            {children}
        </ModalContext.Provider>
    )
}