const checkNotNull = (val) => {
  if (val.length == 0) return [true, -1];
  for (let i = 0; i < val.length; i++) {
    if (val[i] == "" || val[i] == undefined) return [true, i];
  }
  return [false, -1];
};

const checkValid = ([email, password]) => {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return [true, "Please enter a valid email address", 0];
  else if (password.length < 8)
    return [true, "Please enter a stronger password", 1];
  else return false;
};

const queryClothes = (query) => {
  let result = "SELECT * FROM clothes WHERE ";
  let counter = 0;
  if (query.priceProgress != "0") {
    result += "price < " + query.priceProgress;
    counter = 1;
  }
  if (query.cato) {
    result +=
      counter == 1
        ? " AND cato = " + `'${query.cato}'`
        : "cato = " + `'${query.cato}'`;
    counter++;
  }
  if (query.size) {
    result +=
      counter >= 1 ? " AND size = " + `'${query.size}'` : "size = " + `'${query.size}'`;
  }
  console.log(result);
  return result;
};



module.exports = {
  checkNotNull,
  checkValid,
  queryClothes,
};
