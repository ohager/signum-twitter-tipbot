const { AsyncTask } = require('toad-scheduler')
const { handleTask } = require('./handleTask')

let timer

async function task () {
  return new Promise((resolve) => {
    console.log('tip bot task started')
    // TODO: implementation
    timer = setTimeout(() => {
      console.log('tip bot task stopped')
      resolve()
    }, 2_000)
  })
}

async function onCancelTask () {
  return new Promise(resolve => {
    console.log('cancelling tip bot task...')
    clearTimeout(timer)
    setTimeout(() => {
      resolve()
    }, 2_000)
  })
}

async function taskErrorHandler (err) {
  console.error('Some error occurred', err)
  return Promise.resolve()
}

module.exports = (args) => new AsyncTask(
  'tip-bot-task',
  handleTask(args, task, onCancelTask),
  taskErrorHandler
)
