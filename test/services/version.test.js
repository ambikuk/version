/* eslint-disable node/no-deprecated-api */
/* global describe it */

const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const hook = require('../../src/hooks/version');
const version = require('../../src/transformers/version');

describe('\'version\' service', () => {
  // eslint-disable-next-line global-require
  const app = require('../../src/app');
  it('registered the service', () => {
    const service = app.service('version');

    assert.ok(service, 'Registered the service');
  });
});

describe('\'version\' create', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/version', {
      async create (data) {
        return data;
      }
    });

    app.service('version').hooks({
      before: {
        create: hook.create
      },
      after: {
        create: version.create
      }
    });
  });

  it('create version as expected', async () => {
    const result = await app.service('version').create({
      key: 'key',
      value: 'value'
    });
    assert.equal(result.key, 'key');
    assert.equal(result.value, 'value');
    assert.equal(result.timestamp, new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
  });

  it('create version with object as expected', async () => {
    const result = await app.service('version').create({
      key: 'key',
      value: {
        key: 'key',
        data: [1, 2]
      }
    });
    assert.equal(result.key, 'key');
    assert.deepEqual(result.value, {
      key: 'key',
      data: [1, 2]
    });
    assert.equal(result.timestamp, new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
  });
});

describe('\'version\' get', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/version', {
      async find () {
        return {
          total: 2,
          data: [{
            key: 'key',
            value: 'value',
            timestamp: 1547039768
          }]
        };
      },
      async get (data) {
        return data;
      }
    });

    app.service('version').hooks({
      before: {
        get: hook.get,
        find: hook.find
      },
      after: {
        get: version.get
      }
    });
  });

  it('get version as expected', async () => {
    const result = await app.service('version').get('key');
    assert.deepEqual(result, { value: 'value' });
  });

  it('get version with wrong params as expected', async () => {
    try {
      await app.service('version').get(null);
    } catch (e) {
      assert.equal(e.message, 'please check your body request');
    }
  });
});

describe('\'version\' get', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/version', {
      async find () {
        return {
          total: 2,
          data: [{
            key: 'key',
            value: 'value',
            timestamp: 1547039768
          }]
        };
      },
      async get (data) {
        return data;
      }
    });

    app.service('version').hooks({
      before: {
        get: hook.get,
        find: hook.find
      },
      after: {
        get: version.get
      }
    });
  });

  it('get object result as expected', async () => {
    const result = await app.service('version').get('key');
    assert.deepEqual(result, { value: 'value' });
  });

  it('get version wrong params as expected', async () => {
    try {
      await app.service('version').get(null);
    } catch (e) {
      assert.equal(e.message, 'please check your body request');
    }
  });
});

describe('\'version\' get not found', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/version', {
      async find () {
        return {
          total: 0,
          data: []
        };
      },
      async get (data) {
        return data;
      }
    });

    app.service('version').hooks({
      before: {
        get: hook.get,
        find: hook.find
      },
      after: {
        get: version.get
      }
    });
  });

  it('get version with wrong params as expected', async () => {
    try {
      await app.service('version').get('test');
    } catch (e) {
      assert.equal(e.message, 'test is empty');
    }
  });
});
