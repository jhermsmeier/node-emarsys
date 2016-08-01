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
    name: 'interests',
    type: 'interests',
    readonly: true
  },
  1: {
    name: 'firstName',
    type: 'shorttext',
    readonly: false
  },
  2: {
    name: 'lastName',
    type: 'shorttext',
    readonly: false
  },
  3: {
    name: 'email',
    type: 'longtext',
    readonly: false
  },
  4: {
    name: 'dateOfBirth',
    type: 'birthdate',
    readonly: false
  },
  5: {
    name: 'gender',
    type: 'singlechoice',
    readonly: false
  },
  6: {
    name: 'maritalStatus',
    type: 'singlechoice',
    readonly: false
  },
  7: {
    name: 'children',
    type: 'singlechoice',
    readonly: false
  },
  8: {
    name: 'education',
    type: 'singlechoice',
    readonly: false
  },
  9: {
    name: 'title',
    type: 'singlechoice',
    readonly: false
  },
  10: {
    name: 'address',
    type: 'longtext',
    readonly: false
  },
  11: {
    name: 'city',
    type: 'shorttext',
    readonly: false
  },
  12: {
    name: 'state',
    type: 'shorttext',
    readonly: false
  },
  13: {
    name: 'zipCode',
    type: 'shorttext',
    readonly: false
  },
  14: {
    name: 'country',
    type: 'singlechoice',
    readonly: false
  },
  15: {
    name: 'phone',
    type: 'shorttext',
    readonly: false
  },
  16: {
    name: 'fax',
    type: 'fax',
    readonly: false
  },
  17: {
    name: 'jobPosition',
    type: 'singlechoice',
    readonly: false
  },
  18: {
    name: 'company',
    type: 'longtext',
    readonly: false
  },
  19: {
    name: 'department',
    type: 'singlechoice',
    readonly: false
  },
  20: {
    name: 'industry',
    type: 'singlechoice',
    readonly: false
  },
  21: {
    name: 'phone',
    type: 'shorttext',
    readonly: false
  },
  22: {
    name: 'fax',
    type: 'fax',
    readonly: false
  },
  23: {
    name: 'numberOfEmployees',
    type: 'singlechoice',
    readonly: false
  },
  24: {
    name: 'annualRevenue',
    type: 'singlechoice',
    readonly: false
  },
  25: {
    name: 'url',
    type: 'url',
    readonly: false
  },
  26: {
    name: 'preferredEMailFormat',
    type: 'singlechoice',
    readonly: false
  },
  27: {
    name: 'avgLengthOfVisitInMinutes',
    type: 'special',
    readonly: true
  },
  28: {
    name: 'pageViewsPerDay',
    type: 'special',
    readonly: true
  },
  29: {
    name: 'daysSinceLastEMailSent',
    type: 'special',
    readonly: true
  },
  30: {
    name: 'responseRate',
    type: 'special',
    readonly: true
  },
  31: {
    name: 'optIn',
    type: 'special',
    readonly: false
  },
  32: {
    name: 'userStatus',
    type: 'special',
    readonly: true
  },
  33: {
    name: 'contactSource',
    type: 'special',
    readonly: true
  },
  34: {
    name: 'contactForm',
    type: 'special',
    readonly: true
  },
  35: {
    name: 'registrationLanguage',
    type: 'singlechoice',
    readonly: false
  },
  36: {
    name: 'newsletter',
    type: 'special',
    readonly: true
  },
  37: {
    name: 'mobile',
    type: 'shorttext',
    readonly: false
  },
  38: {
    name: 'firstNameOfPartner',
    type: 'shorttext',
    readonly: false
  },
  39: {
    name: 'birthdateOfPartner',
    type: 'birthdate',
    readonly: false
  },
  40: {
    name: 'anniversary',
    type: 'date',
    readonly: false
  },
  41: {
    name: 'companyAddress',
    type: 'longtext',
    readonly: false
  },
  42: {
    name: 'zipCode',
    type: 'shorttext',
    readonly: false
  },
  43: {
    name: 'city',
    type: 'shorttext',
    readonly: false
  },
  44: {
    name: 'state',
    type: 'shorttext',
    readonly: false
  },
  45: {
    name: 'country',
    type: 'singlechoice',
    readonly: false
  },
  46: {
    name: 'salutation',
    type: 'singlechoice',
    readonly: false
  },
  47: {
    name: 'emailValid',
    type: 'special',
    readonly: true
  },
  48: {
    name: 'dateOfFirstRegistration',
    type: 'special',
    readonly: true
  },
}
