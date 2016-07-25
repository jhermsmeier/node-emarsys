/**
 * Email error codes
 * @type {Object}
 */
module.exports = {
   1: 'Internal error',
   2: 'The user does not have permission to launch this email.',
   3: 'The fromemail is missing',
   4: 'Missing subject line',
   5: 'Empty launch list',
   6: 'The final launch is scheduled too soon after the A/B tests: The default delay is one hour.',
   7: 'The personalization has not been checked',
   9: 'The email campaign type does not support A/B versioning',
  18: 'If the final launch is dependent on A/B tests, there must be at least two tests before the final launch can proceed',
  20: 'The email name already exists',
  22: 'The fromname is missing',
  23: 'Lock time out (internal error)',
  24: 'Lock failure (internal error)',
  32: 'The size of the campaign exceeds 6 MB',
  33: 'Some sections selected for section targeting have no segment defined',
  34: 'The HTML code is not complete (missing tags)',
  35: 'Empty seedlist',
}
