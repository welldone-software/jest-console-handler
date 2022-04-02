test('no console usage - should pass', () => {
  expect(true).toBe(true)
})

test('console info - should pass', () => {
  // should pass because console.info is ignored in "jestSetup"
  console.info('hi!')
  expect(true).toBe(true)
})

test('simple unhandled console log - should fail', () => {
  // should fail because console.log is not explicitly expected
  console.log('hi!')
  expect(true).toBe(true)
})

test('simple handled console log - should pass', () => {
  console.log('hi!')
  const consoleOutput = global.flushConsoleOutput();
  expect(consoleOutput).toEqual([
    {
      level: 'log',
      args: ['hi!']
    }
]);
})

