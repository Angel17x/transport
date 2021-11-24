var domain="demo.paguetodo.com";
var base="https://"+domain+"/";
function getDomain(){
	return domain;
}
function doLogout(){
	localStorage.clear();
	sessionStorage.clear();
}
function getClient(){
	return 'e904adce-d0c2-4e07-9ae1-fc7c198c3df3';
}
function getRealm(){
	return "cuyawa";
}
function getApi(){
	return "https://apid.paguetodo.com/demo/";
}
function getEnlaceAuth(){
	return "deegle_auth";
}
function getEnlaceApi(){
	return "intrac";
}
function getEnlaceApiDeegle(){
	return "deegle";
}
function getEnlaceApiDeegle2(){
	return "deeglev2";
}
function getStatic(){
	return "https://staticd.paguetodo.com/"
}
function redirectUri(){
	return redirectUriBase();
}
function redirectUriBase(){
	return base+"intrac";
}