
const { disallow } = require('feathers-hooks-common');
const { get, find, create } = require('../../hooks/version');
const transformer = require('../../transformers/version');

module.exports = {
  before: {
    all: [],
    find: [find],
    get: [get],
    create: [create],
    update: [disallow('rest')],
    patch: [disallow('rest')],
    remove: [disallow('rest')]
  },

  after: {
    all: [],
    find: [],
    get: [transformer.get],
    create: [transformer.create],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
