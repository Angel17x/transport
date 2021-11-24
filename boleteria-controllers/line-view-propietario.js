(function(app) {
	app.LineViewPropietarioComponent =
		ng.core.Component({
		selector: 'line-view-propietario',
		templateUrl: 'views/line-view-propietario.html',
		})
		.Class({
		  constructor: [app.MsgComponent,ng.router.Router,ng.router.ActivatedRoute,app.AppCallService,
		  function(msg,router,active,ser) {
	          this.msg=msg;
	          this.mensaje="";
	          this.router=router;  
	          this.active=active;
			  this.service=ser;
		  }]
		});
	app.LineViewPropietarioComponent.prototype.ngOnInit=function(){
		this.title=_("title12");
		this.nombre=null;
		this.codigo=null;
		this.propietarios=[];
		this.propietarios_activos=0;
		this.propietarios_suspendidos=0;
		this.checkRol();
	}
	app.LineViewPropietarioComponent.prototype.checkRol=function(){
		this.getData();
	}
	app.LineViewPropietarioComponent.prototype.getData=function(){
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null){
						if(this.active.queryParams._value.hasOwnProperty('id')){
							this.codigo=this.active.queryParams._value.id;
							this.getService();
						}
					}
				}
			}
		}
	}
	app.LineViewPropietarioComponent.prototype.getService=function(){
		var querys="&code="+this.codigo;
		let request = this.service.callServicesHttp("line-get-propietarios", querys, null);
		this.procesarRespuestaGET(request);
	}
	app.LineViewPropietarioComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_5");
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				this.formattedData(data);
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.LineViewPropietarioComponent.prototype.formattedData=function(data){
		if(data.hasOwnProperty("name")){
			if(!(data.name==null || data.name==undefined || data.name=="")){
				this.nombre=data.name;
			}
		}
		if(data.hasOwnProperty("code")){
			if(!(data.code==null || data.code==undefined || data.code=="")){
				this.codigo=data.code;
			}
		}
		this.propietarios=[];
		if(data.hasOwnProperty("results")){
			if(!(data.results==null || data.results.length==0)){
				for(var i=0;i<data.results.length;i++){
					if(data.results[i]!=null){
						if(data.results[i].hasOwnProperty("status")){
							if(!(data.results[i].status==null || data.results[i].status==undefined || data.results[i].status=="")){
								data.results[i].formatted_status=_(data.results[i].status).toUpperCase();
								if(data.results[i].status=="ACTIVE"){
									this.propietarios_activos=this.propietarios_activos+1;
								}else{
									this.propietarios_suspendidos=this.propietarios_suspendidos+1;
								}
							}
						}
						this.propietarios.push(data.results[i]);
					}
				}
			}
		}
		
	}
	app.LineViewPropietarioComponent.prototype.print=function(){
		window.print();
	}
	app.LineViewPropietarioComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));