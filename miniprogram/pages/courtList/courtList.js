// miniprogram/pages/courtli/courtli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courtlists: []
  },

  getloc: function() {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude: 23.071065,
          longitude: 113.268576,
          scale: 18
        })
      }
     })
  },

  showCourtDetail: function (e) {
    var query = e.currentTarget.dataset['id'];
    console.log(query)
    wx.navigateTo({
      url: '../courtDetail/courtDetail?id='+query
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      var self = this;
      const db = wx.cloud.database();
      const cont = db.collection('courtList');
      db.collection('courtList').get({
        success: (res) => {
          console.log(res.data)
          self.setData({
            courtlists: res.data
          })
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