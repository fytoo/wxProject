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
      title: "意见调研", //导航栏 中间的标题
    },
    data: [],
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    answer: [],
    checkboxlist: [],
    sex: [
      { name: 'sex', value: '男' },
      { name: 'sex', value: '女' },
    ],
    date: '请选择出生年月',
    sexcheck: ''
  },
  bindDateChange(e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value,
    })
  },
  checkbox(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    this.setData({
      checkboxlist: e.detail.value
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
  },
  sexRadiochange(e) {
    this.setData({
      sexcheck: e.detail.value
    })
  },

  sexradio(e) {
    let sex = this.data.sex;
    let index = e.currentTarget.dataset.index;
    sex.forEach(item => {
      item.checked = false
    })
    sex[index].checked = true;//改变当前选中的checked值

    this.setData({
      sex: sex
    });
  },
  /*根据出生日期算出年龄*/
  jsGetAge(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
      returnAge = 0;//同年 则为0岁
    }
    else {
      var ageDiff = nowYear - birthYear; //年之差
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          var dayDiff = nowDay - birthDay;//日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          }
          else {
            returnAge = ageDiff;
          }
        }
        else {
          var monthDiff = nowMonth - birthMonth;//月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          }
          else {
            returnAge = ageDiff;
          }
        }
      }
      else {
        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
      }
    }

    return returnAge;//返回周岁年龄

  },
  radio(e) {
    let index = e.currentTarget.dataset.index;
    let son_index = e.currentTarget.dataset.son_index;
    let useranswer = e.currentTarget.dataset.useranswer;
    let data = this.data.data;
    let questionId = data[index].id;
    let answer = this.data.answer;
    answer[index] = {
      questionId: questionId,
      userAnswer: [useranswer]
    }
    this.setData({
      answer: answer
    });

    data[index]['option'].forEach(item => {
      item.checked = false
    })
    data[index]['option'][son_index].checked = true;//改变当前选中的checked值

    this.setData({
      data: data
    });

  },
  check(e) {
    let index = e.currentTarget.dataset.index;
    let son_index = e.currentTarget.dataset.son_index;
    let data = this.data.data;
    let questionId = data[index].id;
    let answer = this.data.answer;

    answer[index] = {
      questionId: questionId,
      userAnswer: this.data.checkboxlist
    }
    this.setData({
      answer: answer
    });

    data[index]['option'][son_index].checked = !data[index]['option'][son_index].checked;//改变当前选中的checked值

    this.setData({
      data: data
    });

  },
  submit() {
    let date = this.jsGetAge(this.data.date);

    let data = {
      userId: app.globalData.userId,
      age: date,
      sex: this.data.sexcheck,
      answer: this.data.answer,
    }
    app.api("app/subSurvey", data).then(res => {
      console.log(res.data);

      let code = res.data.code;
      if (code == "200") {
        wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
          title: res.data.msg,
          // icon: 'loading',
          duration: 2000
        });
        setTimeout(function(){
          wx.switchTab({
            url: '../index/index',
          })
        },2000)
        
      } else {
        wx.hideLoading();
        wx.showModal({
          title: '温馨提示',
          content: res.data.msg,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

    app.api("app/surveyList").then(res => {
      console.log(res.data);

      let code = res.data.code;
      if (code == "200") {
        this.setData({
          data: res.data.data,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})