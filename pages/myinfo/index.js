Component({
  pageLifetimes: {
   show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          active: 1
        })
      }
    }
  },
   data: {
    show: false,
    columns: ['1杯', '2杯', '3杯', '4杯', '5杯', '6杯', '7杯', '8杯'],
  },
  methods: {
  alertMenu(){
    console.log("点击");
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
  }
}
})
