const dateToString = require('../utils/date');

test('dateToString returns a formatted date string', () => {
    const timestamp = 1646914497000;
    const expected = '3/9/2022 at 23:21';
    const result = dateToString(timestamp);
    expect(result).toBe(expected);
  });