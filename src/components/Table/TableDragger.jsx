
import { useRef } from "react";
import { ResizeColumn } from "../../utils/ResizeColumn";
import "./Table.css";


const TableDragger = ({ index, tableInfo, setTableInfo }) => {
  const prevTouch  = useRef(null)

  const mouseMoveHandler = (e) =>{
    ResizeColumn(tableInfo , setTableInfo , index ,e.movementX )
  }
  
  const toucheMoveHandler = (e) =>{
    e.preventDefault()
    ResizeColumn(tableInfo , setTableInfo , index , e.touches[0].clientX - prevTouch.current.x  )
    prevTouch.current = {x: e.touches[0].clientX , y: e.touches[0].clientY}
  }

  const toucheEndHandler = ()=>{
    window.removeEventListener("touchmove",toucheMoveHandler , {passive:false})
    window.removeEventListener("touchend",toucheEndHandler)
  }

  const mouseUpHandler = (e) =>{
    if(e.button !==0) return
    prevTouch.current = {};
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
      onTouchStart={(e)=>{
        if(e.touches.length > 1) return;
        prevTouch.current = {x: e.touches[0].clientX , y: e.touches[0].clientY}
        window.addEventListener("touchmove",toucheMoveHandler , {passive:false} )
        window.addEventListener("touchend" ,toucheEndHandler)
      }}

      className="Users-Table-Column-Dragger"
    ></div>
  );
};

export default TableDragger;
