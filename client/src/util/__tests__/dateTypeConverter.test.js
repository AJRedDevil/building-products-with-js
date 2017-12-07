import {convertDateToISOString, convertStringToDate} from '../dateTypeConverter';

test('# isAuthenticated', () => {
  const testDate = new Date(2017, 1, 1, 1, 1, 1);
  const expectedStrDate = '2017-01-31T19:16:01.000Z';

  expect(convertDateToISOString(testDate)).toBe(expectedStrDate);
  expect(convertStringToDate(expectedStrDate)).toEqual(testDate);
});
