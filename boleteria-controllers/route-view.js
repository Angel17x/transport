(function(app) {
	app.RouteViewComponent =
		ng.core.Component({
		selector: 'route-view',
		templateUrl: 'views/route-view-v1.html',
		styleUrls: ['styles/route-create.css'],
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
	app.RouteViewComponent.prototype.ngOnInit=function(){
		this.title=capitalizeOnly(_("title16"));
		this.name=null;
		this.lineSelected=null;
		this.code=null;
		this.listTrayectos=[];
		this.checkRol();
	}
	app.RouteViewComponent.prototype.checkRol=function(){
		this.getData();
	}
	app.RouteViewComponent.prototype.getData=function(){
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null){
						if(this.active.queryParams._value.hasOwnProperty('id')){
							this.id=this.active.queryParams._value.id;
							if(this.active.queryParams._value.hasOwnProperty('business_id')){
								this.business_id=this.active.queryParams._value.business_id;
								this.getService();
							}
						}
					}
				}
			}
		}
	}
	app.RouteViewComponent.prototype.getService=function(){
		let request=this.service.callServicesHttp('route-get',this.business_id+"?id="+this.id,null);
		let mensajeAll=_("message_dflt_16");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.RouteViewComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_16");
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
	app.RouteViewComponent.prototype.formattedData=function(data){
		if(data.hasOwnProperty("line_name")){
			if(!(data.line_name==null || data.line_name==undefined || data.line_name=="")){
				this.linea=data.line_name;
			}
		}
		if(data.type!=null){
			this.formatted_type=_(data.type).toUpperCase();
		}
		if(data.short_route_rate!=undefined && data.short_route_rate!=null){
			try{
				this.formatted_amount=amountFormattingObject(data.short_route_rate*100);
				this.formatted_amount=this.formatted_amount.integerPart+","+this.formatted_amount.decimalPart;
				if(data.short_route_rate_currency!=undefined && data.short_route_rate_currency!=null){
					this.formatted_amount=this.formatted_amount+" "+data.short_route_rate_currency;
				}
			}catch(er){
			}
		}
		if(data.hasOwnProperty("active")){
			if(data.active){
				this.status="ACTIVO";
			}else{
				this.status="INACTIVO";
			}
		}
		if(data.hasOwnProperty("stops")){
			this.listTrayectos=[];
			if(!(data.stops==null || data.stops==undefined || data.stops=="" || data.stops.length==0)){
				var objeto={};
				for(var i=0;i<data.stops.length;i++){
					if(data.stops[i]!=null){
						objeto={};
						objeto.name=data.stops[i].name;
						objeto.code=data.stops[i].code;
						this.listTrayectos.push(objeto);
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
	app.RouteViewComponent.prototype.print=function(){
		window.print();
	}
	app.RouteViewComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));