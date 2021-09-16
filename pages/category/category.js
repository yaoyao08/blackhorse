// pages/category/category.js
import getRequest from "../../request/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cate: [],
    showData: [],
    activeId: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    const localCates = wx.getStorageSync("localCates");

    if (!localCates) {
      this.getCateData();
    }
    else {
      if (Date.now() - localCates.time > 5000) {
        this.getCateData();
      }
      else {
        this.setData({
          cate: localCates,
          showData: localCates[0].children
        })
      }
    }
    wx.hideLoading()
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

  },

  getCateData() {
    getRequest({
      url: "/categories"
    }).then(res => {
      const cates = res.data.message;
      wx.setStorageSync("localCates", { time: Date.now(), data: cates });
      this.setData({
        cate: res.data.message,
        showData: res.data.message[0].children
      })
    })
  },

  handleTitleClick(e) {
    this.setData({
      activeId: e.currentTarget.dataset.id,
      showData: e.currentTarget.dataset.showdata
    })
  }
})