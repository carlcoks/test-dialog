const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const get = require('lodash/get')

const setServerInfo = require('./app/routes/setServerInfo')
const setVueContext = require('./app/routes/setVueContext')
const createRenderer = require('./app/render/createRenderer')

const resolve = file => path.resolve(__dirname, file)

const config = require('./config/common')
const isProduction = process.env.NODE_ENV === 'production';

const app = express()
app.disable('x-powered-by')

let renderer
let readyPromise
let googleTagManager = ''
const templatePath = resolve('./src/index.template.html')
const googleTagManagerPath = resolve('./src/assets/googletagmanager.html')

if (isProduction) {
  const template = fs.readFileSync(templatePath, 'utf-8')
  googleTagManager = fs.readFileSync(googleTagManagerPath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest,
  })
} else {
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    },
  )
}
const serve = (pathLocal, cache) => express.static(resolve(pathLocal), {
  maxAge: cache && isProduction ? 1000 * 60 * 60 * 24 * 30 : 0,
})

app.use(compression({ threshold: 0 }))
app.use(favicon('./public/favicon.ico'))
app.use('/dist', serve('./dist', false))
app.use('/img', serve('./static/img', true))

function handleError(err, req, res) {
  if (err.url) {
    res.redirect(err.url)
  } else if (err.code === 404) {
    res.status(404).send('404 | Page Not Found')
  } else {
    res.status(500).send('500 | Internal Server Error')
    console.error(`error during render : ${req.url}`)
    console.error(err.stack)
  }
}

function render(req, res) {
  const s = Date.now()
  const { context } = res.locals

  res.setHeader('Content-Type', 'text/html')
  context.googleManager = googleTagManager

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err, req, res)
    }

    const code = get(context, 'state.errorResponse.code', 200)
    res.status(code).send(html)

    if (!isProduction) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

app.get('*', setServerInfo, setVueContext, isProduction ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || config.port

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
