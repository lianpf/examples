const fs = require('fs');
const path = require('path');
const Stream = require('stream');
const sendToWormhole = require('stream-wormhole');
const UglifyJS = require("uglify-js");
const babel = require("@babel/core");


// DB: select结果，数组转对象
const getObj = (arr) => {
  if (Array.isArray(arr) && arr.length > 0) return arr[0]
  return {}
}

// 随机数
const random = () => {
  return Number.parseInt(Math.random() * 1000000);
}

// 此处可使用 npm: uuid 库替换
const getUuid = () => {
  return Date.now() + '-' + random();
}

// 写文件
const writeStrToFile = async (ctx, jsCode, fileParentCatalog, staticCodePath, filename) => {
  let writeFlag = false
  const compileRes = babel.transformSync(jsCode, {
    presets: [
      [
        '@babel/preset-env'
      ]
    ],
    code: true
  });
  // console.log('--compileRes.code--', compileRes.code)
  // 压缩 js code
  const uglifyRes = UglifyJS.minify(compileRes.code, {
    keep_fnames: true
  });
  if (uglifyRes.error) {
    // console.log('--uglifyRes--', uglifyRes)
    ctx.helper.handleRes.clientError({ctx, res: {}, message: '参数错误'})
    return;
  }
  // 更新文件
  const readableStream = new Stream.Readable()
  readableStream._read = () => {}
  readableStream.push(uglifyRes.code)
  // 写入路径
  // const fileParentCatalog = 'app/public/upload/'
  const target = path.join(fileParentCatalog, filename);
  // console.log('--target--', target)
  const writeStream = fs.createWriteStream(target, { flag: 'w' });
  try {
    // 写入文件
    // TODO: 文件写入成功的标识
    readableStream.pipe(writeStream)
    writeFlag = true
    // var testCode = fs.readFileSync("/gitHub/lian/examples/node/egg-server/app/public/upload/test.js", "utf8");
    // console.log('testCode', testCode)
  } catch (err) {
    // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
    await sendToWormhole(writeStream);
    writeFlag = false
    throw err;
  }
  // let staticCodePath = this.config.serverBaseDir +  '/public/upload/' + filename;
  return {
    writeFlag,
    staticCodePath: `${staticCodePath}/public/upload/${filename}`
  }
}

module.exports = {
  getObj,
  getUuid,
  writeStrToFile
}