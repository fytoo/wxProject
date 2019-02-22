//获取应用实例
const app = getApp();
Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: "地图", //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    latitude: 23.099994,
    longitude: 113.324520, 
    points: [{
      latitude: 23.10229,
      longitude: 113.3345211,
    }, {
      latitude: 23.00229,
      longitude: 113.3345211,
    }],
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园',
      width: '18px',
      height: '28px',
      iconPath: '../../images/location.png',
      callout: {
        content: "  博弈职业技术学院 ",
        "车牌号": "12345",
        color: "#333333",
         fontSize: "18",
         borderRadius: "8",
         bgColor: "#ffffff",
         padding: "5",
        display: "ALWAYS" 
//          display	'BYCLICK': 点击显示; 'ALWAYS': 常显	String	
// textAlign	文本对齐方式。有效值: left, right, center
      }
    }, {
        width: '18px',
        height: '28px',
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '../../images/location.png',
        callout: {
          content: "电焊职业技术学院 ",
          "车牌号": "12345",
          color: "#333333",
          fontSize: "18",
          borderRadius: "8",
          bgColor: "#ffffff",
          padding: "5",
          display: "ALWAYS" 
          //          display	'BYCLICK': 点击显示; 'ALWAYS': 常显	String	
          // textAlign	文本对齐方式。有效值: left, right, center
        }

    }, {
        width: '18px',
        height: '28px',
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '../../images/location.png',
        callout: {
          content: " 厨师职业技术学院 ",
          "车牌号": "12345",
          color: "#333333",
          fontSize: "18",
          borderRadius: "8",
          bgColor: "#ffffff",
          padding: "5",
          display: "ALWAYS" 
          //          display	'BYCLICK': 点击显示; 'ALWAYS': 常显	String	
          // textAlign	文本对齐方式。有效值: left, right, center
        }
    }]
  },
  onReady: function(e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function() {
    this.mapCtx.getCenterLocation({
      success: function(res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function() {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  }
})