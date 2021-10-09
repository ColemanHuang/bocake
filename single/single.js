// pages/single/single.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        over: false,
        num: [1, 2, 3, 4, 5, 6],
        total: 0,
        prize: [],
        player: [],
        usernum: 0,
        current: 0,

        /**
         * 页面的初始数据
         */

        modalHidden: true
    },
    gofight: function () {
        var number = [1, 1, 1, 1, 1, 1]
        var count = [0, 0, 0, 0, 0, 0, 0]
        var that = this
        for (var i = 0; i < 6; i++) {
            number[i] = this.randomNum();
            count[number[i]]++;
        }
        // console.log(count)

        this.setData({
            num: number,

            // array:
        })
        var rank = '未中奖'
        var rankNum = '9'
        if (count[4] === 4 && count[1] === 2 || count[4] === 6 || count[1] === 6 ||
            (count[2] === 6 || count[3] === 6 || count[5] === 6 || count[6] === 6) ||
            (count[2] === 6 || count[3] === 6 || count[5] === 6 || count[6] === 6) ||
            count[4] === 5 || (count[1] === 5 || count[2] === 5 || count[3] === 5 ||
                count[5] === 5 || count[6] === 5) || count[4] === 4) {
            rank = '状元'
            rankNum = '0'
        }

        else if (count[1] === 1 && count[2] === 1 && count[3] === 1 &&
            count[4] === 1 && count[5] === 1 && count[6] === 1) {
            rank = '对堂'
            rankNum = '1'
        }
        else if (count[4] === 3) {
            rank = '三红'
            rankNum = '2'
        }
        else if (count[1] === 4 || count[2] === 4 || count[3] === 4 ||
            count[5] === 4 || count[6] === 4) {
            rank = '四进'
            rankNum = '3'
        }
        else if (count[4] === 2) {
            rank = '二举'
            rankNum = '4'
        }
        else if (count[4] === 1) {
            rank = '一秀'
            rankNum = '5'
        }

        if (rankNum >= '0' && rankNum <= '5') {
            // 查询对应奖品数量
            var prize = this.data.prize
            var rest = 0
            for (let i = 0; i < prize.length; i++) {
                if (rankNum === prize[i].rank && prize[i].prizenum > 0) {
                    this.data.prize[i].prizenum -= 1
                    this.data.total -= 1
                    var prizename = this.data.prize[i].prizename
                    wx.cloud.database().collection('record')
                        .add({
                            data: {
                                username: that.data.player[that.data.current].name,
                                prizename: prizename
                            }
                        })
                        .then(res => {
                            console.log('添加获奖信息成功', res)
                        })
                        .catch(err => {
                            console.log('添加获奖信息失败', err)
                        })
                }
            }

        }

        wx.showModal({
            title: '剩余奖品数:' + this.data.total,
            content: rank,
            showCancel: false,//是否显示取消按钮
            confirmText: "确定",//默认是“确定”
            confirmColor: 'skyblue',//确定文字的颜色
            success: function (res) {
                if (res.confirm) {
                    that.setData({
                        current: (that.data.current + 1) % that.data.usernum
                    })
                }
            }
        })

        console.log('奖品剩余总数:', this.data.total)
        if (this.data.total === 0) {
            this.setData({
                over: true
            })
            wx.cloud.database().collection('prize')
                .where({
                    flag: true
                })
                .remove()
                .then(res => {
                    console.log('删除记录成功', res)
                })
                .catch(err => {
                    console.log('删除记录失败', err)
                })
            wx.showToast({
                title: '游戏结束',
                icon: 'none',
                duration: 2000
            })
        }
    },
    gotoIndex: function () {
        wx.navigateBack({
            delta: 2,
        })
    },

    randomNum: function () {
        var num = Math.round(Math.random() * 6);
        if (num === 0)
            return this.randomNum();
        else
            return num;
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.database().collection('player').count()
            .then(res => {
                this.setData({
                    usernum: res.total
                })
                console.log('玩家人数：', this.data.usernum)
            })
            .catch(err => {
                console.log('获取玩家人数失败')
            })
        wx.cloud.database().collection('player').get()
            .then(res => {
                console.log('玩家信息', res.data)
                this.setData({
                    player: res.data
                })
            })
            .catch(err => {
                console.log('获取玩家信息失败', err)
            })
        wx.cloud.database().collection('prize').get()
            .then(res => {
                console.log('奖品信息', res.data)
                this.setData({
                    prize: res.data
                })
                this.countTotal()
            })
            .catch(res => {
                console.log('获取奖品信息失败', err)
            })

    },
    countTotal: function () {
        var total = 0
        var prize = this.data.prize
        for (let i = 0; i < prize.length; i++) {
            total += prize[i].prizenum
        }
        this.setData({
            total: total
        })
        console.log('奖品总数', total)

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
        // this.data.over = false
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
        this.data.over = false
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

    /**
     * 显示弹窗
     */
    buttonTap: function () {
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
    }

},
)