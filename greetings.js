const getFlagValue = require('./flags')

console.log(` ${getFlagValue('--greeting')} ${getFlagValue('--name')}!!`)