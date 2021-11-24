(function(app) {
	app.SalesLineReportComponent =
		ng.core.Component({
		selector: 'sales-report-line',
		templateUrl: 'views/report-sales-line-v1.html',
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
	app.SalesLineReportComponent.prototype.ngOnInit=function(){
		this.rol_seleccionado=null;
		this.dataSelected=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=1000;
		this.pageSelected=1;
		this.listRegister=[];
		this.listMetodoPago=[{value:null,name:"Todos"},{value:"POS",name:"Punto de venta"},{value:"CASH",name:"Efectivo"},{value:"MOBILE",name:"Pago Móvil"},{value:"TRANSFERENCE",name:"Transferencia"}];
		this.status=null;
		this.nombre=null;
		this.codigo=null;
		this.checkRol();
	}
	app.SalesLineReportComponent.prototype.keyPressNumber=function(event){
		return keypressNumbersInteger(event);
	}
	app.SalesLineReportComponent.prototype.checkRol=function(){
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
							if(tabla[i].name=="SALES-LINE"){
								flag=true;
								break;
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
	app.SalesLineReportComponent.prototype.formattedActions=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.SalesLineReportComponent.prototype.formattedView=function(data){
		if(data==null || data==undefined || data==""){
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
	app.SalesLineReportComponent.prototype.search=function(){
		this.jsonFilter={};
		if(this.init==null || this.init==undefined || this.init==""){
			this.mensaje="Debe ingresar el periodo del viaje a buscar";
			this.msg.warning();
			return;
		}else{
			this.jsonFilter.trip_departure_date={};
			this.jsonFilter.trip_departure_date.lte=this.end+"T23:59:59.000Z";
			this.jsonFilter.trip_departure_date.gte=this.init+"T00:00:00.000Z";
			this.jsonFilter.trip_departure_date.time_zone=getTimeZone();
		}
		if(!(this.destino==null || this.destino==undefined || this.destino=="")){
			this.jsonFilter.destination_stop=this.destino.trim();
		}
		if(!(this.pasajero==null || this.pasajero==undefined || this.pasajero=="")){
			this.jsonFilter.passenger=this.pasajero.trim();
		}
		this.jsonFilter.reservation_status=["PAID"];
		if(!(this.viaje==null || this.viaje==undefined || this.viaje=="")){
			if(!utils_keyNumber(this.viaje.trim())){
				this.mensaje="El número de viaje tiene un formato incorrecto sólo se aceptan números";
				this.msg.warning();
				return;
			}
			try{
				this.jsonFilter.trip_sequence={};
				this.jsonFilter.trip_sequence.lte=parseInt(this.viaje.trim());
				this.jsonFilter.trip_sequence.gte=parseInt(this.viaje.trim());
			}catch(er){
				
			}
		}
		this.callServices(1, "&limit="+this.detallePorPagina);
	}
	app.SalesLineReportComponent.prototype.clean=function(){
		this.init=null;
		this.end=null;
		this.linea=null;
		this.destino=null;
		this.metodo=null;
		this.viaje=null;
		this.pasajero=null;
	}
	app.SalesLineReportComponent.prototype.getCantidadSelected=function(data){
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
	app.SalesLineReportComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.SalesLineReportComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.SalesLineReportComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.SalesLineReportComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.SalesLineReportComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.SalesLineReportComponent.prototype.callServices = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="&type=PAGINATE"+parametros;
		this.listRegister=[];
		let request = this.service.callServicesHttp("passenger-report-line", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.SalesLineReportComponent.prototype.procesarRespuesta=function(data){
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
	app.SalesLineReportComponent.prototype.checkAction=function(data){
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
	app.SalesLineReportComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.hasOwnProperty("trip_departure_date")){
				if(!(data.trip_departure_date==null || data.trip_departure_date==undefined || data.trip_departure_date=="")){
					try{
						data.formatted_trip_departure_date= data.trip_departure_date.replace("T"," ");
					}catch(er){
					}
				}
			}
			if(data.hasOwnProperty("type")){
				if(!(data.type==null || data.type==undefined || data.type=="")){
					data.formatted_type=_(data.type).toUpperCase();
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
			if(data.hasOwnProperty("amount_to_pay_by_currency")){
				if(!(data.amount_to_pay_by_currency==null || data.amount_to_pay_by_currency==undefined || data.amount_to_pay_by_currency=="")){
					if(data.amount_to_pay_by_currency.hasOwnProperty("USD")){
						if(!(data.amount_to_pay_by_currency.USD==null || data.amount_to_pay_by_currency.USD==undefined || data.amount_to_pay_by_currency.USD=="")){
							try{
								data.formatted_dolars=amountFormattingObject(data.amount_to_pay_by_currency.USD*100);
								data.formatted_dolars=data.formatted_dolars.integerPart+","+data.formatted_dolars.decimalPart+" $";
							}catch(er){
							}
						}
					}
					if(data.amount_to_pay_by_currency.hasOwnProperty("VES")){
						if(!(data.amount_to_pay_by_currency.VES==null || data.amount_to_pay_by_currency.VES==undefined || data.amount_to_pay_by_currency.VES=="")){
							try{
								data.formatted_bs=amountFormattingObject(parseFloat((data.amount_to_pay_by_currency.VES).toFixed(2))*100);
								data.formatted_bs=data.formatted_bs.integerPart+","+data.formatted_bs.decimalPart+" Bs";
							}catch(er){
							}
						}
					}
				}
			}
			return data;
		}
	}
	app.SalesLineReportComponent.prototype.deselectedData = function() {
		this.dataSelected = null;
	}
	app.SalesLineReportComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));