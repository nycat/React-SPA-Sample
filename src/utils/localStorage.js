const localStorage = {
  getItem: function(key) {
    let value;
    try {
      value = window.localStorage.getItem(key);
    } catch (ex) {
      console.error('localStorage.getItem error, ', ex.message);
    } finally {
      return value;
    }
  },
  setItem: function(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (ex) {
      console.error('localStorage.setItem error, ', ex.message);
    }
  },
  removeItem: function(key, value) {
    try {
      window.localStorage.removeItem(key);
    } catch (ex) {
      console.error('localStorage.setItem error, ', ex.message);
    }
  }
};

export default localStorage;
