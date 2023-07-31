// Set the userAgent inside the navigator
Object.defineProperty(
  window.navigator,
  'userAgent',
  (value => ({
    get() {
      return value
    },
    set(v) {
      value = v
    }
  }))(window.navigator.userAgent)
)
