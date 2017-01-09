// home.js

var utils = require('../../utils/util.js')

Page({
    data:{
        reqAK: "2NzbC3tqAWi9eK92CAHqdOlYNDcVpWFO",
        date: utils.formatHeaderTime(new Date()),
        currCity: "杭州",
        currTemperature: "14°",
        currWeatherIconUrl: "../../image/star.png",
        currWeatherStatus: "有雨",
        currTempRange: "9°/ 17°",
        currWeatherDesc: ""
    },

    changeCity: function() {
        wx.navigateTo({
          url: '../city/changeCity'
        })
    },

    onLoad: function() {
        console.log('load home')
        loadCurrLocation();
    },

    loadCurrLocation: function() {
        var that = this;
        console.log('start request');
        wx.getLocation({
          type: 'gcjo2', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
          success: function(res){
              console.log('success');
            // success
            var latitude = res.latitude;
            var longitude = res.longitude;
            var reqAK = that.data.reqAK;
            that.loadCity(latitude, longitude, reqAK, that.loadWeather);
          },
          fail: function() {
              console.log('fail');
            // fail
          },
          complete: function() {
              console.log('complete');
            // complete
          }
        });
    },

    loadCity: function(latitude, longitude, reqAK, callback) {
        var that = this;
        var url = 'http://api.map.baidu.com/geocoder/v2/?location=' + latitude + ',' + longitude + '&output=json&ak=' + reqAK;
        wx.request({
          url: url,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {'content-type':'application/json'}, // 设置请求的 header
          success: function(res){
            // success
            var city = res.data.result.addressComponent.city;
            that.setData(
                {currCity: city}
            );
            callback && callback(city, reqAK);
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },

    loadWeather: function(city, reqAK) {
        var that = this;
        var url = 'http://api.map.baidu.com/telematics/v3/weather?location=' + city + '&output=json&ak=' + reqAK;
        wx.request({
          url: url,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {'content-type': 'application/json'}, // 设置请求的 header
          success: function(res){
            // success
            var desNum = that.random(5);
            var future = res.data.results[0].weather_data.filter(function(ele, index){
                return index > 0;
            });
            that.setData({
                currTemperature: res.data.result[0].weather_data[0].temperature,
                currWeatherStatus: res.data.results[0].weather_data[0].weather + ' ' + res.data.result[0].weather_data[0].wind,
                currWeatherDesc: res.data.result[0].index[desNum].des
            });
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },

    random: function(max, min) {
        var min = min || 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
    },


    // onShareAppMessage: function () {
    //     return {
    //         title: '自定义分享标题',
    //         desc: '自定义分享描述',
    //         path: '/page/user?id=123'
    //     }
    // }
})