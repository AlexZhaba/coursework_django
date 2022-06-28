class LocalStorage {

  get<T>(key: string): T | null {
    let result = null;
    try {
      let data = localStorage.getItem(key);
      if (data) {
        result = JSON.parse(data)
      }
    } catch(e) {
      return null;
    }
    return result as T;
  }

  set<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data))
  }
};

export default new LocalStorage();