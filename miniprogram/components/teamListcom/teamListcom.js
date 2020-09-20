// components/authorization/authorization.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    teamData: {
      type: Array
    },
    hasPromise: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDetail: function (e) {
      let item = JSON.stringify( e.currentTarget.dataset.item);
      if (this.data.hasPromise) {
        wx.navigateTo({
          url: '../../pages/promiseDetail/promiseDetail?item='+item
        })
      }
    }
  }
})
