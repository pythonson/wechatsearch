var inputinfo = ""; 
var app = getApp() 
var nam =""
var desc =""
const db1 = wx.cloud.database().collection('todo')
Page({ 
 data: { 
  animationData:"", 
  showModalStatus:false,
  name:'？',
  description:'？'
 }, 

 //获取新增加的姓名
  addName(event){
    console.log(event)
    nam = event.detail.value
  },
  //获取新增加的描述
  addDesc(event){
    console.log(event)
    desc = event.detail.value
  }, 

  //添加数据
  addData(){

    db1.add({
      data:{
        _id:nam,
        description:desc
      },
      success:function(res){
        console.log("添加数据成功",res)
        wx.showModal({          title: '成功',          content: '您的意见已提交',          showCancel: true
      })
      },fail(res){
        console.log("添加数据失败！",res)
      }
    })
  },
 // 获取要删除的数据名字
  delDataInput(event){
    console.log("要删除的id",event.detail.value)
    nam = event.detail.value
  },
  //编写删除事件
  delData(){
    db1.doc(nam).remove({
      success:function (){
        console.log("删除成功",res)
        wx.showModal({          title: '成功',          content: '您的提交已撤销',          showCancel: true
      })
      },fail(res){
        console.log("删除失败",res)
        wx.showModal({          title: '失败',          content: '您已撤销过了哦',          showCancel: false
      })
      }
    })
  },
  //获取修改id（姓名）
  updateDataInput(event){
    console.log("id",event.detail.value)
    nam = event.detail.value
  },
  //获取新的描述数据
  updateDesc(event){
    console.log("desc",event.detail.value)
    desc = event.detail.value
  },
  updateData(){
    db1.doc(nam).update({
      data:{
        description:desc
      },
      success:function(res){
        wx.showModal({          title: '成功',          content: '修改成功',          showCancel: true
      })
      },fail(res){
        wx.showModal({          title: '失败',          content: '修改失败',          showCancel: false
      })
      }
    })
  },
  onLoad: function () { 
  var that = this
  //  调用login云函数获取openid
  wx.cloud.callFunction({      name: 'login',      data: {},      success: res => {        console.log('[云函数] [login] user openid: ', res.result.openid)
      app.globalData.openid = res.result.openid
      wx.cloud.init({ env: 'minicloud' })
      that.db = wx.cloud.database()
      that.test = that.db.collection('test')
    },      fail: err => {        console.error('[云函数] [login] 调用失败', err)
      wx.navigateTo({          url: '../deployFunctions/deployFunctions',
      })
    }
  })
    
 }, 
 showModal: function () { 
  // 显示遮罩层 
  var animation = wx.createAnimation({ 
   duration: 200, 
   timingFunction: "linear", 
   delay: 0 
  }) 
  this.animation = animation 
  animation.translateY(300).step() 
  this.setData({ 
   animationData: animation.export(), 
   showModalStatus: true,
   name:'？',
   description:'？'

  }) 
  setTimeout(function () { 
   animation.translateY(0).step() 
   this.setData({ 
    animationData: animation.export() 
   }) 
  }.bind(this), 200) 
 }, 
 clickbtn:function(){ 
  if(this.data.showModalStatus){ 
   this.hideModal(); 
  }else{ 
   this.showModal(); 
  } 
 }, 
 hideModal: function () { 
  // 隐藏遮罩层 
  var animation = wx.createAnimation({ 
   duration: 200, 
   timingFunction: "linear", 
   delay: 0 
  }) 
  this.animation = animation 
  animation.translateY(300).step() 
  this.setData({ 
   animationData: animation.export(), 
  }) 
  setTimeout(function () { 
   animation.translateY(0).step() 
   this.setData({ 
    animationData: animation.export(), 
    showModalStatus: false
   }) 
  }.bind(this), 200) 
 }, 
 click_cancel:function(){ 
  console.log("点击取消"); 
   this.hideModal(); 
 }, 
 click_ok:function(){ 



   this.hideModal(); 
 }, 
 input_content:function(e){ 
  console.log(e); 
  inputinfo = e.detail.value; 
  const db = wx.cloud.database()
  console.log(inputinfo)
  var that = this;
  db.collection('author')
  .where({
    "name": inputinfo
  })
  .get({
    success: function(res) {
      console.log(inputinfo)
      // res.data 包含该记录的数据
      console.log(res)
      console.log(1)
      that.setData({          
        name:res.data[0].name,         
        description:res.data[0].description
      })
      console.log(res.data[0])
      console.log(name)
    },
    fail:function(res) {
      wx.showModal({          title: '错误',          content: '没有找到记录',          showCancel: false
      })
    }


  })

 } 
  
})