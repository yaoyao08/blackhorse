// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isLogin:false,
    touchImage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    if(wx.getStorageSync('userInfo')){
      this.setData({
        isLogin: true,
        userInfo: wx.getStorageSync('userInfo')
      })
    };
    wx.hideLoading({
      success: (res) => {},
    })
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
  getUserInfo(){
      wx.getUserProfile({
        desc: '登录',
      }).then((res) => {
        this.setData({
          userInfo: res.userInfo,
          isLogin: true
        })
      })
  },
  touchImage(){
    this.setData({
      touchImage: !this.data.touchImage
    })
  },
  login(){
    if(wx.getStorageSync('userInfo')){
      this.setData({
        isLogin: true,
        userInfo: wx.getStorageSync('userInfo')
      })
    }
    else{
      this.getUserInfo();
    }
    
  }
})