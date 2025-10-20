/**
 * 本地存储工具类
 */

/**
 * 获取存储项
 */
export function getStorage<T>(key: string, defaultValue?: T): T | null {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : defaultValue ?? null
  } catch (error) {
    console.error(`Failed to get storage item "${key}":`, error)
    return defaultValue ?? null
  }
}

/**
 * 设置存储项
 */
export function setStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Failed to set storage item "${key}":`, error)
    return false
  }
}

/**
 * 移除存储项
 */
export function removeStorage(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Failed to remove storage item "${key}":`, error)
    return false
  }
}

/**
 * 清空所有存储
 */
export function clearStorage(): boolean {
  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.error('Failed to clear storage:', error)
    return false
  }
}

/**
 * 检查存储项是否存在
 */
export function hasStorage(key: string): boolean {
  return localStorage.getItem(key) !== null
}

