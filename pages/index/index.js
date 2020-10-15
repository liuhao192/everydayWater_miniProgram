const comm = require('../../manage.js')
const app = getApp()
Component({
  data: {
    value: 0,
    show: false,
    goalNum: 0,
    completedNum: 0,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    url: {
      daily: "/api/water/daily/openid/",
      drink: "/api/water/drink/openid/"
    }
  },
  lifetimes: {
    attached: function () {
      if (!app.globalData.openId) {
        app.userInfoReadyCallback = res => {
       this.getDayDate();
        }
      }
    },
  },
  methods: {
    onClose() {


    },
    getDayDate(){
      const url = this.data.url.daily + app.globalData.openId;
      let that = this;
      comm.getAction(url, "", '', function (res) {
        if (res.success) {
          console.log("今日数据", res.body.daily)
          const goalNum = res.body.daily.goalNum;
          const completedNum = res.body.daily.completedNum;
          let value = parseInt((completedNum / goalNum) * 100);
          app.globalData.requestDate = res.body.daily.requestDate
          if (completedNum >= goalNum) {
            value = 100;
          }

          console.log("百分比value", value)
          that.setData({
            goalNum: goalNum,
            completedNum: completedNum,
            value: value
          });
        }
      }, function (res) {
        console.log(res)
      })
    },
    onClick() {
      this.setData({
        show: true
      });
      const url = this.data.url.drink + app.globalData.openId;
      let that = this;
      comm.postAction(url, "", '+1', function (res) {
        that.setData({
          show: false
        });
        if (res.success) {
          console.log("今日数据", res.body)
          const goalNum = that.data.goalNum;
          const completedNum = res.body.data.num;
          let value = parseInt((completedNum / goalNum) * 100);
          if (completedNum >= goalNum) {
            value = 100;
          }
          console.log("百分比value", value)
          that.setData({
            completedNum: completedNum,
            value: value
          });
        }
      }, function (res) {
        console.log(res)
        that.setData({
          show: false
        });
      })
    },

    onClickShow() {
      this.setData({
        show: true
      });
    },

    onClickHide() {
      this.setData({
        show: false
      });
    },


  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          active: 0
        })
      }
      if (app.globalData.goalNum) {
        this.setData({
          goalNum: app.globalData.goalNum
        })
      }
      //对比小程序的上一次请求的日期和当前的日期进行对比，当日期不对时，重写加载数据
      if (app.globalData.requestDate) {
        console.log("上次访问的日期", app.globalData.requestDate);
        var timestamp = Date.parse(new Date());
        var date = new Date(timestamp);
        //获取年份  
        var Y = date.getFullYear();
        //获取月份  
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //获取当日日期 
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var  now=Y + '-' + M + '-' + D;
        if(now!==app.globalData.requestDate){
          //加载新的数据
          this.getDayDate();

        }
      
      }
    }
  },
})