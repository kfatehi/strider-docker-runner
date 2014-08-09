var createContainer = require('./create_container')
  , embed = require('fs').readFileSync(__dirname+'/embedded.ejs').toString()
  , ejs = require('ejs')

module.exports = createSlave

function createSlave(docker, config, done) {
  // TODO read config dockerfile build image, etc
  createContainer({
    create: {
      name: "test",
      Image: "keyvanfatehi/strider-docker-slave",
      AttachStdin: true,
      OpenStdin: true,
      Tty: true,
      WorkingDir: "/data",
      Cmd:[ "node", "-e" ] // might need to replace this with something else
    },
    runCommand: function (stdin, command, args) {
      stdin.write(ejs.render(embed, {
        workload: JSON.stringify({
          command: command,
          args: args
        })
      }))
    }
  }, docker, config, done)
}
