/**
 * 动画垂直滚动到页面指定位置
 * @param { Number } currentY 当前位置
 * @param { Number } targetY 目标位置
 */
function scrollAnimation(value, targetID) {
  var targetDoc = document.getElementById(targetID);
  var target = targetDoc.scrollLeft + value;
  var max = targetDoc.scrollWidth - targetDoc.offsetWidth;

  if (max <= target) {
    target = max;
  }
  if (target < 0) {
    target = 0;
  }
  let count = 0;
  let int = setInterval(() => {
    let delta = Math.abs(document.getElementById(targetID).scrollLeft - target);
    if (delta > Math.abs(value / 10) && count++ < 10) {
      document.getElementById(targetID).scrollLeft += value / 10;
    } else {
      document.getElementById(targetID).scrollLeft = target;
      clearInterval(int);
    }
  }, 1);
}
module.exports = {
  scrollAnimation
};
