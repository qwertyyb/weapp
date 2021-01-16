const middlewares = [];

const executor = (ctx, allMiddlewares) => {
  const createNext = (restMiddlewares) => () => {
    if (restMiddlewares.length) {
      const next = createNext(restMiddlewares.slice(1));
      return restMiddlewares[0](ctx, next);
    }
    return Promise.resolve(ctx);
  };
  return Promise.resolve(createNext(allMiddlewares)());
};

const baseFetch = (config) => wx.pro.request(config)
  .then((res) => {
    // eslint-disable-next-line no-param-reassign
    config.response = res;
    return config;
  });

function fetch(config) {
  return executor(config, [...middlewares, baseFetch]).then(() => config);
}

fetch.use = middlewares.push.bind(middlewares);

module.exports = fetch;
