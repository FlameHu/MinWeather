function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatHeaderTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var whatDay = getWhatDay(date.getDay())

  return [year, month, day].map(formatNumber).join('-')
      + ' ' + whatDay
}

function getWhatDay(day) {
  switch(day){
    case 0: return '星期日';
    case 1: return '星期一';
    case 2: return '星期二';
    case 3: return '星期三';
    case 4: return '星期四';
    case 5: return '星期五';
    case 6: return '星期六';
    default : return day;
  }
}

module.exports = {
  formatTime: formatTime,
  formatHeaderTime: formatHeaderTime
}
