Page({
  data: {
    player: [],
    prize: [],
    list1: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 3 },],
    /**
     * 页面的初始数据
     */

    modalHidden: true

  },

  /**
   * 显示弹窗
   */
  buttonTap: function (e) {
    wx.cloud.database().collection('record')
      .where({
        username: e.currentTarget.dataset.name
      })
      .get()
      .then(res => {
        console.log('玩家获奖记录', res)
        this.setData({
          prize: res.data
        })
      })
      .catch(err=>{
        console.log('查询获奖记录失败', err)
      })
    this.setData({
      modalHidden: false,
    })
  },

  /**
   * 点击取消
   */
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  onLoad() {
    wx.cloud.init({
      env: 'cloud1-9gbvrtba9480139e'
    })
    wx.cloud.database().collection('player').get()
      .then(res => {
        this.setData({
          record: res.data
        })
        console.log('获取记录成功', res.data)
      })
      .catch(err => {
        console.log('获取记录失败', err)
      })
  },

})
