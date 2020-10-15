const config = {
 baseUrl: "http://127.0.0.1:9048"
  //baseUrl: "https://www.kura.ren/water"
}
const app = getApp();

function httpAction(url, postData, message,method, success, fail) {
  
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: config.baseUrl + url,
    data: postData,
    method: method, 
    success: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }

    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) {

    },
  })
}


//get
function getAction(url, postData, message, success, fail) {
httpAction(url, postData, message,"get", success, fail);
}

function postAction(url, postData, message, success, fail) {
  httpAction(url, postData, message,"post", success, fail);
}

function putAction(url, postData, message, success, fail) {
  httpAction(url, postData, message,"put", success, fail);
}

function deleteAction(url, postData, message, success, fail) {
  httpAction(url, postData, message,"delete", success, fail);
}


module.exports = {
  getAction: getAction,
  postAction: postAction,
  putAction:putAction,
  deleteAction:deleteAction
}