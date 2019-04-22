// pages/find/find.js
const years = ["学校","专业"]
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
    placeholderName:"请输入学校名称",
    searchName:"",
    pageIndex: 1,
    total:0,
    list: [
     
    
    ],
    schoollist: [
     
    ],
    idx: 0,
    project: [
      {
        id: 0,
        val: '学校'
      },
      {
        id: 1,
        val: '专业'
      }
    ]
  }, 
  searchNameInput(e){
    this.setData({
      searchName:e.detail.value
    })
  },
  //跳转报名页面
  enroll(e){
    console.log(e);
    wx.navigateTo({
      url: '../enroll/enroll?majorId=' + e.currentTarget.dataset.id + "&majorName=" + e.currentTarget.dataset.name + "&schoolname=" + e.currentTarget.dataset.schoolname+"&flag=true",
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
  bindPickerChange: function (event) {
    this.setData({   //给变量赋值
      idx: event.detail.value,
    });
    if (event.detail.value==1){
      let majorListdata = {
        pageIndex: 0,
        pageSize: 10,
        userId: app.globalData.userId
      }
      console.log(majorListdata);
      app.api("/app/majorList", majorListdata).then(res => {


        let code = res.data.code;

        if (code == "200") {
          wx.hideLoading();
          let data = res.data.data.schoolList;
          console.log(data);
          this.setData({
            courserList: true,
            schoolList: false,
            list: data,
            total: res.data.data.pageCount,
            placeholderName: "请输入专业名称",
            searchName:""
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
    }else{
      this.setData({
        courserList: false,
        schoolList: true,
        placeholderName: "请输入学校名称",
        searchName: ""
      })
    }
  },
  goshoolDetail(e){
   
    wx.navigateTo({
      url: '../schoolDetail/schoolDetail?schoolId=' + e.currentTarget.dataset.id + '&introduce=' + e.currentTarget.dataset.introduce + '&photo=' + e.currentTarget.dataset.photo + '&address=' + e.currentTarget.dataset.address + '&classNum=' + e.currentTarget.dataset.classnum + '&name=' + e.currentTarget.dataset.name ,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  
  bindChange(e) {
    // 多选框的操作
    console.log(e.detail)
    // const val = e.detail.value;
    // console.log(this.data.years[val[0]])
    // this.setData({
    //   year: this.data.years[val[0]]
    // });
  },
  bindpickend(e){
    const val = e.detail.value;
    console.log(val);
  },
  search:function(){//点击查询
   if(this.data.idx=="0"){
     let schoolListdata = {
       pageIndex: 0,
       pageSize: 10,
       userId: app.globalData.userId,
       name:this.data.searchName
     }
     app.api("/app/schoolList", schoolListdata).then(res => {


       let code = res.data.code;

       if (code == "200") {
         wx.hideLoading();
         let data = res.data.data.schoolList;
         this.setData({
           schoollist: data,
           total: res.data.data.pageCount,
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
   }else{
     let majorListdata = {
       pageIndex: 0,
       pageSize: 10,
       name: this.data.searchName,
       userId: app.globalData.userId
     }
    
     app.api("/app/majorList", majorListdata).then(res => {


       let code = res.data.code;

       if (code == "200") {
         wx.hideLoading();
         let data = res.data.data.schoolList;

         this.setData({
           list: data,
           total: res.data.data.pageCount,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '拼命加载中...'
    });
    if (!this.data.courserList){
    let schoolListdata = {
      pageIndex: 0,
      pageSize: 10,
      userId: app.globalData.userId
    }
    app.api("/app/schoolList", schoolListdata).then(res => {

      
      let code = res.data.code;
     
      if (code == "200") {
        wx.hideLoading();
        let data = res.data.data.schoolList;
        this.setData({
          schoollist: data,
          total: res.data.data.pageCount,
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
   }else{
      let majorListdata = {
        pageIndex: 0,
        pageSize: 10,
        userId: app.globalData.userId
      }
      
      app.api("/app/majorList", majorListdata).then(res => {


        let code = res.data.code;

        if (code == "200") {
          wx.hideLoading();
          let data = res.data.data.schoolList;
          this.setData({
            courserList: true,
            schoolList: false,
            list: data,
            total: res.data.data.pageCount,
            placeholderName: "请输入专业名称",
            searchName: ""
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
    // {
    //   "CourseName": "种养殖技术",
    //     "time": "2018/12/21",
    //       "school": "学校妮妮您呐呐呐",
    //         "address": "当你翻开你打算",
    //           "tel": '875984514'
    // },

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
   
    let index = this.data.total % 10;
    let total = index == 0 ? parseInt(this.data.total / 10) == 0 ? 1 : parseInt(this.data.total / 10) : parseInt(this.data.total / 10) + 1;
    if (total > this.data.pageIndex) {
      this.setData({
        pageIndex: this.data.pageIndex + 1
      })
      if (this.data.idx == "0") {
        let schoolListdata = {
          pageIndex: this.data.pageIndex,
          pageSize: 10,
          userId: app.globalData.userId,
          name: this.data.searchName
        }
        app.api("/app/schoolList", schoolListdata).then(res => {


          let code = res.data.code;

          if (code == "200") {
            wx.hideLoading();
            let data = res.data.data.schoolList;
            this.setData({
              schoollist: this.data.schoollist.concat(data),
              total: res.data.data.pageCount,
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
      } else {
        let majorListdata = {
          pageIndex: this.data.pageIndex,
          pageSize: 10,
          name: this.data.searchName,
          userId: app.globalData.userId
        }
        app.api("/app/majorList", majorListdata).then(res => {


          let code = res.data.code;

          if (code == "200") {
            wx.hideLoading();
            let data = res.data.data.schoolList;

            this.setData({
              list: this.data.list.concat(data),
              total: res.data.data.pageCount,
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
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})