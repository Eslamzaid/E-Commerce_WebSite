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

module.exports = {
  checkNotNull,
  checkValid,
};
