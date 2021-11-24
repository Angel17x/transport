(function(app) {
	app.RouteReportComponent =
		ng.core.Component({
		selector: 'route-report',
		templateUrl: 'views/route-report-v2.html',
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
	app.RouteReportComponent.prototype.ngOnInit=function(){
		this.dataSelected=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=10;
		this.pageSelected=1;
		this.listRegister=[];
		this.listStatus=[{value:null,name:"Todos"},{value:"ACTIVE",name:"Activo"},{value:"INACTIVE",name:"Inactivo"}];
		this.listTypes=[{value:null,name:"Todos"},{value:"LONG_ROUTE",name:"Ruta Larga"},{value:"SHORT_ROUTE",name:"Ruta Corta"}];
		this.status=null;
		this.codigo=null;
		this.linea=null;
		this.parada=null;
		this.type=null;
		this.checkRol();
	}
	app.RouteReportComponent.prototype.checkRol=function(){
		this.actions=[];
		this.vistas=[];
		var flag=false;
    	if(this.service.getRole()!=null){
			if(this.service.getRole().hasOwnProperty("views")){
				if(!(this.service.getRole().views==null || this.service.getRole().views==undefined || this.service.getRole().views=="")){
					var tabla=orderList(this.service.getRole().views);
					var objeto=null;
					for(var i=0;i<tabla.length;i++){
						if(tabla[i]!=null){
							if(tabla[i].name=="ITINERARY"){
								flag=true;
								if(tabla[i].hasOwnProperty("actions")){
									if(!(tabla[i].actions==null || tabla[i].actions==undefined || tabla[i].actions=="" || tabla[i].actions.length==0)){
										for(var j=0;j<tabla[i].actions.length;j++){
											if(tabla[i].actions[j]!=null){
												objeto=null;
												objeto=this.formattedActions(tabla[i].actions[j]);
												if(objeto!=null){
													this.actions.push(objeto);
												}
											}
										}
									}
								}
							}else{
								if(tabla[i].tag=="ITINERARY"){
									objeto=null;
									objeto=this.formattedView(tabla[i]);
									if(objeto!=null){
										this.actions.push(objeto);
									}
								}
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
	app.RouteReportComponent.prototype.formattedActions=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.name=="ITINERARY-REPORT"){
				return null;
			}
			return data;
		}
	}
	app.RouteReportComponent.prototype.formattedView=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.name=="ITINERARY-CREATE"){
				this.mostrarCrear=true;
				return null;
			}else{
				if(data.hasOwnProperty("functionality")){
					if(!(data.functionality==null || data.functionality==undefined || data.functionality=="")){
						data.functionality_detail=data.functionality;
					}
				}
				if(data.hasOwnProperty("url")){
					if(!(data.url==null || data.url==undefined || data.url=="")){
						data.router=data.url;
						data.type="PATH";
					}
				}
				return data;
			}
		}
	}
	app.RouteReportComponent.prototype.search=function(){
		this.jsonFilter={};
		if(!(this.codigo==null || this.codigo==undefined || this.codigo=="" || this.codigo=="null")){
			this.jsonFilter.name=this.codigo.trim();
		}
		if(!(this.linea==null || this.linea==undefined || this.linea=="" || this.linea=="null" )){
			this.jsonFilter.line=this.linea;
		}
		if(!(this.parada==null || this.parada==undefined || this.parada=="" || this.parada=="null")){
			this.jsonFilter.stop=this.parada;
		}
		if(!(this.type==null || this.type==undefined || this.type=="" || this.type=="null")){
			this.jsonFilter.type=[this.type];
		}
		if(!(this.status==null || this.status==undefined || this.status=="" || this.status=="null" )){
			if(this.status=="ACTIVE"){
				this.jsonFilter.active=true;
			}else{
				this.jsonFilter.active=false;
			}
		}
		this.callServices(1,"&offset=0&limit="+this.detallePorPagina);
	}
	app.RouteReportComponent.prototype.clean=function(){
		this.status=null;
		this.codigo=null;
		this.linea=null;
		this.parada=null;
		this.type=null;
	}
	app.RouteReportComponent.prototype.getCantidadSelected=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPagina = data.detalles;
			this.totalPage = data.pagina;
			if (this.listRegister == null || this.listRegister == undefined || this.listRegister.length == 0) {
				this.mensaje = capitalizeOnly(_("message_dflt_4"));
			} else {
				this.callServices(1, '&limit=' + this.detallePorPagina);
			}
		}
	}
	app.RouteReportComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.RouteReportComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.RouteReportComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.RouteReportComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.RouteReportComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.RouteReportComponent.prototype.callServices = function (data, parametros) {
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		let request = this.service.callServicesHttp("route-report", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.RouteReportComponent.prototype.procesarRespuesta=function(data){
		var key="results";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			this.listRegister=[];
			this.mensaje=mensajeAll;
			this.msg.error();
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("count")){
					if(data.count==null || data.count==undefined || data.count==0){
						this.listRegister=[];
					}else{
						this.pagingActual = {};
						this.pagingActual.count = data.count;
						let auxP = Math.floor(this.pagingActual.count / this.detallePorPagina);
						let restoAux = ((this.pagingActual.count) % this.detallePorPagina);
						if (restoAux == 0) {
							this.totalPage = auxP;
						} else {
							this.totalPage = auxP + 1;
						}
						if (data.hasOwnProperty('next_page')) {
							if (data.next_page == null || data.next_page == undefined || data.next_page == "") {
								this.pagingActual.next_page = null;
							} else {
								this.pagingActual.next_page = data.next_page;
							}
						} else {
							this.pagingActual.next_page = null;
						}
						if (data.hasOwnProperty('previous_page')) {
							if (data.previous_page == null || data.previous_page == undefined || data.previous_page == "") {
								this.pagingActual.previous_page = null;
							} else {
								this.pagingActual.previous_page = data.previous_page;
							}
						} else {
							this.pagingActual.previous_page = null;
						}
						if (data.hasOwnProperty('first_page')) {
							if (data.first_page == null || data.first_page == undefined || data.first_page == "") {
								this.pagingActual.first_page = null;
							} else {
								this.pagingActual.first_page = data.first_page;
							}
						} else {
							this.pagingActual.first_page = null;
						}
						if (data.hasOwnProperty('last_page')) {
							if (data.last_page == null || data.last_page == undefined || data.last_page == "") {
								this.pagingActual.last_page = null;
							} else {
								this.pagingActual.last_page = data.last_page;
							}
						} else {
							this.pagingActual.last_page = null;
						}
						if (data.hasOwnProperty(key)) {
							var objeto = {};
							this.listRegister = [];
							for (var i = 0; i < data[key].length; i++) {
								objeto = this.formattedData(data[key][i]);
								if (objeto != null) {
									this.listRegister.push(objeto);
								}
							}
							this.pagingActual.count = data.count;
						}else{
							this.listRegister=[];
						}
					}
				}else{
					this.listRegister=[];
				}
			}else{
				this.mensaje=this.service.processMessageError(data,mensajeAll);
				this.msg.error();
			}
		}
	}
	app.RouteReportComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.type!=null){
				data.formatted_type=_(data.type).toUpperCase();
			}
			if(data.short_route_rate!=undefined && data.short_route_rate!=null){
				try{
					data.formatted_amount=amountFormattingObject(data.short_route_rate*100);
					data.formatted_amount=data.formatted_amount.integerPart+","+data.formatted_amount.decimalPart;
					if(data.short_route_rate_currency!=undefined && data.short_route_rate_currency!=null){
						data.formatted_amount=data.formatted_amount+" "+data.short_route_rate_currency;
					}
				}catch(er){
				}
			}
			data.actions=[];
			if(this.checkAction("ITINERARY-DELETE")!=null){
				data.actions.push(this.checkAction("ITINERARY-DELETE"));
			}
			if(this.checkAction("ITINERARY-VIEW")!=null){
				data.actions.push(this.checkAction("ITINERARY-VIEW"));
			}
			if(this.checkAction("ITINERARY-UPDATE")!=null){
				data.actions.push(this.checkAction("ITINERARY-UPDATE"));
			}
			if(data.hasOwnProperty("active")){
				if(data.active){
					data.formatted_status="ACTIVO";
					if(this.checkAction("ITINERARY-INACTIVE")!=null){
						data.actions.push(this.checkAction("ITINERARY-INACTIVE"));
					}
				}else{
					data.formatted_status="INACTIVO";
					if(this.checkAction("ITINERARY-ACTIVE")!=null){
						data.actions.push(this.checkAction("ITINERARY-ACTIVE"));
					}
				}
			}
			return data;
		}
	}
	app.RouteReportComponent.prototype.checkAction=function(data){
		if(this.actions==null || this.actions==undefined || this.actions.length==0){
			return null;
		}else{
			for(var i=0;i<this.actions.length;i++){
				if(this.actions[i]!=null){
					if(this.actions[i].name==data){
						return this.actions[i];
						break;
					}
				}
			}
			return null;
		}
	}
	app.RouteReportComponent.prototype.deselectedData = function() {
		this.dataSelected = null;
	}
	app.RouteReportComponent.prototype.selectedAction = function(data, action) {
		this.dataSelected = data;
		if (action.hasOwnProperty('name')) {
			switch (action.name) {
				case 'ITINERARY-DELETE':{
					$("#modalDeleteRoute").modal("show");
				}break;
				case 'ITINERARY-ACTIVE':{
					$("#modalActivateRoute").modal("show");
				}break;
				case 'ITINERARY-INACTIVE':{
					$("#modalInactivateRoute").modal("show");
				}break;
				case 'ITINERARY-VIEW':{
					this.router.navigate(['/route-view'], { queryParams: { id: data.id,business_id:data.business_id} });
				}break;
				case 'ITINERARY-UPDATE':{
					this.router.navigate(['/route-update'], { queryParams: { id: data.id,business_id:data.business_id} });
				}break;
				
				
				default:{}
			}
		}
	}
	app.RouteReportComponent.prototype.deleteData=function(){
		$("#modalDeleteRoute").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning9"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&id="+this.dataSelected.id+"&line_id="+this.dataSelected.business_id;
					let mensajeAll=_("message_dflt_11");
					let request = this.service.callServicesHttp("route-delete", querys,null );
					request.subscribe(data => {
						this.procesarRespuestaDelete(data);
					}, err => {
						this.mensaje = this.service.processError(err, mensajeAll);
						this.msg.error();
					});
				}
			}
		}
	
	}
	app.RouteReportComponent.prototype.activeData=function(){
		$("#modalActivateRoute").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning9"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&id="+this.dataSelected.id+"&line_id="+this.dataSelected.business_id+"&name="+this.dataSelected.name+"&active=true"+"&type="+this.dataSelected.type;
					if(this.dataSelected.type=="SHORT_ROUTE"){
						querys=querys+"&short_route_rate="+this.dataSelected.short_route_rate+"&short_route_rate_currency="+this.dataSelected.short_route_rate_currency;
					}
					var parametros=[];
					if(this.dataSelected.hasOwnProperty("stops")){
						if(this.dataSelected.stops!=null && this.dataSelected.stops.length!=0){
							for(var i=0;i<this.dataSelected.stops.length;i++){
								if(this.dataSelected.stops[i]!=null){
									if(this.dataSelected.stops[i].hasOwnProperty("code")){
										if(!(this.dataSelected.stops[i].code==null || this.dataSelected.stops[i].code==undefined || this.dataSelected.stops[i].code=="")){
											parametros.push(this.dataSelected.stops[i].code);
										}
									}
								}
							}
						}
					}
					let mensajeAll=_("message_dflt_13");
					let request = this.service.callServicesHttp("route-put", querys, parametros);
					request.subscribe(data => {
						this.procesarRespuestaActivar(data);
					}, err => {
						this.mensaje = this.service.processError(err, mensajeAll);
						this.msg.error();
					});
				}
			}
		}
	}
	app.RouteReportComponent.prototype.inactiveData=function(){
		$("#modalInactivateRoute").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning9"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&id="+this.dataSelected.id+"&line_id="+this.dataSelected.business_id+"&name="+this.dataSelected.name+"&active=false"+"&type="+this.dataSelected.type;
					if(this.dataSelected.type=="SHORT_ROUTE"){
						querys=querys+"&short_route_rate="+this.dataSelected.short_route_rate+"&short_route_rate_currency="+this.dataSelected.short_route_rate_currency;
					}
					var parametros=[];
					if(this.dataSelected.hasOwnProperty("stops")){
						if(this.dataSelected.stops!=null && this.dataSelected.stops.length!=0){
							for(var i=0;i<this.dataSelected.stops.length;i++){
								if(this.dataSelected.stops[i]!=null){
									if(this.dataSelected.stops[i].hasOwnProperty("code")){
										if(!(this.dataSelected.stops[i].code==null || this.dataSelected.stops[i].code==undefined || this.dataSelected.stops[i].code=="")){
											parametros.push(this.dataSelected.stops[i].code);
										}
									}
								}
							}
						}
					}
					let mensajeAll=_("message_dflt_12");
					let request = this.service.callServicesHttp("route-put", querys, parametros);
					request.subscribe(data => {
						this.procesarRespuestaDesactivar(data);
					}, err => {
						this.mensaje = this.service.processError(err, mensajeAll);
						this.msg.error();
					});
				}
			}
		}
	}
	app.RouteReportComponent.prototype.procesarRespuestaDelete=function(data){
		let mensajeAll=_("message_dflt_11");
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				this.ngOnInit();
				this.mensaje=capitalizeOnly(_("success7"));
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.RouteReportComponent.prototype.procesarRespuestaActivar=function(data){
		let mensajeAll=_("message_dflt_13")
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				if(data.hasOwnProperty("id")){
					if(this.listRegister!=null && this.listRegister.length!=0){
						for(var i=0;i<this.listRegister.length;i++){
							if(this.listRegister[i]!=null){
								if(this.listRegister[i].id==data.id && this.listRegister[i].business_id==data.business_id){
									this.listRegister[i]=this.formattedData(data);
									break;
								}
							}
						}
					}
				}
				this.mensaje=_("success9");
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.RouteReportComponent.prototype.procesarRespuestaDesactivar=function(data){
		let mensajeAll=_("message_dflt_12")
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				if(data.hasOwnProperty("id")){
					if(this.listRegister!=null && this.listRegister.length!=0){
						for(var i=0;i<this.listRegister.length;i++){
							if(this.listRegister[i]!=null){
								if(this.listRegister[i].id==data.id && this.listRegister[i].business_id==data.business_id){
									this.listRegister[i]=this.formattedData(data);
									break;
								}
							}
						}
					}
				}
				this.mensaje=_("success8");
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.RouteReportComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));