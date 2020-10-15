// pages/myinfo/record.js

const comm = require('../../../manage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: {
      log: "/api/water/log/openid/"
    },
    isHide: true,
    steps: []
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
    const url = this.data.url.log + app.globalData.openId;
    let that = this;
    comm.getAction(url, "", '', function (res) {
      console.log("用户日志信息信息", res);
      if (res.success && res.body.data.length>0) {
        let record = []
        res.body.data.forEach(item => {
          console.log(item.drinkTime);
          record.push({
            text: item.drinkTime,
            inactiveIcon: 'award-o',
          })
        })
        that.setData({
          steps: record,
          isHide: false
        })
      }
    }, function (res) {
      console.log(res)
    })


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