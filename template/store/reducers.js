const initialUserInfoState = {
  wxuserinfo: {},
  realInfo: {},
};

const userinfoReducer = (state = initialUserInfoState, action) => {
  switch (action.type) {
    case 'updateUserInfoState':
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};

const initialRuntimeState = {
  token: '',
};

const runtimeReducer = (state = initialRuntimeState, action) => {
  if (action.type === 'updateRuntimeState') {
    return { ...state, ...action.payload };
  }
  return { ...state };
};

module.exports = {
  userinfoReducer,
  runtimeReducer,
};
