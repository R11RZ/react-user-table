
function getWidthById(id) {
  return document.getElementById(id).clientWidth;
}


export function ResizeColumn(tableInfo, setTableInfo, index, delta) {
  // init check width
  if (tableInfo[0].width === "auto")
    setTableInfo((prev) => {
      return prev.map((item, index) => ({
        ...item,
        width: getWidthById(`table_column-${index}`),
      }));
    });
  setTableInfo((prev) => {

    let newTableInfo = [...prev];
    if (newTableInfo[index].width + delta < 50) return prev;
    if (newTableInfo[index + 1].width - delta < 50) return prev;

    newTableInfo[index].width += delta;
    newTableInfo[index + 1].width -= delta;

    if (newTableInfo[index].width < 50) newTableInfo[index].width = 50;
    if (newTableInfo[index + 1].width < 50) newTableInfo[index].width = 50;

    return newTableInfo;
  });
}