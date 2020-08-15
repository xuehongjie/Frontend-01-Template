let Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  collecting() {
    this.log('collecting');
  }
  // 私有方法，复制文件
  _copy(tmpl, target = tmpl, opts = {}) {
    this.fs.copyTpl(
      this.templatePath(tmpl), // 模板目录
      this.destinationPath(target), // 目标目录
      opts
    );
  }
  creating() {
    /* this._copy('index.html', 'index.html', {
      title: 'Templating with Yeoman',
    }); */
    this._copy('src/index.html', 'src/index.html', {
      title: 'Templating with Yeoman',
    });
    this._copy('src/main.js');

    this._copy('lib/createElement.js');
    this._copy('lib/animation.js');
    this._copy('lib/gesture.js');

    this._copy('package.json', 'package.json', {
      title: 'templating-with-yeoman',
    });
    this._copy('webpack.config.js');
    this._copy('test/main.test.js');
    this._copy('.gitignore');
    this._copy('.nycrc');
    this._copy('.babelrc');
    this.npmInstall(
      [
        'webpack',
        'webpack-cli',
        'webpack-dev-server',
        'html-webpack-plugin',
        'babel-loader',
        '@babel/core',
        '@babel/preset-env',
        '@babel/register',
        '@babel/plugin-transform-react-jsx',
        'mocha',
        'nyc',
        '@istanbuljs/nyc-config-babel',
        'babel-plugin-istanbul',
      ],
      { 'save-dev': true }
    );
    /* this.fs.copyTpl(
      this.templatePath('index.html'), // 模板目录
      this.destinationPath('index.html'), // 目标目录
      {
        title: 'Templating with Yeoman',
      }
    ); */
    /* this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), {
      title: 'Templating with Yeoman',
    });
    this.fs.copyTpl(
      this.templatePath('createElement.js'),
      this.destinationPath('createElement.js')
    );
    this.fs.copyTpl(this.templatePath('main.js'), this.destinationPath('src/main.js'));
    this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('src/index.html'));
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
    this.npmInstall(
      [
        'webpack',
        'webpack-cli',
        'webpack-dev-server',
        'babel-loader',
        '@babel/core',
        '@babel/preset-env',
        '@babel/template',
      ],
      { 'save-dev': true }
    ); */
  }
};
