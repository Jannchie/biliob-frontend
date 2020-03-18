var parse = require("date-fns/parse");
var format = require("date-fns/format");
var addDays = require("date-fns/add_days");
var getTime = require("date-fns/get_time");

function interpolation(data, day = 1) {
  let out = [];
  data = data
    .map(e => {
      return [parse(e[0], new Date()), e[1]];
    })
    .filter((e, idx, arr) => {
      if (idx - 1 >= 0 && arr[idx - 1][1] == arr[idx][1]) {
        return false;
      } else {
        return true;
      }
    });
  if (data.length <= 1) {
    return data;
  }
  if (data.length > 500) {
    console.log(data);
  }

  let start_date = data[0][0];
  let c_str_date = format(start_date, "YYYY-MM-DD");
  let c_date = parse(c_str_date, "YYYY-MM-DD", new Date());
  let end_date = data[data.length - 1][0];
  let e_str_date = format(end_date, "YYYY-MM-DD");
  let last_index = 0;
  let next_index = 1;
  while (e_str_date != c_str_date) {
    c_date = addDays(c_date, 1);
    c_str_date = format(c_date, "YYYY-MM-DD");

    if (c_date.getTime() < data[0][0].getTime() + 86400000 * (day - 1))
      continue;

    while (next_index + 1 < data.length && data[next_index][0] < c_date) {
      next_index++;
    }

    while (
      last_index + 2 < data.length &&
      data[last_index + 1][0].getTime() + 86400000 * (day - 1) < c_date
    ) {
      last_index++;
    }
    console.log(last_index, next_index);

    let next_val = data[next_index][1];
    let next_date = data[next_index][0];
    let last_val = data[last_index][1];
    let last_date = data[last_index][0];
    let c_val = Math.round(
      ((next_val - last_val) / (getTime(next_date) - getTime(last_date))) *
        86400000 *
        day
    );
    if (!isNaN(c_val)) out.push([c_str_date, c_val]);
  }
  return out;
}
export default interpolation;
