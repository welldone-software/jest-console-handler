// import {errorOnConsoleOutput} from '@welldone-software/jest-console-handler'
import {errorOnConsoleOutput} from '../index'

global.flushConsoleOutput = errorOnConsoleOutput({filterEntries: ({level, args}) => {
  // ignore console.info level
  return level !== 'info';
}})
