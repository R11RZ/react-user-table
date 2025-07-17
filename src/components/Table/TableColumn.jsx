import "./Table.css";

function getKeygValue(obj, keys) {
  let tempObj = obj;
  for (let index = 0; index < keys.length; index++) {
    if (!tempObj[keys[index]]) return;
    tempObj = tempObj[keys[index]];
  }
  return tempObj;
}

const ChangeOrder = (setSortBy, setSortOrder, key) => {
  setSortBy((prev) => {
    setSortOrder((prevOrder) => {
      if (prev !== key) return 2;
      let newOrder = prevOrder + 1;
      return newOrder % 3;
    });
    return key;
  });
};

function GetSignSort(sortBy, sortOrder, key) {
  if (sortBy !== key) return "-";
  switch (sortOrder) {
    case 0:
      return "-";
    case 1:
      return "↓";
    case 2:
      return "↑";
  }
}

const TableColumn = ({
  data,
  nameColumn,
  keys,
  setSortBy,
  setSortOrder,
  canOrdering,
  sortBy,
  sortOrder,
  width,
  index
}) => {
  return (
    <div id={`table_column-${index}`} style={{width: `${width}px`}} className="Users-Table-Column">
      <div
        onClick={() =>
          canOrdering
            ? ChangeOrder(setSortBy, setSortOrder, keys[keys.length - 1])
            : null
        }
        style={{ cursor: canOrdering ? "pointer" : "default" }}
        className="Users-Table-Column-Header"
      >
        <h3>{nameColumn}</h3>
        <div>
          {canOrdering
            ? GetSignSort(sortBy, sortOrder, keys[keys.length - 1])
            : ""}
        </div>
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
