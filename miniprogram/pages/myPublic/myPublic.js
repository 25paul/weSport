// miniprogram/pages/myPublic/myPublic.js
const DB = wx.cloud.database();
const courtTable = DB.collection('courtList');
const teamTable = DB.collection('teamList');
let openId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasPublic: false,
    selected: {},
    curSelect: {},
    selectOptions: [],
    date: '',
    curTeam: [],
    teamDbid: ''
  },
  change (e) {
    this.setData({
      selected: { ...e.detail }
    })
    wx.showToast({
      title: `${this.data.selected.id} - ${this.data.selected.name}`,
      icon: 'success',
      duration: 1000
    })
  },
  close () {
    // 关闭select
    this.selectComponent('#select').close()
  },
  selectChange: function (e) {
    var item = e.currentTarget.dataset.item;
    this.setData({
      curSelect:item
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  publicChange: function () {
    if (this.data.date && this.data.curSelect) {
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
                selectCourt: this.data.curSelect,
                selectTime: this.data.date,
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
            fromother: [],
            fromme: []
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    DB.collection('courtList').get({
      success: (res) => {
        console.log(res.data)
        self.setData({
          selectOptions: res.data
        })
      }
    })
    this.getUserTeam();
    if (this.data.curTeam.length === 0) {
      wx.navigateTo({
        url: '../mine/mine'
      })
    }
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
              teamDbid: res.data[0]._id
            })
          } else {
            self.setData({
              curTeam: self.data.curTeam,
            })
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