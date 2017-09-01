'use strict';
require('colors');

function getAdapter(handle) {
  if (typeof handle !== 'function') {
    handle = d => d;
  }
  return function () {
    const promise = handle.apply(null, arguments);

    if (!(promise instanceof Promise)) {
      return Promise.resolve(promise);
    }

    return promise;
  }
}

/**
 * y-server ejs模板插件
 * @param {Object} options 配置
 * @param {String} options.viewDir 模板目录
 * @param {Function} options.renderAdapter 模板数据处理器
 * @return {Function} 插件安装方法
 */
module.exports = function (options) {
  if (!options || !options.viewDir) {
    throw new Error('[y-server-plugin-ejs]'.red, '"viewDir"配置错误');
  }

  const viewDir = options.viewDir;
  const renderAdapter = getAdapter(options.renderAdapter);

  /**
   * 插件安装方法
   * @param {Object} app Express实例
   */
  return function (app) {
    require('./lib/ejs-inline-template.js'); // 支持模板中的 ejs 模板

    app.set('views', viewDir);
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.use(function (req, res, next) {
      const originRender = res.render;

      res.render = function (viewPath, data, callback) {
        if (typeof data === 'function') {
          callback = data;
          data = {};
        }
        if (!data) {
          data = {};
        }

        renderAdapter(data, req, res).then(function (data) {
          console.log('[页面渲染]'.blue, `"${req.path}" => "${viewPath}"`);
          originRender.call(res, viewPath, data, callback);
        });
      };

      next();
    });
  };
};
