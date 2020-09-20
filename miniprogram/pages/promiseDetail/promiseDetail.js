// miniprogram/pages/promiseDetail/promiseDetail.js
const DB = wx.cloud.database();
const teamTable = DB.collection('teamList');
let myopenId;
const _ = DB.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamItem: {},
    prevRoute: '',
    itemHome: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "login",
      success(res) {
        myopenId = res.result.openid
      }
    })
    var self = this;
    wx.cloud.callFunction({
      name: "login",
      success(res) {
        myopenId = res.result.openid
        // 判断数据库中是否已经有数据
        DB.collection('teamList').where({
          openId: myopenId,
        })
        .get().then(res => {
          console.log('itemHome',res)
          if (res.data.length > 0) {
            self.setData({
              itemHome: res.data[0],
            })
          } else {
          }
          
        })
      },
      fail(res) {
        console.log('登录失败', res)
      }
    })
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    let prevRoute = prevpage.route;
    this.setData({
      prevRoute
    })
    console.log('page', pages)
    let item = JSON.parse(options.item);
    let openId = item.openId;
    console.log('item', item)
    DB.collection('teamList').where({
      openId: openId,
    })
    .get().then(res => {
      console.log('teamItem',res)
      if (res.data.length > 0) {
        self.setData({
          teamItem: res.data[0],
        })
      } else {
      }
      
    })
  },

  fromotherselect: function (e) {

    let self = this;
    let fromme = this.data.teamItem.fromme;
    fromme = fromme.filter((item, index) => {
      return item.openId === myopenId;
    })
    let hasPromiseguest = this.data.teamItem.hasPromise || [];
    let hasPromisehome = this.data.itemHome.hasPromise || [];
    let guestOpenid = this.data.teamItem.openId;
    let homeOpenid = this.data.itemHome.openId;
    let homeId = this.data.teamItem._id;
    let guestId = this.data.itemHome._id
    hasPromiseguest.push({'home': homeOpenid, 'guest': guestOpenid});
    hasPromisehome.push({'home': homeOpenid, 'guest': guestOpenid});
    teamTable.doc(guestId).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        hasPromise: hasPromiseguest
      }
    })
    .then(console.log)
    .catch(console.error);
    teamTable.doc(homeId).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        hasPromise: hasPromisehome
      }
    })
    .then(console.log)
    .catch(console.error)
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