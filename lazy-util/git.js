// import { timeFormat } from "./time"
// import { iSay } from './say'
const timeFormat = require('./time')
const iSay = require('./say').iSay
const exec = require('child_process').exec

let current = timeFormat(new Date())

let git = ` git add . && git commit -m "提交时间: ${current} -- ${iSay}" && git push `

exec(git, (err, stdout, stderr) => {
  console.log('err', err)
  console.log('stdout', stdout)
  console.log('stderr', stderr)
})


