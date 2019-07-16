//定义抠图方法
function getImgData(
  imgSrc,
  center = {
    x: 30,
    y: 30
  }
) {
  return new Promise(resolve => {
    let radius = 30;
    const canvas = document.createElement("canvas");
    const contex = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "";
    const diameter = 2 * radius;
    img.onload = function() {
      canvas.width = diameter;
      canvas.height = diameter;
      contex.clearRect(0, 0, diameter, diameter);
      contex.save();
      contex.beginPath();
      contex.arc(radius, radius, radius, 0, 2 * Math.PI);
      contex.clip();
      contex.drawImage(
        img,
        center.x - radius,
        center.y - radius,
        diameter,
        diameter,
        0,
        0,
        diameter,
        diameter
      );
      contex.restore();
      resolve(canvas.toDataURL("image/png", 1));
    };

    img.src = imgSrc;
  });
}

function drawChart(nodes, categories, links, pic) {
  var listPromise = [];

  categories.forEach(e => {
    listPromise.push(getImgData(pic[e]));
  });
  let option = {
    series: [
      {
        name: "up主名称",
        type: "graph",
        layout: "circular",
        data: nodes,
        links: links,
        categories: categories,
        roam: true,
        focusNodeAdjacency: true,
        itemStyle: {
          normal: {
            borderColor: "#fff",
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.3)"
          }
        },
        force: {
          initLayout: "circular",
          edgeLength: 70,
          repulsion: 200
        },
        label: {
          position: "right",
          formatter: "{b}"
        },
        lineStyle: {
          color: "source",
          curveness: 0.1
        },
        emphasis: {
          lineStyle: {
            width: 5
          }
        }
      }
    ]
  };
  //当处理的图片数据量比较大时，可由后端来处理这个过程
  Promise.all(listPromise).then(images => {
    nodes[0].symbol = "image://" + images[0];
  });
  return option;
}
export default drawChart;
