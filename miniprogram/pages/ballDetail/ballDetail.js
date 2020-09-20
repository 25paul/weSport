// miniprogram/pages/ballDetail/ballDetail.js
const DB = wx.cloud.database();
const teamTable = DB.collection('teamList');
let openId;
const _ = DB.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curTeamitem: {},
    myTeam: {},
    myTeamId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    console.log(options.item)
    var item = JSON.parse(options.item);
    this.setData({
      curTeamitem: item
    })
    wx.cloud.callFunction({
      name: "login",
      success(res) {
        openId = res.result.openid
        // 判断数据库中是否已经有数据
        DB.collection('teamList').where({
          openId: openId,
        })
        .get().then(res => {
          console.log('ressressressressressressressress',res)
          if (res.data.length > 0) {
            self.setData({
              myTeam: res.data[0],
              myTeamId: res.data[0]._id
            })
          } else {
            self.setData({
              myTeam: self.data.myTeam,
            })
          }
          
        })
      },
      fail(res) {
        console.log('登录失败', res)
      }
    })
 
  },

  reverseTeam: function (e) {
    let self = this;
    let curSelectItem = this.data.curTeamitem;
    let curMyItem = this.data.myTeam;
    // let _obj = JSON.stringify(curSelectItem.fromother);
    // let other = JSON.parse(_obj) || [];    //所选的就是被预约的，这个所选的就是主队
    // let _obj2 = JSON.stringify(curMyItem.fromme);
    // let me = JSON.parse(_obj2) || [];   //来自我的预约的，我是客队
    let other = curSelectItem.fromother || [];    //所选的就是被预约的，这个所选的就是主队
    let me = curMyItem.fromme || [];   //来自我的预约的，我是客队
    me.push({'name': curSelectItem.name, '_id': curSelectItem._id, 'openId': curSelectItem.openId, 'type': curSelectItem.type})
    other.push({'name': curMyItem.name, '_id': curMyItem._id, 'openId':curMyItem.openId, 'type': curMyItem.type})
    curMyItem.fromme = this.moveRepeat(me);    //我预约其他发布的用户的
    curSelectItem.fromother = this.moveRepeat(other);    //其他发布的收到我的预约
    this.setData({
      curTeamitem: curSelectItem,
      myTeam: curMyItem
    })
    console.log(this.data.curTeamitem._id)
    let aaaa = JSON.parse(JSON.stringify(other))
    let curid = this.data.curTeamitem._id;
    let myid = this.data.myTeam._id;
    let fromotherVal = this.data.curTeamitem.fromother;
    let frommeVal = this.data.myTeam.fromme;
    
    teamTable.doc(curid).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        fromother: fromotherVal
      }
    })
    .then(console.log)
    .catch(console.error)

     teamTable.doc(myid).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        fromme: frommeVal
      }
    })
    .then(console.log)
    .catch(console.error)
  },

  moveRepeat: function (array){
    var result = []; //去重后的数组对象集合
    var hash = {};
    for (var i = 0; i < array.length; i++) {
      var elem = array[i].openId;
      if (!hash[elem]) {
        result.push(array[i]);
        hash[elem] = true;
      }
    }
    return result;
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