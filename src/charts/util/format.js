export default function(num) {
  let postfix = "";
  if (num > 100000000) {
    postfix = "亿";
    num /= 100000000;
  } else if (num > 10000) {
    postfix = "万";
    num /= 10000;
  } else {
    return num;
  }
  num = num.toFixed(2);
  let [int, dec] = num.split(".");
  let inter = "";
  while (int != "") {
    inter = int.slice(-3) + "," + inter;
    int = int.slice(0, -3);
  }
  return `${inter.slice(0, -1)}.${dec}${postfix}`;
}
