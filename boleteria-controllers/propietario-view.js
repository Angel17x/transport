(function(app) {
	app.PropietarioViewComponent =
		ng.core.Component({
		selector: 'propietario-view',
		templateUrl: 'views/propietario-view.html',
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
	app.PropietarioViewComponent.prototype.ngOnInit=function(){
		this.title=capitalizeOnly(_("title5"));
		this.title2=capitalizeOnly(_("title6"));
		this.id=null;
		this.nombre=null;
		this.id_doc=null;
		this.email=null;
		this.phone=null;
		this.linea=null;
		this.cars_count=0;
		this.cars=[];
		this.status=null;
		this.checkRol();
	}
	app.PropietarioViewComponent.prototype.checkRol=function(){
		this.getData();
	}
	app.PropietarioViewComponent.prototype.getData=function(){
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
	app.PropietarioViewComponent.prototype.getService=function(){
		var querys="&id="+this.id;
		let request = this.service.callServicesHttp("propietario-get", querys, null);
		this.procesarRespuestaGET(request);
	}
	app.PropietarioViewComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_42");
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
	app.PropietarioViewComponent.prototype.formattedData=function(data){
		if(data.hasOwnProperty("business_name")){
			if(!(data.business_name==null || data.business_name==undefined || data.business_name=="")){
				this.nombre=data.business_name;
			}
		}
		if(data.hasOwnProperty("id_doc")){
			if(!(data.id_doc==null || data.id_doc==undefined || data.id_doc=="")){
				this.id_doc=data.id_doc;
			}
		}
		if(data.hasOwnProperty("phone_deflt")){
			if(!(data.phone_deflt==null || data.phone_deflt==undefined || data.phone_deflt=="")){
				this.phone=data.phone_deflt;
			}
		}
		if(data.hasOwnProperty("email")){
			if(!(data.email_deflt==null || data.email_deflt==undefined || data.email_deflt=="")){
				this.email=data.email_deflt;
			}
		}
		if(data.hasOwnProperty("line")){
			if(!(data.line==null || data.line==undefined || data.line=="")){
				this.linea=data.line;
			}
		}
		if(data.hasOwnProperty("status")){
			if(!(data.status==null || data.status==undefined || data.status=="")){
				this.status=_(data.status).toUpperCase();
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
		if(data.hasOwnProperty("cars")){
			if(!(data.cars==null || data.cars==undefined || data.cars=="" || data.cars.length==0)){
				this.cars=[];
				for(var i=0;i<data.cars.length;i++){
					if(data.cars[i]!=null){
						if(data.cars[i].hasOwnProperty("status")){
							if(!(data.cars[i].status==null || data.cars[i].status==undefined || data.cars[i].status=="")){
								data.cars[i].formatted_status=_(data.cars[i].status).toUpperCase();
							}
						}
						this.cars.push(data.cars[i]);
					}
				}
			}
		}
	}
	app.PropietarioViewComponent.prototype.print=function(){
		window.print();
	}
	app.PropietarioViewComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));