// components/searchButton.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    focus:false
  },
  onpageshow:{

  },
  /**
   * 组件的方法列表
   */
  methods: {
    toSearch(){
      wx.navigateTo({
        url: '/pages/search/search',
        success: (result) => {
          console.log('跳转成功');
        },
        fail: (err) => {
          console.log(err);
        },
        complete: () => {}
      });   
    },
  
  }
})
