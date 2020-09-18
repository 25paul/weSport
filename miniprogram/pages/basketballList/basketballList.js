// miniprogram/pages/basketballList/basketballList.js
const DB = wx.cloud.database();
const teamTable = DB.collection('teamList');
let openId;
const _ = DB.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamData: [],
    ballType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    this.setData({
      ballType: type
    })
    var self = this;
    var type = type;
    DB.collection('teamList').where({
      type: type,
    })
    .get().then(res => {
      console.log('ressressressressressressressress',res)
      var lists = res.data;
      var teamData = lists.filter((item, index) => {
        return item.selectCourt;
      })
      self.setData({
        teamData: teamData
      })
      console.log(this.data.teamData);
      // if (res.data.length > 0) {
      //   self.setData({
      //     curTeam: res.data[0],
      //     hasTeam: true,
      //     teamDbid: res.data[0]._id
      //   })
      // } else {
      //   self.setData({
      //     curTeam: self.data.curTeam,
      //     hasTeam: false
      //   })
      // }
      
    })
  },

  showDetail: function (e) {
    var item = JSON.stringify(e.currentTarget.dataset.item);
    console.log(item)

    wx.navigateTo({
      url: '../ballDetail/ballDetail?item='+item
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