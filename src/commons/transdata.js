import selectdata from "./selectdata";

export function transGender(val) {
  var name = "";
  var obj = Array.from(selectdata.gender_type).find(
    (item, idx) => item.id === val
  );
  if (obj != undefined) {
    name = obj.name;
  }
  return name;
}

export function transPayMent(val) {
  var name = "";
  var obj = Array.from(selectdata.pay_method).find(
    (item, idx) => item.id === val
  );
  if (obj != undefined) {
    name = obj.name;
  }
  return name;
}

export function transPayType(val) {
  var name = "";
  var obj = Array.from(selectdata.pay_type).find(
    (item, idx) => item.id === val
  );
  if (obj != undefined) {
    name = obj.name;
  }
  return name;
}
