// components/authorization/authorization.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curTeamitem: {
      type: Object
    },
    hasPromise: {
      type: Boolean
    },
    prevRoute: {
      type: String
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
    reverseTeam: function (e) {

    },
    accept: function (e) {
      var curselectitem = e.currentTarget.dataset.item;
      console.log('curselectitem', curselectitem)
      this.triggerEvent('fromotherselect', curselectitem, '111111')
    },
    reject: function (e) {

    }
  }
})
