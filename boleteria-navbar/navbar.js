(function (app) {
    'use strict';
    app.NavBarComponent = ng.core 
    .Component({
        selector: 'nav-bar',
        templateUrl: 'views/navbar.html',
    })
    .Class({
        constructor: [app.MsgComponent,ng.router.Router,app.AppCallService,
        function(msg,router,ser) {
			this.msg=msg;
			this.router=router;
			this.ser=ser;
        }]
     });
    app.NavBarComponent.prototype.ngOnInit = function () {
	}
	app.NavBarComponent.prototype.doLogout=function(){
		let mensajeAll="Error al cerrar sesion";
		let request=this.ser.callServicesHttp('logout',null,null);
		request.subscribe(data=>{
			if(!(data==null || data==undefined || data=="")){
				if(data.status_http!=200){
					this.mensaje=this.ser.processMessageError(data,mensajeAll)
				}
			}
			doLogout();
			window.location.href = '/bandera';
		},err=>{
			this.mensaje=this.ser.processError(err,mensajeAll);
			doLogout();
			window.location.href = '/bandera';
		});
	}
})(window.app || (window.app = {}));