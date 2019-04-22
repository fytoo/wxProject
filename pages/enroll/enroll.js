// pages/enroll.js

const app = getApp();
var util = require('../../utils/util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: "报名", //导航栏 中间的标题
      chartBtn: true,
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    name:"",
    sex:"",
    age:"",
    tel:"",
    majorName:"",
    schoolName:"",
    majorId:"",
    time: util.formatDate(new Date()),
    flag: false,
  },
  submit(e){//报名提交
    let data = {
      userId: app.globalData.userId,
      telephone:this.data.tel,
      majorId: this.data.majorId
    }
    app.api("/app/enroll", data).then(res => {
      let code = res.data.code;
      if (code == "200") {
        wx.hideLoading();
        if(this.flag){
        wx.switchTab({
          url: '../find/find',
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }  
        });
        }else  {
          wx.navigateBack();
        }
       
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
        title: '报名异常',
        // icon: 'loading',
        duration: 2000
      });
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = wx.getStorageSync("myInfo").data;
    
    this.setData({
      name: user.name,
      sex: user.sex,
      age: user.age,
      tel: user.telephone,
      majorName: options.majorName,
      schoolName: options.schoolname,
      majorId: options.majorId,
      flag: options.flag
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})