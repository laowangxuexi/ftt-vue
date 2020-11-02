let exec = require('child_process').exec;
exec('npm run start', (err, stdout, stderr) => {
  console.log("error:" + err);
  console.log("stdout:" + stdout);
  console.log("stderr:" + stderr);
})