// miniprogram/pages/footballList/footballList.js
const DB = wx.cloud.database();
const teamTable = DB.collection('teamList');
let openId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeTeam: {},
    guest: {},
    togetherData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTogetherData();
  },

  getTogetherData: function () {
    var self = this;
    wx.cloud.callFunction({
      name: "login",
      success(res) {
        openId = res.result.openid
        // 判断数据库中是否已经有数据
        DB.collection('teamList').where({
          openId: openId,
        })
        .get().then(res => {
          console.log('together success',res.data[0].hasPromise);
          let hasPromise = res.data[0].hasPromise;
          let homeData, guestData;
          let dataArray = [];
          if (hasPromise.length > 0) {
            for (let i=0; i<hasPromise.length; i++) {
              let home = hasPromise[i].home;
              let guest = hasPromise[i].guest;
              DB.collection('teamList').where({
                openId: home,
              })
              .get().then(res => {
                console.log('homeData success',res)
                if (res.data.length > 0) {
                  homeData = res.data[0]
                }
              })
              DB.collection('teamList').where({
                openId: guest,
              })
              .get().then(res => {
                console.log('guestData success',res)
                if (res.data.length > 0) {
                  guestData = res.data[0];
                  dataArray = dataArray.push({'home': homeData, 'guest': guestData})
                }
                
              })
            }
            console.log('dataArray',dataArray)
            self.setData({
              togetherData: dataArray
            })
            setTimeout(() => {
              console.log('togetherData',dataArray)
              self.setData({
                togetherData: self.data.togetherData
              })
            },1500)
            
          }
          
        })
      },
      fail(res) {
        console.log('登录失败', res)
      }
    })
  },

  showSuccessDetail: function (e) {
    let item = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../promiseSuccessDetail/promiseSuccessDetail?item='+item
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