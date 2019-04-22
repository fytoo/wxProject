// pages/login/login.js
// 获取全局应用程序实例对象
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPwd: ''
  },
  user: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  pwd: function(e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
 
  //获取用户输入的密码
  loginBtnClick: function(e) {
    wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
      title: '登录中',
      icon: 'loading',
      duration: 2000
    });
    let data = {
      idNumber: this.data.userName,
      password: this.data.userPwd,
      type: 1
    };
    app.login("app/userLogin", data).then(res => {
      // console.log(res.data);
      let data = res.data;
      wx.setStorageSync('myInfo', data);
     
      app.globalData.userId = res.data.data.id;
      // console.log(app.globalData.userId)
      if (data.code == "200") {
        wx.switchTab({
          url: '../index/index',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        });
      } else {
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
      wx.hideToast();
    }).catch(e => {
      wx.hideLoading();
      wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
        title: '获取数据异常',
        icon: 'loading',
        duration: 2000
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
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