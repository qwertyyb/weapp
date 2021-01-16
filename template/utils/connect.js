const R = require('ramda');

const defaultMapStateToProps = () => ({});

const connect = {};

function createSubscribe(mapStateToProps) {
  const mapState = mapStateToProps || defaultMapStateToProps;

  let previousState;

  function handleChange() {
    const state = getApp().store.getState();
    const mappedState = mapState.call(this, state);
    if (R.equals(previousState, mappedState)) {
      return;
    }
    this.setData(mappedState, () => {
      previousState = mappedState;
    });
  }

  return (component) => {
    handleChange.apply(component);

    return getApp().store.subscribe(handleChange.bind(component));
  };
}

connect.Component = (mapStateToProps, mapDispatchToProps) => {
  let unsubscribe;
  // eslint-disable-next-line func-names
  return function (config) {
    const {
      attached: _attached,
      detached: _detached,
      methods: _methods = {},
    } = config;

    function attached(options) {
      unsubscribe = createSubscribe(mapStateToProps)(this);
      // eslint-disable-next-line no-unused-expressions
      _attached && _attached.call(this, options);
    }
    function detached() {
      unsubscribe();
      // eslint-disable-next-line no-unused-expressions
      _detached && _detached.call(this);
    }
    return Component({
      ...config,
      attached,
      detached,
      methods: {
        ..._methods,
        mapDispatchToProps,
      },
    });
  };
};

connect.Page = (mapStateToProps, mapDispatchToProps) => {
  let unsubscribe;
  // eslint-disable-next-line func-names
  return function (config) {
    const {
      onLoad: _onLoad,
      onUnload: _onUnload,
      methods: _methods = {},
    } = config;
    function onLoad(options) {
      unsubscribe = createSubscribe(mapStateToProps)(this);
      // eslint-disable-next-line no-unused-expressions
      _onLoad && _onLoad.call(this, options);
    }
    function onUnload() {
      unsubscribe();
      // eslint-disable-next-line no-unused-expressions
      _onUnload && _onUnload.call(this);
    }
    return Page({
      ...config,
      onLoad,
      onUnload,
      methods: {
        ..._methods,
        mapDispatchToProps,
      },
    });
  };
};

module.exports = connect;
