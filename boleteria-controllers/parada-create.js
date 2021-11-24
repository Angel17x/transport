(function(app) {
	app.ParadaCreateComponent =
		ng.core.Component({
		selector: 'parada-create',
		templateUrl: 'views/parada-create.html',
		})
		.Class({
		  constructor: [app.MsgComponent,ng.router.Router,ng.router.ActivatedRoute,app.AppCallService,
		  function(msg,router,active,service) {
	          this.msg=msg;
	          this.mensaje="";
	          this.router=router;  
	          this.active=active;
			  this.service=service;
		  }]
		});
	app.ParadaCreateComponent.prototype.ngOnInit=function(){
		this.title=_("title1");
		this.nombre=null;
		this.code=null;
		this.checkRol();
	}
	app.ParadaCreateComponent.prototype.checkRol=function(){
		var texto="STOP-CREATE";
		var flag=false;
    	if(this.service.getRole()!=null){
			if(this.service.getRole().hasOwnProperty("views")){
				if(!(this.service.getRole().views==null || this.service.getRole().views==undefined || this.service.getRole().views=="")){
					var tabla=orderList(this.service.getRole().views);
					var objeto=null;
					for(var i=0;i<tabla.length;i++){
						if(tabla[i]!=null){
							if(tabla[i].name==texto){
								flag=true;
								break;
							}
						}
					}
					if(!flag){
						this.router.navigate(['/not-user']);
					}
				}else{
					this.router.navigate(['/not-user']);
				}
			}else{
				this.router.navigate(['/not-user']);
			}
		}else{
			this.router.navigate(['/not-user']);
		}
	}
	app.ParadaCreateComponent.prototype.getValueMsg=function(){
		var link = ['/parada-report'];
		this.router.navigate(link);
	}
	app.ParadaCreateComponent.prototype.clean=function(){
		this.nombre=null;
		this.code=null;
	}
	app.ParadaCreateComponent.prototype.done=function(){
		var parametros={};
		var querys="";
		if(this.code==null || this.code==undefined || this.code==""){
			this.mensaje=_("warning32");
			this.msg.warning();
			return;
		}else{
			if(this.code.trim().length!=3){
				this.mensaje=_("warning32");
				this.msg.warning();
				return;
			}
			querys="&code="+this.code.trim().toUpperCase();
		}
		if(this.nombre==null || this.nombre==undefined || this.nombre==""){
			this.mensaje=_("warning31");
			this.msg.warning();
			return;
		}else{
			parametros.name=this.nombre.trim().toUpperCase();
			parametros.active=true;
		}
		let mensajeAll=_("message_dflt_29");
		let request = this.service.callServicesHttp("parada-post", querys, parametros);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.ParadaCreateComponent.prototype.procesarRespuesta=function(data){
		let mensajeAll=_("message_dflt_29");
		if(data==null || data==undefined || data==""){
			this.mensaje=mensajeAll;
			this.msg.error();
		}else{
			if (data.status_http == 200) {
				this.mensaje=capitalizeOnly(_("success23"));
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.ParadaCreateComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));