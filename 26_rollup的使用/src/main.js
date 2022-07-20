
// const { format } = require('./utils/formt.js')
import { format } from './utils/formt.js'
import _ from 'lodash'

const myName = 'hwh'

const getName = (name) => {
  if (!name) return null
  console.log(name);
}

getName(myName)

const operation = (sum1, sum2) => {
  return sum1 + sum2
}

console.log(_.jion(['a', 'b', 'c'], '-'));

console.log(format());

export {
  operation
}