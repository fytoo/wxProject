// pages/learn/learn.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: false, //是否显示左上角图标
      title: false, //导航栏 中间的标题
      learnBtn : true
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    list: [],
    show : true,
  },
  //下拉刷新
  onReachBottom: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  // 下拉刷新
  // onPullDownRefresh: function () {
  //   // 显示顶部刷新图标
  //   wx.showNavigationBarLoading();
  //   var that = this;
  //   // wx.request({
  //   //   url: 'https://xxx/?page=0',
  //   //   method: "GET",
  //   //   header: {
  //   //     'content-type': 'application/text'
  //   //   },
  //   //   success: function (res) {
  //   //     that.setData({
  //   //       moment: res.data.data
  //   //     });
  //   //     // 设置数组元素
  //   //     that.setData({
  //   //       moment: that.data.moment
  //   //     });
  //   //     console.log(that.data.moment);
  //   //     // 隐藏导航栏加载框
  //   //     wx.hideNavigationBarLoading();
  //   //     // 停止下拉动作
  //   //     wx.stopPullDownRefresh();
  //   //   }
  //   // })
  // },

  goEvaleating() {
    wx.navigateTo({
      url: '../evaluating/evaluating?id=1&page=4',
      success: function() {
        console.log("跳转成功")
      },
      fail: function() {
        console.log("跳转失败")
      },
      complete: function() {
        console.log("跳转完成")
      }
    })
    7
  },
  goLive(){
    wx.navigateTo({
      url: '../live/live',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  golearnList() {
    wx.navigateTo({
      url: '../learnList/learnList',
      success: function () {
        
      },
      fail: function () {
       
      },
      complete: function () {
       
      }
    })
    7
  },
  onMyevent: function (e) {
    // console.log(e);
    if (e.detail==1){
      this.setData({
        show: true,
      });
    }else{
      this.setData({
        show: false,
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let data = {
      pageIndex : 0,
      pageSize : 10,

    };
    app.fetch("/app/findCourse", data).then(res => {
     
      let data = res.data.data;
      let code = res.data.code;
      let { pageCount, pageIndex,course } = data;
      course.map((val, index) => {
        val.details = val.details.slice(0, 55);//课程培训的字符串截取
      })
      console.log(data);

      if (code == "200") {
        wx.hideLoading();
        this.setData({
          list: course,
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})