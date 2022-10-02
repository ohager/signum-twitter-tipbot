async function start() {
  console.log('Started')
  return Promise.resolve()
}

(async () => {
  await start()
})()
