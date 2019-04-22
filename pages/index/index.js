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
   
    data: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  
    activeId: "activeId",
    url: 'https://zypx.hbwwcc.com:8080/',
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  swipclick:function(e){
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../newView/newView?id=' + e.currentTarget.dataset.id, //
    }) 
    
  },
  golearnList(e) {
    wx.navigateTo({
      url: '../learnList/learnList?studyNum=' + e.currentTarget.dataset.studynum + '&details=' + e.currentTarget.dataset.details + '&picture=' + e.currentTarget.dataset.picture + '&courseId=' + e.currentTarget.dataset.courseid + '&name=' + e.currentTarget.dataset.name,
      success: function () {

      },
      fail: function () {

      },
      complete: function () {

      }
    })
    7
  },
  onLoad() {
    // console.log(this.data.height);
    wx.showLoading({
      title: '拼命加载中...'
    });

    wx.getStorage({
      key: 'myInfo',
      success(res) {
        wx.setStorageSync('token', res.data.data.token);
      }
    });
   
    
    app.api("app/indexData", { userId: app.globalData.userId }).then(res => {
      // console.log(res.data);
     
      let code = res.data.code;
      if (code == "200") {
        wx.hideLoading();
       
       
        //课程培训
        res.data.data.courseData.map((val, index) => {
          if (val.details.length>30){
            val.details = val.details.slice(0, 30) + '......';//课程培训的字符串截取
          }
        
          val.photo = this.data.url+val.photo;
              });
        //跑马灯
        res.data.data.policyData.map((val, index) => {
          val.photo =  this.data.url+ val.photo;
        });
        console.log(res.data.data);
        this.setData({
          data: res.data.data,
        })
        console.log(this.data);
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