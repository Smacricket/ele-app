# ele-app

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 注意事项

1. 登录验证码一个手机号码只能请求一次，验证码可以一直使用

2. Search.vue 点击 word 时筛选出来的商家信息只带汉堡的商家

3. http无法定位
【官方回复】
Get ipLocation failed.
ip定位失败，可能因为当前定位不在ip库中。
Get geolocation failed.
浏览器定位失败，JS API的定位是基于浏览器原生定位实现的，相关的性能较差，会存在定位失败的问题。
您可以尝试升级为https后请求定位。

### 线上demo
https://www.smacricketcvm.com
域名安装了ssl证书应该定位没什么问题了
