// pages/single/single.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num:[1, 1, 1, 1, 1, 1]
    },
    gofight:function(){
        var number = [1,1,1,1,1,1]
        for (var i = 0; i < 6; i+=1) {
            number[i] = this.randomNum();
        }
        this.setData({
            num:number
        })
    },
    randomNum:function(){
        // var minNum = 1;
        // var maxNum = 6; 
        // switch(arguments.length){ 
        //     case 1: 
        //         return parseInt(Math.random()*minNum+1,10); 
        //     break; 
        //     case 2: 
        //         return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        //     break; 
        //         default: 
        //             return 2; 
        //         break; 
        // }
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