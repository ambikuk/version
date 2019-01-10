const { BadRequest, NotFound } = require('@feathersjs/errors');

module.exports = {
  get: async (context) => {
    const { id, app, params } = context;
    const query = Object.assign({
      key: id,
      $sort: { timestamp: '-1' }
    }, params.query);
    const versions = await app.service('version').find({ query });
    if (versions.total > 0) {
      const { data } = versions;
      const firstIndex = data[0];
      context.result = firstIndex;
      return context;
    }
    throw new NotFound(`${id} is empty`);
  },
  find: (context) => {
    const { params: { query: { key } } } = context;
    if (key) {
      return context;
    }
    throw new BadRequest('please check your body request');
  },
  create: (context) => {
    const { data } = context;
    data.timestamp = Math.floor(new Date().getTime() / 1000);
    return context;
  }
};
