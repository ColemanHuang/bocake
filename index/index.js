//Page Object
Page({
  data: {
   /**
     * 页面的初始数据
     */
  
    modalHidden: true
  },
    /**
     * 显示弹窗
     */
    buttonTap: function() {
      this.setData({
        modalHidden: false,
      
      })
    },
  
    /**
     * 点击取消
     */
    modalCandel: function() {
      // do something
      this.setData({
        modalHidden: true
      })
    },
  
    /**
     *  点击确认
     */
    modalConfirm: function() {
      // do something
      this.setData({
        modalHidden: true
      })
    }



})