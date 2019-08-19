// import errorOnConsoleOutput from 'jest-console.handler'
import errorOnConsoleOutput from '../index'

global.flushConsoleOutput = errorOnConsoleOutput()
