Component({
  data: {
    active: 0,
    show:false,
    list: [
      {
        "url": "../index/index",
        "icon": "wap-home-o",
        "text": "首页"
      },
      {
        "url": "../myinfo/index",
        "icon": "user-circle-o",
        "text": "我的"
      }
    ]
    },
    methods: {
      onChange(event) {
        // event.detail 的值为当前选中项的索引
        this.setData({ active: event.detail });
        const url = this.data.list[event.detail].url
        wx.switchTab({url})
      },

     }
     
});
