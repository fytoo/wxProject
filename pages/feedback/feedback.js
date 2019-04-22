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
      title: "意见反馈", //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    items: [
      { name: '投诉举报', value: '投诉举报' },
      { name: '改进建议', value: '改进建议' },
      { name: '账号问题', value: '账号问题' },
      { name: '系统问题', value: '系统问题' },
      { name: '其他', value: '其他' },
      { name: '其他', value: '其他' },
    ],
    textarea: '',
    type: '',
    imagesList: [],
    telephone: '17607147069'
  },

  //上传图片
  uploadImage: function () {
    var that = this;

    wx.chooseImage({
      count: 1,  //最多可以选择的图片总数
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          imagesList: tempFilePaths
        });
        // console.log(imagesList)

        // wx.uploadFile({
        //   url: '192.168.1.1/home/uploadfilenew',
        //   filePath: tempFilePaths[0],
        //   name: 'uploadfile_ant',
        //   formData: {
        //   },
        //   header: {
        //     "Content-Type": "multipart/form-data"
        //   },
        //   success: function (res) {
        //     var data = JSON.parse(res.data);
        //     //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
        //     console.log(data);
        //   },
        //   fail: function (res) {
        //     wx.hideToast();
        //     wx.showModal({
        //       title: '错误提示',
        //       content: '上传图片失败',
        //       showCancel: false,
        //       success: function (res) { }
        //     })
        //   }
        // });
      }
    });
  },
  //图片预览
  previewImage(e) {
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      current: current,
      urls: this.data.imagesList,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
  ,
  bindchange(e) {
    this.setData({
      textarea: e.detail.value
    });
  },
  submit() {
    let that = this;
    //启动上传等待中...
    wx.showToast({
      title: '正在上传...',
      icon: 'loading',
      mask: true,
      duration: 3000
    });

    wx.getStorage({
      key: 'token',
      success(res) {
        setTimeout(function(){
          wx.showToast({
            title: '上传成功',
            mask: true,
            duration: 3000
          });
        },2000)
       

        // wx.uploadFile({
        //   url: 'https://zypx.hbwwcc.com:8000/app/study/subFeedback',
        //   // url: 'https://192.168.88.18:8000/app/study/subFeedback',

        //   filePath: that.data.imagesList[0],
        //   name: 'files',
        //   formData: {
        //     userId: app.globalData.userId,
        //     type: that.data.type,
        //     content: that.data.textarea,
        //     telephone: that.data.telephone,
        //   },
        //   header: {
        //     // "Content-Type": "multipart/form-data",
        //     // 'content-type': 'application/x-www-form-urlencoded',
        //     'authorization': res.data
        //   },
        //   success: function (res) {
        //     var data = JSON.parse(res.data);
        //     //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
        //     console.log(data);
        //   },
        //   fail: function (res) {
        //     wx.hideToast();
        //     console.log(res);
        //     wx.showModal({
        //       title: '错误提示',
        //       content: '上传失败',
        //       showCancel: false,
        //       success: function (res) { }
        //     })
        //   }
        // });
      }
    })
  },
  gojobdetail(e) {

    wx.navigateTo({
      url: '../jobdetail/jobdetail?id=' + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      type: e.detail.value
    });
  },
  radio(e) {
    let items = this.data.items;
    let index = e.currentTarget.dataset.index;
    items.forEach(item => {
      item.checked = false
    })
    items[index].checked = true;//改变当前选中的checked值

    this.setData({
      items: items
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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