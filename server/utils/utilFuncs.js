exports.formatMils = mils => {
  const d = Math.floor(tTemp / 8.64e7);
  const h = Math.floor((tTemp % 8.64e7) / 3.6e6);
  const m = Math.floor((tTemp % 3.6e6) / 6e4);
  const s = Math.floor((tTemp % 6e4) / 1e3);

  return {
    d,
    h,
    m,
    s,
  };
};

exports.getAge = dob => {
  const ageDifMs = Date.now() - dob.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  const Age = Math.abs(ageDate.getUTCFullYear() - 1970);
  return Age;
};
