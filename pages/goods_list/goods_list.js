import getRequest from "../../request/index.js";

// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isEnd: false
  },
  queryparams: {
    cid: 0,
    pagenum: 1,
    pagesize: 10
  },
  query:'',
  total: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    if (options.cid) {
      this.queryparams.cid = options.cid;
      this.getGoods(this.queryparams)
    }
    else if(options.query){
      this.query=options.query;
      this.getGoodsByQuery(this.query)
    }
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
    this.setData({
      goods: []
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.queryparams.cid = 1;
    this.setData({
      goods: []
    });
    this.getGoods(this.queryparams);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (++this.queryparams.pagenum <= this.total) {
      this.getGoods(this.queryparams);
    } else {
      this.queryparams.pagenum--;
      this.setData({
        isEnd: true
      });
      setTimeout(() => {
        this.setData({
          isEnd: false
        })
      }, 1500);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getGoods(params) {
    getRequest({
      url: '/goods/search',
      params: params
    }).then(res => {
      this.total = Math.ceil(res.data.message.total / this.queryparams.pagesize)
      this.setData({
        goods: [...this.data.goods, ...res.data.message.goods]
      })
    }).then(() => {
      wx.hideLoading();
    })
  },
  getGoodsByQuery(query){
    getRequest({
      url: '/goods/qsearch',
      params: {
        query,
      }
    }).then(res=>{
      this.setData({
        goods: res.data.message
      })
    })
  }
})