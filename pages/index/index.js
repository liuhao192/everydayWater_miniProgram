
Component({
  data:{
    value: 40,
    show: false,
    gradientColor: {
      '0%': '#CCFEF9',
      '100%': '#003D78',
      
    },
  },
  methods: {
    onClose(){
      console.log("点击");
  
    },
    onClick() {
      this.setData({ show: true });
      
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    
    },
    
  onClickShow() {
    this.setData({ show: true });
  },

  onClickHide() {
    this.setData({ show: false });
  },
  },
  onLoad: function (options) {
    console.log(options);
    animationUtil.animationMiddleHeaderItem(this);
},
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          active: 0
        })
      }
    }
  }
})

