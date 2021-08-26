/**
 * 获取 global 对象，区分主线程环境，还是 web worker 线程环境
 */
export function global(): typeof globalThis {
  // see https://stackoverflow.com/a/11237259/589493
  if (typeof window === 'undefined') {
    /* eslint-disable-next-line no-undef */
    return self;
  } else {
    return window;
  }
}

/**
 * 判断是否处理 worker 环境
 */
export function isWorker(): boolean {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope &&
    typeof importScripts !== 'undefined'
  );
}

export default global();
