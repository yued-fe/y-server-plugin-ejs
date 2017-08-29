'use strict';

const path = require('path');

const ejsPlugin = require('../index.js');

module.exports = {
  watch: path.join(__dirname, '../index.js'),
  plugins: [
    ejsPlugin({
      viewDir: path.join(__dirname, './view'), // 模板根目录
      renderAdapter: (result) => {
        result.$render = true;
        return result;
      },
    }),
    (app) => {
      app.get('/', (req, res) => {
        res.render('index.html', {
          code: 0,
          data: {},
          msg: '成功',
        });
      });
    },
  ],
};
