(function(app) {
	app.CarViewComponent =
		ng.core.Component({
		selector: 'car-view',
		templateUrl: 'views/car-view.html',
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
	app.CarViewComponent.prototype.ngOnInit=function(){
		this.title=capitalizeOnly(_("title3"));
		this.placa=null;
		this.carroceria=null;
		this.linea=null;
		this.propietario=null;
		this.marca=null;
		this.color=null;
		this.anno=null;
		this.type=null;
		this.capacidad=null;
		this.status=null;
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
	app.CarViewComponent.prototype.checkRol=function(){
		var texto="VIEW-VEHICLE";
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
	app.CarViewComponent.prototype.getData=function(){
		if(this.active.hasOwnProperty('queryParams')){
					if(this.active.queryParams!=null){
						if(this.active.queryParams.hasOwnProperty('_value')){
							if(this.active.queryParams._value!=null){
								if(this.active.queryParams._value.hasOwnProperty('id')){
									this.id=this.active.queryParams._value.id;
									if(this.active.queryParams._value.hasOwnProperty('owner_id')){
										this.owner_id=this.active.queryParams._value.owner_id;
									
									}
									if(this.active.queryParams._value.hasOwnProperty('business_id')){
										this.business_id=this.active.queryParams._value.business_id;
									
									}
									if(this.active.queryParams._value.hasOwnProperty('vehicle_type_id')){
										this.vehicle_type_id=this.active.queryParams._value.vehicle_type_id;
									}
									this.getService();
								}
							}
						}
					}
				}
	}
	app.CarViewComponent.prototype.getService=function(){
		let request=this.service.callServicesHttp('car-get',this.business_id+"?id="+this.id+"&owner_id="+this.owner_id+"&vehicle_type_id="+this.vehicle_type_id,null);
		let mensajeAll=_("message_dflt_36");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.CarViewComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_36");
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
	app.CarViewComponent.prototype.formattedData=function(data){
		if(data.hasOwnProperty("license_plate")){
			if(!(data.license_plate==null || data.license_plate==undefined || data.license_plate=="")){
				this.placa=data.license_plate;
			}
		}
		if(data.hasOwnProperty("bodywork")){
			if(!(data.bodywork==null || data.bodywork==undefined || data.bodywork=="")){
				this.carroceria=data.bodywork;
			}
		}
		if(data.hasOwnProperty("brand")){
			if(!(data.brand==null || data.brand==undefined || data.brand=="")){
				this.marca=data.brand;
			}
		}
		if(data.hasOwnProperty("year")){
			if(!(data.year==null || data.year==undefined || data.year=="")){
				this.anno=data.year;
			}
		}
		if(data.hasOwnProperty("color")){
			if(!(data.color==null || data.color==undefined || data.color=="")){
				this.color=data.color;
			}
		}
		if(data.hasOwnProperty("vehicle_type_name")){
			if(!(data.vehicle_type_name==null || data.vehicle_type_name==undefined || data.vehicle_type_name=="")){
				this.tipo=data.vehicle_type_name;
				
			}
		}
		if(data.hasOwnProperty("capacity")){
			this.capacidad=data.capacity;
		}
		if(data.hasOwnProperty("line_name")){
			if(!(data.line_name==null || data.line_name==undefined || data.line_name=="")){
				this.linea=data.line_name;
				
			}
		}
		if(data.hasOwnProperty("owner_name")){
			if(!(data.owner_name==null || data.owner_name==undefined || data.owner_name=="")){
				this.propietario=data.owner_name+" ("+data.owner_id_doc+")";
				
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
	app.CarViewComponent.prototype.print=function(){
		window.print();
	}
	app.CarViewComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));