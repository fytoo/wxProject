// pages/evaluating/evaluating.js
//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: "评测中心", //导航栏 中间的标题

    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    count: "",//试题的总个数
    recordId: "",//试题的id
    time: "",//试题的考试时间
    questionList: [],//试题数组
    answer: [],//答案数组
    index: 0,//试题的下标
    next: "下一题",
    operationShow: true,//操作按钮是否显示
    Isprevshow: true,//上一题是否显示
    IscheckBox : true,
  },
  Nextquestion(e) {
    let index = ++this.data.index;
    let answerPush = this.data.answer;
    let listIndex = --this.data.index;
    if (this.data.answer[listIndex] == undefined) {
      let obj = {
        optionIndex: [''],//用户所选的选项下标
        optionId: [''], //用户所选的选项ID
        isAnswer: [''],//用户所选的选项下标选项ID对应的isAnswer

      }
      answerPush[listIndex] = obj;
    }

    answerPush[listIndex]['questionId'] = e.currentTarget.dataset.questionid;// 试题ID
    answerPush[listIndex]['questionType'] = e.currentTarget.dataset.questiontype;//试题类型

    if (index == this.data.questionList.length - 1) {
      this.setData({
        next: "交卷",
        index: index
      });

    } else if (index > 0 && index < this.data.questionList.length - 1) {

      this.setData({
        index: index,
        answer: answerPush
      })
    } else {
      let _this = this;
      this.setData({
        next: "交卷",
        index: index-1
      });
      wx.showModal({
        title: '温馨提示',
        content: '您确定交卷吗？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            console.log(_this.data.answer);
            // subExam
            let answerdata = {
              answer: _this.data.answer,
              recordId:JSON.stringify(_this.data.recordId),
            }
            app.api("/app/subExam", answerdata).then(res => {
              let code = res.data.code;
              if (code == "200") {
                wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
                  title: '交卷成功',
                  duration: 2000
                });
                // wx.navigateTo({
                //   url: '',
                // })
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

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  Prevquestion(e) {
    if (this.data.index == 0) {
      wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
        title: '已经是第一题了',

        duration: 2000
      });
    } else {
      let answerPush = this.data.answer;
      if (this.data.answer[this.data.index] == undefined) {
        let obj = {
          optionIndex: [''],//用户所选的选项下标
          optionId: [''], //用户所选的选项ID
          isAnswer: [''],//用户所选的选项下标选项ID对应的isAnswer

        }
        answerPush[this.data.index] = obj;
      }
      answerPush[this.data.index]['questionId'] = e.currentTarget.dataset.questionid;// 试题ID
      answerPush[this.data.index]['questionType'] = e.currentTarget.dataset.questiontype;//试题类型
      let index = this.data.index - 1;
      
      this.setData({
        index: index,
        answer: answerPush,
        next: "下一题",
      })
    }
  },
  radiobox: function (e) {//单选事件
    var index = e.currentTarget.dataset.optionindex ? e.currentTarget.dataset.optionindex : ""; //获取当前点击的下标
    var optionid = e.currentTarget.dataset.optionid ? e.currentTarget.dataset.optionid : ""; //获取当前点击的下标
    var isanswer = e.currentTarget.dataset.isanswer ? e.currentTarget.dataset.optionid : ""; //获取当前点击的下标
    var questionList = this.data.questionList; //选项集合

    let listIndex = --index;//选项的下标 （因为题目下标是1开始的 。。。。）
    // questionList[this.data.index].optionList[listIndex].checked = !questionList[this.data.index].optionList[listIndex].checked; //改变当前选中的checked值
   
    questionList[this.data.index].optionList.forEach(item => {
      item.checked = false
    })
    questionList[this.data.index].optionList[listIndex].checked = true;//改变当前选中的checked值
  
    this.setData({
      questionList: questionList
    });
  },
  checkbox: function (e) {//多选事件
    var index = e.currentTarget.dataset.optionindex ? e.currentTarget.dataset.optionindex : ""; //获取当前点击的下标
    var optionid = e.currentTarget.dataset.optionid ? e.currentTarget.dataset.optionid : ""; //获取当前点击的下标
    var isanswer = e.currentTarget.dataset.isanswer ? e.currentTarget.dataset.optionid : ""; //获取当前点击的下标
    var questionList = this.data.questionList; //选项集合

    let listIndex = --index;//选项的下标 （因为题目下标是1开始的 。。。。）
    questionList[this.data.index].optionList[listIndex].checked = !questionList[this.data.index].optionList[listIndex].checked; //改变当前选中的checked值
    this.setData({
      questionList: questionList
    });
  },

  checkboxChange: function (e) {
    var checkValue = e.detail.value;
    var obj = {
      optionIndex: [],//用户所选的选项下标
      optionId: [], //用户所选的选项ID
      isAnswer: [],//用户所选的选项下标选项ID对应的isAnswer

    }
    checkValue.map(function (val, index) {
      obj.optionIndex.push(val.split(",")[0])
      obj.optionId.push(val.split(",")[1])
      obj.isAnswer.push(val.split(",")[2])

    })
    let answer = this.data.answer;
    answer[this.data.index] = obj;
    this.setData({//重置
      answer: answer
    });
  },

  radioChange: function (e) {
    var checkValue = e.detail.value;
    
    var obj = {
      optionIndex: [checkValue.split(",")[0]],//用户所选的选项下标
      optionId: [checkValue.split(",")[1]], //用户所选的选项ID
      isAnswer: [checkValue.split(",")[2]],//用户所选的选项下标选项ID对应的isAnswer

    }
    let answer = this.data.answer;
    answer[this.data.index] = obj;
    this.setData({//重置
      answer: answer
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...'
    });
    let data = {
      userId: app.globalData.userId,
      courseId: options.courseId,

    };
    app.api("/app/exam", data).then(res => {
      let code = res.data.code;

      if (code == "200") {
        let data = res.data.data;
        console.log(data);
        wx.hideLoading();

        let {
          questionList,
          count,
          recordId,
          time
        } = data;
        if (questionList.length == 0) {
          this.setData({
            operationShow: false
          })
          wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
            title: '暂无数据',
            // icon: 'loading',
            duration: 2000
          });
        } else if (questionList.length == 1) {
          this.setData({
            next: "交卷",
            Isprevshow: false,
            questionList: questionList,
            count: count,
            recordId: recordId,
            time: time,

          })
        } else {
          questionList.map((val, index) => {
            val.optionList.map((val, index) => {
              val.checked = false;
            })
          })
          this.setData({
            questionList: questionList,
            count: count,
            recordId: recordId,
            time: time,
          })
        }


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