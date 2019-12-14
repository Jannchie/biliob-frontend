var parse = require("date-fns/parse");
var format = require("date-fns/format");
var isBefore = require("date-fns/is_before");
var addDays = require("date-fns/add_days");
var getTime = require("date-fns/get_time");

function interpolation(data) {
  let out = [];
  data = data.map(e => {
    return [parse(e[0], new Date()), e[1]];
  });
  let start_date = data[0][0];
  let c_str_date = format(start_date, "YYYY-MM-DD");
  let c_date = parse(c_str_date, "YYYY-MM-DD", new Date());
  for (let i = 1; i < data.length; i++) {
    const e = data[i];
    const last = data[i - 1];
    let date = e[0];
    let l_date = last[0];
    let val = e[1];
    let l_val = last[1];

    while (isBefore(c_date, l_date)) {
      c_date = addDays(c_date, 1);
      c_str_date = format(c_date, "YYYY-MM-DD");
    }
    while (isBefore(c_date, date)) {
      let c_val = Math.round(
        ((val - l_val) / (getTime(date) - getTime(l_date))) * 86400000
      );
      if (c_val != 0) out.push([c_str_date, c_val]);
      c_date = addDays(c_date, 1);
      c_str_date = format(c_date, "YYYY-MM-DD");
    }
  }
  return out;
}
export default interpolation;
