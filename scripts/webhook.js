const http = require('http')
const crypto = require('crypto')
const exec = require('child_process').exec

function genSig(data) {
  const {secret, chunk} = data
  const hmac = crypto.createHmac('sha1', secret)
      .update(chunk.toString())
      .digest('hex')

    return `sha1=${hmac}`
}

function getData(repo, chunk) {
  const data = {
    secret: process.env[`${repo}_WEBHOOK_SECRET`],
    chunk: chunk
  }

  return {
    sig: genSig(data),
    repo: process.env[`${repo}_REPO_PATH`]
  }
}

const updateRepo = (repo) => exec(`cd ${repo} && git pull`)

function handleWebhook(req, res) {
  req.on('data', (chunk) => {
    let repoName;
    if (req.url === '/fe') {
      repoName = 'FE'
    } else if (req.url === '/be') {
      repoName = 'BE'
    }

    const {sig, repo} = getData(repoName, chunk)

    if (req.headers['x-hub-signature'] === sig) {
      updateRepo(repo)
    }
  })

  res.end()
}

http.createServer(handleWebhook).listen(5000)
