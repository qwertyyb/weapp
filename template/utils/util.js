/**
 * 阻止一个函数在同一时间多次调用
 * @param {Promise<Function>} asyncFn 异步函数（返回promise）
 */
const unique = (asyncFn) => {
  const pending = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (!pending.get(key)) {
      pending.set(key, Promise.resolve(asyncFn.apply(this, ...args)).then((res) => {
        setTimeout(() => pending.delete(key));
        return res;
      }).catch((err) => {
        setTimeout(() => pending.delete(key));
        throw err;
      }));
    }
    return pending.get(key);
  };
};

module.exports = {
  unique,
};
