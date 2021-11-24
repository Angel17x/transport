(function(app) {
	app.TravelCreateComponent =
		ng.core.Component({
		selector: 'travel-create',
		templateUrl: 'views/travel-create-v5.html',
		})
		.Class({
		  constructor: [app.MsgComponent,ng.router.Router,ng.router.ActivatedRoute,app.AppCallService, app.LoadingServiceComponent,
		  function(msg,router,active,ser,loading) {
	          this.msg=msg;
	          this.mensaje="";
	          this.router=router;  
	          this.active=active;
			  this.service=ser;
			  this.loading=loading;
		  }]
		});
	app.TravelCreateComponent.prototype.ngOnInit=function(){
		this.title="Nuevo viaje";
		this.class1="col-lg-3 col-md-3 col-sm-6 col-12";
		this.disponibilidad=null;
		this.fecha=null;
		this.hora=null;
		this.save=true;
		this.mostrarCargando=false;
		this.imagenCargando="assets/images/loading.gif";
		this.lineaSelected=null;
		this.lineaSelectedShow=null;
		this.totalPageLine=1;
		this.pageSelectedLine=1;
		this.detallePorPaginaLine=10;
		this.pagingActualLine={};
		this.listTarifasSelected=[];
		this.capacidad_mayor=0;
		this.vehicleSelected=null;
		this.vehicleSelectedShow=null;
		this.totalPageVehicle=1;
		this.pageSelectedVehicle=1;
		this.detallePorPaginaVehicle=10;
		this.pagingActualVehicle={};
		this.listVehicles=[];
		this.vehicle_buscar=null;
		
		this.rutaSelected=null;
		this.rutaSelectedShow=null;
		this.totalPageRuta=1;
		this.pageSelectedRuta=1;
		this.detallePorPaginaRuta=10;
		this.pagingActualRuta={};
		this.listRutas=[];
		this.ruta_buscar=null;
		this.codigo_ciudad=null;
		
		this.pagingActualTarifa={};
		this.totalPageTarifa=1;
		this.detallePorPaginaTarifa=10;
		this.pageSelectedTarifa=1;
		this.listTarifas=[];
		this.capacidad=0;
		
		this.pagingActualChofer={};
		this.totalPageChofer=1;
		this.detallePorPaginaChofer=10;
		this.pageSelectedChofer=1;
		this.listChoferes=[];
		this.listChoferesSelected=[];
		this.texto="Guardar";
		this.active_status=true;
		this.type=null;
		this.status_publicacion="UNPUBLISHED";
		try{
			var g=document.getElementsByClassName('modal-backdrop')[0];
			if(g!=null){
				var padre=g.parentNode;
				padre.removeChild(g);
			}
		}catch(er){
		}
		this.puerta=null;
		this.listTypes=[{value:"LONG_ROUTE",name:"Ruta Larga"},{value:"SHORT_ROUTE",name:"Ruta Corta"}]
		this.checkRol();
	}
	app.TravelCreateComponent.prototype.checkRol=function(){
		var texto="TRIP-CREATE";
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'travel-create') {
				this.title = _("title62");
				this.save = true;
				texto="TRIP-CREATE";
			} else {
				this.title = _("title63");;
				this.save = false;
				this.class1="col-lg-4 col-md-4 col-sm-6 col-12";
				texto="TRIP-UPDATE";
			}
		}
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
	app.TravelCreateComponent.prototype.getData=function(){
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null){
						if(this.active.queryParams._value.hasOwnProperty('trip_id')){
							this.id=this.active.queryParams._value.trip_id;
							if(this.active.queryParams._value.hasOwnProperty('business_id')){
								this.business_id=this.active.queryParams._value.business_id;
								if(this.active.queryParams._value.hasOwnProperty('itinerary_id')){
									this.itinerary_id=this.active.queryParams._value.itinerary_id;
									this.getService();
								}
							}
						}
					}
				}
			}
		}
	}
	app.TravelCreateComponent.prototype.getService=function(){
		let request=this.service.callServicesHttp('travel-get',this.business_id+"?realm="+this.service.getRealm()+"&itinerary_id="+this.itinerary_id+"&id="+this.id,null);
		let mensajeAll=_("message_dflt_79");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.TravelCreateComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_79");
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
	app.TravelCreateComponent.prototype.formattedDataGET=function(data){
		if(!(data==null || data==undefined || data=="")){
			if(data.hasOwnProperty("short_route_rate")){
				if(!(data.short_route_rate==null || data.short_route_rate==undefined || data.short_route_rate=="")){
					this.short_route_rate=data.short_route_rate;
					try{
						this.monto_tasa=amountFormattingObject(data.short_route_rate*100);
						this.monto_tasa=this.monto_tasa.integerPart+","+this.monto_tasa.decimalPart;
						if(data.hasOwnProperty("short_route_rate_currency")){
							if(!(data.short_route_rate_currency==null || data.short_route_rate_currency==undefined || data.short_route_rate_currency=="")){
								this.monto_tasa=this.monto_tasa+" "+data.short_route_rate_currency;
							}
						}
					}catch(er){
						this.monto_tasa=null;
					}
				}
			}
			if(data.hasOwnProperty("line_code")){
				if(!(data.line_code==null || data.line_code=="" || data.line_code==undefined)){
					this.line_name=data.line_code;
					if(data.hasOwnProperty("line_name")){
						if(!(data.line_name==null || data.line_name=="" || data.line_name==undefined)){
							this.line_name=this.line_name+" "+data.line_name;
						}
					}
				}
			}
			this.ruta="";
			if(data.hasOwnProperty("fares")){
				if(data.fares!=null && data.fares.length!=0){
					this.listTarifasSelected=[];
					var objeto={};
					for(var i=0;i<data.fares.length;i++){
						if(data.fares[i]!=null){
							objeto={};
							objeto=this.formattedTarifa(data.fares[i]);
							if(objeto!=null){
								this.listTarifasSelected.push(objeto);
							}
							if(i==data.fares[i].length-1){
								this.ruta=this.ruta+data.fares[i].destination_stop_code;
							}else{
								this.ruta=this.ruta+data.fares[i].destination_stop_code+" - ";
							}
						}
					}
				}
			}
			if(data.hasOwnProperty("drivers")){
				if(data.drivers!=null && data.drivers.length!=0){
					this.listChoferesSelected=[];
					var objeto={};
					for(var i=0;i<data.drivers.length;i++){
						if(data.drivers[i]!=null){
							objeto={};
							objeto=data.drivers[i];
							if(objeto!=null){
								this.listChoferesSelected.push(objeto);
							}
						}
					}
				}
			}
		}
		if(data.hasOwnProperty("business_id")){
			this.lineaSelected={};
			this.lineaSelected.id=data.business_id;
			if(data.hasOwnProperty("line_code")){
				this.lineaSelected.code=data.line_code;
			}
			if(data.hasOwnProperty("line_name")){
				this.lineaSelected.name=data.line_name;
			}
		}
		if(data.hasOwnProperty("type")){
			if(!(data.type==null || data.type==undefined || data.type=="")){
				this.type=data.type;
			}
		}
		if(data.hasOwnProperty("departure_date")){
			if(!(data.departure_date==null || data.departure_date==undefined || data.departure_date=="")){
				try{
					var aux=data.departure_date.split("T");
					if(aux!=null){
						this.fecha=aux[0];
						this.time=aux[1].split(":");
						this.time=this.time[0]+":"+this.time[1];
					}
				}catch(er){
				}
			}
		}
		if(data.hasOwnProperty("vehicle_id")){
			this.vehicleSelected={};
			this.vehicleSelected.id=data.vehicle_id;
			if(data.hasOwnProperty("vehicle_bodywork")){
				this.vehicleSelected.bodywork=data.vehicle_bodywork;
			}
			if(data.hasOwnProperty("vehicle_license_plate")){
				this.vehicleSelected.license_plate=data.vehicle_license_plate;
				this.vehicleSelectedShow=this.vehicleSelected.license_plate;
			}
			if(data.hasOwnProperty("vehicle_type_id")){
				this.vehicleSelected.vehicle_type_id=data.vehicle_type_id;
			}
			
			if(data.hasOwnProperty("vehicle_owner_id")){
				this.vehicleSelected.owner_id=data.vehicle_owner_id;
			}
		}
		if(data.hasOwnProperty("seats_active")){
			this.capacidad=data.seats_active;
		}
		if(data.hasOwnProperty("boarding_gate")){
			this.puerta=data.boarding_gate;
		}
		if(data.hasOwnProperty("passenger_limits")){
			if(!(data.passenger_limits==null || data.passenger_limits==undefined || data.passenger_limits=="")){
				if(data.passenger_limits.hasOwnProperty("ELDERLY")){
					this.capacidad_mayor=data.passenger_limits.ELDERLY;
				}
			}
		}
		if(data.hasOwnProperty("status")){
			this.status_publicacion=data.status;
		}
		if(data.hasOwnProperty("active")){
			this.active_status=data.active;
		}
	}
	app.TravelCreateComponent.prototype.getCantidadSelectedLine=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPaginaLine = data.detalles;
			this.totalPageLine= data.pagina;
			if (this.listLines == null || this.listLines == undefined || this.listLines.length == 0) {
				this.mensajeServicio = capitalizeOnly(_("message_dflt_4"));
			} else {
				this.callServicesLine(1, '&limit=' + this.detallePorPaginaLine);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueFirstLine=function(data){
		this.listLines = [];
		if (this.pagingActualLine.hasOwnProperty('first_page')) {
			if (!(this.pagingActualLine.first_page == null || this.pagingActualLine.first_page == undefined || this.pagingActualLine.first_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.first_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValuePreviousLine=function(data){
		this.listLines = [];
		if (this.pagingActualLine.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualLine.previous_page == null || this.pagingActualLine.previous_page == undefined || this.pagingActualLine.previous_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.previous_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueLastLine=function(data){
		this.listLines = [];
		if (this.pagingActualLine.hasOwnProperty('last_page')) {
			if (!(this.pagingActualLine.last_page == null || this.pagingActualLine.last_page == undefined || this.pagingActualLine.last_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.last_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueNextLine=function(data){
		this.listLines = [];
		if (this.pagingActualLine.hasOwnProperty('next_page')) {
			if (!(this.pagingActualLine.next_page == null || this.pagingActualLine.next_page == undefined || this.pagingActualLine.next_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.next_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueChangeRecordsLine=function(data){
		this.pageSelectedLine = data;
	}
	app.TravelCreateComponent.prototype.callServicesLine = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelectedLine = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		this.mostrarCargando=true;
		let request = this.service.callServicesHttp("line-report", querys, this.jsonFilterLine);
		request.subscribe(data => {
			this.mostrarCargando=false;
			this.procesarRespuestaLine(data);
		}, err => {
			this.mostrarCargando=false;
			this.mensajeServicio = this.service.processError(err, mensajeAll);
		});
	}
	app.TravelCreateComponent.prototype.procesarRespuestaLine=function(data){
		var key="results";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			this.listLines=[];
			this.mensajeServicio=mensajeAll;
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("count")){
					if(data.count==null || data.count==undefined || data.count==0){
						this.listLines=[];
					}else{
						this.pagingActualLine = {};
						this.pagingActualLine.count = data.count;
						let auxP = Math.floor(this.pagingActualLine.count / this.detallePorPaginaLine);
						let restoAux = ((this.pagingActualLine.count) % this.detallePorPaginaLine);
						if (restoAux == 0) {
							this.totalPageLine = auxP;
						} else {
							this.totalPageLine = auxP + 1;
						}
						if (data.hasOwnProperty('next_page')) {
							if (data.next_page == null || data.next_page == undefined || data.next_page == "") {
								this.pagingActualLine.next_page = null;
							} else {
								this.pagingActualLine.next_page = data.next_page;
							}
						} else {
							this.pagingActualLine.next_page = null;
						}
						if (data.hasOwnProperty('previous_page')) {
							if (data.previous_page == null || data.previous_page == undefined || data.previous_page == "") {
								this.pagingActualLine.previous_page = null;
							} else {
								this.pagingActualLine.previous_page = data.previous_page;
							}
						} else {
							this.pagingActualLine.previous_page = null;
						}
						if (data.hasOwnProperty('first_page')) {
							if (data.first_page == null || data.first_page == undefined || data.first_page == "") {
								this.pagingActualLine.first_page = null;
							} else {
								this.pagingActualLine.first_page = data.first_page;
							}
						} else {
							this.pagingActualLine.first_page = null;
						}
						if (data.hasOwnProperty('last_page')) {
							if (data.last_page == null || data.last_page == undefined || data.last_page == "") {
								this.pagingActualLine.last_page = null;
							} else {
								this.pagingActualLine.last_page = data.last_page;
							}
						} else {
							this.pagingActualLine.last_page = null;
						}
						if (data.hasOwnProperty(key)) {
							var objeto = {};
							this.listLines = [];
							for (var i = 0; i < data[key].length; i++) {
								objeto = data[key][i];
								if (objeto != null) {
									this.listLines.push(objeto);
								}
							}
							this.pagingActualLine.count = data.count;
						}else{
							this.listLines=[];
						}
					}
				}else{
					this.listLines=[];
				}
			}else{
				this.mensajeServicio=this.service.processMessageError(data,mensajeAll);
			}
		}
	}
	app.TravelCreateComponent.prototype.openModalLineas=function(){
		this.mensajeServicio=null;
		this.mostrarCargando=false;
		this.linea_buscar=null;
		this.listLines=[];
		$("#modalLineas").modal("show");
	}
	app.TravelCreateComponent.prototype.buscarLinea=function(){
		this.jsonFilterLine={};
		var datos=[];
		var entity=null;
		if(!(this.linea_buscar==null || this.linea_buscar==undefined || this.linea_buscar=="" || this.linea_buscar=="null")){
			if(entity==null){
				entity={};
			}
			entity.name="*"+this.linea_buscar+"*";
		}
		if(entity==null){
			entity={};
		}
		entity.active=true;
		if(entity!=null){
			datos={entity:entity,level: "AND"};
			let aux1=[datos];
			this.jsonFilterLine.entities=aux1;
		}
		
		this.jsonFilterLine.sort={"info.created_at":"desc"};
		this.callServicesLine(1,"&offset=0&limit="+this.detallePorPaginaLine);
	}
	app.TravelCreateComponent.prototype.selectedLinea=function(item){
		if(item!=null){
			$("#modalLineas").modal("hide");
			this.lineaSelected=item;
			this.rutaSelected=null;
			this.type=null;
			this.rutaSelectedShow=null;
			this.vehicleSelected=null;
			this.vehicleSelectedShow=null;
			this.listChoferes=[];
			this.listChoferesSelected=[];
			this.listTarifas=[];
			this.listTarifasSelected=[];
			if(item.hasOwnProperty("name")){
				this.lineaSelectedShow=item.name;
			}
		}
	}
	app.TravelCreateComponent.prototype.getCantidadSelectedRuta=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPaginaRuta = data.detalles;
			this.totalPageRuta= data.pagina;
			if (this.listRutas == null || this.listRutas == undefined || this.listRutas.length == 0) {
				this.mensajeServicio = capitalizeOnly(_("message_dflt_4"));
			} else {
				this.callServicesRuta(1, '&limit=' + this.detallePorPaginaRuta);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueFirstRuta=function(data){
		this.listRutas = [];
		if (this.pagingActualRuta.hasOwnProperty('first_page')) {
			if (!(this.pagingActualRuta.first_page == null || this.pagingActualRuta.first_page == undefined || this.pagingActualRuta.first_page == "")) {
				this.callServicesRuta(data, this.pagingActualRuta.first_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValuePreviousRuta=function(data){
		this.listRutas = [];
		if (this.pagingActualRuta.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualRuta.previous_page == null || this.pagingActualRuta.previous_page == undefined || this.pagingActualRuta.previous_page == "")) {
				this.callServicesRuta(data, this.pagingActualRuta.previous_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueLastRuta=function(data){
		this.listRutas = [];
		if (this.pagingActualRuta.hasOwnProperty('last_page')) {
			if (!(this.pagingActualRuta.last_page == null || this.pagingActualRuta.last_page == undefined || this.pagingActualRuta.last_page == "")) {
				this.callServicesRuta(data, this.pagingActualRuta.last_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueNextRuta=function(data){
		this.listRutas = [];
		if (this.pagingActualRuta.hasOwnProperty('next_page')) {
			if (!(this.pagingActualRuta.next_page == null || this.pagingActualRuta.next_page == undefined || this.pagingActualRuta.next_page == "")) {
				this.callServicesRuta(data, this.pagingActualRuta.next_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueChangeRecordsRuta=function(data){
		this.pageSelectedRuta = data;
	}
	app.TravelCreateComponent.prototype.callServicesRuta = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelectedRuta = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		this.mostrarCargando=true;
		let request = this.service.callServicesHttp("route-report", querys, this.jsonFilterRoute);
		request.subscribe(data => {
			this.mostrarCargando=false;
			this.procesarRespuestaRuta(data);
		}, err => {
			this.mostrarCargando=false;
			this.mensajeServicio = this.service.processError(err, mensajeAll);
		});
	}
	app.TravelCreateComponent.prototype.procesarRespuestaRuta=function(data){
		var key="results";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			this.listRutas=[];
			this.mensajeServicio=mensajeAll;
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("count")){
					if(data.count==null || data.count==undefined || data.count==0){
						this.listRutas=[];
					}else{
						this.pagingActualRuta = {};
						this.pagingActualRuta.count = data.count;
						let auxP = Math.floor(this.pagingActualRuta.count / this.detallePorPaginaRuta);
						let restoAux = ((this.pagingActualRuta.count) % this.detallePorPaginaRuta);
						if (restoAux == 0) {
							this.totalPageRuta = auxP;
						} else {
							this.totalPageRuta = auxP + 1;
						}
						if (data.hasOwnProperty('next_page')) {
							if (data.next_page == null || data.next_page == undefined || data.next_page == "") {
								this.detallePorPaginaRuta.next_page = null;
							} else {
								this.detallePorPaginaRuta.next_page = data.next_page;
							}
						} else {
							this.pagingActualRuta.next_page = null;
						}
						if (data.hasOwnProperty('previous_page')) {
							if (data.previous_page == null || data.previous_page == undefined || data.previous_page == "") {
								this.pagingActualRuta.previous_page = null;
							} else {
								this.pagingActualRuta.previous_page = data.previous_page;
							}
						} else {
							this.pagingActualRuta.previous_page = null;
						}
						if (data.hasOwnProperty('first_page')) {
							if (data.first_page == null || data.first_page == undefined || data.first_page == "") {
								this.pagingActualRuta.first_page = null;
							} else {
								this.pagingActualRuta.first_page = data.first_page;
							}
						} else {
							this.pagingActualRuta.first_page = null;
						}
						if (data.hasOwnProperty('last_page')) {
							if (data.last_page == null || data.last_page == undefined || data.last_page == "") {
								this.pagingActualRuta.last_page = null;
							} else {
								this.pagingActualRuta.last_page = data.last_page;
							}
						} else {
							this.pagingActualRuta.last_page = null;
						}
						if (data.hasOwnProperty(key)) {
							var objeto = {};
							this.listRutas = [];
							for (var i = 0; i < data[key].length; i++) {
								objeto = data[key][i];
								if (objeto != null) {
									this.listRutas.push(objeto);
								}
							}
							this.pagingActualRuta.count = data.count;
						}else{
							this.listRutas=[];
						}
					}
				}else{
					this.listRutas=[];
				}
			}else{
				this.mensajeServicio=this.service.processMessageError(data,mensajeAll);
			}
		}
	}
	app.TravelCreateComponent.prototype.openModalRuta=function(){
		if(this.lineaSelected==null || this.lineaSelected==undefined || this.lineaSelected==""){
			this.mensaje="Debe seleccionar la linea para poder buscar las rutas disponibles";
			this.msg.warning();
			return;
		}
		this.mensajeServicio=null;
		this.mostrarCargando=false;
		this.ruta_buscar=null;
		this.listRutas=[];
		$("#modalRuta").modal("show");
	}
	app.TravelCreateComponent.prototype.buscarRuta=function(){
		if(this.lineaSelected==null || this.lineaSelected==undefined || this.lineaSelected==""){
			this.mensaje="Debe seleccionar la linea para poder buscar las rutas disponibles";
			this.msg.warning();
			return;
		}
		this.jsonFilterRoute={};
		this.jsonFilterRoute.business_id=[this.lineaSelected.id];
		this.jsonFilterRoute.active=true;
		if(this.texto_viaje=="TRIP-SHORT-CREATE"){
			this.jsonFilterRoute.type=["SHORT_ROUTE"];
		}else{
			if(this.texto_viaje=="TRIP-LONG-CREATE"){
				this.jsonFilterRoute.type=["LONG_ROUTE"];
			}
		}
		if(!(this.ruta_buscar==null || this.ruta_buscar==undefined || this.ruta_buscar=="" || this.ruta_buscar=="null")){
			this.ruta_buscar=(this.ruta_buscar+"").trim();
			this.jsonFilterRoute.stop=this.ruta_buscar;
		}
		this.callServicesRuta(1,"&offset=0&limit="+this.detallePorPaginaRuta);
	}
	app.TravelCreateComponent.prototype.translateTexto=function(data){
		return _(data).toUpperCase();
	}
	app.TravelCreateComponent.prototype.keyupsearch=function(event,funcion){
		try{
			 if (event.keyCode == 13) {
				 if(funcion=="LINEA"){
					 this.buscarLinea();
				 }else{
					if(funcion=="RUTA"){
						this.buscarRuta();
					}else{
						if(funcion=="VEHICULO"){
							this.buscarVehicle();
						}else{
							if(funcion=="TARIFAS"){
								this.searchTarifas();
							}else{
								if(funcion=="CHOFERES"){
									this.searchChoferes();
								}
							}
						}
					}
				 }
			 }
		}catch(err){
			
		}
	}
	app.TravelCreateComponent.prototype.selectedRuta=function(item){
		if(item!=null){
			$("#modalRuta").modal("hide");
			if(item.hasOwnProperty("type")){
				if(item.type==null || item.type==undefined || item.type==""){
					this.mensaje="La ruta seleccionada no tiene el tipo, debe ir a la sección de RUTAS> ACTUALIZAR RUTA";
					this.msg.warning();
					return;
				}else{
					this.type=item.type
				}
			}else{
				this.mensaje="La ruta seleccionada no tiene el tipo, debe ir a la sección de RUTAS> ACTUALIZAR RUTA";
				this.msg.warning();
				return;
			}
			this.rutaSelected=item;
			this.monto_tasa=null;
			if(item.hasOwnProperty("stops")){
				if(item.stops!=null && item.stops.length!=0){
					this.rutaSelectedShow=""
					for(var i=0;i<item.stops.length;i++){
						if(item.stops[i]!=null){
							if(i==item.stops[i].length-1){
								this.rutaSelectedShow=this.rutaSelectedShow+item.stops[i].code;
							}else{
								this.rutaSelectedShow=this.rutaSelectedShow+item.stops[i].code+" - ";
							}
						}
					}
				}
			}
			if(item.hasOwnProperty("short_route_rate")){
				if(!(item.short_route_rate==null || item.short_route_rate==undefined || item.short_route_rate=="")){
					this.short_route_rate=item.short_route_rate;
					try{
						this.monto_tasa=amountFormattingObject(item.short_route_rate*100);
						this.monto_tasa=this.monto_tasa.integerPart+","+this.monto_tasa.decimalPart;
						if(item.hasOwnProperty("short_route_rate_currency")){
							if(!(item.short_route_rate_currency==null || item.short_route_rate_currency==undefined || item.short_route_rate_currency=="")){
								this.monto_tasa=this.monto_tasa+" "+item.short_route_rate_currency;
							}
						}
					}catch(er){
						this.monto_tasa=null;
					}
				}
			}
		}
	}
	app.TravelCreateComponent.prototype.getCantidadSelectedVehicle=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPaginaVehicle = data.detalles;
			this.totalPageVehicle= data.pagina;
			if (this.listVehicles == null || this.listVehicles == undefined || this.listVehicles.length == 0) {
				this.mensajeServicio = capitalizeOnly(_("message_dflt_4"));
			} else {
				this.callServicesVehicle(1, '&limit=' + this.detallePorPaginaVehicle);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueFirstVehicle=function(data){
		this.listVehicles = [];
		if (this.pagingActualVehicle.hasOwnProperty('first_page')) {
			if (!(this.pagingActualVehicle.first_page == null || this.pagingActualVehicle.first_page == undefined || this.pagingActualVehicle.first_page == "")) {
				this.callServicesVehicle(data, this.pagingActualVehicle.first_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValuePreviousVehicle=function(data){
		this.listVehicles = [];
		if (this.pagingActualVehicle.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualVehicle.previous_page == null || this.pagingActualVehicle.previous_page == undefined || this.pagingActualVehicle.previous_page == "")) {
				this.callServicesVehicle(data, this.pagingActualVehicle.previous_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueLastVehicle=function(data){
		this.listVehicles = [];
		if (this.pagingActualVehicle.hasOwnProperty('last_page')) {
			if (!(this.pagingActualVehicle.last_page == null || this.pagingActualVehicle.last_page == undefined || this.pagingActualVehicle.last_page == "")) {
				this.callServicesVehicle(data, this.pagingActualVehicle.last_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueNextVehicle=function(data){
		this.listVehicles = [];
		if (this.pagingActualVehicle.hasOwnProperty('next_page')) {
			if (!(this.pagingActualVehicle.next_page == null || this.pagingActualVehicle.next_page == undefined || this.pagingActualVehicle.next_page == "")) {
				this.callServicesVehicle(data, this.pagingActualVehicle.next_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueChangeRecordsVehicle=function(data){
		this.pageSelectedVehicle = data;
	}
	app.TravelCreateComponent.prototype.callServicesVehicle = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelectedVehicle = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		this.mostrarCargando=true;
		let request = this.service.callServicesHttp("car-report", querys, this.jsonFilterVehicle);
		request.subscribe(data => {
			this.mostrarCargando=false;
			this.procesarRespuestaVehicle(data);
		}, err => {
			this.mostrarCargando=false;
			this.mensajeServicio = this.service.processError(err, mensajeAll);
		});
	}
	app.TravelCreateComponent.prototype.procesarRespuestaVehicle=function(data){
		var key="results";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			this.listVehicles=[];
			this.mensajeServicio=mensajeAll;
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("count")){
					if(data.count==null || data.count==undefined || data.count==0){
						this.listVehicles=[];
					}else{
						this.pagingActualVehicle = {};
						this.pagingActualVehicle.count = data.count;
						let auxP = Math.floor(this.pagingActualVehicle.count / this.detallePorPaginaVehicle);
						let restoAux = ((this.pagingActualVehicle.count) % this.detallePorPaginaVehicle);
						if (restoAux == 0) {
							this.totalPageVehicle = auxP;
						} else {
							this.totalPageVehicle = auxP + 1;
						}
						if (data.hasOwnProperty('next_page')) {
							if (data.next_page == null || data.next_page == undefined || data.next_page == "") {
								this.pagingActualVehicle.next_page = null;
							} else {
								this.pagingActualVehicle.next_page = data.next_page;
							}
						} else {
							this.pagingActualVehicle.next_page = null;
						}
						if (data.hasOwnProperty('previous_page')) {
							if (data.previous_page == null || data.previous_page == undefined || data.previous_page == "") {
								this.pagingActualVehicle.previous_page = null;
							} else {
								this.pagingActualVehicle.previous_page = data.previous_page;
							}
						} else {
							this.pagingActualVehicle.previous_page = null;
						}
						if (data.hasOwnProperty('first_page')) {
							if (data.first_page == null || data.first_page == undefined || data.first_page == "") {
								this.pagingActualVehicle.first_page = null;
							} else {
								this.pagingActualVehicle.first_page = data.first_page;
							}
						} else {
							this.pagingActualVehicle.first_page = null;
						}
						if (data.hasOwnProperty('last_page')) {
							if (data.last_page == null || data.last_page == undefined || data.last_page == "") {
								this.pagingActualVehicle.last_page = null;
							} else {
								this.pagingActualVehicle.last_page = data.last_page;
							}
						} else {
							this.pagingActualVehicle.last_page = null;
						}
						if (data.hasOwnProperty(key)) {
							var objeto = {};
							this.listVehicles = [];
							for (var i = 0; i < data[key].length; i++) {
								objeto = data[key][i];
								if (objeto != null) {
									this.listVehicles.push(objeto);
								}
							}
							this.pagingActualVehicle.count = data.count;
						}else{
							this.listVehicles=[];
						}
					}
				}else{
					this.listLines=[];
				}
			}else{
				this.mensajeServicio=this.service.processMessageError(data,mensajeAll);
			}
		}
	}
	app.TravelCreateComponent.prototype.openModalLineas=function(){
		this.mensajeServicio=null;
		this.mostrarCargando=false;
		this.linea_buscar=null;
		this.listLines=[];
		$("#modalLineas").modal("show");
	}
	app.TravelCreateComponent.prototype.openModalVehicle=function(){
		if(this.lineaSelected==null){
			this.mensaje="Debe seleccionar la línea de transporte primero";
			this.msg.warning();
			return;
		}
		this.mensajeServicio=null;
		this.mostrarCargando=false;
		this.vehicle_buscar=null;
		this.listVehicles=[];
		$("#modalVehicles").modal("show");
	}
	app.TravelCreateComponent.prototype.buscarVehicle=function(){
		this.jsonFilterVehicle={};
		var datos=[];
		var entity=null;
		if(entity==null){
			entity={};
		}
		entity.business_id=this.lineaSelected.id
		if(!(this.vehicle_buscar==null || this.vehicle_buscar==undefined || this.vehicle_buscar=="" || this.vehicle_buscar=="null")){
			if(entity==null){
				entity={};
			}
			entity.license_plate="*"+this.vehicle_buscar+"*";
		}
		entity.active=true;
		if(entity!=null){
			datos={entity:entity,level: "AND"};
			let aux1=[datos];
			this.jsonFilterVehicle.entities=aux1;
		}
		
		this.jsonFilterVehicle.sort={"info.created_at":"desc"};
		this.callServicesVehicle(1,"&offset=0&limit="+this.detallePorPaginaVehicle);
	}

	app.TravelCreateComponent.prototype.selectedVehicle=function(item){
		if(item!=null){
			$("#modalVehicles").modal("hide");
			this.vehicleSelected=item;
			if(item.hasOwnProperty("license_plate")){
				this.vehicleSelectedShow=item.license_plate;
			}
		}
	}
	app.TravelCreateComponent.prototype.searchTarifas=function(){
		if(this.lineaSelected==null || this.vehicleSelected==null){
			this.mensaje="Antes de colocar las tarifas debe seleccionar la linea de transporte y el vehículo";
			this.msg.warning();
			return;
		}
		this.jsonFilterTarifa={};
		this.jsonFilterTarifa.business_id=[this.lineaSelected.id];
		this.jsonFilterTarifa.vehicle_type_id=[this.vehicleSelected.vehicle_type_id];
		if(this.rutaSelected!=null){
			if(this.rutaSelected.hasOwnProperty("stops")){
				if(this.rutaSelected.stops!=null && this.rutaSelected.stops.length!=0){
					this.jsonFilterTarifa.stops=[];
					for(var i=0;i<this.rutaSelected.stops.length;i++){
						if(this.rutaSelected.stops[i]!=null){
							if(this.rutaSelected.stops[i].hasOwnProperty("code")){
								if(!(this.rutaSelected.stops[i].code==null || this.rutaSelected.stops[i].code==undefined || this.rutaSelected.stops[i].code=="")){
									if(this.rutaSelected.stops[i].code!="CCS"){
										this.jsonFilterTarifa.stops.push(this.rutaSelected.stops[i].code);
									}
									
								}
							}
						}
					}
				}
			}
		}
		if(this.type!=null && this.type!=undefined){
			this.jsonFilterTarifa.route_type=[this.type];
		}
		if(!(this.codigo_ciudad==null || this.codigo_ciudad==undefined || this.codigo_ciudad=="" || this.codigo_ciudad=="null")){
			this.jsonFilterTarifa.destination_stop=this.codigo_ciudad.trim();
		}
		this.callServicesTarifa(1, "&limit="+this.detallePorPaginaTarifa);
	}
	app.TravelCreateComponent.prototype.getCantidadSelectedTarifa=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPaginaTarifa = data.detalles;
			this.totalPageTarifa= data.pagina;
			if (this.listTarifas == null || this.listTarifas == undefined || this.listTarifas.length == 0) {
				this.mensaje = capitalizeOnly(_("message_dflt_4"));
				this.msg.warning();
				return;
			} else {
				this.callServicesTarifa(1, '&limit=' + this.detallePorPaginaTarifa);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueFirstTarifa=function(data){
		this.listTarifas = [];
		if (this.pagingActualTarifa.hasOwnProperty('first_page')) {
			if (!(this.pagingActualTarifa.first_page == null || this.pagingActualTarifa.first_page == undefined || this.pagingActualTarifa.first_page == "")) {
				this.callServicesTarifa(data, this.pagingActualTarifa.first_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValuePreviousTarifa=function(data){
		this.listTarifas = [];
		if (this.pagingActualTarifa.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualTarifa.previous_page == null || this.pagingActualTarifa.previous_page == undefined || this.pagingActualTarifa.previous_page == "")) {
				this.callServicesTarifa(data, this.pagingActualTarifa.previous_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueLastTarifa=function(data){
		this.listTarifas = [];
		if (this.pagingActualTarifa.hasOwnProperty('last_page')) {
			if (!(this.pagingActualTarifa.last_page == null || this.pagingActualTarifa.last_page == undefined || this.pagingActualTarifa.last_page == "")) {
				this.callServicesTarifa(data, this.pagingActualTarifa.last_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueNextTarifa=function(data){
		this.listTarifas = [];
		if (this.pagingActualTarifa.hasOwnProperty('next_page')) {
			if (!(this.pagingActualTarifa.next_page == null || this.pagingActualTarifa.next_page == undefined || this.pagingActualTarifa.next_page == "")) {
				this.callServicesTarifa(data, this.pagingActualTarifa.next_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueChangeRecordsTarifa=function(data){
		this.pageSelectedTarifa = data;
	}
	app.TravelCreateComponent.prototype.callServicesTarifa = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelectedTarifa = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let request = this.service.callServicesHttp("fare-report", querys, this.jsonFilterTarifa);
		request.subscribe(data => {
			this.procesarRespuestaTarifa(data);
		}, err => {
			this.mostrarCargando=false;
			this.mensajeServicio = this.service.processError(err, mensajeAll);
		});
	}
	app.TravelCreateComponent.prototype.procesarRespuestaTarifa=function(data){
		var key="results";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			this.listTarifas=[];
			this.mensajeServicio=mensajeAll;
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("count")){
					if(data.count==null || data.count==undefined || data.count==0){
						this.listTarifas=[];
						this.listTarifas=[];
						this.mensaje=_("warning55");
						this.msg.warning();
						return;
					}else{
						this.pagingActualTarifa = {};
						this.pagingActualTarifa.count = data.count;
						let auxP = Math.floor(this.pagingActualTarifa.count / this.detallePorPaginaTarifa);
						let restoAux = ((this.pagingActualTarifa.count) % this.detallePorPaginaTarifa);
						if (restoAux == 0) {
							this.totalPageVehicle = auxP;
						} else {
							this.totalPageVehicle = auxP + 1;
						}
						if (data.hasOwnProperty('next_page')) {
							if (data.next_page == null || data.next_page == undefined || data.next_page == "") {
								this.pagingActualTarifa.next_page = null;
							} else {
								this.pagingActualTarifa.next_page = data.next_page;
							}
						} else {
							this.pagingActualTarifa.next_page = null;
						}
						if (data.hasOwnProperty('previous_page')) {
							if (data.previous_page == null || data.previous_page == undefined || data.previous_page == "") {
								this.pagingActualTarifa.previous_page = null;
							} else {
								this.pagingActualTarifa.previous_page = data.previous_page;
							}
						} else {
							this.pagingActualTarifa.previous_page = null;
						}
						if (data.hasOwnProperty('first_page')) {
							if (data.first_page == null || data.first_page == undefined || data.first_page == "") {
								this.pagingActualTarifa.first_page = null;
							} else {
								this.pagingActualTarifa.first_page = data.first_page;
							}
						} else {
							this.pagingActualTarifa.first_page = null;
						}
						if (data.hasOwnProperty('last_page')) {
							if (data.last_page == null || data.last_page == undefined || data.last_page == "") {
								this.pagingActualTarifa.last_page = null;
							} else {
								this.pagingActualTarifa.last_page = data.last_page;
							}
						} else {
							this.pagingActualTarifa.last_page = null;
						}
						if (data.hasOwnProperty(key)) {
							var objeto = {};
							this.listTarifas = [];
							for (var i = 0; i < data[key].length; i++) {
								objeto = this.formattedTarifa(data[key][i]);
								if (objeto != null) {
									this.listTarifas.push(objeto);
								}
							}
							this.pagingActualTarifa.count = data.count;
						}else{
							this.listTarifas=[];
						}
					}
				}else{
					this.listTarifas=[];
					this.mensaje=_("warning55");
					this.msg.warning();
					return;
				}
			}else{
				this.mensaje=this.service.processMessageError(data,mensajeAll);
				this.msg.error();
				return;
			}
		}
	}
	app.TravelCreateComponent.prototype.formattedTarifa=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.hasOwnProperty("amount")){
				if(!(data.amount==null || data.amount==undefined || data.amount=="")){
					try{
						data.formatted_amount=amountFormattingObject(data.amount*100);
						data.formatted_amount=data.formatted_amount.integerPart+","+data.formatted_amount.decimalPart;
						if(data.hasOwnProperty("currency")){
							if(!(data.currency==null || data.currency=="" || data.currency==undefined)){
								data.formatted_amount=data.formatted_amount+" "+data.currency;
							}
						}
					}catch(er){
					}
				}
			}
			if(this.listTarifasSelected!=null && this.listTarifasSelected.length!=0){
				for(var i=0;i<this.listTarifasSelected.length;i++){
					if(this.listTarifasSelected[i]!=null){
						if(this.listTarifasSelected[i].id==data.id){
							data.classSelected="selected";
							break;
						}
					}
				}
			}
			return data;
		}
	}
	app.TravelCreateComponent.prototype.deleteTarifasSelected=function(data,index){
		if(this.listTarifas!=null && this.listTarifas.length!=0){
			for(var i=0;i<this.listTarifas.length;i++){
				if(this.listTarifas[i]!=null){
					if(this.listTarifas[i].id==data.id){
						this.listTarifas[i].classSelected=null;
						break;
					}
				}
			}
			try{
				var provi = this.listTarifasSelected.slice(index + 1);
				this.listTarifasSelected = this.listTarifasSelected.slice(0, index);
				this.listTarifasSelected = this.listTarifasSelected.concat(provi);
			}catch(er){
			}
		}
	}
	app.TravelCreateComponent.prototype.deleteChoferesSelected=function(data,index){
		if(this.listChoferes!=null && this.listChoferes.length!=0){
			for(var i=0;i<this.listChoferes.length;i++){
				if(this.listChoferes[i]!=null){
					if(this.listChoferes[i].id==data.id){
						this.listChoferes[i].classSelected=null;
						break;
					}
				}
			}
			try{
				var provi = this.listChoferesSelected.slice(index + 1);
				this.listChoferesSelected = this.listChoferesSelected.slice(0, index);
				this.listChoferesSelected = this.listChoferesSelected.concat(provi);
			}catch(er){
			}
		}
	}
	app.TravelCreateComponent.prototype.selectedTarifa=function(data){
		if(!(data==null || data==undefined || data=="")){
			if(this.listTarifas!=null && this.listTarifas.length!=0){
				for(var i=0; i<this.listTarifas.length;i++){
					if(this.listTarifas[i]!=null){
						if(this.listTarifas[i].id==data.id){
							if(this.listTarifas[i].classSelected==null){
								this.listTarifasSelected.push(this.listTarifas[i]);
								this.listTarifas[i].classSelected="selected";
							}else{
								this.listTarifas[i].classSelected=null;
								for(var j=0;j<this.listTarifasSelected.length;j++){
									if(this.listTarifasSelected[j]!=null){
										if(this.listTarifasSelected[j].id==data.id){
											var provi = this.listTarifasSelected.slice(j + 1);
											this.listTarifasSelected = this.listTarifasSelected.slice(0, j);
											this.listTarifasSelected = this.listTarifasSelected.concat(provi);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	
	app.TravelCreateComponent.prototype.searchChoferes=function(){
		if(this.lineaSelected==null || this.lineaSelected==undefined || this.lineaSelected==""){
			this.mensaje="Antes de seleccionar el chofer debe seleccionar la línea de transporte";
			this.msg.warning();
			return;
		}
		this.jsonFilterChofer={};
		this.jsonFilterChofer.business_id=[this.lineaSelected.id];
		this.jsonFilterChofer.active=true;
		if(!(this.nombre_buscar==null || this.nombre_buscar==undefined || this.nombre_buscar=="" || this.nombre_buscar=="null")){
			this.nombre_buscar=(this.nombre_buscar+"").trim();
			this.jsonFilterChofer.driver=this.nombre_buscar;
		}
		this.callServicesChofer(1, "&limit="+this.detallePorPaginaChofer);
	}
	app.TravelCreateComponent.prototype.getCantidadSelectedChofer=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPaginaChofer = data.detalles;
			this.totalPageChofer= data.pagina;
			if (this.listChoferes == null || this.listChoferes == undefined || this.listChoferes.length == 0) {
				this.mensaje = capitalizeOnly(_("message_dflt_4"));
				this.msg.warning();
				return;
			} else {
				this.callServicesChofer(1, '&limit=' + this.detallePorPaginaChofer);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueFirstChofer=function(data){
		this.listChoferes = [];
		if (this.pagingActualChofer.hasOwnProperty('first_page')) {
			if (!(this.pagingActualChofer.first_page == null || this.pagingActualChofer.first_page == undefined || this.pagingActualChofer.first_page == "")) {
				this.callServicesChofer(data, this.pagingActualChofer.first_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValuePreviousChofer=function(data){
		this.listChoferes = [];
		if (this.pagingActualChofer.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualChofer.previous_page == null || this.pagingActualChofer.previous_page == undefined || this.pagingActualChofer.previous_page == "")) {
				this.callServicesChofer(data, this.pagingActualChofer.previous_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueLastChofer=function(data){
		this.listChoferes = [];
		if (this.pagingActualChofer.hasOwnProperty('last_page')) {
			if (!(this.pagingActualChofer.last_page == null || this.pagingActualChofer.last_page == undefined || this.pagingActualChofer.last_page == "")) {
				this.callServicesChofer(data, this.pagingActualChofer.last_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueNextChofer=function(data){
		this.listChoferes = [];
		if (this.pagingActualChofer.hasOwnProperty('next_page')) {
			if (!(this.pagingActualChofer.next_page == null || this.pagingActualChofer.next_page == undefined || this.pagingActualChofer.next_page == "")) {
				this.callServicesChofer(data, this.pagingActualChofer.next_page);
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueChangeRecordsChofer=function(data){
		this.pageSelectedChofer = data;
	}
	app.TravelCreateComponent.prototype.callServicesChofer = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelectedChofer = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let request = this.service.callServicesHttp("driver-report-v1", querys, this.jsonFilterChofer);
		request.subscribe(data => {
			this.procesarRespuestaChofer(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.TravelCreateComponent.prototype.procesarRespuestaChofer=function(data){
		var key="results";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			this.listChoferes=[];
			this.mensaje=mensajeAll;
			this.msg.error();
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("count")){
					if(data.count==null || data.count==undefined || data.count==0){
						this.listChoferes=[];
					}else{
						this.pagingActualChofer = {};
						this.pagingActualChofer.count = data.count;
						let auxP = Math.floor(this.pagingActualChofer.count / this.detallePorPaginaChofer);
						let restoAux = ((this.pagingActualChofer.count) % this.detallePorPaginaChofer);
						if (restoAux == 0) {
							this.totalPageChofer = auxP;
						} else {
							this.totalPageChofer = auxP + 1;
						}
						if (data.hasOwnProperty('next_page')) {
							if (data.next_page == null || data.next_page == undefined || data.next_page == "") {
								this.pagingActualChofer.next_page = null;
							} else {
								this.pagingActualChofer.next_page = data.next_page;
							}
						} else {
							this.pagingActualChofer.next_page = null;
						}
						if (data.hasOwnProperty('previous_page')) {
							if (data.previous_page == null || data.previous_page == undefined || data.previous_page == "") {
								this.pagingActualChofer.previous_page = null;
							} else {
								this.pagingActualChofer.previous_page = data.previous_page;
							}
						} else {
							this.pagingActualChofer.previous_page = null;
						}
						if (data.hasOwnProperty('first_page')) {
							if (data.first_page == null || data.first_page == undefined || data.first_page == "") {
								this.pagingActualChofer.first_page = null;
							} else {
								this.pagingActualChofer.first_page = data.first_page;
							}
						} else {
							this.pagingActualChofer.first_page = null;
						}
						if (data.hasOwnProperty('last_page')) {
							if (data.last_page == null || data.last_page == undefined || data.last_page == "") {
								this.pagingActualChofer.last_page = null;
							} else {
								this.pagingActualChofer.last_page = data.last_page;
							}
						} else {
							this.pagingActualChofer.last_page = null;
						}
						if (data.hasOwnProperty(key)) {
							var objeto = {};
							this.listChoferes = [];
							for (var i = 0; i < data[key].length; i++) {
								objeto = data[key][i];
								if(this.listChoferesSelected!=null && this.listChoferesSelected.length!=0){
									for(var j=0;j<this.listChoferesSelected.length;j++){
										if(this.listChoferesSelected[j]!=null){
											if(this.listChoferesSelected[j].id==objeto.id){
												objeto.classSelected="selected";
												break;
											}
										}
									}
								}
								if (objeto != null) {
									this.listChoferes.push(objeto);
								}
							}
							this.pagingActualChofer.count = data.count;
						}else{
							this.listChoferes=[];
						}
					}
				}else{
					this.listChoferes=[];
				}
			}else{
				this.mensaje=this.service.processMessageError(data,mensajeAll);
				this.msg.error();
				return;
			}
		}
	}
	app.TravelCreateComponent.prototype.selectedChoferes=function(data){
		if(!(data==null || data==undefined || data=="")){
			if(this.listChoferes!=null && this.listChoferes.length!=0){
				for(var i=0; i<this.listChoferes.length;i++){
					if(this.listChoferes[i]!=null){
						if(this.listChoferes[i].id==data.id){
							if(this.listChoferes[i].classSelected==null){
								this.listChoferesSelected.push(this.listChoferes[i]);
								this.listChoferes[i].classSelected="selected";
							}else{
								this.listChoferes[i].classSelected=null;
								for(var j=0;j<this.listChoferesSelected.length;j++){
									if(this.listChoferesSelected[j]!=null){
										if(this.listChoferesSelected[j].id==data.id){
											var provi = this.listChoferesSelected.slice(j + 1);
											this.listChoferesSelected = this.listChoferesSelected.slice(0, j);
											this.listChoferesSelected = this.listChoferesSelected.concat(provi);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	app.TravelCreateComponent.prototype.openModalLineas=function(){
		this.mensajeServicio=null;
		this.mostrarCargando=false;
		this.linea_buscar=null;
		this.listLines=[];
		$("#modalLineas").modal("show");
	}
	app.TravelCreateComponent.prototype.openModalVehicle=function(){
		if(this.lineaSelected==null){
			this.mensaje="Debe seleccionar la línea de transporte primero";
			this.msg.warning();
			return;
		}
		this.mensajeServicio=null;
		this.mostrarCargando=false;
		this.vehicle_buscar=null;
		this.listVehicles=[];
		$("#modalVehicles").modal("show");
	}
	app.TravelCreateComponent.prototype.buscarVehicle=function(){
		this.jsonFilterVehicle={};
		var datos=[];
		var entity=null;
		if(entity==null){
			entity={};
		}
		entity.business_id=this.lineaSelected.id
		if(!(this.vehicle_buscar==null || this.vehicle_buscar==undefined || this.vehicle_buscar=="" || this.vehicle_buscar=="null")){
			if(entity==null){
				entity={};
			}
			entity.license_plate="*"+this.vehicle_buscar+"*";
		}
		entity.active=true;
		if(entity!=null){
			datos={entity:entity,level: "AND"};
			let aux1=[datos];
			this.jsonFilterVehicle.entities=aux1;
		}
		
		this.jsonFilterVehicle.sort={"info.created_at":"desc"};
		this.callServicesVehicle(1,"&offset=0&limit="+this.detallePorPaginaVehicle);
	}
	app.TravelCreateComponent.prototype.selectedVehicle=function(item){
		if(item!=null){
			$("#modalVehicles").modal("hide");
			this.vehicleSelected=item;
			if(item.hasOwnProperty("license_plate")){
				this.vehicleSelectedShow=item.license_plate;
			}
			if(item.hasOwnProperty("capacity")){
				this.capacidad=item.capacity;
			}
			if(this.save){
				this.listTarifas=[];
				this.listTarifasSelected=[];
			}
		}
	}
	app.TravelCreateComponent.prototype.getValueMsg=function(){
		var link = ['/travel-report'];
		this.router.navigate(link);
	}
	app.TravelCreateComponent.prototype.clean=function(){
		this.time=null;
		this.fecha=null;
		this.lineaSelected=null;
		this.lineaSelectedShow=null;
		this.totalPageLine=1;
		this.pageSelectedLine=1;
		this.detallePorPaginaLine=10;
		this.pagingActualLine={};
		this.listTarifasSelected=[];
		this.type=null;
		this.monto_tasa=null;
		this.vehicleSelected=null;
		this.vehicleSelectedShow=null;
		this.totalPageVehicle=1;
		this.pageSelectedVehicle=1;
		this.detallePorPaginaVehicle=10;
		this.pagingActualVehicle={};
		this.listVehicles=[];
		this.vehicle_buscar=null;
		
		this.rutaSelected=null;
		this.rutaSelectedShow=null;
		this.totalPageRuta=1;
		this.pageSelectedRuta=1;
		this.detallePorPaginaRuta=10;
		this.pagingActualRuta={};
		this.listRutas=[];
		this.ruta_buscar=null;
		this.codigo_ciudad=null;
		
		this.pagingActualTarifa={};
		this.totalPageTarifa=1;
		this.detallePorPaginaTarifa=10;
		this.pageSelectedTarifa=1;
		this.listTarifas=[];
		this.capacidad=0;
		this.rif_buscar=null;
		this.nombre_buscar=null;
		
		this.pagingActualChofer={};
		this.totalPageChofer=1;
		this.detallePorPaginaChofer=10;
		this.pageSelectedChofer=1;
		this.listChoferes=[];
		this.listChoferesSelected=[];
		
	}
	app.TravelCreateComponent.prototype.done=function(){
		var parametros={};
		var querys="";
		if(this.type==null || this.type=="null" || this.type==undefined || this.type==""){
			this.mensaje="Debe ingresar el tipo de viaje";
			this.msg.warning();
			return;
		}else{
			querys="?type="+this.type;
		}
		if(this.lineaSelected==null){
			this.mensaje="Debe seleccionar la linea de transporte que realizará el viaje";
			this.msg.warning();
			return;
		}
		if(this.vehicleSelected==null){
			this.mensaje="Debe seleccionar el vehículo que realizará el viaje";
			this.msg.warning();
			return;
		}else{
			if(this.capacidad>this.vehicleSelected.capacity){
				this.mensaje="La capacidad introducida no está acorde a la capacidad del vehículo, debe ser igual o menor a "+this.vehicleSelected.capacity;
				this.msg.warning();
				return;
			}
			parametros.vehicle_id=this.vehicleSelected.id;
			querys=querys+"&realm="+this.service.getRealm()+"&vehicle_id="+this.vehicleSelected.id+"&vehicle_type_id="+this.vehicleSelected.vehicle_type_id+"&vehicle_owner_id="+this.vehicleSelected.owner_id;
		}
		if(this.save){
			if(this.rutaSelected==null){
				this.mensaje="Debe seleccionar ruta que se realizará";
				this.msg.warning();
				return;
			}else{
				querys=querys+"&itinerary_id="+this.rutaSelected.id;
			}
		}
		if(this.fecha==null || this.fecha==undefined || this.fecha==""){
			this.mensaje="Debe ingresar la fecha del viaje";
			this.msg.warning();
			return;
		}
		var dateInit;
        var hoy=new Date();
        try{
           dateInit=new Date(this.fecha);
        }catch(err){
             dateInit=null;
        }
		
		if(this.time==null || this.time==undefined || this.time==""){
			this.mensaje="Debe ingresar la hora del viaje";
			this.msg.warning();
			return;
		}
		if(this.capacidad==null || this.capacidad==0 || this.capacidad=="0"){
			this.mensaje="Debe ingresar la capacidad de asientos a vender";
			this.msg.warning();
			return;
		}else{
			parametros.seats_active=parseInt(this.capacidad);
		}
		if(!(this.puerta==null || this.puerta==undefined || this.puerta=="")){
			parametros.boarding_gate=this.puerta.trim().toUpperCase();
			
		}
		if(!(this.capacidad_mayor==null || this.capacidad_mayor==0 || this.capacidad_mayor=="0")){
			parametros.passenger_limits={};
			parametros.passenger_limits.ELDERLY=parseInt(this.capacidad_mayor);
		}
		parametros.departure_date=this.fecha+"T"+this.time+":00.000Z";
        parametros.active=this.active_status;
		if(this.type=="SHORT_ROUTE" && this.save){
			parametros.status="PUBLISHED";
		}else{
			parametros.status=this.status_publicacion;
		}
		
		var choferes=[];
		if(this.listChoferesSelected==null || this.listChoferesSelected.length==0){
			this.mensaje="Debe seleccionar al menos un chofer que realizará este viaje";
			this.msg.warning();
			return;
		}else{
			for(var i=0;i<this.listChoferesSelected.length;i++){
				if(this.listChoferesSelected[i]!=null){
					choferes.push(this.listChoferesSelected[i].id);
				}
			}
		}
		var tarifas=[];
        if(this.listTarifasSelected==null || this.listTarifasSelected.length==0){
			this.mensaje="Debe seleccionar las tarifas a cobrar";
			this.msg.warning();
			return;
		}else{
			for(var i=0;i<this.listTarifasSelected.length;i++){
				if(this.listTarifasSelected[i]!=null){
					tarifas.push(this.listTarifasSelected[i].id);
				}
			}
		}  
		parametros.drivers=choferes;
		parametros.fares=tarifas;
		let mensajeAll=_("message_dflt_71");
		let request=null;
		if(this.save){
			request = this.service.callServicesHttp("travel-post", this.lineaSelected.id+querys, parametros);
		}else{
			mensajeAll=_("message_dflt_72");
			request = this.service.callServicesHttp("travel-put", this.business_id+querys+"&itinerary_id="+this.itinerary_id+"&id="+this.id, parametros);
		}
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.TravelCreateComponent.prototype.procesarRespuesta=function(data){
		let mensajeAll="Error al crear viaje";
		if(!this.save){
			mensajeAll="Error al actualizar viaje";
		}
		if(data==null || data==undefined || data==""){
			this.mensaje=mensajeAll;
			this.msg.error();
		}else{
			if (data.status_http == 200) {
				if(this.save){
					this.mensaje=capitalizeOnly(_("success52"));
				}else{
					this.mensaje=capitalizeOnly(_("success53"));
				}
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.TravelCreateComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));