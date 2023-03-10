const dateToString = require('../utils/date');

test('dateToString returns a formatted date string', () => {
  const timestamp = 1678469288000;
  const expected = /03\/10\/2023, 9:28:08\s*[A|P]M/;
  const result = dateToString(timestamp);
  expect(result).toMatch(expected);
});
