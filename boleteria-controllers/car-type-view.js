(function(app) {
	app.CarTypeViewComponent =
		ng.core.Component({
		selector: 'car-type-view',
		templateUrl: 'views/car-type-view.html',
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
	app.CarTypeViewComponent.prototype.ngOnInit=function(){
		this.title=capitalizeOnly(_("title57"));
		this.nombre=null;
		this.capacidad=null;
		this.listCaracteristicas=[];
		try{
			var g=document.getElementsByClassName('modal-backdrop')[0];
			if(g!=null){
				var padre=g.parentNode;
				padre.removeChild(g);
			}
		}catch(er){
		}
		this.checkRol();
	}
	app.CarTypeViewComponent.prototype.checkRol=function(){
		var texto="VIEW-CAR-TYPE";
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
					}else{
						this.getData();
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
	app.CarTypeViewComponent.prototype.getData=function(){
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null){
						if(this.active.queryParams._value.hasOwnProperty('id')){
							this.id=this.active.queryParams._value.id;
							this.getService();
						}
					}
				}
			}
		}
	}
	app.CarTypeViewComponent.prototype.getService=function(){
		let request=this.service.callServicesHttp('car-type-get',"&id="+this.id,null);
		let mensajeAll=_("message_dflt_60");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.CarTypeViewComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_60");
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				this.formattedDataGET(data);
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.CarTypeViewComponent.prototype.formattedDataGET=function(data){
		if(data.hasOwnProperty("name")){
			this.nombre=data.name;
		}
		if(data.hasOwnProperty("capacity")){
			this.capacidad=data.capacity;
		}
		if(data.hasOwnProperty("features")){
			this.listCaracteristicas=[];
			if(data.features!=null && data.features.length!=0){
				var objeto={};
				for(var i=0;i<data.features.length;i++){
					if(data.features[i]!=null){
						objeto={};
						objeto.value=data.features[i];
						this.listCaracteristicas.push(objeto);
					}
				}
			}
		}
		if(data.hasOwnProperty("info")){
			if(!(data.info==null || data.info==undefined || data.info=="")){
				if(data.info.hasOwnProperty("created_by_email")){
					if(!(data.info.created_by_email==null || data.info.created_by_email==undefined || data.info.created_by_email=="")){
						this.creado_por=data.info.created_by_email;
					}
				}
				if(data.info.hasOwnProperty("created_at")){
					if(!(data.info.created_at==null || data.info.created_at==undefined || data.info.created_at=="")){
						this.creado_el=formattingDate(data.info.created_at);
					}
				}
				if(data.info.hasOwnProperty("updated_by_email")){
					if(!(data.info.updated_by_email==null || data.info.updated_by_email==undefined || data.info.updated_by_email=="")){
						this.actualizado_por=data.info.updated_by_email;
					}
				}
				if(data.info.hasOwnProperty("updated_at")){
					if(!(data.info.updated_at==null || data.info.updated_at==undefined || data.info.updated_at=="")){
						this.actualizado_el=formattingDate(data.info.updated_at);
					}
				}
			}
		}
	}
	app.CarTypeViewComponent.prototype.print=function(){
		window.print();
	}
	app.CarTypeViewComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));