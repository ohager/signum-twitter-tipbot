function handleTask ({ scheduler, jobId }, asyncTask, asyncTaskOnCancelCallback) {
  return async function () {
    scheduler.stopById(jobId)
    console.log('Running Task...', jobId)
    process.once('stopping-process', () => {
      asyncTaskOnCancelCallback().then(() => {
        process.emit('process-stopped')
      })
    })
    await asyncTask()
    console.log('Finishing Task...', jobId)
    scheduler.startById(jobId)
  }
}

module.exports = {
  handleTask
}
