import "./Table.css";

function getKeygValue(obj, keys) {
  let tempObj = obj;
  for (let index = 0; index < keys.length; index++) {
    if (!tempObj[keys[index]]) return;
    tempObj = tempObj[keys[index]];
  }
  return tempObj;
};

const ChangeOrder = ( setSortBy , setSortOrder , key) =>{
    setSortBy(()=>{
        setSortOrder((prevOrder)=>{
            let newOrder = prevOrder + 1 ;
            return newOrder > 2 ? 0 : newOrder
        })
        return key
    });
};



const TableColumn = ({ data, nameColumn, keys, setSortBy, setSortOrder  , canOrdering}) => {
  return (
    <div className="Users-Table-Column">
      <div onClick={()=> canOrdering ? ChangeOrder(setSortBy , setSortOrder , keys[keys.length-1] ) : null} className="Users-Table-Column-Header">
        <h3>{nameColumn}</h3>
        <div></div>
      </div>
      {data &&
        keys &&
        data.map((user, index) => {
          return (
            <div className="Users-Table-Column-Cell" key={index}>
              {getKeygValue(user, keys) || "-"}
            </div>
          );
        })}
    </div>
  );
};

export default TableColumn;
