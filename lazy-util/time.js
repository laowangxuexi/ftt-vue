module.exports = function timeFormat(time) {
  if (!time) {
    return ''
  }
  let year, month, day, hour, minute, second;
  year = time.getFullYear()
  month = time.getMonth() + 1
  day = time.getDate()
  hour = time.getHours()
  minute = time.getMinutes()
  second = time.getSeconds()
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}