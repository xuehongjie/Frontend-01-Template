var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag

    // This makes `appname` a required argument.
    this.argument('appname', { type: String, required: false }); // 获取 yo jay xxx 中的 xxx

    // And you can then access it later; e.g.
    this.log('appname', this.options.appname);

    // This method adds support for a `--coffee` flag
    this.option('coffee');

    // And you can then access it later; e.g.
    this.scriptSuffix = this.options.coffee ? '.coffee' : '.js';

    this.log(this.options.coffee);
  }
  // 私有方法，不会执行
  _private_method() {
    this.log('_private_method');
  }

  async prompting() {
    // 获取输入结果
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
      },
      /* {
        type: 'confirm',
        name: 'cool',
        message: 'Would you like to enable the Cool feature?',
      }, */
    ]);
  }
  writingInfo() {
    this.log('app name', this.answers.name);
    this.log('cool feature', this.answers.cool); // user answer `cool` used
  }

  // 合并package.json
  /* writingPkg() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0',
      },
      dependencies: {
        react: '^16.2.0',
      },
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  } */

  // 安装文件
  /* installingLodash() {
    this.npmInstall(['lodash'], { 'save-dev': true });
  } */

  // 拷贝模板到指定目录，可传入自定义参数
  addTemplate() {
    this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('public/index.html'), {
      // title: 'Templating with Yeoman',
      title: this.answers.name,
    });
  }
};
