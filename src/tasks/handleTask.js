function handleTask ({ scheduler, jobId }, asyncTask, asyncTaskOnCancelCallback) {
  function cancelTask(){
    asyncTaskOnCancelCallback().then(() => {
      process.emit('process-stopped')
    })
  }

  return async function () {
    scheduler.stopById(jobId)
    console.log('Running Task...', jobId)
    process.once('stopping-process', cancelTask )
    await asyncTask()
    process.off('stopping-process', cancelTask)
    console.log('Finishing Task...', jobId)
    scheduler.startById(jobId)
  }
}

module.exports = {
  handleTask
}
