// pages/single/single.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num:[1, 2, 3, 4, 5, 6],
        rank:[],
        current:0,
        tx:0,
        name:['12345678', '林冠禧', '刘鑚熙', '周斌', '胡惇羽'],
        playerNum:5
    },


    gofight:function(){
        var that = this
        var number = [1,1,1,1,1,1]
        var count = [0,0,0,0,0,0,0]
        
        for (var i = 0; i < 6; i++) {
            number[i] = this.randomNum();
            count[number[i]]++;
        }
        console.log(count)
        this.setData({
            num:number,
            // array:
        })
        var rank = '未中奖'
        if (count[4] === 4 && count[1] === 2)
            rank = '状元';
        else if (count[4] === 6)
            rank = '状元';
        else if (count[1] === 6)
            rank = '状元';
        else if(count[2] === 6 || count[3] === 6 ||
                count[5] === 6 || count[6] === 6)
            rank = '状元';
        else if (count[4] === 5)
            rank = '状元';
        else if(count[1] === 5 || count[2] === 5 || count[3] === 5 ||
                count[5] === 5 || count[6] === 5)
            rank = '状元';
        else if (count[4] === 4)
            rank = '状元';
        else if(count[1] === 1 && count[2] ===1 && count[3] === 1 &&
                count[4] === 1 && count[5] === 1 && count[6] === 1)
            rank = '对堂';
        else if (count[4] === 3) 
            rank = '三红';
        else if(count[1] === 4 || count[2] === 4 || count[3] === 4 ||
                count[5] === 4 || count[6] === 4)
            rank = '四进';
        else if (count[4] === 2)
            rank = '二举';
        else if (count[4] === 1)
            rank = '一秀';
        // wx.showToast({
        //     title: rank,
        //     icon: 'none',
        //     duration: 1500,
        //     // image:'/images/tx2.jpg',
        //     // mask:false
        //   })
        var tx = (this.data.tx + 1) % this.data.playerNum
        var name = ''
        wx.showModal({
            title: '获奖等级',
            content: rank,
            showCancel: false,//是否显示取消按钮
            // cancelText:"确定",//默认是“取消”
            // cancelColor:'skyblue',//取消文字的颜色
            confirmText:"确定",//默认是“确定”
            confirmColor: 'skyblue',//确定文字的颜色
            success: function (res) {
                if (res.confirm) {
                   that.setData({
                       tx:tx
                   })
                }
             }
        })
    },


    randomNum:function(){
        var num = Math.round(Math.random()*6); 
        if (num === 0) 
            return this.randomNum();
        else 
            return num;
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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