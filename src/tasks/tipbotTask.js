const { AsyncTask } = require('toad-scheduler')
const { handleTask } = require('./handleTask')
const {tipBotTaskImpl} = require("./tipbotTaskImpl");

let timer

async function task () {
    console.log('Starting Task...')
    await tipBotTaskImpl()
    console.log('Finished Task...')
}

async function onCancelTask () {
  return new Promise(resolve => {
    console.log('cancelling tip bot task...')

    // TODO: cleanup here!

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
