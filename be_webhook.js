#!/usr/bin/env node

const http = require('http')
const crypto = require('crypto')
const exec = require('child_process').exec

const secret = process.env.BE_WEBHOOK_SECRET
const repo = process.env.BE_REPO_PATH
console.log(secret)
console.log(repo)

function handleWebhook(req, res) {
  req.on('data', (chunk) => {

    const hmac = crypto.createHmac('sha1', secret)
      .update(chunk.toString())
      .digest('hex')

    const sig = `sha1=${hmac}`

    if (req.headers['x-hub-signature'] === sig) {
      console.log("request arrived")
      exec(`cd ${repo} && git pull`)
    }
  })

  res.end()
}

http.createServer(handleWebhook).listen(5000)



