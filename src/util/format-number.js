function formatNumber(num) {
  let absNum = Math.abs(num);
  let postfix = "";
  if (absNum >= 100000000) {
    postfix = "亿";
    num /= 100000000;
  } else if (absNum >= 10000000) {
    postfix = "千万";
    num /= 10000000;
  } else if (absNum >= 10000) {
    postfix = "万";
    num /= 10000;
  } else {
    return num;
  }
  num = num.toFixed(1);
  let [int, dec] = num.split(".");
  let inter = "";
  while (int != "") {
    inter = int.slice(-3) + "," + inter;
    int = int.slice(0, -3);
  }
  if (dec == "0") {
    return `${inter.slice(0, -1)}${postfix}`;
  } else {
    return `${inter.slice(0, -1)}.${dec}${postfix}`;
  }
}
export default formatNumber;
