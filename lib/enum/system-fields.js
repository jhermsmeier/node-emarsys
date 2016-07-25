/**
 * System field IDs
 * System fields are the default contact data fields.
 * Creating a Field with a unique name is possible,
 * and the list of fields can be queried.
 * NOTE: Read-only fields cannot be updated.
 * @type {Object}
 */
module.exports = {
  0: {
    name: 'Interests',
    type: 'interests',
    readonly: true
  },
  1: {
    name: 'First Name',
    type: 'shorttext',
    readonly: false
  },
  2: {
    name: 'Last Name',
    type: 'shorttext',
    readonly: false
  },
  3: {
    name: 'E-Mail',
    type: 'longtext',
    readonly: false
  },
  4: {
    name: 'Date of Birth',
    type: 'birthdate',
    readonly: false
  },
  5: {
    name: 'Gender',
    type: 'singlechoice',
    readonly: false
  },
  6: {
    name: 'Marital Status',
    type: 'singlechoice',
    readonly: false
  },
  7: {
    name: 'Children',
    type: 'singlechoice',
    readonly: false
  },
  8: {
    name: 'Education',
    type: 'singlechoice',
    readonly: false
  },
  9: {
    name: 'Title',
    type: 'singlechoice',
    readonly: false
  },
  10: {
    name: 'Address',
    type: 'longtext',
    readonly: false
  },
  11: {
    name: 'City',
    type: 'shorttext',
    readonly: false
  },
  12: {
    name: 'State',
    type: 'shorttext',
    readonly: false
  },
  13: {
    name: 'ZIP Code',
    type: 'shorttext',
    readonly: false
  },
  14: {
    name: 'Country',
    type: 'singlechoice',
    readonly: false
  },
  15: {
    name: 'Phone',
    type: 'shorttext',
    readonly: false
  },
  16: {
    name: 'Fax',
    type: 'fax',
    readonly: false
  },
  17: {
    name: 'Job Position',
    type: 'singlechoice',
    readonly: false
  },
  18: {
    name: 'Company',
    type: 'longtext',
    readonly: false
  },
  19: {
    name: 'Department',
    type: 'singlechoice',
    readonly: false
  },
  20: {
    name: 'Industry',
    type: 'singlechoice',
    readonly: false
  },
  21: {
    name: 'Phone',
    type: 'shorttext',
    readonly: false
  },
  22: {
    name: 'Fax',
    type: 'fax',
    readonly: false
  },
  23: {
    name: 'Number of Employees',
    type: 'singlechoice',
    readonly: false
  },
  24: {
    name: 'Annual Revenue',
    type: 'singlechoice',
    readonly: false
  },
  25: {
    name: 'URL',
    type: 'url',
    readonly: false
  },
  26: {
    name: 'Preferred e-mail format',
    type: 'singlechoice',
    readonly: false
  },
  27: {
    name: 'Avg. length of visit in minutes',
    type: 'special',
    readonly: true
  },
  28: {
    name: 'Page views per day',
    type: 'special',
    readonly: true
  },
  29: {
    name: 'Days since last e-mail sent',
    type: 'special',
    readonly: true
  },
  30: {
    name: 'Response rate',
    type: 'special',
    readonly: true
  },
  31: {
    name: 'Opt-In',
    type: 'special',
    readonly: false
  },
  32: {
    name: 'User status',
    type: 'special',
    readonly: true
  },
  33: {
    name: 'Contact source',
    type: 'special',
    readonly: true
  },
  34: {
    name: 'Contact form',
    type: 'special',
    readonly: true
  },
  35: {
    name: 'Registration Language',
    type: 'singlechoice',
    readonly: false
  },
  36: {
    name: 'Newsletter',
    type: 'special',
    readonly: true
  },
  37: {
    name: 'Mobile',
    type: 'shorttext',
    readonly: false
  },
  38: {
    name: 'First Name of Partner',
    type: 'shorttext',
    readonly: false
  },
  39: {
    name: 'Birthdate of Partner',
    type: 'birthdate',
    readonly: false
  },
  40: {
    name: 'Anniversary',
    type: 'date',
    readonly: false
  },
  41: {
    name: 'Company Address',
    type: 'longtext',
    readonly: false
  },
  42: {
    name: 'Zip Code',
    type: 'shorttext',
    readonly: false
  },
  43: {
    name: 'City',
    type: 'shorttext',
    readonly: false
  },
  44: {
    name: 'State',
    type: 'shorttext',
    readonly: false
  },
  45: {
    name: 'Country',
    type: 'singlechoice',
    readonly: false
  },
  46: {
    name: 'Salutation',
    type: 'singlechoice',
    readonly: false
  },
  47: {
    name: 'E-Mail valid',
    type: 'special',
    readonly: true
  },
  48: {
    name: 'Date of first registration',
    type: 'special',
    readonly: true
  },
}
