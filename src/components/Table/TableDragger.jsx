import { ResizeColumn } from "./Table";
import "./Table.css";

const ChangeColumnWidth = () => {};

const TableDragger = ({ index, tableInfo, setTableInfo }) => {


  const mouseMoveHandler = (e) =>{
    ResizeColumn(tableInfo , setTableInfo , index ,e.movementX )
  }

  const mouseUpHandler = (e) =>{
    if(e.button !==0) return
    window.removeEventListener("mousemove",mouseMoveHandler)
    window.removeEventListener("mouseup",mouseUpHandler)
  }


  return (
    <div
      onMouseDown={(e) => {
        if(e.button !==0) return
        window.addEventListener("mousemove",mouseMoveHandler )
        window.addEventListener("mouseup",mouseUpHandler)
      }}

      className="Users-Table-Column-Dragger"
    ></div>
  );
};

export default TableDragger;
