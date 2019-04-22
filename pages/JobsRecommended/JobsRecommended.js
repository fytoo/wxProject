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
      title: "岗位推荐", //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    postList : [],
    pageIndex:1,
    total:0
  },
  gojobdetail(e){
    console.log(e)
    wx.navigateTo({
      url: '../jobdetail/jobdetail?id=' + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...'
    });
    let postListdata = {
      pageIndex: 0,
      pageSize: 10,
    };
    app.api("app/postList", postListdata).then(res => {
      
      let code = res.data.code;
      if (code == "200") {
        wx.hideLoading();
        let data = res.data.data;
        let { pageIndex, pageCount, postList} = data;

        this.setData({
          postList: postList,
          total: data.pageCount
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
    //分页处理
    let index = this.data.total % 10;
    let total = index == 0 ? parseInt(this.data.total / 10) == 0 ? 1 : parseInt(this.data.total / 10) : parseInt(this.data.total / 10) + 1;
    if (total > this.data.pageIndex) {
      this.setData({
        pageIndex: this.data.pageIndex + 1
      })
      let params = {
        pageIndex: this.data.pageIndex,
        pageSize: 10,
      }
      wx.showLoading({
        title: '拼命加载中...'
      });
      app.api("app/postList", params).then(res => {

        let code = res.data.code;
        if (code == "200") {
          wx.hideLoading();
          let data = res.data.data;
          this.setData({
            postList: this.data.postList.concat(data.postList),
            total: data.pageCount
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})