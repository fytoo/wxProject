//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: false, //是否显示左上角图标
      title: '首页', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    imgUrls: [
      '../../images/1.jpg',
      '../../images/2.jpg',
      '../../images/3.jpg'
    ],
    data : [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    activeId: "activeId",

  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  onLoad() {
    // console.log(this.data.height);
    wx.showLoading({
      title: '拼命加载中...'
    });
    let userId;
    wx.getStorage({
      key: 'myInfo',
      success(res) {
        // console.log(res.data);
        userId = res.data.data.id;
      }
    });

    app.fetch("/app/indexData", userId).then(res => {
      // console.log(res.data);
      let data = res.data.data;
      let code = res.data.code;
      data.courseData.map((val,index)=>{
        val.details = val.details.slice(0, 50);//课程培训的字符串截取
      })

      if (code == "200") {
        wx.hideLoading();
        this.setData({
          data: data,
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


  },
  changeAutoplay(e) {

    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})