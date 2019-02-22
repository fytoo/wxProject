// pages/learn/learn.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    sexIndex: 0,
    // 组件所需的参数
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: "家政", //导航栏 中间的标题
      chartBtn: true,
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    LidtData: [{
        title: "家庭日常保洁",
        secTitle: [{
            dec: "但是你放了暑假打方腊的胜利客服",
            order: 1
          },
          {
            dec: "但是你放了暑假打方腊的胜利客服",
            order: 1
          }
        ],
        show: false
      },
      {
        title: "家庭日常保洁",
        secTitle: [{
            dec: "但是你放了暑假打方腊的胜利客服",
            order: 1
          },
          {
            dec: "但是你放了暑假打方腊的胜利客服",
            order: 1
          }
        ],
        show: false
      }
    ],
    title: "家政",
  },
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
  show(e) {
    let _this = this;
    let index = e.currentTarget.dataset.index;
    this.data.LidtData.map((val, ind) => {
      //收起其他列表
      if (val.show !== this.data.LidtData[index].show) {
        val.show = false;
      }
    });
    this.data.LidtData[index].show = !this.data.LidtData[index].show;
    _this.setData({
      LidtData: this.data.LidtData,
    })
  },
  showSecmeun(e){
    let _this = this;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../learnListitem/learnListitem',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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