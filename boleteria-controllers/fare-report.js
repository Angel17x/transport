(function(app) {
	app.FareReportComponent =
		ng.core.Component({
		selector: 'fare-report',
		templateUrl: 'views/fare-report-v3.html',
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
	app.FareReportComponent.prototype.ngOnInit=function(){
		this.dataSelected=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=10;
		this.pageSelected=1;
		this.listRegister=[];
		this.listTypes=[{value:null,name:"Todos"},{value:"LONG_ROUTE",name:"Ruta Larga"},{value:"SHORT_ROUTE",name:"Ruta Corta"}];
		this.type=null;
		this.nombre=null;
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
	app.FareReportComponent.prototype.checkRol=function(){
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
							if(tabla[i].name=="FARE"){
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
								if(tabla[i].tag=="FARE"){
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
	app.FareReportComponent.prototype.formattedActions=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.FareReportComponent.prototype.formattedView=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.name=="FARE-REPORT"){
				return null;
			}
			if(data.name=="FARE-CREATE"){
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
	app.FareReportComponent.prototype.search=function(){
		this.jsonFilter={};
		if(!(this.nombre==null || this.nombre==undefined || this.nombre=="" || this.nombre=="null")){
			this.jsonFilter.name=this.nombre.trim();
		}
		if(!(this.linea==null || this.linea==undefined || this.linea=="" || this.linea=="null")){
			this.jsonFilter.line=this.linea.trim();
		}
		if(!(this.tipo==null || this.tipo==undefined || this.tipo=="" || this.tipo=="null")){
			this.jsonFilter.vehicle_type=this.tipo.trim();
		}if(!(this.salida==null || this.salida==undefined || this.salida=="" || this.salida=="null")){
			this.jsonFilter.start_stop=this.salida.trim();
		}
		if(!(this.llegada==null || this.llegada==undefined || this.llegada=="" || this.llegada=="null")){
			this.jsonFilter.destination_stop=this.llegada.trim();
		}
		if(!(this.type==null || this.type==undefined || this.type=="" || this.type=="null")){
			this.jsonFilter.route_type=[this.type];
		}
		this.callServices(1, "&limit="+this.detallePorPagina);
	}
	app.FareReportComponent.prototype.clean=function(){
		this.nombre=null;
		this.linea=null;
		this.tipo=null;
		this.salida=null;
		this.llegada=null;
		this.type=null;
	}
	app.FareReportComponent.prototype.getCantidadSelected=function(data){
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
	app.FareReportComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.FareReportComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.FareReportComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.FareReportComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.FareReportComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.FareReportComponent.prototype.callServices = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="&type=PAGINATE"+parametros;
		let request = this.service.callServicesHttp("fare-report", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.FareReportComponent.prototype.procesarRespuesta=function(data){
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
	app.FareReportComponent.prototype.checkAction=function(data){
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
	app.FareReportComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.hasOwnProperty("route_type")){
				if(!(data.route_type==null || data.route_type==undefined || data.route_type=="")){
					data.formatted_route=_(data.route_type).toUpperCase();
				}
			}
			if(data.hasOwnProperty("currency")){
				if(!(data.currency==null || data.currency==undefined || data.currency=="")){
					data.formatted_currency=_(data.currency);
				}
			}
			data.actions=[];
			if(this.checkAction("FARE-DELETE")!=null){
				data.actions.push(this.checkAction("FARE-DELETE"));
			}
			if(this.checkAction("FARE-UPDATE")!=null){
				data.actions.push(this.checkAction("FARE-UPDATE"));
			}
			return data;
		}
	}
	app.FareReportComponent.prototype.deselectedData = function() {
		this.dataSelected = null;
	}
	app.FareReportComponent.prototype.selectedAction = function(data, action) {
		this.dataSelected = data;
		if (action.hasOwnProperty('name')) {
			switch (action.name) {
				case 'FARE-DELETE':{
					$("#modalDeleteFare").modal("show");
				}break;
				case 'FARE-UPDATE':{
					this.router.navigate(['/fare-update'], { queryParams: { id: data.id, business_id:data.business_id, vehicle_type_id:data.vehicle_type_id} });
				}break;
				default:{}
			}
		}
	}
	app.FareReportComponent.prototype.deleteData=function(){
		$("#modalDeleteFare").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning47"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&id="+this.dataSelected.id+"&line_id="+this.dataSelected.business_id+"&vehicle_type_id="+this.dataSelected.vehicle_type_id ;
					let mensajeAll=_("message_dflt_63");
					let request = this.service.callServicesHttp("fare-delete", querys,null );
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
	app.FareReportComponent.prototype.procesarRespuestaDelete=function(data){
		let mensajeAll=_("message_dflt_63");
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				this.ngOnInit();
				this.mensaje=capitalizeOnly(_("success46"));
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.FareReportComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));