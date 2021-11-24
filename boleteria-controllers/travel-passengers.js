(function(app) {
	app.TripPassengerComponent =
		ng.core.Component({
		selector: 'travel-passengers',
		templateUrl: 'views/travel-passengers-v9.html'
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
	app.TripPassengerComponent.prototype.ngOnInit=function(){
		this.imagenCargando="assets/images/loading.gif";
		this.pagingActualTrip={};
		this.totalPageTrip=1;
		this.detallePorPaginaTrip=5;
		this.pageSelectedTrip=1;
		this.listTrips=[];
		this.mensajeServicio=null;
		this.linea=null;
		this.fecha_salida=null;
		this.trip=null;
		this.adultos=0;
		this.ninnos=0;
		this.infantes=0;
		this.mayores=0;
		this.total_dolares=0;
		this.total_bolivares=0;
		this.status=null;
		this.tipo=null;
		this.listStatus=[{value:null,name:"Todos"},{value:"PAID",name:"Pagada"},{value:"PENDING_VALIDATION",name:"Pendiente por validación"},{value:"PENDING_PAYMENT", name:"Pendiente por pago"},{value:"CANCELED",name:"Cancelada"}];
		try{
			var g=document.getElementsByClassName('modal-backdrop')[0];
			if(g!=null){
				var padre=g.parentNode;
				padre.removeChild(g);
			}
		}catch(y){
		}
		try{
			var g=document.getElementById('sidenav-overlay');
			if(g!=null){
				var padre=g.parentNode;
				padre.removeChild(g);
			}
		}catch(r4){
		}
		this.dataSelected=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=100;
		this.pageSelected=1;
		this.listRegister=[];
		this.jsonFilter={};
		this.checkRol();
	}
	app.TripPassengerComponent.prototype.checkRol=function(){
		var texto="PASSENGERS-TRIP-LINE";
		var texto1="TRIP-PASSENGERS-ALL";
		this.vista_seleccionada=null;
		var flag=false;
    	if(this.service.getRole()!=null){
			if(this.service.getRole().hasOwnProperty("views")){
				if(!(this.service.getRole().views==null || this.service.getRole().views==undefined || this.service.getRole().views=="")){
					var tabla=orderList(this.service.getRole().views);
					var objeto=null;
					for(var i=0;i<tabla.length;i++){
						if(tabla[i]!=null){
							if(tabla[i].name==texto){
								this.vista_seleccionada=texto;
								if(tabla[i].hasOwnProperty("actions")){
									if(tabla[i].actions!=null && tabla[i].actions.length!=0){
										for(var j=0;j<tabla[i].actions.length;j++){
											if(tabla[i].actions[j].hasOwnProperty("name")){
												if(tabla[i].actions[j].name=="OVERBOUND-PASSENGERS"){
													this.mostrarTrasbordo=true;
												}
											}
										}
									}
								}
								flag=true;
								break;
							}else{
								if(tabla[i].name==texto1){
									this.vista_seleccionada=texto1
									flag=true;
									break;
								}
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
	app.TripPassengerComponent.prototype.getData=function(){
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null){
						if(this.active.queryParams._value.hasOwnProperty('trip_id')){
							this.trip_id=this.active.queryParams._value.trip_id;
							if(this.active.queryParams._value.hasOwnProperty('itinerary_id')){
								this.itinerary_id =this.active.queryParams._value.itinerary_id;
								if(this.active.queryParams._value.hasOwnProperty('business_id')){
									this.business_id =this.active.queryParams._value.business_id;
									this.search();
								}
							}
						}
					}
				}
			}
		}
	}
	app.TripPassengerComponent.prototype.selectedList=function(data){
		if(this.listRegister!=null && this.listRegister.length!=0){
			for(var i=0;i<this.listRegister.length;i++){
				if(this.listRegister[i]!=null){
					this.listRegister[i].check=data;
				}
			}
		}
	}
	app.TripPassengerComponent.prototype.search=function(){
		this.jsonFilter={};
		this.total_bolivares=0;
		this.total_dolares=0;
		if(!(this.pasajero ==null || this.pasajero ==undefined || this.pasajero =="" || this.pasajero=="null")){
			this.jsonFilter.passenger=this.pasajero.trim();
		}
		if(!(this.destino ==null || this.destino ==undefined || this.destino =="" || this.destino=="null")){
			this.jsonFilter.destination_stop=this.destino.trim();
		}
		if(!(this.status ==null || this.status ==undefined || this.status =="" || this.status=="null")){
			this.jsonFilter.reservation_status=[this.status];
		}
		this.adultos=0;
		this.mayores=0;
		this.ninnos=0;
		this.infantes=0;
		this.callServices(1, "&limit="+this.detallePorPagina);
	}
	app.TripPassengerComponent.prototype.clean=function(){
		this.pasajero=null;
		this.destino=null;
		this.status=null;
	}
	app.TripPassengerComponent.prototype.getCantidadSelected=function(data){
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
	app.TripPassengerComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.TripPassengerComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.TripPassengerComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.TripPassengerComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.TripPassengerComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.TripPassengerComponent.prototype.callServices = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		this.listRegister=[];
		let querys=null;
		let texto="";
		if(this.vista_seleccionada=="PASSENGERS-TRIP-LINE"){
			querys="&type=PAGINATE"+parametros+"&trip_id="+this.trip_id+"&itinerary_id="+this.itinerary_id+"&business_id="+this.business_id;
			texto="travel-passenger";
		}else{
			querys=this.business_id+"?realm="+this.service.getRealm()+"&type=PAGINATE"+parametros+"&trip_id="+this.trip_id+"&itinerary_id="+this.itinerary_id
			texto="travel-passenger-operation";
		}
		let request = this.service.callServicesHttp(texto, querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.TripPassengerComponent.prototype.procesarRespuesta=function(data){
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
							if(this.total_dolares!=null){
								try{
									var suma=parseFloat(((this.total_dolares*100)/112).toFixed(2));
									this.total_dolares_formatted=amountFormattingObject(this.total_dolares*100);
									this.total_dolares_formatted=this.total_dolares_formatted.integerPart+","+this.total_dolares_formatted.decimalPart+" $";
									this.porcentaje_total_us=amountFormattingObject(suma*12);
									this.porcentaje_total_us=this.porcentaje_total_us.integerPart+","+this.porcentaje_total_us.decimalPart+" $";
								}catch(er){
								}
							}
							if(this.total_bolivares!=null){
								try{
									var suma=parseFloat(((this.total_bolivares*100)/112).toFixed(2));
									this.total_bolivares_formatted=amountFormattingObject(this.total_bolivares*100);
									this.total_bolivares_formatted=this.total_bolivares_formatted.integerPart+","+this.total_bolivares_formatted.decimalPart+" Bs";
									this.porcentaje_total=amountFormattingObject(suma*12);
									this.porcentaje_total=this.porcentaje_total.integerPart+","+this.porcentaje_total.decimalPart+" Bs";
								}catch(er){
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
	app.TripPassengerComponent.prototype.trasbordarPasajeros=function(){
		var lista=[];
		if(this.listRegister!=null && this.listRegister.length!=0){
			for(var i=0;i<this.listRegister.length;i++){
				if(this.listRegister[i]!=null){
					if(this.listRegister[i].hasOwnProperty("check")){
						if(this.listRegister[i].check==true){
							if(this.listRegister[i].hasOwnProperty("id")){
								lista.push(this.listRegister[i].id);
							}
						}
					}
				}
			}
		}
		if(lista==null || lista.length==0){
			this.mensaje="Debe seleccionar al menos un pasajero a trasbordar";
			this.msg.warning();
			return;
		}
		this.fecha=null;
		this.destino=null;
		this.linea_buscar=null;
		$("#modalTripsAvailable").modal("show")
	}
	app.TripPassengerComponent.prototype.cleanModal=function(){
		this.fecha=null;
		this.destino=null;
		this.linea_buscar=null;
	}
	app.TripPassengerComponent.prototype.searchTrip=function(){
		this.jsonFilterTrip={};
		this.jsonFilterTrip.status=["PUBLISHED"];
		if(!(this.linea_buscar==null || this.linea_buscar==undefined || this.linea_buscar=="" || this.linea_buscar=="null")){
			this.jsonFilterTrip.line=this.linea_buscar.trim();
		}
		if(!(this.fecha==null || this.fecha==undefined || this.fecha=="")){
			this.jsonFilterTrip.departure_date={};
			this.jsonFilterTrip.departure_date.lte=this.fecha+"T23:59:59.000Z";
			this.jsonFilterTrip.departure_date.gte=this.fecha+"T00:00:00.000Z";
			this.jsonFilterTrip.departure_date.time_zone=getTimeZone();
		}
		if(!(this.destino==null || this.destino==undefined || this.destino=="" || this.destino=="null")){
			this.jsonFilterTrip.destination_stop=this.destino.trim();
		}
		this.callServicesTrip(1, "&limit="+this.detallePorPaginaTrip);
	}
	app.TripPassengerComponent.prototype.getCantidadSelectedTrip=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPaginaTrip = data.detalles;
			this.totalPageTrip = data.pagina;
			if (this.listTrips == null || this.listTrips == undefined || this.listTrips.length == 0) {
				this.mensajeServicio = capitalizeOnly(_("message_dflt_4"));
			} else {
				this.callServicesTrip(1, '&limit=' + this.detallePorPaginaTrip);
			}
		}
	}
	app.TripPassengerComponent.prototype.getValueFirstTrip=function(data){
		this.listTrips = [];
		if (this.pagingActualTrip.hasOwnProperty('first_page')) {
			if (!(this.pagingActualTrip.first_page == null || this.pagingActualTrip.first_page == undefined || this.pagingActualTrip.first_page == "")) {
				this.callServicesTrip(data, this.pagingActualTrip.first_page);
			}
		}
	}
	app.TripPassengerComponent.prototype.getValuePreviousTrip=function(data){
		this.listTrips = [];
		if (this.pagingActualTrip.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualTrip.previous_page == null || this.pagingActualTrip.previous_page == undefined || this.pagingActualTrip.previous_page == "")) {
				this.callServicesTrip(data, this.pagingActualTrip.previous_page);
			}
		}
	}
	app.TripPassengerComponent.prototype.getValueLastTrip=function(data){
		this.listTrips = [];
		if (this.pagingActualTrip.hasOwnProperty('last_page')) {
			if (!(this.pagingActualTrip.last_page == null || this.pagingActualTrip.last_page == undefined || this.pagingActualTrip.last_page == "")) {
				this.callServicesTrip(data, this.pagingActualTrip.last_page);
			}
		}
	}
	app.TripPassengerComponent.prototype.getValueNextTrip=function(data){
		this.listTrips = [];
		if (this.pagingActualTrip.hasOwnProperty('next_page')) {
			if (!(this.pagingActualTrip.next_page == null || this.pagingActualTrip.next_page == undefined || this.pagingActualTrip.next_page == "")) {
				this.callServicesTrip(data, this.pagingActualTrip.next_page);
			}
		}
	}
	app.TripPassengerComponent.prototype.getValueChangeRecordsTrip=function(data){
		this.pageSelectedTrip = data;
	}
	app.TripPassengerComponent.prototype.callServicesTrip = function (data, parametros) {
		let mensajeServicio="Error al consultar registros";
		this.pageSelectedTrip = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="&type=PAGINATE"+parametros;
		this.mostrarCargando=true;
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		let request = this.service.callServicesHttp("travel-report-available", querys, this.jsonFilterTrip);
		request.subscribe(data => {
			this.mostrarCargando=false;
			var key="results";
			if(data==null || data==undefined || data==""){
				this.listTrips=[];
				this.mensajeServicio=mensajeAll;
			}else{
				if(data.status_http==200){
					if(data.hasOwnProperty("count")){
						if(data.count==null || data.count==undefined || data.count==0){
							this.listTrips=[];
						}else{
							this.pagingActualTrip = {};
							this.pagingActualTrip.count = data.count;
							let auxP = Math.floor(this.pagingActualTrip.count / this.detallePorPaginaTrip);
							let restoAux = ((this.pagingActualTrip.count) % this.detallePorPaginaTrip);
							if (restoAux == 0) {
								this.totalPageTrip = auxP;
							} else {
								this.totalPageTrip = auxP + 1;
							}
							if (data.hasOwnProperty('next_page')) {
								if (data.next_page == null || data.next_page == undefined || data.next_page == "") {
									this.pagingActualTrip.next_page = null;
								} else {
									this.pagingActualTrip.next_page = data.next_page;
								}
							} else {
								this.pagingActualTrip.next_page = null;
							}
							if (data.hasOwnProperty('previous_page')) {
								if (data.previous_page == null || data.previous_page == undefined || data.previous_page == "") {
									this.pagingActualTrip.previous_page = null;
								} else {
									this.pagingActualTrip.previous_page = data.previous_page;
								}
							} else {
								this.pagingActualTrip.previous_page = null;
							}
							if (data.hasOwnProperty('first_page')) {
								if (data.first_page == null || data.first_page == undefined || data.first_page == "") {
									this.pagingActualTrip.first_page = null;
								} else {
									this.pagingActualTrip.first_page = data.first_page;
								}
							} else {
								this.pagingActualTrip.first_page = null;
							}
							if (data.hasOwnProperty('last_page')) {
								if (data.last_page == null || data.last_page == undefined || data.last_page == "") {
									this.pagingActualTrip.last_page = null;
								} else {
									this.pagingActualTrip.last_page = data.last_page;
								}
							} else {
								this.pagingActualTrip.last_page = null;
							}
							if (data.hasOwnProperty(key)) {
								var objeto = {};
								this.listTrips = [];
								for (var i = 0; i < data[key].length; i++) {
									objeto = this.formattedDataTrip(data[key][i]);
									if (objeto != null) {
										this.listTrips.push(objeto);
									}
								}
								
								
								this.pagingActualTrip.count = data.count;
							}else{
								this.listTrips=[];
							}
						}
					}else{
						this.listTrips=[];
					}
				}else{
					this.mensajeServicio=this.service.processMessageError(data,mensajeAll);
				}
			}
		}, err => {
			this.mostrarCargando=false;
			this.mensajeServicio = this.service.processError(err, mensajeAll);
		});
	}
	app.TripPassengerComponent.prototype.formattedDataTrip=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.hasOwnProperty("departure_date")){
				if(!(data.departure_date==null || data.departure_date==undefined || data.departure_date=="")){
					data.formatted_departure_date=data.departure_date.replace("T"," ");
				}
			}
			if(data.hasOwnProperty("fares")){
				if(data.fares!=null && data.fares.length!=0){
					data.destino="";
					for(var i=0;i<data.fares.length;i++){
						if(data.fares[i]!=null){
							if(data.fares[i].hasOwnProperty("destination_stop_name")){
								if(!(data.fares[i].destination_stop_name==null || data.fares[i].destination_stop_name==undefined || data.fares[i].destination_stop_name=="")){
									data.destino=data.destino+" "+data.fares[i].destination_stop_name;
								}
							}
						}
					}
				}
			}
			return data;
		}
	}
	app.TripPassengerComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(this.linea==null){
				if(data.hasOwnProperty("line_name")){
					this.linea=data.line_name;
				}
			}
			if(this.trip==null){
				if(data.hasOwnProperty("trip_sequence")){
					this.trip=data.trip_sequence;
				}
			}
			if(this.tipo==null){
				if(data.hasOwnProperty("trip_type")){
					this.tipo=data.trip_type;
				}
			}
			if(this.fecha_salida==null){
				try{
					if(data.hasOwnProperty("trip_departure_date")){
						this.fecha_salida=formattingDate(data.trip_departure_date);
					}
				}catch(er){
				}
			}
			if(data.hasOwnProperty("amount_to_pay_by_currency")){
				if(!(data.amount_to_pay_by_currency==null || data.amount_to_pay_by_currency==undefined || data.amount_to_pay_by_currency=="")){
					if(data.amount_to_pay_by_currency.hasOwnProperty("USD")){
						if(!(data.amount_to_pay_by_currency.USD==null || data.amount_to_pay_by_currency.USD==undefined || data.amount_to_pay_by_currency.USD=="")){
							try{
								this.total_dolares=this.total_dolares+data.amount_to_pay_by_currency.USD;
								data.formatted_dolars=amountFormattingObject(data.amount_to_pay_by_currency.USD*100);
								data.formatted_dolars=data.formatted_dolars.integerPart+","+data.formatted_dolars.decimalPart+" USD";
							}catch(er){
							}
						}
					}
					if(data.amount_to_pay_by_currency.hasOwnProperty("VES")){
						if(!(data.amount_to_pay_by_currency.VES==null || data.amount_to_pay_by_currency.VES==undefined || data.amount_to_pay_by_currency.VES=="")){
							try{
								this.total_bolivares=this.total_bolivares+data.amount_to_pay_by_currency.VES;
								data.formatted_bs=amountFormattingObject(parseFloat((data.amount_to_pay_by_currency.VES).toFixed(2))*100);
								data.formatted_bs=data.formatted_bs.integerPart+","+data.formatted_bs.decimalPart+" VES";
							}catch(er){
							}
						}else{
							if(data.amount_to_pay_by_currency.hasOwnProperty("VED")){
								if(!(data.amount_to_pay_by_currency.VED==null || data.amount_to_pay_by_currency.VED==undefined || data.amount_to_pay_by_currency.VED=="")){
									try{
										this.total_bolivares=this.total_bolivares+data.amount_to_pay_by_currency.VED;
										data.formatted_bs=amountFormattingObject(parseFloat((data.amount_to_pay_by_currency.VED).toFixed(2))*100);
										data.formatted_bs=data.formatted_bs.integerPart+","+data.formatted_bs.decimalPart+" VED";
									}catch(er){
									}
								}
							}
						}
					}else{
						if(data.amount_to_pay_by_currency.hasOwnProperty("VED")){
							if(!(data.amount_to_pay_by_currency.VED==null || data.amount_to_pay_by_currency.VED==undefined || data.amount_to_pay_by_currency.VED=="")){
								try{
									this.total_bolivares=this.total_bolivares+data.amount_to_pay_by_currency.VED;
									data.formatted_bs=amountFormattingObject(parseFloat((data.amount_to_pay_by_currency.VED).toFixed(2))*100);
									data.formatted_bs=data.formatted_bs.integerPart+","+data.formatted_bs.decimalPart+" VED";
								}catch(er){
								}
							}
						}
					}
				}
			}
		if(data.hasOwnProperty("currency_exchange_rates")){
			if(data.currency_exchange_rates!=null && data.currency_exchange_rates.length!=0){
				for(var i=0;i<data.currency_exchange_rates.length;i++){
					if(data.currency_exchange_rates[i]!=null){
						if(data.currency_exchange_rates[i].hasOwnProperty("currency")){
							if(data.currency_exchange_rates[i].currency=="USD"){
								if(data.currency_exchange_rates[i].hasOwnProperty("rate")){
									try{
										data.tasa=amountFormattingObject(data.currency_exchange_rates[i].rate*100);
										data.tasa=data.tasa.integerPart+","+data.tasa.decimalPart+" Bs";
									}catch(er){
									}
									break;
								}
							}
						}
					}
				}
			}
		}
		if(data.hasOwnProperty("transfer_line_id")){
			if(!(data.transfer_line_id==null || data.transfer_line_id==undefined || data.transfer_line_id=="")){
				if(data.transfer_line_id!=this.service.getBusinessId()){
					data.formatted_transferido="TRASBORDADO";
					if(data.hasOwnProperty("transfer_line_name")){
						data.formatted_transferido=data.formatted_transferido+" HACIA "+data.transfer_line_name;
					}
				}else{
					data.formatted_transferido="TRASBORDADO";
					if(data.hasOwnProperty("origin_line_id")){
						data.formatted_transferido=data.formatted_transferido+" DESDE "+data.origin_line_id;
					}
				}
			}
		}
			if(data.hasOwnProperty("type")){
				if(!(data.type==null || data.type==undefined || data.type=="")){
					if(data.type=="ADULT"){
						this.adultos=this.adultos+1;
					}else{
						if(data.type=="ELDERLY"){
							this.mayores=this.mayores+1;
						}else{
							if(data.type=="INFANT"){
								this.infantes=this.infantes+1;
							}else{
								if(data.type=="CHILD"){
									this.ninnos=this.ninnos+1;
								}
							}
						}
					}
					data.formatted_type=_(data.type).toUpperCase();
				}
			}
			if(data.hasOwnProperty("status")){
				if(!(data.status==null || data.status==undefined || data.status=="")){
					data.formatted_status=_(data.status).toUpperCase();
				}
			}
			if(data.hasOwnProperty("reservation_status")){
				if(!(data.reservation_status==null || data.reservation_status==undefined || data.reservation_status=="")){
					data.formatted_reservation_status=_(data.reservation_status).toUpperCase();
				}
			}
			return data;
		}
	}
	app.TripPassengerComponent.prototype.selectedTravel=function(item){
		this.viajeSeleccionado=item;
		$("#modalTripsAvailable").modal("hide");
		var lista=[];
		for(var i=0;i<this.listRegister.length;i++){
			if(this.listRegister[i]!=null){
				if(this.listRegister[i].check==true){
					lista.push(this.listRegister[i].id);
				}
			}
		}
		if(lista==null || lista.length==0){
			this.mensaje="Debe tener seleccionado al menos un pasajero";
			this.msg.warning();
			return;
		}else{
			this.listaPasar=lista;
			$("#modalConfirm").modal("show");
		}
	}
	app.TripPassengerComponent.prototype.trasbordar=function(){
		$("#modalConfirm").modal("hide");
		var parametros={};
		parametros.origin_itinerary_id=this.itinerary_id;
		parametros.origin_trip_id=this.trip_id;
		parametros.destination_line_id=this.viajeSeleccionado.business_id;
		parametros.destination_itinerary_id=this.viajeSeleccionado.itinerary_id;
		parametros.destination_trip_id=this.viajeSeleccionado.id;
		parametros.passengers=this.listaPasar;
		let mensajeAll=_("message_dflt_83");
		let request = this.service.callServicesHttp("travel-line-trasbordo", null,parametros);
		request.subscribe(data => {
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.warning();
				return;
			}else{
				if(data.status_http==200){
					this.search();
					this.mensaje="Trasbordo realizado con éxito";
					this.msg.info();
				}else{
					this.mensaje = this.service.processMessageError(data, mensajeAll);
					this.msg.error();
				}
			}
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	
})(window.app || (window.app = {}));