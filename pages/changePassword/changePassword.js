// pages/learnListitem/learnListitem.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: "修改密码", //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    confirmPwd: '',
    newPwd: '',
    oldPwd: '',
    oldPwdplaceholder: '请输入旧密码',
    newPwdplaceholder: '请输入新密码',
    confirmPwdplaceholder:'请确认新密码'
  },
  gojobdetail(e) {
    
    wx.navigateTo({
      url: '../jobdetail/jobdetail?id=' + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  submit(e){
    wx.showLoading({
      title: '拼命修改中...'
    });
    let data = {
      newPassword: this.data.newPwd,
      oldPassword: this.data.oldPwd,
      userId :app.globalData.userId
    };
    app.api("app/updatePassword", data).then(res => {
      let code = res.data.code;
      if (code == "200") {
        wx.hideLoading();
       wx.showToast({
         title: res.data.msg,
       })
       
      } else {
        wx.hideLoading();
        wx.showModal({
          title: '温馨提示',
          content: res.data.msg,
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
  oldPwd(e) {
    let str = this.check_user_name(e.detail.value);
    this.setData({
      oldPwd: e.detail.value,
    })
    if (str !=="该用户名合法"){
      wx.showModal({
        title: '温馨提示',
        content: str,
      })
    }
  },
  newPwd(e) {
    let str = this.check_user_name(e.detail.value);
    this.setData({
      newPwd: e.detail.value,
    })
    if (str !== "该用户名合法") {
      wx.showModal({
        title: '温馨提示',
        content: str,
      })
    }
  },
  confirmPwd(e) {
    this.setData({
      confirmPwd: e.detail.value
    });
    if (this.data.newPwd !== this.data.confirmPwd){
      wx.showModal({
        title: '温馨提示',
        content: '俩次密码不一致，请重新输入！',
      })
    }
  },
  // 检查用户名是否合法        合法就返回"该用户名合法"
  check_user_name(str) {
    var str2 = "该用户名合法";
    if ("" == str) {
      str2 = "用户名不能为空";
      return str2;
    } else if ((str.length < 5) || (str.length > 20)) {
      str2 = "用户名必须为5 ~ 20位";
      return str2;
    } else if (this.check_other_char(str)) {
      str2 = "不能含有特殊字符";
      return str2;
    }
    return str2;
  },
  // 验证用户名是否含有特殊字符
  check_other_char(str) {
    var arr = ["&", "\\", "/", "*", ">", "<", "@", "!"];
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < str.length; j++) {
        if (arr[i] == str.charAt(j)) {
          return true;
        }
      }
    }
    return false;
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