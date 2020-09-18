// miniprogram/pages/courtDetail/courtDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courtDetailData: {}
  },

  showMap: function (e) {
    console.log(e)
    var latitude = e.currentTarget.dataset.latitude;
    var longitude = e.currentTarget.dataset.longitude;
    var address = e.currentTarget.dataset.address; 
    var name = e.currentTarget.dataset.name; 
    wx.openLocation({//​使用微信内置地图查看位置。
      latitude,//要去的纬度-地址
      longitude,//要去的经度-地址
      name,
      address
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var courtId = options.id;
    const courtlistdb = wx.cloud.database()
    courtlistdb.collection('courtList').where({
      _id: courtId,    //查询条件
    }).get({
      success: (res) => {
        console.log('查询成功', res.data);
        this.setData({
          courtDetailData: res.data[0]
        })
        console.log(this.data.courtDetailData)
      },
      fail: err => {
        console.log('失败')
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