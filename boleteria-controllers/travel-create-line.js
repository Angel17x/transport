(function(app) {
	app.TravelCreateLineComponent =
		ng.core.Component({
		selector: 'travel-create-line',
		templateUrl: 'views/travel-create-line-v1.html',
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
	app.TravelCreateLineComponent.prototype.ngOnInit=function(){
		this.title=capitalizeOnly(_("title65"));
		this.disponibilidad=null;
		this.fecha=null;
		this.hora=null;
		this.save=true;
		this.mostrarCargando=false;
		this.imagenCargando="assets/images/loading.gif";
		this.listTypes=[{value:"LONG_ROUTE",name:"Ruta Larga"},{value:"SHORT_ROUTE",name:"Ruta Corta"}]
		this.type=null;
		this.monto_taza=undefined;
		this.lineaSelected=null;
		this.lineaSelectedShow=null
		this.listTarifasSelected=[];
		this.capacidad_mayor=0;
		this.vehicleSelected=null;
		this.vehicleSelectedShow=null;
		this.totalPageVehicle=1;
		this.pageSelectedVehicle=1;
		this.detallePorPaginaVehicle=10;
		this.pagingActualVehicle={};
		this.listVehicles=[];
		this.dataFilter=[];
		this.vehicle_buscar=null;
		this.name_line_user = this.service.getUserName();
		
		this.rutaTipo=null
		this.rutaSelected=null;
		this.rutaSelectedShow=null;
		this.totalPageRuta=1;
		this.pageSelectedRuta=1;
		this.detallePorPaginaRuta=10;
		this.pagingActualRuta={};
		this.listRutas=[];
		this.ruta_buscar=null;
		this.codigo_ciudad=null;
		this.stops=[]

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
		this.status_publicacion="UNPUBLISHED";
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
	app.TravelCreateLineComponent.prototype.checkRol=function(){
		var texto="TRIP-LINE-CREATE";
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'travel-create-line') {
				this.title = _("title65");
				this.save = true;
				texto="TRIP-LINE-CREATE";
			} else {
				this.title = _("title63");;
				this.save = false;
				texto="TRIP-LINE-UPDATE";
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
	app.TravelCreateLineComponent.prototype.getData=function(){
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
	app.TravelCreateLineComponent.prototype.getCantidadSelectedRuta=function(data){
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
	app.TravelCreateLineComponent.prototype.getValueFirstRuta=function(data){
		this.listRutas = [];
		if (this.pagingActualRuta.hasOwnProperty('first_page')) {
			if (!(this.pagingActualRuta.first_page == null || this.pagingActualRuta.first_page == undefined || this.pagingActualRuta.first_page == "")) {
				this.callServicesRuta(data, this.pagingActualRuta.first_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValuePreviousRuta=function(data){
		this.listRutas = [];
		if (this.pagingActualRuta.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualRuta.previous_page == null || this.pagingActualRuta.previous_page == undefined || this.pagingActualRuta.previous_page == "")) {
				this.callServicesRuta(data, this.pagingActualRuta.previous_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValueLastRuta=function(data){
		this.listRutas = [];
		if (this.pagingActualRuta.hasOwnProperty('last_page')) {
			if (!(this.pagingActualRuta.last_page == null || this.pagingActualRuta.last_page == undefined || this.pagingActualRuta.last_page == "")) {
				this.callServicesRuta(data, this.pagingActualRuta.last_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValueNextRuta=function(data){
		this.listRutas = [];
		if (this.pagingActualRuta.hasOwnProperty('next_page')) {
			if (!(this.pagingActualRuta.next_page == null || this.pagingActualRuta.next_page == undefined || this.pagingActualRuta.next_page == "")) {
				this.callServicesRuta(data, this.pagingActualRuta.next_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValueChangeRecordsRuta=function(data){
		this.pageSelectedRuta = data;
	}
	app.TravelCreateLineComponent.prototype.callServicesRuta = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelectedRuta = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
	
		let querys="?type=PAGINATE"+parametros;
		this.mostrarCargando=true;
		let request = this.service.callServicesHttp("route-line-report", querys, this.jsonFilterRoute);
		request.subscribe(data => {
			this.mostrarCargando=false;
			this.procesarRespuestaRuta(data);
		}, err => {
			this.mostrarCargando=false;
			this.mensajeServicio = this.service.processError(err, mensajeAll);
		});
	}
	app.TravelCreateLineComponent.prototype.procesarRespuestaRuta=function(data){
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
	app.TravelCreateLineComponent.prototype.openModalRuta=function(){
		this.mensajeServicio=null;
		this.mostrarCargando=false;
		this.ruta_buscar=null;
		this.listRutas=[];
		$("#modalRuta").modal("show");
	}
	app.TravelCreateLineComponent.prototype.buscarRuta=function(){
		this.jsonFilterRoute={};
		if(!(this.ruta_buscar==null || this.ruta_buscar==undefined || this.ruta_buscar=="" || this.ruta_buscar=="null")){
			this.jsonFilterRoute.name=this.ruta_buscar;
		}
		this.jsonFilterRoute.active=true;
		this.callServicesRuta(1,"&offset=0&limit="+this.detallePorPaginaRuta);
	}

	app.TravelCreateComponent.prototype.translateTexto=function(data){
		return _(data).toUpperCase();
	}
	app.TravelCreateLineComponent.prototype.selectedRuta=function(item){
		if(item!=null){
			this.vehicleSelected=[];
			this.vehicleSelectedShow=[];
			this.listTarifas=[];
			this.listTarifasSelected=[];
			this.listChoferes=[];
			this.listChoferesSelected=[];
			this.dataFilter=[];
			this.stops=[]
			$("#modalRuta").modal("hide");
			this.rutaSelected=item;
			this.rutaTipo=item.type
			if(item.hasOwnProperty("stops")){
				if(item.stops!=null && item.stops.length!=0){
					this.rutaSelectedShow=""
					for(var i=0;i<item.stops.length;i++){
						if(item.stops[i]!=null){
							if(i==item.stops[i].length-1){
								this.rutaSelectedShow=this.rutaSelectedShow+item.stops[i].code;
							}else{
								this.stops = item.stops[i]
								this.rutaSelectedShow=this.rutaSelectedShow+item.stops[i].code+" - ";
								this.type= item.type == 'SHORT_ROUTE' ? 'RUTA CORTA' : 'RUTA LARGA' 
								this.monto_taza = item.short_route_rate != undefined ? `${item.short_route_rate.toFixed(2)} ${item.short_route_rate_currency}` : undefined
								this.getMontoTaza()
							}
						}
					}
				}
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getMontoTaza=function(){
		return this.monto_taza
	}

	app.TravelCreateLineComponent.prototype.deleteTarifasSelected=function(data,index){
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
	app.TravelCreateLineComponent.prototype.deleteChoferesSelected=function(data,index){
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




	app.TravelCreateLineComponent.prototype.getCantidadSelectedVehicle=function(data){
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
	app.TravelCreateLineComponent.prototype.getValueFirstVehicle=function(data){
		this.listVehicles = [];
		if (this.pagingActualVehicle.hasOwnProperty('first_page')) {
			if (!(this.pagingActualVehicle.first_page == null || this.pagingActualVehicle.first_page == undefined || this.pagingActualVehicle.first_page == "")) {
				this.callServicesVehicle(data, this.pagingActualVehicle.first_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValuePreviousVehicle=function(data){
		this.listVehicles = [];
		if (this.pagingActualVehicle.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualVehicle.previous_page == null || this.pagingActualVehicle.previous_page == undefined || this.pagingActualVehicle.previous_page == "")) {
				this.callServicesVehicle(data, this.pagingActualVehicle.previous_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValueLastVehicle=function(data){
		this.listVehicles = [];
		if (this.pagingActualVehicle.hasOwnProperty('last_page')) {
			if (!(this.pagingActualVehicle.last_page == null || this.pagingActualVehicle.last_page == undefined || this.pagingActualVehicle.last_page == "")) {
				this.callServicesVehicle(data, this.pagingActualVehicle.last_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValueNextVehicle=function(data){
		this.listVehicles = [];
		if (this.pagingActualVehicle.hasOwnProperty('next_page')) {
			if (!(this.pagingActualVehicle.next_page == null || this.pagingActualVehicle.next_page == undefined || this.pagingActualVehicle.next_page == "")) {
				this.callServicesVehicle(data, this.pagingActualVehicle.next_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValueChangeRecordsVehicle=function(data){
		this.pageSelectedVehicle = data;
	}
	app.TravelCreateLineComponent.prototype.callServicesVehicle = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelectedVehicle = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="&type=PAGINATE"+parametros;
		this.mostrarCargando=true;
		let request = this.service.callServicesHttp("car-report-line", querys, this.jsonFilterVehicle);
		request.subscribe(data => {
			this.mostrarCargando=false;
			this.procesarRespuestaVehicle(data);
		}, err => {
			this.mostrarCargando=false;
			this.mensajeServicio = this.service.processError(err, mensajeAll);
		});
	}
	app.TravelCreateLineComponent.prototype.procesarRespuestaVehicle=function(data){
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
	app.TravelCreateLineComponent.prototype.openModalVehicle=function(){
		
		this.mensajeServicio=null;
		this.mostrarCargando=false;
		this.vehicle_buscar=null;
		this.listVehicles=[];
		
		$("#modalVehicles").modal("show");
		
	}
	app.TravelCreateLineComponent.prototype.buscarVehicle=function(){
		this.jsonFilterVehicle={};
		if((this.stops==null || this.stops=='' || this.stops.length == 0) && (this.rutaTipo==null || this.rutaTipo=='' || this.rutaTipo.length == 0)){
			this.mensaje="Antes de colocar el vehiculo debes seleccionar la ruta";
			this.msg.warning();
			return;
		}

		if(!(this.vehicle_buscar==null || this.vehicle_buscar==undefined || this.vehicle_buscar=="" || this.vehicle_buscar=="null")){
			this.jsonFilterVehicle.license_plate=this.vehicle_buscar.trim();
		}
		this.callServicesVehicle(1,"&offset=0&limit="+this.detallePorPaginaVehicle);
	}
	app.TravelCreateLineComponent.prototype.selectedVehicle=function(item){
		
		if(item!=null){
			if((this.stops==null || this.stops=='' || this.stops.length == 0) && (this.rutaTipo==null || this.rutaTipo=='' || this.rutaTipo.length == 0)){
				this.mensaje="Antes de colocar el vehiculo debes seleccionar la ruta";
				this.msg.warning();
				return;
			}
			$("#modalVehicles").modal("hide");
			this.vehicleSelected=item;
			this.listTarifas=[];
			this.listTarifasSelected=[];
			this.listChoferes=[];
			this.listChoferesSelected=[];
			this.dataFilter=[];
			if(item.hasOwnProperty("license_plate")){
				this.vehicleSelectedShow=item.license_plate;
			}
			if(item.hasOwnProperty("capacity")){
				this.capacidad=item.capacity;
			}
		}
	}
	app.TravelCreateLineComponent.prototype.searchTarifas=function(){
			this.listTarifas=[];
			this.listTarifasSelected=[];
			this.listChoferes=[];
			this.listChoferesSelected=[];
		if((this.stops==null || this.stops=='' || this.stops.length == 0) && (this.rutaTipo==null || this.rutaTipo=='' || this.rutaTipo.length == 0)){
			this.mensaje="Antes de colocar las tarifas debe seleccionar la ruta";
			this.msg.warning();
			return;
		}
		if(this.vehicleSelected==null || this.vehicleSelected=='' || this.vehicleSelected.length == 0){
			this.mensaje="Antes de colocar las tarifas debe seleccionar el vehículo";
			this.msg.warning();
			return;
		}
		this.jsonFilterTarifa={};
		this.jsonFilterTarifa.vehicle_type_id=[this.vehicleSelected.vehicle_type_id];
		this.jsonFilterTarifa.route_type=[this.rutaTipo];
		this.jsonFilterTarifa.stops=[this.stops.code];
		const {vehicle_type_id, route_type, stops} = this.jsonFilterTarifa
		

		if(!(this.codigo_ciudad==null || this.codigo_ciudad==undefined || this.codigo_ciudad=="" || this.codigo_ciudad=="null")){
			this.jsonFilterTarifa.destination_stop=this.codigo_ciudad.trim();
		}

		this.callServicesTarifa(1, "&limit="+this.detallePorPaginaTarifa);
	}
	app.TravelCreateLineComponent.prototype.getCantidadSelectedTarifa=function(data){
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
	app.TravelCreateLineComponent.prototype.getValueFirstTarifa=function(data){
		this.listTarifas = [];
		if (this.pagingActualTarifa.hasOwnProperty('first_page')) {
			if (!(this.pagingActualTarifa.first_page == null || this.pagingActualTarifa.first_page == undefined || this.pagingActualTarifa.first_page == "")) {
				this.callServicesTarifa(data, this.pagingActualTarifa.first_page);
				
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValuePreviousTarifa=function(data){
		this.listTarifas = [];
		if (this.pagingActualTarifa.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualTarifa.previous_page == null || this.pagingActualTarifa.previous_page == undefined || this.pagingActualTarifa.previous_page == "")) {
				this.callServicesTarifa(data, this.pagingActualTarifa.previous_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValueLastTarifa=function(data){
		this.listTarifas = [];
		if (this.pagingActualTarifa.hasOwnProperty('last_page')) {
			if (!(this.pagingActualTarifa.last_page == null || this.pagingActualTarifa.last_page == undefined || this.pagingActualTarifa.last_page == "")) {
				this.callServicesTarifa(data, this.pagingActualTarifa.last_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValueNextTarifa=function(data){
		this.listTarifas = [];
		if (this.pagingActualTarifa.hasOwnProperty('next_page')) {
			if (!(this.pagingActualTarifa.next_page == null || this.pagingActualTarifa.next_page == undefined || this.pagingActualTarifa.next_page == "")) {
				this.callServicesTarifa(data, this.pagingActualTarifa.next_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValueChangeRecordsTarifa=function(data){
		this.pageSelectedTarifa = data;
	}
	app.TravelCreateLineComponent.prototype.callServicesTarifa = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelectedTarifa = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		
		let request = this.service.callServicesHttp("fare-report-line", querys, this.jsonFilterTarifa);
		request.subscribe(data => {
			console.log('esta es la data de transporte',data)
			this.procesarRespuestaTarifa(data);
		}, err => {
			this.mostrarCargando=false;
			this.mensajeServicio = this.service.processError(err, mensajeAll);
		});
	}
	app.TravelCreateLineComponent.prototype.procesarRespuestaTarifa=function(data){
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
						this.mensaje='No existen tarifas para el tipo de vehiculo y/o parada!'
						this.msg.error()
						return
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
							this.dataFilter = []
							this.dataFilter = data[key].filter(data => data)
							for (var i = 0; i < this.dataFilter.length; i++) {
								objeto = this.formattedTarifa(this.dataFilter[i]);
								
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
				}
			}else{
				this.mensaje=this.service.processMessageError(data,mensajeAll);
				this.msg.error();
				return;
			}
		}
	}
	app.TravelCreateLineComponent.prototype.formattedTarifa=function(data){
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
			return data;
		}
	}
	app.TravelCreateLineComponent.prototype.selectedTarifa=function(data){
		console.log('es la data al seleccionar la tarifas',data)
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
	
	app.TravelCreateLineComponent.prototype.searchChoferes=function(){
		this.listChoferesSelected=[]
		if((this.stops==null || this.stops=='' || this.stops.length == 0) && (this.rutaTipo==null || this.rutaTipo=='' || this.rutaTipo.length == 0)){
			this.mensaje="Antes de colocar los choferes debes de seleccionar la ruta!";
			this.msg.warning();
			return;
		}
		if(this.vehicleSelected==null || this.vehicleSelected=='' || this.vehicleSelected.length == 0){
			this.mensaje="Antes de colocar los choferes debes de seleccionar el vehículo";
			this.msg.warning();
			return;
		}
		

		this.jsonFilterChofer={};
		var datos=[];
		var entity=null;
		if(entity==null){
			entity={};
		}
		entity.business_id=this.service.getBusinessId();
		if(!(this.rif_buscar==null || this.rif_buscar==undefined || this.rif_buscar=="" || this.rif_buscar=="null")){
			if(entity==null){
				entity={};
			}
			entity.id_doc="*"+this.rif_buscar.trim()+"*";
		}
		if(!(this.nombre_buscar==null || this.nombre_buscar==undefined || this.nombre_buscar=="" || this.nombre_buscar=="null")){
			if(entity==null){
				entity={};
			}
			entity.name="*"+this.nombre_buscar.trim()+"*";
		}
		if(entity!=null){
			datos={entity:entity,level: "AND"};
			let aux1=[datos];
			this.jsonFilterChofer.entities=aux1;
		}
		
		this.jsonFilterChofer.sort={"info.created_at":"desc"};
		this.callServicesChofer(1, "&limit="+this.detallePorPaginaChofer);
	}
	app.TravelCreateLineComponent.prototype.getCantidadSelectedChofer=function(data){
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
	app.TravelCreateLineComponent.prototype.getValueFirstChofer=function(data){
		this.listChoferes = [];
		if (this.pagingActualChofer.hasOwnProperty('first_page')) {
			if (!(this.pagingActualChofer.first_page == null || this.pagingActualChofer.first_page == undefined || this.pagingActualChofer.first_page == "")) {
				this.callServicesChofer(data, this.pagingActualChofer.first_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValuePreviousChofer=function(data){
		this.listChoferes = [];
		if (this.pagingActualChofer.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualChofer.previous_page == null || this.pagingActualChofer.previous_page == undefined || this.pagingActualChofer.previous_page == "")) {
				this.callServicesChofer(data, this.pagingActualChofer.previous_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValueLastChofer=function(data){
		this.listChoferes = [];
		if (this.pagingActualChofer.hasOwnProperty('last_page')) {
			if (!(this.pagingActualChofer.last_page == null || this.pagingActualChofer.last_page == undefined || this.pagingActualChofer.last_page == "")) {
				this.callServicesChofer(data, this.pagingActualChofer.last_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValueNextChofer=function(data){
		this.listChoferes = [];
		if (this.pagingActualChofer.hasOwnProperty('next_page')) {
			if (!(this.pagingActualChofer.next_page == null || this.pagingActualChofer.next_page == undefined || this.pagingActualChofer.next_page == "")) {
				this.callServicesChofer(data, this.pagingActualChofer.next_page);
			}
		}
	}
	app.TravelCreateLineComponent.prototype.getValueChangeRecordsChofer=function(data){
		this.pageSelectedChofer = data;
	}
	app.TravelCreateLineComponent.prototype.callServicesChofer = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelectedChofer = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let request = this.service.callServicesHttp("driver-report", querys, this.jsonFilterChofer);
		request.subscribe(data => {
			this.procesarRespuestaChofer(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.TravelCreateLineComponent.prototype.procesarRespuestaChofer=function(data){
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
	app.TravelCreateLineComponent.prototype.selectedChoferes=function(data){
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
	app.TravelCreateLineComponent.prototype.openModalVehicle=function(){
		if((this.stops==null || this.stops=='' || this.stops.length == 0) && (this.rutaTipo==null || this.rutaTipo=='' || this.rutaTipo.length == 0)){
			this.mensaje="Antes de colocar el vehiculo debes seleccionar la ruta";
			this.msg.warning();
			return;
		}
		this.mensajeServicio=null;
		this.mostrarCargando=false;
		this.vehicle_buscar=null;
		this.listVehicles=[];
		$("#modalVehicles").modal("show");
	}
	app.TravelCreateLineComponent.prototype.getService=function(){
		//Servicio 3. GET Viaje
	}
	app.TravelCreateLineComponent.prototype.getValueMsg=function(){
		var link = ['/travel-report-line'];
		this.router.navigate(link);
	}
	app.TravelCreateLineComponent.prototype.clean=function(){
		this.lineaSelected=null;
		this.lineaSelectedShow=null;
		this.totalPageLine=1;
		this.pageSelectedLine=1;
		this.detallePorPaginaLine=10;
		this.pagingActualLine={};
		this.listTarifasSelected=[];
		
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
		this.capacidad_mayor=0;
	}
	app.TravelCreateLineComponent.prototype.done=function(){
		var parametros={};
		var querys="";
		if(this.type==null || this.type=="null" || this.type==undefined || this.type==""){
			this.mensaje="Debe ingresar el tipo de viaje";
			this.msg.warning();
			return;
		}else{
			querys="&type="+this.type;
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
			querys=querys+"&vehicle_id="+this.vehicleSelected.id+"&vehicle_type_id="+this.vehicleSelected.vehicle_type_id+"&vehicle_owner_id="+this.vehicleSelected.owner_id;
		}
		if(this.rutaSelected==null){
			this.mensaje="Debe seleccionar ruta que se realizará";
			this.msg.warning();
			return;
		}else{
			querys=querys+"&itinerary_id="+this.rutaSelected.id;
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
		parametros.status=this.status_publicacion;
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
			request = this.service.callServicesHttp("travel-post-line", querys, parametros);
		}else{
			mensajeAll=_("message_dflt_72");
			request = this.service.callServicesHttp("travel-put", "&id="+this.id, parametros);
		}
		request.subscribe(data => {
			console.log(data)
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.TravelCreateLineComponent.prototype.procesarRespuesta=function(data){
		let mensajeAll=_("message_dflt_71");
		if(!this.save){
			mensajeAll=_("message_dflt_72");
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
	app.TravelCreateLineComponent.prototype.keyupsearch=function(event,funcion){
		try{
			
			 if (event.keyCode == 13) {
				 	switch(funcion){
						case 'RUTA':
							this.buscarRuta();
						break;
						case 'VEHICULO':
							this.buscarVehicle();
						break;
						case 'TARIFAS':
							this.searchTarifas();
						break;
						case 'CHOFERES':
							this.searchChoferes();
						break;
						default:
							'ERROR AL PROCESAR LA FUNCION KEYUP!'
					 }
			 }
		}catch(err){
			console.log('this is error -> ',err)
		}
	}
	app.TravelCreateLineComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));