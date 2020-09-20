// miniprogram/pages/footballList/footballList.js
const DB = wx.cloud.database();
const teamTable = DB.collection('teamList');
let openId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    wx.cloud.callFunction({
      name: "login",
      success(res) {
        openId = res.result.openid
        // 判断数据库中是否已经有数据
        DB.collection('teamList').where({
          openId: openId,
        })
        .get().then(res => {
          console.log('ressressressressressressressress',res.data[0].fromme)
          if (res.data.length > 0) {
            self.setData({
              teamData: res.data[0].fromme
            })
          } else {
            // self.setData({
            //   curTeam: self.data.curTeam,
            //   hasTeam: false
            // })
          }
          
        })
      },
      fail(res) {
        console.log('登录失败', res)
      }
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