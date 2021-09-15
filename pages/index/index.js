// index.js
// 获取应用实例
//Page Object

import getRequest from '../../request/index.js'
Page({
  data: {
    img:[],
    navs:[],
    floors:[]
  },
  //options(Object)
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中',
    })
    this.getSwipperData();
    this.getNavData();
    this.getFloors();
    wx.hideLoading();
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  },
  getSwipperData() {
    getRequest({
      url: '/home/swiperdata'
    }).then(res => {
      this.setData({
        img: res.data.message
      })
    })
  },
  getNavData(){
    getRequest({
      url: '/home/catitems'
    })
    .then(res=>{
      this.setData({
        navs: res.data.message
      })
    })
  },
  getFloors(){
    getRequest({
      url:'/home/floordata'
    }).then(res=>{
      this.setData({
        floors: res.data.message
      })
    })
  }
});