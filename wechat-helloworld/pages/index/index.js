let app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: () => {
    
    // 获取已经授权的权限
    wx.getSetting({
      success: (res) => {
        // 用户已经授权
        if (res.authSetting['scope.userInfo'] ){
          // 直接获取用户信息
          app.goto('/pages/entry/entry', () => {
            wx.getUserInfo({
              success: (res) => {
                app.globalData.userInfo = res.userInfo;
              }
            })
          })
        }else{

        }
      }
    });
    
  },
  onGetUserInfo: e => {
    // 授权之后要跳转到的页面若为 tabBar页面，则不可以用wx.navigateTo和wx.redirecTo，
    // 而应该用 wx.switchTab 或 wx.reLaunch
    //允许
    if (e.detail.userInfo) {
      // 跳转到 entry tabBar 页面
      app.goto('/pages/entry/entry', () => {
        app.globalData.userInfo = e.detail.userInfo
      })
    } 
    //拒绝
    else {

    }
  }
})