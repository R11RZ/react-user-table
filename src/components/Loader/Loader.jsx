import { useEffect, useState } from "react";
import "./Loader.css"
const Loader = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;
  return (<div className="loader-wrapper"><div className="loader"></div></div>);
};

export default Loader;
