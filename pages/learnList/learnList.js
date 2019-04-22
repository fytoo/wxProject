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
    details: '',
    studyNum: '',
    picture: '',
    navbar: ['课程', '岗位推荐', '专业推荐'],
    currentTab: 0,
    courseId:"",
    // 组件所需的参数
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: "", //导航栏 中间的标题
      chartBtn: true,
    },
    // 此页面 页面内容距最顶部的距离
    height: 0,
    navbarTop:0,
    pageIndex:1,
    ListData: [
   
    ],
    //存储专业推荐数组
    MajorList:[],
    marjorTotal:0
  },
  signUp(e) {
    wx.navigateTo({
      url: '../enroll/enroll?majorId=' + e.currentTarget.dataset.id + "&majorName=" + e.currentTarget.dataset.name + "&schoolname=" + e.currentTarget.dataset.schoolname +"&flag=false",
      success: function () {
        console.log("跳转成功")
      },
      fail: function () {
        console.log("跳转失败")
      },
      complete: function () {
        console.log("跳转完成")
      }
    })
  },
  navbarTap: function (e) {
    var that = this;
    //数据切换请求数据
    that.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
      if (e.currentTarget.dataset.idx==0){//课程页
      
    } else if (e.currentTarget.dataset.idx == 1){//岗位推荐界面
       
    } else{//
        let params = {
          pageIndex: 1,
          pageSize: 10,
          userId: app.globalData.userId,
          courseId: this.data.courseId,
        }
        app.api("/app/majorList", params).then(res => {
          let code = res.data.code;
          // console.log(res.data);
          if (code == "200") {
            wx.hideLoading();
            let data = res.data.data;
            console.log(data);
            this.setData({
              MajorList: data.schoolList,
              marjorTotal: data.pageCount
            });
            console.log(this.data.MajorList);
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
  goEvaleating() {
    wx.navigateTo({
      url: '../evaluating/evaluating?id=1&page=4',
      success: function () {
        console.log("跳转成功")
      },
      fail: function () {
        console.log("跳转失败")
      },
      complete: function () {
        console.log("跳转完成")
      }
    })
    7
  },
  show(e) {
    let _this = this;
    let index = e.currentTarget.dataset.index;
    this.data.ListData.map((val, ind) => {
      //收起其他列表
      if (val.show !== this.data.ListData[index].show) {
        val.show = false;
      }
    });
    this.data.ListData[index].show = !this.data.ListData[index].show;
    _this.setData({
      ListData: this.data.ListData,
    })
  },
  showSecmeun(e) {
    let _this = this;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../learnListitem/learnListitem?kid=' + e.currentTarget.dataset.id + '&name=' + _this.data.nvabarData.title,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
   
    let picture = options.picture;
   
    this.setData({
      details: options.details,
      studyNum: options.studyNum,
      picture: picture,
      ["nvabarData.title"]: options.name,
      navbarTop:app.globalData.height*2+49,
      courseId:options.courseId,
    });
    wx.showLoading({
      title: '拼命加载中...'
    });
    let courseIddata = {
      courseId: options.courseId,
      userId: app.globalData.userId
    }
    app.api("/app/studyCourse", courseIddata).then(res => {
      let code = res.data.code;
      // console.log(res.data);
      if (code == "200") {
        wx.hideLoading();
        let data = res.data.data;
        let { total, skillList, kCount, completeCount} = data;

        this.setData({
          ListData: skillList,
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
    this.onLoad();
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
    let index = this.data.marjorTotal % 10;
    let total = index == 0 ? parseInt(this.data.marjorTotal / 10) == 0 ? 1 : parseInt(this.data.marjorTotal / 10): parseInt(this.data.marjorTotal / 10)+1;
    if (total >this.data.pageIndex){
    
    this.setData({
      pageIndex: this.data.pageIndex+1
    })
    let params = {
      pageIndex: this.data.pageIndex,
      pageSize: 10,
      userId: app.globalData.userId,
      courseId: this.data.courseId,
    }
    wx.showLoading({
      title: '拼命加载中...'
    });
    app.api("/app/majorList", params).then(res => {
      let code = res.data.code;
      
      if (code == "200") {
        wx.hideLoading();
        let data = res.data.data;
        this.setData({
          MajorList: this.data.MajorList.concat(data.schoolList),
          marjorTotal: data.pageCount
        });
        console.log(this.data.MajorList);
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