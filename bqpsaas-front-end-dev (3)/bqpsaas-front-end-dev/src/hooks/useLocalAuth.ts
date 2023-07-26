export function useLocalAuth() {
  const setAuthTokenWithExpiry = (jwt: string) => {
    const now = new Date();
    const item = { jwt: jwt, expiry: now.getTime() + 3600000 };

    localStorage.setItem("tokenBQP", JSON.stringify(item));
  };

  const getAuthTokenWithExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item;
  };

  const setKeyWithExpiry = (key: string) => {
    const now = new Date();
    const item = { key: key, expiry: now.getTime() + 15000 };
    localStorage.setItem("KeyBQP", JSON.stringify(item));
  };

  const getKeyWithExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item;
  };

  const clearLocalStorage = () => localStorage.clear();

  return {
    setAuthTokenWithExpiry,
    getAuthTokenWithExpiry,
    setKeyWithExpiry,
    getKeyWithExpiry,
    clearLocalStorage,
  };
}
