// pages/setuser/setuser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizename: "月饼",
    prizenum: 0,
    usernum: 0,
    username: "玩家",
    array: ['状元', '对堂', '三红', '四进', '二举', '一秀'],
    objectArray: [
      {
        id: 0,
        name: '状元'
      },
      {
        id: 1,
        name: '对堂'
      },
      {
        id: 2,
        name: '三红'
      },
      {
        id: 3,
        name: '四进'
      },
      {
        id: 4,
        name: '二举'
      },
      {
        id: 5,
        name: '一秀'
      }
    ],
    index: 0,
  },
  handleUsername: function () {
    wx.cloud.database().collection('player')
      .add({
        data: {
          name: this.data.username
        }
      })
      .then(res => {
        console.log('添加玩家成功', res.data)
        wx.showToast({
          title: '添加玩家成功'
        })
      })
      .catch(err => {
        console.log('添加玩家失败', err)
      })
    this.setData({
      usernum: this.data.usernum + 1
    })
    console.log('玩家人数', this.data.usenum )
  },
  handlePrize: function () {
    wx.cloud.database().collection('prize')
      .add({
        data: {
          rank: this.data.index,
          prizename: this.data.prizename,
          prizenum: this.data.prizenum * 1,
          flag: true
        }
      })
      .then(res => {
        console.log('添加奖品成功', res)
        wx.showToast({
          title: '添加奖品成功'
        })
      })
      .catch(err => {
        console.log('添加奖品失败', err)
      })
  },

  bindPickerChange: function (e) {
    console.log("index = ", e.detail.value) // test
    this.setData({
      index: e.detail.value
    })
  },
  setusername(e) {
    this.setData({
      username: e.detail.value
    })
  },
  setprizename(e) {
    this.setData({
      prizename: e.detail.value
    })
  },
  setprizenum(e) {
    console.log("prizenum = ", e.detail.value) // test
    this.setData({
      prizenum: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({ // 初始化数据库
      env: 'cloud1-9gbvrtba9480139e'
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

  }
})