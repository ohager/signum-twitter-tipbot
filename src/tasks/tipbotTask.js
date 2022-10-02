const { AsyncTask } = require('toad-scheduler')

function taskHandler ({ scheduler, jobId }) {
  return async function () {
    return new Promise(resolve => {
      // stopping scheduler to avoid execution runtime overlaps
      scheduler.stopById(jobId)
      console.log('Running Task...')
      setTimeout(() => {
        scheduler.startById(jobId)
        console.log('Finishing Task...')
        resolve()
      }, 10_000)
    })
  }
}

async function taskErrorHandler (err) {
  console.error('Some error occurred', err)
  return Promise.resolve()
}

module.exports = (scheduler) => new AsyncTask(
  'tip-bot-task',
  taskHandler(scheduler),
  taskErrorHandler
)
