// miniprogram/pages/myTeam/myTeam.js
const DB = wx.cloud.database();
const teamTable = DB.collection('teamList');
let openId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasTeam: false,
    lists: [],
    curTeam: {
      'name': null,
      'leader': null,
      'type': 'b',
      'lists': []
    },
    hasWork: false,
    teamDbid: ''
  },

  addTeam: function () {
    this.setData({
      hasTeam: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserTeam();
  },

  getUserTeam: function () {
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
          console.log('ressressressressressressressress',res)
          if (res.data.length > 0) {
            self.setData({
              curTeam: res.data[0],
              hasTeam: true,
              teamDbid: res.data[0]._id
            })
          } else {
            self.setData({
              curTeam: self.data.curTeam,
              hasTeam: false
            })
          }
          
        })
      },
      fail(res) {
        console.log('登录失败', res)
      }
    })
 
  },

  addPlayer: function () {
    var lists = this.data.curTeam.lists;
    var newLists = lists.push({})
    var newTeam = this.data.curTeam;
    this.setData({
      curTeam: newTeam
    })
    console.log(this.data.curTeam)
  },

  reducePlayer: function () {
    var lists = this.data.curTeam.lists;
    var newLists = lists.pop()
    var newTeam = this.data.curTeam;
    this.setData({
      curTeam: newTeam
    })
  },

  onTeamname: function (e) {
    this.setData({
      'curTeam.name': e.detail.value
    })
  },

  onLeadername: function (e) {console.log(e)
    this.setData({
      'curTeam.leader': e.detail.value
    })
  },

  onLeadername: function (e) {
    this.setData({
      'curTeam.leader': e.detail.value
    })
  },

  onPlayername: function (e) {
    var index = e.currentTarget.id;
    this.data.curTeam.lists[index].name = e.detail.value;
  },
  onPlayerheight: function (e) {
    var index = e.currentTarget.id;
    this.data.curTeam.lists[index].height = e.detail.value;
  },
  onPlayerweight: function (e) {
    var index = e.currentTarget.id;
    this.data.curTeam.lists[index].weight = e.detail.value;
  },
  onPlayerage: function (e) {
    var index = e.currentTarget.id;
    this.data.curTeam.lists[index].age = e.detail.value;
  },

  radiochange: function (e) {
    console.log(e.detail.value)
    this.data.curTeam.type = e.detail.value;
  },

  teamSave: function (e) {
    var self = this;
    if (!this.data.curTeam.name) {
      wx.showToast({
        title: '请输入球队名',
        duration: 2000
      })
    }
    if (!this.data.curTeam.leader) {
      wx.showToast({
        title: '请输入队长姓名',
        duration: 2000
      })
    }
    var teamId = this.data.teamDbid;
    console.log(teamId)
    if (teamId) {
      teamTable.doc(teamId).remove({
        success: res => {
          console.log(res)
          teamTable.add({
            data: {
              //需要添加的数据
              openId,  
              name: this.data.curTeam.name,
              leader: this.data.curTeam.leader,  
              type: this.data.curTeam.type,  
              lists: this.data.curTeam.lists,  
              fromother: [],
              fromme: []
            },
            //添加成功的回调函数
            success(res) {
              console.log(res._id)
              var id = res._id;
              self.setData({
                hasWork: true,
                teamDbid: id
              })
            }
          });
        }
      })    
    } else {
      teamTable.add({
        data: {
          //需要添加的数据
          openId,  
          name: this.data.curTeam.name,
          leader: this.data.curTeam.leader,  
          type: this.data.curTeam.type, 
          lists: this.data.curTeam.lists,  
        },
        //添加成功的回调函数
        success(res) {
          console.log(res)
          self.setData({
            hasWork: true,
            teamDbid: res._id
          })
        }
      });
    }
  },

  teamEdit: function () {
    this.setData({
      hasWork: true
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