// pages/find/find.js
const years = ["学校","", "课程"];
//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    courserList: false,
    schoolList: true,
    // 组件所需的参数
    nvabarData: {
      showCapsule: false, //是否显示左上角图标
      title: "发现", //导航栏 中间的标题
      map : true,
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    years,
    value: [0],
    focus: false,
    list: [{
        "CourseName": "种养殖技术",
        "time": "2018/12/21",
        "school": "学校妮妮您呐呐呐",
        "address": "当你翻开你打算",
        "tel": '875984514'
      },
      {
        "CourseName": "种养殖技术",
        "time": "2018/12/21",
        "school": "学校妮妮您呐呐呐",
        "address": "当你翻开你打算",
        "tel": '875984514'
      },
      {
        "CourseName": "种养殖技术",
        "time": "2018/12/21",
        "school": "学校妮妮您呐呐呐",
        "address": "当你翻开你打算",
        "tel": '875984514'
      },
      {
        "CourseName": "种养殖技术",
        "time": "2018/12/21",
        "school": "学校妮妮您呐呐呐",
        "address": "当你翻开你打算",
        "tel": '875984514'
      },
      {
        "CourseName": "种养殖技术",
        "time": "2018/12/21",
        "school": "学校妮妮您呐呐呐",
        "address": "当你翻开你打算",
        "tel": '875984514'
      },
      {
        "CourseName": "种养殖技术",
        "time": "2018/12/21",
        "school": "学校妮妮您呐呐呐",
        "address": "当你翻开你打算",
        "tel": '875984514'
      },
    ],
    schoollist: [{
        "CourseName": "种养殖技术",
        "principal": "王玉明",
        "num": "24",
        "address": "当你翻开你打算",
        "tel": '875984514'
      },
      {
        "CourseName": "种养殖技术",
        "principal": "王玉明",
        "num": "24",
        "address": "当你翻开你打算",
        "tel": '875984514'
      },
      {
        "CourseName": "种养殖技术",
        "principal": "王玉明",
        "num": "24",
        "address": "当你翻开你打算",
        "tel": '875984514'
      },
    ]
  },
  goshoolDetail(){
    wx.navigateTo({
      url: '../schoolDetail/schoolDetail',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindChange(e) {
    // 多选框的操作
    const val = e.detail.value;
    this.setData({
      courserList: !this.data.courserList,
      schoolList: !this.data.schoolList,
      year: this.data.years[val[0]]
    });
  },
  bindpickend(e){
    const val = e.detail.value;
    console.log(val);
  },
  bindblur(e) {
    //搜索框的失焦事件

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