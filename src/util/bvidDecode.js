function bvidDecode($bvid) {
  $bvid = $bvid.replace(/^bv1/i, "");
  var $map = "fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF";
  var $idx = [8, 7, 0, 5, 1, 3];
  var $aid = 0;
  for (var $i = 0; $i < 6; $i++) {
    $aid += $map.indexOf($bvid[$idx[$i]]) * Math.pow(58, $i);
  }
  var $result = ($aid - 8728348608) ^ 177451812;
  return $result > 0 ? $result : "";
}
export default bvidDecode;
