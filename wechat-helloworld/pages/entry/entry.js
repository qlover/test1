// pages/hello/hello-2.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      { url: '/public/img/001.jpg' },
      { url: '/public/img/002.jpg' },
      { url: '/public/img/003.jpg' },
      { url: '/public/img/001.jpg' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断用户授权没有，如果没有则回到授权
    // 获取已经授权的权限
    wx.getSetting({
      success: (res) => {
        // 用户已经授权
        if (!res.authSetting['scope.userInfo']) {
          app.goto('pages/index/index')
        }
      }
    });

    // 更新到页面上
    this.setData({
      userInfo: app.globalData.userInfo
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