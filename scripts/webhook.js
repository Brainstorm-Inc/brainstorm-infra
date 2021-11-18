#!/usr/bin/env node

const http = require('http')
const crypto = require('crypto')
const exec = require('child_process').exec

const beSecret = process.env.BE_WEBHOOK_SECRET
const beRepo = process.env.BE_REPO_PATH

const feSecret = process.env.FE_WEBHOOK_SECRET
const feRepo = process.env.FE_REPO_PATH

function handleWebhook(secret, repo) {
	return (req, res) => {
	req.on('data', (chunk) => {

    		const hmac = crypto.createHmac('sha1', secret)
      			.update(chunk.toString())
      			.digest('hex')

    		const sig = `sha1=${hmac}`

    		if (req.headers['x-hub-signature'] === sig) {
			console.log("connected");
      			// exec(`cd ${repo} && git pull`)
      			//exec('"$(pwd)"/build_backend_docker.sh')
    		}
  	})

  	res.end()
	}
		
	}
  
http.createServer(handleWebhook(beSecret,beRepo)).listen(5000)
http.createServer(handleWebhook(feSecret,feRepo)).listen(5001)


