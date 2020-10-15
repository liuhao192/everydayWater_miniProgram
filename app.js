//app.js
const comm = require('manage.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
     //第一次登陆默认获取openid
     wx.login({
      success: res => {
        //成功后调用接口注册当前用户的信息
        if (res.code) {
        let that=this;
          //发起网络请求
          const url = '/api/wx/login/code/' + res.code;
          comm.getAction(url, "",'正在加载', function (res) {
            console.log("登陆成功数据",res)
            that.globalData.openId=res.body.openId
            if (that.userInfoReadyCallback) {
              that.userInfoReadyCallback(res)
            }
          }, function (res) {
            console.log(res)
          })
        }
  
  
      }
    });
  },
  globalData: {
    userInfo: {},
    goalNum:null,
    requestDate:null,
    openId: null
  }
})