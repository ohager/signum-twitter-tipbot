const {ToadScheduler, SimpleIntervalJob} = require('toad-scheduler')
const tipBotTask = require('./tasks/tipbotTask')
const {withGracefulShutdown} = require("./withGracefulShutdown");

const TipBotJobId = 'tipBotJob';

(() => {
  const scheduler = new ToadScheduler()
  return withGracefulShutdown(() => {
    const job = new SimpleIntervalJob(
      {
        seconds: process.env.SCHEDULER_JOB_INTERVAL_SECS || 5,
        runImmediately: false
      },
      tipBotTask({scheduler, jobId: TipBotJobId}),
      TipBotJobId
    )
    scheduler.addSimpleIntervalJob(job)
  }, () => {
    scheduler.stop()
  })
})()
