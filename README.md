# y-server-plugin-ejs

y-server-plugin-ejs is a [y-server](https://github.com/yued-fe/y-server) plugin to provide ejs engine.

## Install

```bash
npm install y-server-plugin-ejs
```

## Usage

```javascript
const yServer = require('y-server');
const ejsPlugin = require('y-server-plugin-ejs');

yServer({
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
});
```

## Notes

* `viewDir` is the base directory of view.
* `renderAdapter` is the adapter of render data.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
