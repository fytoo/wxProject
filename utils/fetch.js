/**
 * 抓取远端API的结构
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param  {String} api    api 根地址
 * @param  {String} path   请求路径
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
// 获取全局应用程序实例对象
// const app = getApp();
// module.exports = function (api, path, params) {
//   return new Promise((resolve, reject) => {
//     wx.request({
//       url: `${api}/${path}`,
//       data: Object.assign({}, params),
//       header: { 'Content-Type': 'json' },
//       success: resolve,
//       fail: reject
//     })
//   })
// }
function login(path, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${'https://zypx.hbwwcc.com:8000/study'}/${path}`,
      //url: `${'https://192.168.88.18:8000/study'}/${path}`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      success: resolve,

      fail: reject
    })
  })
}
function api(path, params) {
  
      return new Promise((resolve, reject) => {
        wx.getStorage({
          key: 'token',
          success(res) { 
            wx.request({
              //url: `${'https://192.168.88.18:8000/study'}/${path}`,
              url: `${'https://zypx.hbwwcc.com:8000/study'}/${path}`,
              data: Object.assign({}, params),
              header: {
                'authorization': res.data
              },
              success: resolve,

              fail: reject
            })
          }
        })
      
      })
      // requestP({
      //   url: `${'http://120.77.76.56:8000/study'}/${path}`,
      //   header: {
      //     'authorization': res.data
      //   },
      //   data: Object.assign({}, params),
      // })
    
  
  
  
}

/**
 * promise请求
 * 参数：参考wx.request
 * 返回值：[promise]res
 */
function requestP(options = {}) {
  const {
    url,
    data,
    header,
    method,
    dataType,
    responseType,
    success,
    fail,
    complete
  } = options;

  return new Promise((res, rej) => {
    wx.request({
      url,
      data,
      header,
      method,
      dataType,
      responseType,
      success(r) {
        const isSuccess = isHttpSuccess(r.statusCode);

        if (isSuccess) {  // 成功的请求状态
          res(r.data);
        } else {
          rej({
            msg: `网络错误:${r.statusCode}`,
            detail: r
          });
        }
      },
      fail(err) {
        rej(err);
      },
      complete
    });
  });
}
/**
 * 判断请求状态是否成功
 * 参数：http状态码
 * 返回值：[Boolen]
 */
function isHttpSuccess(status) {
  return status >= 200 && status < 300 || status === 304;
}
module.exports = {
  api: api,
  login: login
}
