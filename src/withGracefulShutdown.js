function requestStop (cb) {
  process.emit('stopping-process')
  cb()
}

async function withGracefulShutdown (longRunningExecution, onStopCallback) {
  return new Promise(resolve => {
    // handle windows support (signals not available)
    // <http://pm2.keymetrics.io/docs/usage/signals-clean-restart/#windows-graceful-stop>
    process.on('message', (message) => {
      if (message === 'shutdown') {
        requestStop(onStopCallback)
      }
    })

    // handle graceful restarts
    // support nodemon (SIGUSR2 as well)
    // <https://github.com/remy/nodemon#controlling-shutdown-of-your-script>
    for (const sig of ['SIGTERM', 'SIGHUP', 'SIGINT', 'SIGUSR2']) {
      process.once(sig, async () => {
        requestStop(onStopCallback)
      })
    }

    process.on('process-stopped', () => {
      console.log('Gracefully shut down')
      resolve()
      process.exit(0)
    })

    longRunningExecution()
  })
}
module.exports = {
  withGracefulShutdown
}
