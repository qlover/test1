//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
   
  },
  globalData: {
    hasLogin: false,
    openid: null,
    userInfo: null,
    authorizes: {}
  },
  // lazy loading openid
  getUserOpenId(callback) {
    const self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success(data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success(res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  },

  // scopeType 授权类型
  // 
  validateAuthorize: (scopeType, callback) => {
    var _this = this;
    wx.getSetting({
      success: result => {
        if (result.authSetting['scope.' + scopeType]) {
          _this.globalData.authType[scopeType] = true;
          callback();
        } else {
          wx.authorize({
            scope: 'scope.' + scopeType,
            success(res) {
              _this.globalData.authType[scopeType] = true;
              callback();
            },
            fail() {
              wx.showModal({
                title: '提示',
                content: '请允许授权以便为你提供更好的服务',
                showCancel: false,
                success: function () {
                  wx.openSetting({
                    success: (res) => {
                      if (res.authSetting['scope.' + scopeType]) {
                        _this.globalData.authType[scopeType] = true;
                        callback();
                      } else {
                        _this.globalData.authType[scopeType] = false;
                        _this.validateAuthorize(scopeType, callback);
                      }
                    },
                    fail() {
                      _this.globalData.authType[scopeType] = false;
                      _this.validateAuthorize(scopeType, callback);
                    }
                  });
                }
              })
            }
          });
        }
      }
    })

  },


  // 得到所有已经授权的权限
  getAlreadyAuthizes: () => {
    let result ={};

    return result;
  },

  // 跳转方法
  goto: (url = '/pages/entry/entry', success) => {
    wx.reLaunch({
      url,
      success
    })
  }




})