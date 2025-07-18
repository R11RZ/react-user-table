
export function getValueObjFromArrayKeys(obj, keys) {
  let tempObj = obj;
  for (let index = 0; index < keys.length; index++) {
    if (!tempObj[keys[index]]) return;
    tempObj = tempObj[keys[index]];
  }
  return tempObj;
}
