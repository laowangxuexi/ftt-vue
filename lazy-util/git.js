// import { timeFormat } from "./time"
// import { iSay } from './say'
const timeFormat = require('./time')
const iSay = require('./say').iSay
const exec = require('child_process').exec

let current = timeFormat(new Date())
const FUCK_WARING = 'warning: LF will be repla'
const FUCK_FALSE = 'Error: Command faile'

let git = ` git add . && git commit -m "提交时间: ${current} -- ${iSay}" && git push `

exec(git, (err, stdout, stderr) => {
  console.log('err-----', err)
  console.log('stdout------', stdout)
  console.log('stderr------', stderr)

  if (stderr == FUCK_WARING || err == FUCK_FALSE) {
  exec('git push', (err, stdout, stderr) => {
    console.log('err-----', err)
    console.log('stdout------', stdout)
    console.log('stderr------', stderr)

  })
}
})


