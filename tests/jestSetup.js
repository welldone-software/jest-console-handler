// import {errorOnConsoleOutput} from '@welldone-software/jest-console-handler'
import {errorOnConsoleOutput} from '../index'

global.flushConsoleOutput = errorOnConsoleOutput()
