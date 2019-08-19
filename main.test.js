import {exec as execCB} from 'child_process'
import fs from 'fs'

function exec(command, {
  commandOptions = {},
  ignoreErrors = false
} = {}) {
  return new Promise((resolve, reject) => {
    execCB(command, commandOptions, (error, stdout, stderr) => {
      if (stdout) {
        console.log(stdout)
      }

      if (!ignoreErrors && stderr) {
        console.error(stderr)
      }

      if (!ignoreErrors && error) {
        return reject(error)
      }

      return resolve(stdout)
    })
  })
}

test('no console', async () => {
  await exec(
    'rimraf results.json',
    {commandOptions: {cwd: './tests'}}
  )

  await exec(
    'npx jest --config=./jest.config.json --json --outputFile=./results.json --bail=0',
    {commandOptions: {cwd: './tests'}, ignoreErrors: true}
  )

  const results = JSON.parse(fs.readFileSync('tests/results.json'))

  expect(results.testResults[0].assertionResults).toEqual([
    expect.objectContaining({
      "status": "passed"
    }),
    expect.objectContaining({
      "status": "failed",
      "failureMessages": [
        expect.stringContaining("Unhandled console messages")
      ]
    }),
  ])
})
