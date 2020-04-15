const dev = require('./dev.env')
const prod = require('./prod.env')

const NODE_ENV = process.env.NODE_ENV || 'dev'
const isProduction = NODE_ENV === 'production'
const sessionName = isProduction ? 'list' : `list-${NODE_ENV}`

module.exports = {
  env: isProduction ? prod : dev,

  session: {
    name: sessionName,
    keys: isProduction ? [
      'xcdsfdzc evdvefger5t6xccxvNOB::b ylibvlIV fefe',
      'sdcsmLNO:(u870N(*Hb6v&VLMLP(/mnb*BPVOVU^vc7ocsxslmsds',
    ] : [''],
  },
}
