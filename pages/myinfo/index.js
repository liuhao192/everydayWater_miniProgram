const app = getApp()
const comm = require('../../manage.js')

const indexInfo = require('../index/index.js')
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          active: 1
        })
      }
//加载用户历史的统计信息
      const url = this.data.url.count + app.globalData.openId;
      let that = this;
      comm.getAction(url, "", '', function (res) {
        console.log("用户历史的统计信息",res);
        if (res.success ) {
        that.setData({
          drinkDay: res.body.data.drinkDay,
          drinkNum: res.body.data.drinkNum,
          standardDay: res.body.data.standardDay
        });
      }
      }, function (res) {
        console.log(res)
      })
    }
  },
  data: {
    show: false,
    columns: ['1', '2', '3', '4', '5', '6', '7', '8'],
    userInfo: null,
    defaultImage: "../../image/my_info.png",
    drinkDay: 0,
    drinkNum: 0,
    standardDay: 0,
    defaultIndex:0,
    myConfig:null,
    url:{
      count: "/api/water/count/openid/",
      config: "/api/water/config/openid/",
      updateConfig: "/api/water/config"
    }
  },
  lifetimes: {

  },
  methods: {
    orderMenu() {
      wx.requestSubscribeMessage({
        tmplIds: ['J2qZ6dZgZK3SjIxbiAUm4qjhOiErt-z1TWCHxhd6B3o'],
        success (res) { 
          console.log("订阅结果",res);
         }
      })
    },
  
    alertMenu() {
     
      wx.hideTabBar({
        animation: true,
      })
      this.setData({
        show: true
      });

      //加载我的配置信息
      const url = this.data.url.config + app.globalData.openId;
      let that = this;
      comm.getAction(url, "", '', function (res) {
        console.log("加载我的配置信息",res);

        that.setData({
          defaultIndex:res.body.data.num-1,
          myConfig:res.body.data
        });

      }, function (res) {
        console.log(res)
      })


    },
    onCancel(){
      this.setData({
        show: false
      });
      wx.showTabBar({
        animation: true,
      })
    },
    onConfirm(event){
      this.setData({
        show: false
      });
      wx.showTabBar({
        animation: true,
      })

      const { picker, value, index } = event.detail;
      console.log(value)
      this.data.myConfig.num=value;
      console.log("加载我的配置信息",this.data.myConfig);
      //更新我的默认配置
      const url = this.data.url.updateConfig;
      comm.putAction(url, this.data.myConfig, '正在更新', function (res) {
        console.log(res)
        app.globalData.goalNum=value;
        console.log(indexInfo)
      }, function (res) {
        console.log(res)
      })

    },
    
    onClose() {
      this.setData({
        show: false
      });
      wx.showTabBar({
        animation: true,
      })
    },

    onSelect(event) {
      console.log(event.detail);
    }
  },
})