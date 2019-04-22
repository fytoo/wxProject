// pages/news/news.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: false, //是否显示左上角图标
      title: "资讯", //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    items: [],
    list: [],
    url: 'https://zypx.hbwwcc.com:8080/',
    checkType:"",
    newsTotal: 0,
    pageIndex:1
  },
  checkboxChange(e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var that = this;
    let data = {
      pageIndex: 0,
      pageSize: 10,
      type: e.detail.value
    }
   
    app.api("/app/newsList", data).then(res => {

      let data = res.data.data.policyList;
      let code = res.data.code;
      data.map((val, index) => {
        if (val.title.length >= 23) {
          val.title = val.title.slice(0, 23) + '......';//字符串截取
        }
        val.photo = this.data.url+ val.photo;
      })
      if (code == "200") {
        wx.hideLoading();
        that.setData({
          list: data,
          checkType: e.detail.value,
          newsTotal: res.data.data.pageCount
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
  gonewsDetail(e) {
    wx.navigateTo({
      url: '../newsDetail/newsDetail?id=' + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.height);
    this.loadNewsList();
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
     wx.stopPullDownRefresh();
     this.loadNewsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this;
    let index = that.data.newsTotal % 10;
    let total = index == 0 ? parseInt(that.data.newsTotal / 10) == 0 ? 1 : parseInt(that.data.newsTotal / 10) : parseInt(that.data.newsTotal / 10) + 1;
    if (total > this.data.pageIndex) {
      that.setData({
        pageIndex: that.data.pageIndex + 1
      })
    let data = {
      pageIndex: 1,
      pageSize: 10,
      type: that.data.checkType
    }
    app.api("/app/newsList", data).then(res => {

      let data = res.data.data.policyList;
      let code = res.data.code;
      data.map((val, index) => {
        if (val.title.length >= 23) {
          val.title = val.title.slice(0, 23) + '......';//字符串截取
        }
        val.photo = this.data.url + val.photo;
      })
      if (code == "200") {
        wx.hideLoading();
        this.setData({
          list: that.data.list.concat(data),
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

  },
  loadNewsList:function(){
    wx.showLoading({
      title: '拼命加载中...'
    });
    let data = {
      pageIndex: 0,
      pageSize: 10,
      type: ''
    }

    app.api("/app/findDict").then(res => {
      let code = res.data.code;

      if (code == "200") {
        wx.hideLoading();
        let newsType = res.data.data.newsType;
        console.log(newsType)
        this.setData({
          items: newsType,
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
    app.api("/app/newsList", data).then(res => {
      var that = this;
      let data = res.data.data.policyList;
      let code = res.data.code;
      console.log(data);
      data.map((val, index) => {
        if (val.title.length >= 23) {
          val.title = val.title.slice(0, 23) + '......';//字符串截取
        }
        val.photo = this.data.url + val.photo;
      })
      if (code == "200") {
        wx.hideLoading();
        that.setData({
          list: data,
          newsTotal: res.data.data.pageCount
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
})