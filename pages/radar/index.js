import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ["#3155a8"],
    // tooltip: {
    //   //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
    //   confine: true,
    //   enterable: true, //鼠标是否可以移动到tooltip区域内
    //   trigger: 'item',
    //   position: 'inside'
    // },

    radar: {
      startAngle: 120,
      splitNumber: 3,
      center: ["50%", "50%"],
      nameGap: -0, // 图中工艺等字距离图的距离
      radius: 100,
      name: {
        textStyle: {
          // backgroundColor: "#999",
          // borderRadius: 3,
          color: "#4d4d4d",
          fontSize: 14
        }
      },

      indicator: [{
          name: "地毯石材养护",
          max: 6500
        },
        {
          name: "布衣沙龙清洁",
          max: 16000
        },
        {
          name: "甲醛检查治理",
          max: 30000
        },
        {
          name: "家庭日常保洁",
          max: 38000
        },
        {
          name: "地毯石材养护",
          max: 52000
        },
        {
          name: "地毯石材养护",
          max: 25000
        }
      ],
      splitLine: {
        lineStyle: {
          color: "#bac6e2"
        }
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#0ff"
        }
      },
      splitArea: {
        areaStyle: {
          color: ["#fff"]
        }
      }
    },
    series: [{
      name: "",
      type: "radar",
      symbol: "circle", // 拐点的样式，还可以取值'rect','angle'等
      symbolSize: 0, // 拐点的大小
      areaStyle: {
        normal: {
          opacity: 1,
          color: "#2d51a6"
        }
      },
      data: [{
        value: [4300, 10000, 28000, 35000, 50000, 19000],
        name: "",
        itemStyle: {
          normal: {
            lineStyle: {
              color: "#000"
            }
          }
        }
      }]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    // 组件所需的参数
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: "评测", //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
  },

  onReady() {}
});