/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

var baseUrl = ''; 
var routerMode = 'hash';
var imgBaseUrl;
var localapi;
var proapi;


if (process.env.NODE_ENV == 'development') {
  imgBaseUrl = 'http://cangdu.org:8001/img/';

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'http://cangdu.org:8001';
  imgBaseUrl = 'http://cangdu.org:8001/img/';
}

// console.log(process.env.NODE_HOST)
baseUrl = process.env.NODE_HOST;
imgBaseUrl = process.env.NODE_HOST + '/img/';

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
	localapi,
	proapi
}