var createContainer = require('./create_container');

module.exports = createSlave

function createSlave(docker, config, done) {
  // TODO read config dockerfile build image, etc
  createContainer({
    create: {
      Image: "keyvanfatehi/strider-docker-slave",
      AttachStdin: true,
      OpenStdin: true,
      Tty: true,
      WorkingDir: "/data",
      Cmd:[ "/bin/bash" ] // might need to replace this with something else
    },
    runCommand: function (stdin, command, args) {
      stdin.write("cat << STRIDERSPAWNJSONEOF | SpawnJSON\n"+JSON.stringify({
        command: command,
        args: args
      })+"\nSTRIDERSPAWNJSONEOF\n");
    }
  }, docker, config, done)
}
