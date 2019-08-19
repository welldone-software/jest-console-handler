test('no console', () => {
  expect(true).toBe(true)
})

test('simple console log', () => {
  console.log('hi!')
  expect(true).toBe(true)
})
