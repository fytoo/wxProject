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
    latitude: 29.8593,
    longitude: 114.317696,
    points: [],
    markers: []
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  clickmarker(e){
    wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
      title: '被点击了',
     
      duration: 2000
    });
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
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
  includePoints: function () {
    let _this = this;
    this.mapCtx.includePoints({
      padding: [10],
      points: _this.data.points
    })
  },
  onLoad() {
    wx.showLoading({
      title: '拼命加载中...'
    });
    let data = {
      userId: app.globalData.userId,

    };
    app.api("/app/schoolMap", data).then(res => {
      let code = res.data.code;

      if (code == "200") {
        let data = res.data.data;
        console.log(data);
        wx.hideLoading();
        let points = [];
        let markers = [];
        data.map((val, index) => {
          let obj = {
            latitude: Number(val.latitude),
            longitude: Number(val.longitude),
          };
          let marker = {
            width: '18px',
            height: '28px',
            latitude: Number(val.latitude),
            longitude: Number(val.longitude),
            iconPath: '../../images/location.png',
            callout: {
              content: "电焊职业技术学院 ",
              "车牌号": "12345",
              color: "#333333",
              fontSize: "18",
              borderRadius: "8",
              bgColor: "#ffffff",
              padding: "5",
              display: "BYCLICK",
               //BYCLICK 点击显示; 'ALWAYS': 常显	String
              // textAlign	文本对齐方式。有效值: left, right, center
            }

          };

          markers.push(marker)
          points.push(obj)
        });
        console.log(points);
        console.log(markers);
        this.setData({
          points: points,
          markers: markers
        })


      } else {
        wx.hideLoading();
        wx.showModal({
          title: '温馨提示',
          content: data.msg,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }

    }).catch(e => {
      wx.hideLoading();
      wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
        title: '获取数据异常',
        // icon: 'loading',
        duration: 2000
      });
    })
  }
})