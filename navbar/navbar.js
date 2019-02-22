// navbar/navbar.js
const app = getApp()
Component({
  properties: {
    navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { }
    }
  },
  data: {
    height: '',
    //默认值  默认显示左上角
    navbarData: {
      showCapsule: 0,
    },
    num : 1,
  },
 
  attached: function () {
    // 获取是否是通过分享进入的小程序
    this.setData({
      share: app.globalData.share
    })
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height
    })
  },
  methods: {
    // 返回上一页面
    _navback() {
      wx.navigateBack()
    },
    //返回到首页
    _backhome() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    },
    // 跳到图标检测页面
    gochart(){
      wx.navigateTo({
        url: '../radar/index',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    gomap(){
      wx.navigateTo({
        url: '../map/map',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    selectBtn(e) {
      this.setData({
        num: e.target.dataset.num
      });
      let myEventDetail = this.data.num;
      this.triggerEvent('myevent', myEventDetail, { bubbles: false });
    },
  }

})
