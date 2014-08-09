var createContainer = require('./create_container')
  , fs = require('fs')
  , ejs = require('ejs')

module.exports = createSlave

function createSlave(docker, config, done) {
  // TODO read config dockerfile build image, etc
  createContainer({
    create: {
      Image: "keyvanfatehi/strider-docker-slave",
      AttachStdin: true,
      OpenStdin: true,
      Tty: true,
      User: "strider",
      WorkingDir: "/workspace", // you need to volume mount this for persistence
      Cmd:[ "StriderSlave" ] // might need to replace this with something else
    },
    runCommand: function (stdin, command, args) {
      var embed = fs.readFileSync(__dirname+'/embedded.ejs').toString();
      var cmd = ejs.render(embed, {
        workload: JSON.stringify({
          command: command,
          args: args
        })
      })
      console.log(cmd);
      stdin.write(cmd+"\n");
    }
  }, docker, config, done)
}
