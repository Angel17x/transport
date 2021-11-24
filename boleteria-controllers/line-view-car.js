(function(app) {
	app.LineViewCarComponent =
		ng.core.Component({
		selector: 'line-view-car',
		templateUrl: 'views/line-view-car.html',
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
	app.LineViewCarComponent.prototype.ngOnInit=function(){
		this.title=_("title13");
		this.nombre=null;
		this.codigo=null;
		this.cars=[];
		this.cars_activos=0;
		this.cars_inactivos=0;
		this.checkRol();
	}
	app.LineViewCarComponent.prototype.checkRol=function(){
		this.getData();
	}
	app.LineViewCarComponent.prototype.getData=function(){
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
	app.LineViewCarComponent.prototype.getService=function(){
		var querys="&code="+this.codigo;
		let request = this.service.callServicesHttp("line-get-cars", querys, null);
		this.procesarRespuestaGET(request);
	}
	app.LineViewCarComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_6");
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
	app.LineViewCarComponent.prototype.formattedData=function(data){
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
		this.cars=[];
		if(data.hasOwnProperty("results")){
			if(!(data.results==null || data.results.length==0)){
				for(var i=0;i<data.results.length;i++){
					if(data.results[i]!=null){
						if(data.results[i].hasOwnProperty("status")){
							if(!(data.results[i].status==null || data.results[i].status==undefined || data.results[i].status=="")){
								data.results[i].formatted_status=_(data.results[i].status).toUpperCase();
								if(data.results[i].status=="ACTIVE"){
									this.cars_activos=this.cars_activos+1;
								}else{
									this.cars_inactivos=this.cars_inactivos+1;
								}
							}
						}
						this.cars.push(data.results[i]);
					}
				}
			}
		}
		
	}
	app.LineViewCarComponent.prototype.print=function(){
		window.print();
	}
	app.LineViewCarComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));