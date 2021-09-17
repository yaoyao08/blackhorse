import getRequest from "../../request/index.js";
import {
  postRequest
} from "../../request/index";

// pages/goods_detail/goodS_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: [],
    originData: [],
    isShow: false,
    currentId: 1,
    isCollect: false,
    cart: false,
    cartObj: Object
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
    if (this.data.cart) {
      this.setData({
        cart: !this.data.cart,
      });
    }
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
  handleCollect(e) {
    let data;
    if (!wx.getStorageSync('userData')) {
      wx.getUserProfile({
        desc: '购买商品前需登录',
      }).then(res => {
        console.log(res);
        wx.setStorageSync('userInfo', res.userInfo);
        wx.setStorageSync('userData', res);
      })
    } else {
      if (!this.data.isCollect) {
        if (wx.getStorageSync('collection')) {
          data = wx.getStorageSync('collection');
          if (data instanceof Array) {
            console.log(data.indexOf({
              ...this.data.originData
            }));
            if (data.indexOf({
                ...this.data.originData
              }) !== -1) {
              data.push({
                ...this.data.originData
              });
              wx.setStorageSync('collection', data);
            }
          } else {
            if (data.goods_id !== this.data.originData.goods_id) {
              data = [{
                ...data
              }, {
                ...this.data.originData
              }]
            }
            wx.setStorageSync('collection', data)
          }
        } else {
          data = {
            ...this.data.originData
          }
          wx.setStorageSync('collection', data)
        }
        console.log(wx.getStorageSync('collection'));
      }
      this.setData({
        isCollect: !this.data.isCollect
      })
    }
  },
  addinCart(e) {
    let data;
    if (!wx.getStorageSync('userData')) {
      wx.getUserProfile({
        desc: '购买商品前需登录',
      }).then(res => {
        console.log(res);
        wx.setStorageSync('userInfo', res.userInfo);
        wx.setStorageSync('userData', res);
      })
    } else {
      if (this.data.cart) {
        wx.showToast({
          title: '添加成功！',
        });
        //添加到购物车的代码
        //没有后台接口，暂时用本地存储模拟
        if (!this.data.isCollect) {
          if (wx.getStorageSync('carts')) {
            data = wx.getStorageSync('carts');
            if (data instanceof Array) {
              console.log(data.indexOf({
                ...this.data.originData
              }));
              if (data.indexOf({
                  ...this.data.originData
                }) === -1) {
                data.push({
                  ...this.data.originData
                });
                wx.setStorageSync('carts', data);
              }
            } else {
              if (data.goods_id !== this.data.originData.goods_id) {
                data = [{
                  ...data
                }, {
                  ...this.data.originData
                }]
              }
              wx.setStorageSync('carts', data)
            }
          } else {
            data = {
              ...this.data.originData
            }
            wx.setStorageSync('carts', data)
          }
          console.log(wx.getStorageSync('carts'));
        }
      }
      this.setData({
        cart: !this.data.cart,
        cartObj: {
          ...this.data.originData,
          num: 1
        }
      });
    }
  },
  handlePreview(e) {
    wx.previewMedia({
      sources: [{
        url: this.data.cartObj.goods_big_logo,
        type: 'image'
      }],
      showmenu: true
    })
  },
  cartNum_add() {
    this.setData({
      cartObj: {
        ...this.data.cartObj,
        num: this.data.cartObj.num + 1
      }
    })
  },

  cartNum_sub() {
    if (this.data.cartObj.num > 1) {
      this.setData({
        cartObj: {
          ...this.data.cartObj,
          num: this.data.cartObj.num - 1
        }
      })
    } else {
      wx.showToast({
        title: '数量不能小于1！',
      })
    }
  },
  currrentY: 0,
  touchStart(e) {
    this.currrentY = e.touches[0].clientY;
  },
  touchMove(e) {
    if (e.touches[0].clientY - this.currrentY >= 10) {
      this.clientY = e.touches[0].clientY;
      this.setData({
        cart: false
      })
    } else if (e.touches[0].clientY - this.currrentY < 0) {
      this.clientY = e.touches[0].clientY;
      this.setData({
        cart: true
      })
    }
  },
  toCart(e) {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  handleBuy(e) {
    let data ={};
    if (wx.getStorageSync('userData')) {
      data = wx.getStorageSync('userData');
      this.buy(data)
    } else {
      wx.getUserProfile({
        desc: '购买商品前需登录',
      }).then(res => {
        console.log(res);
        wx.setStorageSync('userInfo', res.userInfo);
        wx.setStorageSync('userData', res);
        data = wx.getStorageSync('userData');
        this.buy(data)
      })
    }
  },
  buy(data){
    wx.login({
      timeout: 500,
    }).then(res => {
      wx.setStorageSync('code', res.code)
    }).then(() => {
      console.log(typeof data.rawData);
      postRequest({
        url: '/users/wxlogin',
        params: {
          encryptedData: data.encryptedData,
          rawData: data.rawData,
          iv: data.iv,
          signature: data.signature,
          code: wx.getStorageSync('code'),
        }
      }).then(res => {
        console.log(res);
      })
    })
  }
})