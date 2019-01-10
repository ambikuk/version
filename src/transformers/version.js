module.exports = {
  create: (context) => {
    const { result: { value, key, timestamp } } = context;
    const time = new Date(timestamp * 1000);
    const date = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    context.result = {
      key,
      value,
      timestamp: date
    };
    return context;
  },
  get: (context) => {
    const { result: { value } } = context;
    context.result = {
      value
    };
    return context;
  }
};
