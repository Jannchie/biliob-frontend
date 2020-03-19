var parse = require("date-fns/parse");
var format = require("date-fns/format");
var addDays = require("date-fns/add_days");

function interpolation(data, day = 1) {
  let formated = [];
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

    while (next_index + 1 < data.length && data[next_index][0] < c_date) {
      next_index++;
    }

    while (
      last_index + 2 < data.length &&
      data[last_index + 1][0].getTime() < c_date
    ) {
      last_index++;
    }
    console.log(last_index, next_index);

    let nv = data[next_index][1];
    let nd = data[next_index][0];
    let lv = data[last_index][1];
    let ld = data[last_index][0];
    let c_val = Math.round(lv + ((c_date - ld) / (nd - ld)) * (nv - lv));
    if (!isNaN(c_val)) formated.push([c_str_date, c_val]);
  }
  let out = [];
  let i = day;
  while (i < formated.length) {
    out.push([formated[i][0], formated[i][1] - formated[i - day][1]]);
    i++;
  }
  console.log(formated);

  return out;
}
export default interpolation;
