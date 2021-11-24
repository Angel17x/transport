(function(app) {
	app.ReservationReportComponent =
		ng.core.Component({
		selector: 'reservation-report',
		templateUrl: 'views/reservation-report-v5.html',
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
	app.ReservationReportComponent.prototype.ngOnInit=function(){
		this.title="Reservaciones"
		this.dataSelected=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=10;
		this.pageSelected=1;
		this.listRegister=[];
		this.listCanales=[{value:null,name:"Todos"},{value:"WEB",name:"Web"},{value:"TAQUILLA",name:"Taquilla"}];
		this.listStatus=[{value:null,name:"Todos"},{value:"PAID",name:"Pagada"},{value:"PENDING_VALIDATION",name:"Pendiente por validación"},{value:"PENDING_PAYMENT", name:"Pendiente por pago"},{value:"CANCELED",name:"Cancelada"}];
		this.status=null;
		this.canal=null;
		this.nombre=null;
		this.codigo=null;
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
		this.checkRol();
	}
	app.ReservationReportComponent.prototype.checkRol=function(){
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
							if(tabla[i].name=="RESERVATION-LINE"){
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
								if(tabla[i].tag=="RESERVATION-LINE"){
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
	app.ReservationReportComponent.prototype.formattedActions=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.ReservationReportComponent.prototype.formattedView=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.name=="NEW-SALES"){
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
	app.ReservationReportComponent.prototype.search=function(){
		this.jsonFilter={};
		if(!(this.status==null || this.status==undefined || this.status=="" || this.status=="null")){
			this.jsonFilter.status=[this.status];
		}
		if(!(this.init==null || this.init==undefined || this.init=="" || this.end==null || this.end==undefined || this.end=="")){
			this.jsonFilter.trip_departure_date={};
			this.jsonFilter.trip_departure_date.lte=this.end+"T23:59:59.000Z";
			this.jsonFilter.trip_departure_date.gte=this.init+"T00:00:00.000Z";
			this.jsonFilter.trip_departure_date.time_zone=getTimeZone();
		}
		if(!(this.nro==null || this.nro==undefined || this.nro=="" || this.nro=="null")){
			this.nro=(this.nro+"").trim();
			if(!(this.nro=="")){
				if(!utils_keyNumber(this.nro)){
					this.mensaje="El formato del número de reservación es incorrecto, se permiten sólo números";
					this.msg.warning();
					return;
				}
				this.jsonFilter.sequence={};
				this.jsonFilter.sequence.lte=parseInt(this.nro);
				this.jsonFilter.sequence.gte=parseInt(this.nro);
			}
		}
		if(!(this.cliente==null || this.cliente==undefined || this.cliente=="")){
			this.jsonFilter.passenger=this.cliente.trim();
		}
		this.callServices(1, "&limit="+this.detallePorPagina);
	}
	app.ReservationReportComponent.prototype.clean=function(){
		this.init=null;
		this.end=null;
		this.canal=null;
		this.status=null;
		this.cliente=null;
		this.nro=null;
	}
	app.ReservationReportComponent.prototype.getCantidadSelected=function(data){
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
	app.ReservationReportComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.ReservationReportComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.ReservationReportComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.ReservationReportComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.ReservationReportComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.ReservationReportComponent.prototype.callServices = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="&type=PAGINATE"+parametros;
		let request = this.service.callServicesHttp("reservation-report-line", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.ReservationReportComponent.prototype.procesarRespuesta=function(data){
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
	app.ReservationReportComponent.prototype.checkAction=function(data){
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
	app.ReservationReportComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.hasOwnProperty("passengers")){
				if(data.passengers!=null && data.passengers.length!=0){
					data.asientos=[];
					var objeto={};
					for(var i=0;i<data.passengers.length;i++){
						if(data.passengers[i]!=null){
							objeto={};
							objeto=data.passengers[i];
							if(objeto.type!="INFANT"){
								data.asientos.push(objeto);
							}
							if(data.passengers[i].hasOwnProperty("fare_currency")){
								data.moneda=_(data.passengers[i].fare_currency);
							}
							if(data.parada==null || data.parada==undefined){
								if(data.passengers[i].hasOwnProperty("destination_stop_code")){
									data.parada=data.passengers[i].destination_stop_code;
									if(data.passengers[i].hasOwnProperty("destination_stop_name")){
										data.parada=data.parada+" - "+data.passengers[i].destination_stop_name;
									}
								}
							}
						}
					}
				}
			}
			if(data.hasOwnProperty("total_by_currency")){
				if(!(data.total_by_currency==undefined || data.total_by_currency=="" || data.total_by_currency==null)){
					if(data.total_by_currency.hasOwnProperty("USD")){
						if(!(data.total_by_currency.USD== null || data.total_by_currency.USD==undefined || data.total_by_currency.USD=="")){
							try{
								data.total_formatted=amountFormattingObject(data.total_by_currency.USD*100);
								data.total_formatted=data.total_formatted.integerPart+","+data.total_formatted.decimalPart;
								data.total_formatted=data.total_formatted+" USD";
							}catch(er1){
							}
						}
					}
					if(data.total_by_currency.hasOwnProperty("VES")){
						if(!(data.total_by_currency.VES== null || data.total_by_currency.VES==undefined || data.total_by_currency.VES=="")){
							try{
								data.total_formatted_bs=amountFormattingObject(data.total_by_currency.VES*100);
								data.total_formatted_bs=data.total_formatted_bs.integerPart+","+data.total_formatted_bs.decimalPart;
								data.total_formatted_bs=data.total_formatted_bs+" VES";
							}catch(er1){
							}
						}else{
							if(data.total_by_currency.hasOwnProperty("VED")){
								if(!(data.total_by_currency.VED== null || data.total_by_currency.VED==undefined || data.total_by_currency.VED=="")){
									try{
										data.total_formatted_bs=amountFormattingObject(data.total_by_currency.VED*100);
										data.total_formatted_bs=data.total_formatted_bs.integerPart+","+data.total_formatted_bs.decimalPart;
										data.total_formatted_bs=data.total_formatted_bs+" VED";
									}catch(er1){
									}
								}
							}
						}
					}else{
						if(data.total_by_currency.hasOwnProperty("VED")){
							if(!(data.total_by_currency.VED== null || data.total_by_currency.VED==undefined || data.total_by_currency.VED=="")){
								try{
									data.total_formatted_bs=amountFormattingObject(data.total_by_currency.VED*100);
									data.total_formatted_bs=data.total_formatted_bs.integerPart+","+data.total_formatted_bs.decimalPart;
									data.total_formatted_bs=data.total_formatted_bs+" VED";
								}catch(er1){
								}
							}
						}
					}
				}
			}
			if(data.hasOwnProperty("rates")){
				if(!(data.rates==null || data.rates==undefined || data.rates=="")){
					if(data.rates.hasOwnProperty("USD")){
						if(!(data.rates.USD==null || data.rates.USD==undefined || data.rates.USD=="")){
							try{
								data.formatted_tasa_cambio=amountFormattingObject(data.rates.USD*100);
								data.formatted_tasa_cambio=data.formatted_tasa_cambio.integerPart+","+data.formatted_tasa_cambio.decimalPart+" Bs";
							}catch(er){
							}
						}
								
					}
				}
			}
			if(data.hasOwnProperty("trip_departure_date")){
				if(!(data.trip_departure_date==null || data.trip_departure_date==undefined || data.trip_departure_date=="")){
					data.date=formattingDate(data.trip_departure_date);
					try{
						data.date=data.date.split(" ");
						data.schedule=data.date[1];
						data.date=data.date[0];
					}catch(er){
					}
				}
			}
			if(data.hasOwnProperty("payments")){
				data.metodo=null;
				if(data.payments!=null && data.payments.length!=0){
					try{
						data.metodo=data.payments[0];
					}catch(er){
						data.metodo=null;
					}
				}
				if(data.metodo!=null){
					if(data.metodo.hasOwnProperty("payment_method")){
						if(!(data.metodo.payment_method==null || data.metodo.payment_method==undefined || data.metodo.payment_method=="")){
							data.formatted_method=_(data.metodo.payment_method).toUpperCase();
						}
					}
					if(data.metodo.hasOwnProperty("collector_bank")){
						if(!(data.metodo.collector_bank==null || data.metodo.collector_bank==undefined || data.metodo.collector_bank=="")){
							data.banco=returnBankSelected(data.metodo.collector_bank);
						}
					}
					if(data.metodo.hasOwnProperty("payer_reference")){
						if(!(data.metodo.payer_reference==null || data.metodo.payer_reference==undefined || data.metodo.payer_reference=="")){
							data.referencia=data.metodo.payer_reference;
						}
					}
				}
			}
			if(data.hasOwnProperty("status")){
				if(!(data.status==null || data.status==undefined || data.status=="")){
					data.formatted_status=_(data.status).toUpperCase();
				}
			}
			data.actions=[];
			if(this.checkAction("RESERVATION-LINE-VIEW")!=null){
				data.actions.push(this.checkAction("RESERVATION-LINE-VIEW"));
			}
			if(data.status=="PENDING_VALIDATION"){
				if(this.checkAction("AUTHORIZED-PAYMENT")!=null){
					data.actions.push(this.checkAction("AUTHORIZED-PAYMENT"));
				}
				if(this.checkAction("CANCEL-RESERVATION")!=null){
					data.actions.push(this.checkAction("CANCEL-RESERVATION"));
				}
				if(this.checkAction("ADD-PAYMENT")!=null){
					data.actions.push(this.checkAction("ADD-PAYMENT"));
				}
			}else{
				if(data.status=="PENDING_PAYMENT"){
					if(this.checkAction("ADD-PAYMENT")!=null){
						data.actions.push(this.checkAction("ADD-PAYMENT"));
					}
					if(this.checkAction("DELETE-RESERVATION")!=null){
						data.actions.push(this.checkAction("DELETE-RESERVATION"));
					}
				}else{
					if(data.status=="PAID"){
						if(this.checkAction("TICKET-PREIMPRESO-RESERVATION-LINE")!=null){
							data.actions.push(this.checkAction("TICKET-PREIMPRESO-RESERVATION-LINE"));
						}
					}
				}
				
			}
			return data;
		}
	}
	app.ReservationReportComponent.prototype.deselectedData = function() {
		this.dataSelected = null;
	}
	app.ReservationReportComponent.prototype.selectedAction = function(data, action) {
		this.dataSelected = data;
		if (action.hasOwnProperty('name')) {
			switch (action.name) {
				case 'RESERVATION-LINE-VIEW':{
					this.router.navigate(['/reservation-view-line'], { queryParams: { id: data.id,itinerary_id :data.itinerary_id,trip_id:data.trip_id} });
				}break;
				case 'TICKET-PREIMPRESO-RESERVATION-LINE':{
					this.router.navigate(['/ticket-preimpreso'], { queryParams: { id: data.id,itinerary_id :data.itinerary_id,trip_id:data.trip_id} });
				}break;
				case 'CANCEL-RESERVATION':{
					$("#modalCancelarReservation").modal("show");
				}break;
				case 'AUTHORIZED-PAYMENT':{
					$("#modalValidarReserva").modal("show");
				}break;
				case 'DELETE-RESERVATION':{
					$("#modalEliminarReserva").modal("show");
				}break;
				case 'ADD-PAYMENT':{
					this.router.navigate(['/add-payment'], { queryParams: { id: data.id,itinerary_id :data.itinerary_id,trip_id:data.trip_id} });
				}break;
				default:{}
			}
		}
	}
	app.ReservationReportComponent.prototype.reservar=function(){
		$("#modalValidarReserva").modal('hide');
		var lista=[];
		var payments=[];
		try{
			if(this.dataSelected!=null){
				if(this.dataSelected.hasOwnProperty("passengers")){
					if(this.dataSelected.passengers!=null && this.dataSelected.passengers.length!=0){
						for(var i=0;i<this.dataSelected.passengers.length;i++){
							if(this.dataSelected.passengers[i]!=null){
								if(this.dataSelected.passengers[i].hasOwnProperty("asiento")){
									if(!(this.dataSelected.passengers[i].asiento==null || this.dataSelected.passengers[i].asiento==undefined || this.dataSelected.passengers[i].asiento=="")){
										lista.push(this.dataSelected.passengers[i].asiento);
									}
								}
							}
						}
					}
				}
				if(this.dataSelected.hasOwnProperty("payments")){
					if(this.dataSelected.payments!=null && this.dataSelected.payments.length!=0){
						var objeto={};
						for(var i=0;i<this.dataSelected.payments.length;i++){
							if(this.dataSelected.payments[i]!=null){
								objeto={};
								if(this.dataSelected.payments[i].hasOwnProperty("payer_reference")){
									if(!(this.dataSelected.payments[i].payer_reference==null || this.dataSelected.payments[i].payer_reference==undefined || this.dataSelected.payments[i].payer_reference=="")){
										objeto.collector_reference=this.dataSelected.payments[i].payer_reference;
										objeto.payment_id=this.dataSelected.payments[i].id;
										payments.push(objeto);
									}
								}
							}
						}
					}
				}
				var parametros={};
				parametros.seats=lista;
				parametros.payments=payments;
				let request=this.service.callServicesHttp('reservation-validate',"&id="+this.dataSelected.id+"&itinerary_id="+this.dataSelected.itinerary_id+"&trip_id="+this.dataSelected.trip_id,parametros);
				let mensajeAll=_("message_dflt_73");
				request.subscribe(data => {
					if(data.status_http==200){
						for(var i=0;i<this.listRegister.length;i++){
							if(this.listRegister[i]!=null){
								if(this.listRegister[i].id==data.id){
									this.listRegister[i]=this.formattedData(data);
									break;
								}
							}
						}
						this.mensaje="Reserva validada con éxito";
						this.msg.info();
					}else{
						this.mensaje = this.service.processMessageError(data, mensajeAll);
						this.msg.error();
					}
				}, err => {
					this.mensaje = this.service.processError(err, mensajeAll);
					this.msg.error();
				});
				}
		}catch(er){
		}
	}
	app.ReservationReportComponent.prototype.deleteData=function(){
		$("#modalEliminarReserva").modal("hide");
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=_("warning49");
			this.msg.warning();
			return;
		}else{
			var querys="&itinerary_id="+this.dataSelected.itinerary_id+"&trip_id="+this.dataSelected.trip_id+"&id="+this.dataSelected.id;
			let request=this.service.callServicesHttp('reservation-delete',querys,null);
			let mensajeAll=_("message_dflt_75");
			request.subscribe(data => {
				if(data==null || data==undefined || data==""){
					this.mensaje=mensajeAll;
					this.msg.warning();
				}else{
					if(data.status_http==200){
						this.ngOnInit();
						this.mensaje=_("success55");
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
	}
	app.ReservationReportComponent.prototype.cancelData=function(){
		$("#modalCancelarReservation").modal("hide");
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=_("warning49");
			this.msg.warning();
			return;
		}else{
			var querys="&itinerary_id="+this.dataSelected.itinerary_id+"&trip_id="+this.dataSelected.trip_id+"&id="+this.dataSelected.id;
			let request=this.service.callServicesHttp('reservation-cancel',querys,null);
			let mensajeAll=_("message_dflt_80");
			request.subscribe(data => {
				if(data==null || data==undefined || data==""){
					this.mensaje=mensajeAll;
					this.msg.warning();
				}else{
					if(data.status_http==200){
						if(this.listRegister!=null && this.listRegister.length!=0){
							for(var i=0;i<this.listRegister.length;i++){
								if(this.listRegister[i]!=null){
									if(this.listRegister[i].id==data.id){
										this.listRegister[i]=this.formattedData(data);
										break;
									}
								}
							}	
						}
						this.mensaje=_("success59");
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
	}
	app.ReservationReportComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));