/* eslint-disable prefer-spread */
import global from './global';

/**
 * @internal
 */
const console = global.console;
/**
 * @internal
 */
export enum _ENUM_LOG_LEVEL {
  debug = 0,
  info = 1,
  warn = 2,
  error = 3,
}

/**
 * @internal
 */
const DEFAULT_LEVEL = _ENUM_LOG_LEVEL.info;

/**
 * 日志级别，默认 info 级别
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * 控制台打印日志
 */
export class Logger {
  /**
   * @internal
   */
  private level: _ENUM_LOG_LEVEL = DEFAULT_LEVEL;

  /**
   * @internal
   */
  constructor(level?: _ENUM_LOG_LEVEL) {
    if (level != undefined) {
      this.level = level;
    }
  }

  /**
   * 设置日志打印级别
   * @param level - 日志级别
   * @example
   * ```js
   * logger.setLogLevel('warn');
   * ```
   */
  setLogLevel(level: LogLevel): void {
    switch (level) {
      case 'debug':
        this.level = _ENUM_LOG_LEVEL.debug;
        break;
      case 'info':
        this.level = _ENUM_LOG_LEVEL.info;
        break;
      case 'warn':
        this.level = _ENUM_LOG_LEVEL.warn;
        break;
      case 'error':
      default:
        this.level = _ENUM_LOG_LEVEL.error;
    }
  }

  /**
   * 打印调试日志
   * @param args -
   * @example
   * ```js
   * logger.debug('xxx');
   * ```
   */
  debug(...args: any[]): void {
    if (this.level <= _ENUM_LOG_LEVEL.debug) {
      const msgs = [`${new Date()} [DEBUG]: `].concat(args);
      console.info.apply(console, msgs);
      if (this.onDebug) {
        setTimeout(() => {
          this.onDebug && this.onDebug(args);
        }, 0);
      }
    }
  }

  /**
   * 打印 info 日志
   * @param args -
   * ```js
   * logger.info('xxx');
   * ```
   */
  info(...args: any[]): void {
    if (this.level <= _ENUM_LOG_LEVEL.info) {
      const msgs = [`${new Date()} [INFO]: `].concat(args);
      console.info.apply(console, msgs);
      if (this.onInfo) {
        setTimeout(() => {
          this.onInfo && this.onInfo(args);
        }, 0);
      }
    }
  }

  /**
   * 打印 warn 日志
   * @param args -
   * ```js
   * logger.warn('xxx');
   * ```
   */
  warn(...args: any[]): void {
    if (this.level <= _ENUM_LOG_LEVEL.warn) {
      const msgs = [`${new Date()} [WARN]: `].concat(args);
      console.warn.apply(console, msgs);
      if (this.onWarn) {
        setTimeout(() => {
          this.onWarn && this.onWarn(args);
        }, 0);
      }
    }
  }

  /**
   * 打印 error 日志
   * @param args -
   * ```js
   * logger.error('xxx');
   * ```
   */
  error(...args: any[]): void {
    if (this.level <= _ENUM_LOG_LEVEL.error) {
      const msgs = [`${new Date()} [ERROR]: `].concat(args);
      console.error.apply(console, msgs);
      if (this.onError) {
        setTimeout(() => {
          this.onError && this.onError(args);
        }, 0);
      }
    }
  }

  /**
   * 打印 debug 日志时触发的回调
   * @param args -
   * ```js
   * logger.onDebug = function(args) {
   *   report('debug', args);
   * }
   * ```
   */
  onDebug: (...args: any[]) => void;

  /**
   * 打印 info 日志后触发的回调
   * @param args -
   * ```js
   * logger.onDebug = function(args) {
   *   report('info', args);
   * }
   * ```
   */
  onInfo: (...args: any[]) => void;

  /**
   * 打印 warn 日志后触发的回调
   * @param args -
   * ```js
   * logger.onDebug = function(args) {
   *   report('warn', args);
   * }
   * ```
   */
  onWarn: (...args: any[]) => void;

  /**
   * 打印 error 日志后触发的回调
   * @param args -
   * ```js
   * logger.onDebug = function(args) {
   *   report('error', args);
   * }
   * ```
   */
  onError: (...args: any[]) => void;
}

export default new Logger();
