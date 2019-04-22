// pages/my/my.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    name: '',
    idNumber: '',
    // 组件所需的参数
    nvabarData: {
      showCapsule: false, //是否显示左上角图标
      title: "我的", //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    list: [{
      'imgSrc': '../../images/wodekecheng.png',
      "course": "我的课程"
    },
    {
      'imgSrc': '../../images/cuotijilu.png',
      "course": "考试记录"
    },
    {
      'imgSrc': '../../images/wodepeixun.png',
      "course": "我的培训"
    },
    // {
      // 'imgSrc': '../../images/qiandao.png',
       //"course": "签到"
    // }
    ],
    "listOptions": [
      {
      'imgSrc': '../../images/more.png',
      "optionsDec": "最新画像"
      },
      {
        'imgSrc': '../../images/more.png',
        "optionsDec": "修改密码"
      }, 
      {
        'imgSrc': '../../images/more.png',
        "optionsDec": "意向调研"
      },
      {
        'imgSrc': '../../images/more.png',
        "optionsDec": "意见反馈"
      },
      // {
      //   'imgSrc': '../../images/more.png',
      //   "optionsDec": "关于我们"
      // }
    ]
  },
  goMytrain(e) {
    if (e.currentTarget.dataset.index == 2) {
      wx.navigateTo({
        url: '../myTrain/myTrain',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (e.currentTarget.dataset.index == 1) {
      wx.navigateTo({
        url: '../mywrong/mywrong',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } 
  },
  goupdatePassword(e){
    if (e.currentTarget.dataset.index == 1){
      wx.navigateTo({
        url: '../changePassword/changePassword',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (e.currentTarget.dataset.index == 3){
      wx.navigateTo({
        url: '../feedback/feedback',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (e.currentTarget.dataset.index == 2) {
      wx.navigateTo({
        url: '../OpinionResearch/OpinionResearch',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateTo({
        url: '../radar/index',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    
  },
  
  formatidcard(idcard) {
    // 15位身份证举例：130503 670401 001的含义; 13为河北，05为邢台，03为桥西区，出 生日期为1967年4月1日，顺序号为001。
    if (idcard.length == 15) {
      return idcard.replace(/(\d{3})\d{9}(\d{3})/, "$1******$2");
    } else {
      return idcard.replace(/(\d{3})\d{12}(\d{3})/, "$1******$2");
    }
  },
  loginOut(){
    // wx.removeStorage({
    //   key: 'token',
    //   success(res) {
    //     console.log(res.data)
    //   }
    // });
    // wx.removeStorage({
    //   key: 'myInfo',
    //   success(res) {
    //     console.log(res.data)
    //   }
    // });
    wx.navigateTo({
      url: '../login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // console.log(_this)
    wx.getStorage({
      key: 'myInfo',
      success(res) {
        // console.log(res.data);

        _this.setData({
          name: res.data.data.name,
          idNumber: _this.formatidcard(res.data.data.idNumber),
        })
      }
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