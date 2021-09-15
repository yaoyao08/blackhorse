import getRequest from "../../request/index.js";

// pages/goods_detail/goodS_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: [],
    originData: [],
    isShow: false,
    currentId: 1
  },

  params: {
    goods_id: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.goods_id = parseInt(options.goods_id)
    wx.showLoading();
    this.getGoodsDetail(this.params)
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
  getGoodsDetail(params) {
    getRequest({
      url: '/goods/detail',
      params: params
    }).then(res => {
      console.log(res);
      this.setData({
        originData: res.data.message,
        img: res.data.message.pics.map(item => {
          return {
            pics_id: item.pics_id,
            image_src: item.pics_mid_url
          }
        })
      })
      wx.hideLoading()
    })
  },
  handleView(e) {
    console.log(e);
    this.setData({
      isShow: true,
      currentId: e.currentTarget.dataset.currentid
    })
  },
  handleExite(e) {
    this.setData({
      isShow: false,
    })
  },
  handleLongpress(e) {
    let that = this;
    console.log(e);
    wx.showActionSheet({
      itemList: ['保存到相册'],
      success(res) {
        const url = e.currentTarget.dataset.url;
        wx.getSetting({
          withSubscriptions: '保存图片授权',
          success: (res) => {
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success: () => {
                  // 同意授权
                  that.saveImgInner(url);
                },
                fail: (res) => {
                  console.log(res);
                  wx.showModal({
                    title: '保存失败',
                    content: '请开启访问手机相册权限',
                    success(res) {
                      wx.openSetting()
                    }
                  })
                }
              })
            } else {
              // 已经授权了
              that.saveImgInner(url);
            }
          },
          fail: (res) => {
            console.log(res);
          }
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  // 长按保存功能--保存部分
  saveImgInner(url) {
    wx.getImageInfo({
      src: url,
      success: (res) => {
        let path = res.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success: (res) => {
            console.log(res);
            wx.showToast({
              title: '已保存到相册',
            })
          },
          fail: (res) => {
            console.log(res);
          }
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
})