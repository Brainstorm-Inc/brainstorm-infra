#!/usr/bin/env node

const http = require('http')
const crypto = require('crypto')
const exec = require('child_process').exec

const secret = process.env.BE_WEBHOOK_SECRET
const repo = process.env.BE_REPO_PATH

function handleWebhook(req, res) {
  req.on('data', (chunk) => {

    const hmac = crypto.createHmac('sha1', secret)
      .update(chunk.toString())
      .digest('hex')

    const sig = `sha1=${hmac}`

    if (req.headers['x-hub-signature'] === sig) {
      exec(`cd ${repo} && git pull`)
      exec('"$(pwd)"/build_backend_docker.sh')
    }
  })

  res.end()
}

http.createServer(handleWebhook).listen(5000)



