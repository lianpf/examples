# egg-server

物料中台 Node server

## technology
* `egg 2.15.1+`
* `mysql 8.0.17`
* `egg-mysql 3.0.0+`

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org


***
### 低代码API简单梳理
> api name (接口名称): params-入参 => response

* 基础
  + sso 登录
  + createApp(创建应用): uuid-当前用户标识 => 
  + 权限
    - getAppList(应用列表): uuid-当前用户标识 => list
    - getAppLimit(该应用内角色操作权限): uuid-当前用户标识、appId => 
* 应用相关
  + getAppInfo (获取应用信息): appId(应用id) =>
  + getPageInfo (获取当前页面信息): appId(应用id)、pageId(页面id) => 自定义js代码、page Schema
  + 代码编译/反编译
    - compileJS(上传编译js): uuid、appId、pageId => staticFileUrl(静态文件地址)、fileId(静态文件源码标识)
    - ~~decompileJS(拉取源码): appId、fileId => sourceCode(源码)~~ 没必要，可集成到getPageInfo接口