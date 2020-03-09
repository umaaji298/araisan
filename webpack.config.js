// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
const phaser = path.join(pathToPhaser, "dist/phaser.js");

module.exports = {
  context: __dirname,
  entry:{
    'game': './app/game.js',
  },
  output: {
    path: path.resolve(__dirname, './docs'),
    filename: "game.js"   //バンドルして書き出すファイル名
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader", exclude: "/node_modules/" },
      //phaser-hogehoge.jsというファイルの内容はPhaserというグローバル変数に内容を突っ込む(expose-loader)
      { test: /phaser\.js$/, loader: "expose-loader?Phaser" }
    ]
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  resolve: {
    //バンドル対象にするファイルを指定する
    extensions: [".js"],
    //import "phaser"ってしたときに読み込みに行くやつを指定する
    alias: {
      phaser: phaser
    }
  },
  mode: 'none',
  optimization: {
    minimize: false
  }
};