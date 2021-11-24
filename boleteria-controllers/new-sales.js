(function(app) {
	app.NewSalesComponent =
		ng.core.Component({
		selector: 'new-sales',
		templateUrl: 'views/new-sales-v1.html',
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
	app.NewSalesComponent.prototype.ngOnInit=function(){
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
		this.listPassenger=[{ id_doc:"V",doc:"",name:"",type:"ADULT"}];
		this.mostrarViaje=true;
		this.listAdultos=[];
        this.listInfantes=[];
        this.listMayores=[];
		this.title=capitalizeOnly(_("title19"));
		this.typeViaje="IDA";
		this.viajeSeleccionado=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=5;
		this.pageSelected=1;
		this.destinoSelected=null;
		this.jsonFilterViaje={};
		this.paginActualViaje={};
		this.totalPageViaje=1;
		this.detallePorPaginaViaje=10;
		this.pageSelectedViaje=1;
		this.listDestinos=[];
		this.listViajes=[];
		this.mostrarCargando=false;
		this.listDocs=["V","E","J","G"];
		this.listTypes=[{value:"ADULT",name:"Adulto"},{value:"ELDERLY",name:"Preferencial"},{value:"CHILD",name:"Niño"},{value:"INFANT",name:"Infante"},{value:"SOCIAL_HELP",name:"Ayuda Social"},{value:"COURTESY",name:"Cortesia"}];
		this.imagenCargando="assets/images/loading.gif";
		this.listTipos=[{value:"CASH",name:"Efectivo"},{value:"POS",name:"Punto de venta"},{value:"MOBILE",name:"Pago Móvil"},{value:"TRANSFERENCE",name:"Transferencia"}];
		this.listMonedas=[{value:"USD",name:"$"},{value:"VES",name:"Bs"}];
		this.monto="0,00";
		this.faltante_dolares=0;
		this.faltante_dolares_formatted="0,00";
		this.faltantes_bs=0;
		this.faltantes_bs_formatted="0,00";
		$("#monto1").mask("#.##0,00", {reverse: true});
		this.mensajeServicio=null;
		this.monedaSelected={value:"Bs",name:"Bolívar",class:"bg-bs"}
		this.listMonedas=[{value:"Bs",name:"Bolívar",class:"bg-bs"},{value:"USD",name:"Divisas",class:"bg-usd"}];
		var newDate=new Date();
		if (newDate.getHours() < 10) {
			hora = "0" + newDate.getHours();
		} else {
			hora = newDate.getHours();
		}
		if (newDate.getMinutes() < 10) {
			minutos = "0" + newDate.getMinutes();
		} else {
			minutos = newDate.getMinutes();
		}
		var dia = newDate.getDate();
		if (dia < 10) {
			dia = "0" + newDate.getDate();
		}
		var mes=(newDate.getMonth() + 1);
		if (mes < 10) {
			mes = "0" + mes;
		}
		
		this.dateFormatting = newDate.getFullYear() + '-' + mes + '-' + dia;
		this.fecha_ida=this.dateFormatting;
		this.fecha_vuelta=this.dateFormatting;
		
		this.checkRol();
	}
	app.NewSalesComponent.prototype.keyPressNumber=function(event){
		return keypressNumbersInteger(event);
	}
	app.NewSalesComponent.prototype.addPassenger=function(){
		var objeto = { id_doc:"V",doc:"",name:"",type:"ADULT"};
		this.listPassenger.push(objeto);
	}
	app.NewSalesComponent.prototype.deletePassenger=function(index){
		var provi = this.listPassenger.slice(index + 1);
		this.listPassenger = this.listPassenger.slice(0, index);
		this.listPassenger = this.listPassenger.concat(provi);
	}
	app.NewSalesComponent.prototype.clean=function(){
		this.listPassenger=[];
		this.listViajes=[];
		this.viajeSeleccionado=null;
		this.destinoSelected=null;
		this.destinoSelectedMostrar=null;
	}
	app.NewSalesComponent.prototype.keyupsearch=function(event){
		try{
			 if (event.keyCode == 13) {
			     this.buscarDestinos();
			 }
		}catch(err){
			
		}
	}
	app.NewSalesComponent.prototype.checkRol=function(){
		var texto="NEW-SALES";
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
						this.getTasaCambio();
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
	app.NewSalesComponent.prototype.openModalDestinos=function(){
		this.destino_buscar=null;
		$("#modalSearchViajes").modal("show")
	}
	app.NewSalesComponent.prototype.buscarDestinos=function(){
		this.jsonFilter="";
		if(!(this.destino_buscar==null || this.destino_buscar==undefined || this.destino_buscar=="" || this.destino_buscar=="null")){
			this.jsonFilter=this.destino_buscar.trim().toUpperCase();
		}
		this.callServices(1, "&limit="+this.detallePorPagina);
	}
	app.NewSalesComponent.prototype.getCantidadSelected=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPagina = data.detalles;
			this.totalPage = data.pagina;
			if (this.listDestinos == null || this.listDestinos == undefined || this.listDestinos.length == 0) {
				this.mensaje = capitalizeOnly(_("message_dflt_4"));
			} else {
				this.callServices(1, '&limit=' + this.detallePorPagina);
			}
		}
	}
	app.NewSalesComponent.prototype.getValueFirst=function(data){
		this.listDestinos = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.NewSalesComponent.prototype.getValuePrevious=function(data){
		this.listDestinos = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.NewSalesComponent.prototype.getValueLast=function(data){
		this.listDestinos = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.NewSalesComponent.prototype.getValueNext=function(data){
		this.listDestinos = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.NewSalesComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.NewSalesComponent.prototype.callServices = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys=parametros;
		this.mostrarCargando=true;
		let request = this.service.callServicesHttp("parada-report-open", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mostrarCargando=false;
			this.mensajeServicio = this.service.processError(err, mensajeAll);
		});
	}
	app.NewSalesComponent.prototype.procesarRespuesta=function(data){
		this.mostrarCargando=false;
		var key="results";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			this.listDestinos=[];
			this.mensajeServicio=mensajeAll;
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("count")){
					if(data.count==null || data.count==undefined || data.count==0){
						this.listDestinos=[];
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
							this.listDestinos = [];
							for (var i = 0; i < data[key].length; i++) {
								objeto = this.formattedData(data[key][i]);
								if (objeto != null) {
									this.listDestinos.push(objeto);
								}
							}
							this.pagingActual.count = data.count;
						}else{
							this.listDestinos=[];
						}
					}
				}else{
					this.listDestinos=[];
				}
			}else{
				this.mensajeServicio=this.service.processMessageError(data,mensajeAll);
			}
		}
	}
	app.NewSalesComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.NewSalesComponent.prototype.selectedDestino=function(data){
		if(!(data==null || data==undefined || data=="")){
			this.destinoSelected=data.code;
			this.destinoSelectedMostrar=data.code+" - "+data.name;
			$("#modalSearchViajes").modal("hide");
		}
	}
	app.NewSalesComponent.prototype.buscar=function(){
		this.listAdultos=[];
		this.listInfantes=[];
		this.listMayores=[];
		this.viajeSeleccionado=null;
		this.viajeObjetoSelected=null;
		if(this.destinoSelected==null){
			this.mensaje="Debe seleccionar el destino";
			this.msg.warning();
			return;
		}
		if(this.total_pasajeros==0){
			this.mensaje="Debe ingresar al menos un pasajero";
			this.msg.warning();
			return;
		}
		if(this.fecha_ida==null || this.fecha_ida==undefined || this.fecha_ida==""){
			this.mensaje="Debe ingresar la fecha de ida";
			this.msg.warning();
			return;
		}
		this.jsonFilterViaje={};
		if(!(this.fecha_ida==null || this.fecha_ida==undefined || this.fecha_ida=="")){
			this.jsonFilterViaje.departure_date={};
			this.jsonFilterViaje.departure_date.lte=this.fecha_ida+"T23:59:59.000Z";
			this.jsonFilterViaje.departure_date.gte=this.fecha_ida+"T00:00:00.000Z";
			this.jsonFilterViaje.departure_date.time_zone=getTimeZone();
		}
		if(!(this.destinoSelected==null || this.destinoSelected==undefined || this.destinoSelected=="" || this.destinoSelected=="null")){
			this.jsonFilterViaje.destination_stop=this.destinoSelected;
		}
		this.jsonFilterViaje.active=true;
		this.jsonFilterViaje.online_sales=true;
		this.jsonFilterViaje.status=["PUBLISHED"];
		this.callServicesViaje(1, "&limit="+this.detallePorPaginaViaje);
	}
	app.NewSalesComponent.prototype.getCantidadSelectedViajes=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPaginaViaje = data.detalles;
			this.totalPageViaje = data.pagina;
			if (this.listViajes == null || this.listViajes == undefined || this.listViajes.length == 0) {
				this.mensaje = capitalizeOnly(_("message_dflt_4"));
			} else {
				this.callServicesViaje(1, '&limit=' + this.detallePorPaginaViaje);
			}
		}
	}
	app.NewSalesComponent.prototype.getValueFirstViajes=function(data){
		this.listViajes = [];
		if (this.paginActualViaje.hasOwnProperty('first_page')) {
			if (!(this.paginActualViaje.first_page == null || this.paginActualViaje.first_page == undefined || this.paginActualViaje.first_page == "")) {
				this.callServicesViaje(data, this.paginActualViaje.first_page);
			}
		}
	}
	app.NewSalesComponent.prototype.getValuePreviousViajes=function(data){
		this.listViajes = [];
		if (this.paginActualViaje.hasOwnProperty('previous_page')) {
			if (!(this.paginActualViaje.previous_page == null || this.paginActualViaje.previous_page == undefined || this.paginActualViaje.previous_page == "")) {
				this.callServicesViaje(data, this.paginActualViaje.previous_page);
			}
		}
	}
	app.NewSalesComponent.prototype.getValueLastViajes=function(data){
		this.listViajes = [];
		if (this.paginActualViaje.hasOwnProperty('last_page')) {
			if (!(this.paginActualViaje.last_page == null || this.paginActualViaje.last_page == undefined || this.paginActualViaje.last_page == "")) {
				this.callServicesViaje(data, this.paginActualViaje.last_page);
			}
		}
	}
	app.NewSalesComponent.prototype.getValueNextViajes=function(data){
		this.listViajes = [];
		if (this.paginActualViaje.hasOwnProperty('next_page')) {
			if (!(this.paginActualViaje.next_page == null || this.paginActualViaje.next_page == undefined || this.paginActualViaje.next_page == "")) {
				this.callServicesViaje(data, this.paginActualViaje.next_page);
			}
		}
	}
	app.NewSalesComponent.prototype.getValueChangeRecordsViajes=function(data){
		this.pageSelectedViaje = data;
	}
	app.NewSalesComponent.prototype.callServicesViaje = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelectedViaje = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		this.listViajes=[];
		let querys="&type=PAGINATE"+parametros;
		let request = this.service.callServicesHttp("travel-report-line", querys, this.jsonFilterViaje);
		request.subscribe(data => {
			this.procesarRespuestaViaje(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.NewSalesComponent.prototype.procesarRespuestaViaje=function(data){
		var key="results";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			this.listViajes=[];
			this.mensaje=mensajeAll;
			this.msg.error();
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("count")){
					if(data.count==null || data.count==undefined || data.count==0){
						this.listViajes=[];
						this.mensaje="No hay viajes para la fecha seleccionada";
						this.msg.warning();
						return;
					}else{
						this.paginActualViaje = {};
						this.paginActualViaje.count = data.count;
						let auxP = Math.floor(this.paginActualViaje.count / this.detallePorPaginaViaje);
						let restoAux = ((this.paginActualViaje.count) % this.detallePorPaginaViaje);
						if (restoAux == 0) {
							this.totalPageViaje = auxP;
						} else {
							this.totalPageViaje = auxP + 1;
						}
						if (data.hasOwnProperty('next_page')) {
							if (data.next_page == null || data.next_page == undefined || data.next_page == "") {
								this.paginActualViaje.next_page = null;
							} else {
								this.paginActualViaje.next_page = data.next_page;
							}
						} else {
							this.paginActualViaje.next_page = null;
						}
						if (data.hasOwnProperty('previous_page')) {
							if (data.previous_page == null || data.previous_page == undefined || data.previous_page == "") {
								this.paginActualViaje.previous_page = null;
							} else {
								this.paginActualViaje.previous_page = data.previous_page;
							}
						} else {
							this.paginActualViaje.previous_page = null;
						}
						if (data.hasOwnProperty('first_page')) {
							if (data.first_page == null || data.first_page == undefined || data.first_page == "") {
								this.paginActualViaje.first_page = null;
							} else {
								this.paginActualViaje.first_page = data.first_page;
							}
						} else {
							this.paginActualViaje.first_page = null;
						}
						if (data.hasOwnProperty('last_page')) {
							if (data.last_page == null || data.last_page == undefined || data.last_page == "") {
								this.paginActualViaje.last_page = null;
							} else {
								this.paginActualViaje.last_page = data.last_page;
							}
						} else {
							this.paginActualViaje.last_page = null;
						}
						if (data.hasOwnProperty(key)) {
							var objeto = {};
							this.listViajes = [];
							for (var i = 0; i < data[key].length; i++) {
								objeto = this.formattedDataViajes(data[key][i]);
								if (objeto != null) {
									this.listViajes.push(objeto);
								}
							}
							this.paginActualViaje.count = data.count;
						}else{
							this.listViajes=[];
						}
					}
				}else{
					this.mensaje="No hay viajes para la fecha seleccionada";
					this.msg.warning();
					return;
					this.listViajes=[];
				}
			}else{
				this.mensaje=this.service.processMessageError(data,mensajeAll);
				this.msg.error();
			}
		}
	}
	app.NewSalesComponent.prototype.getTasaCambio=function(){
		let request=this.service.callServicesHttp('get-exchanged',null,null);
		let mensajeAll=_("message_dflt_85");
		request.subscribe(data => {
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.warning();
			}else{
				if(data.hasOwnProperty("body")){
					if(data.body!=null && data.body.length!=0){
						for(var i=0;i<data.body.length;i++){
							if(data.body[i]!=null){
								if(data.body[i].hasOwnProperty("currency")){
									if(data.body[i].currency=="USD"){
										if(data.body[i].hasOwnProperty("rate")){
											if(!(data.body[i].rate==null || data.body[i].rate==undefined || data.body[i].rate=="")){
												this.tasaCambio=data.body[i].rate;
												break;
											}
										}
									}
								}
							}
						}
					}
				}else{
					this.mensaje = this.service.processMessageError(data, mensajeAll);
				}
			}
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.NewSalesComponent.prototype.formattedDataViajes=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.hasOwnProperty("departure_date")){
				if(!(data.departure_date==null || data.departure_date==undefined || data.departure_date=="")){
					data.formatted_departure_date=formattingDate(data.departure_date);
				}
			}
			if(data.hasOwnProperty("fares")){
				if(data.fares!=null && data.fares.length!=0){
					for(var i=0;i<data.fares.length;i++){
						if(data.fares[i]!=null){
							if(data.fares[i].hasOwnProperty("destination_stop_code")){
								if(data.fares[i].destination_stop_code==this.destinoSelected){
									if(data.fares[i].hasOwnProperty("amount")){
										try{
											data.fares[i].rate_public=0.12;
											var aux1=data.fares[i].amount*data.fares[i].rate_public
											data.tarifa_id=data.fares[i].id;
											data.tarifa_monto_original=data.fares[i].amount;
											var monto_aux=data.fares[i].amount;

											monto_aux=(data.fares[i].amount+aux1).toFixed(2)
											data.tarifa=amountFormattingObject(monto_aux*100);
											data.tarifa=data.tarifa.integerPart+","+data.tarifa.decimalPart;
											if(data.fares[i].hasOwnProperty("currency")){
												if(!(data.fares[i].currency==null || data.fares[i].currency==undefined || data.fares[i].currency=="")){
													data.tarifa=data.tarifa+" "+_(data.fares[i].currency);
													data.tarifa_currency=data.fares[i].currency;
												}
											}
											if(this.tasaCambio!=null){
												data.bs_cambio=(monto_aux*this.tasaCambio).toFixed(2);
												data.bs_cambio=amountFormattingObject(data.bs_cambio*100);
												data.bs_cambio=data.bs_cambio.integerPart+","+data.bs_cambio.decimalPart;
												data.bs_cambio=data.bs_cambio+" Bs";
											}
											break;
										}catch(er){
										}
									}
								}
							}
						}
					}
				}
			}
			return data;
			
		}
	}
	app.NewSalesComponent.prototype.back=function(){
		window.history.back();
	}
	app.NewSalesComponent.prototype.done=function(){
		if(this.destinoSelected==null || this.destinoSelected==undefined || this.destinoSelected==""){
			this.mensaje=_("warning57");
			this.msg.warning();
			return;
		}
		if(this.viajeSeleccionado==null || this.viajeSeleccionado==undefined || this.viajeSeleccionado==""){
			this.mensaje=_("warning56");
			this.msg.warning();
			return;
		}
		if(this.listPassenger==null || this.listPassenger.length==0){
			this.mensaje=_("warning54");
			this.msg.warning();
			return;
		}
		var objeto_viaje=null;
		if(this.listViajes!=null && this.listViajes.length!=0){
			for(var i=0;i<this.listViajes.length;i++){
				if(this.listViajes[i]!=null){
					if(this.listViajes[i].id==this.viajeSeleccionado){
						objeto_viaje=this.listViajes[i];
						break;
					}
				}
			}
		}
		if(objeto_viaje==null){
			this.mensaje=_("warning56");
			this.msg.warning();
			return;
		}
		var fare_id=null;
		if(objeto_viaje.hasOwnProperty("fares")){
			if(objeto_viaje.fares!=null && objeto_viaje.fares.length!=0){
				for(var i=0;i<objeto_viaje.fares.length;i++){
					if(objeto_viaje.fares[i]!=null){
						if(objeto_viaje.fares[i].destination_stop_code==this.destinoSelected){
							fare_id=objeto_viaje.fares[i].id;
						}
					}
				}
			}
		}
		if(fare_id==null){
			this.mensaje=_("warning58");
			this.msg.warning();
			return;
		}
		var lista=[];
		var objeto={};
		for(var i=0; i<this.listPassenger.length;i++){
			if(this.listPassenger[i]!=null){
				objeto={};
				if(this.listPassenger[i].hasOwnProperty("type")){
					if(this.listPassenger[i].type==null || this.listPassenger[i].type==undefined || this.listPassenger[i].type==""){
						this.mensaje="Debe ingresar el tipo de pasaje de la línea nro. "+(i+1);
						this.msg.warning();
						return;
					}else{
						objeto.type=this.listPassenger[i].type;
					}
				}else{
					this.mensaje="Debe ingresar el tipo de pasaje de la línea nro. "+(i+1);
					this.msg.warning();
					return;
				}
				if(this.listPassenger[i].type!="INFANT"){
					if(this.listPassenger[i].hasOwnProperty("id_doc")){
					if(this.listPassenger[i].id_doc==null || this.listPassenger[i].id_doc==undefined || this.listPassenger[i].id_doc==""){
						this.mensaje="Debe ingresar el tipo de documento de la línea nro. "+(i+1);
						this.msg.warning();
						return;
					}else{
						objeto.id_doc=this.listPassenger[i].id_doc;
						if(this.listPassenger[i].hasOwnProperty("doc")){
							if(this.listPassenger[i].doc==null || this.listPassenger[i].doc==undefined || this.listPassenger[i].doc==""){
								this.mensaje="Debe ingresar el número de documento de la línea nro. "+(i+1);
								this.msg.warning();
								return;
							}else{
								if(!utils_keyNumber(this.listPassenger[i].doc.trim())){
									this.mensaje="El número de documento de la línea nro. "+(i+1)+" tiene formato incorrecto debe ser sólo números";
									this.msg.warning();
									return;
								}
								this.listPassenger[i].doc=this.listPassenger[i].doc.trim();
								if(this.listPassenger[i].doc.length<9){
									var length=9-this.listPassenger[i].doc.length;
									var aux="";
									for(var j=0;j<length;j++){
										aux=aux+"0";
									}
									this.listPassenger[i].doc=aux+this.listPassenger[i].doc;
								}
								objeto.id_doc=objeto.id_doc+this.listPassenger[i].doc.trim();
							}
						}else{
							this.mensaje="Debe ingresar el número de documento de la línea nro. "+(i+1);
							this.msg.warning();
							return;
						}
					}
				}else{
					this.mensaje="Debe ingresar el tipo de documento de la línea nro. "+(i+1);
					this.msg.warning();
					return;
				}
				}
				if(this.listPassenger[i].hasOwnProperty("name")){
					if(this.listPassenger[i].name==null || this.listPassenger[i].name==undefined || this.listPassenger[i].name==""){
						this.mensaje="Debe ingresar el nombre del pasajero de la línea "+(i+1);
						this.msg.warning();
						return;
					}else{
						objeto.name=this.listPassenger[i].name.trim().toUpperCase();
					}
				}else{
					this.mensaje="Debe ingresar el nombre del pasajero de la línea "+(i+1);
					this.msg.warning();
					return;
				}
				objeto.fare_id=fare_id;
				objeto.active=true;
				lista.push(objeto);
			}
		}
		let request = this.service.callServicesHttp("reservation-post","&itinerary_id="+objeto_viaje.itinerary_id+"&trip_id="+objeto_viaje.id, lista);
		let mensajeAll=_("message_dflt_86");
		request.subscribe(data => {
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.warning();
				return;
			}else{
				if(data.status_http==200){
					this.router.navigate(['/add-payment-taquilla'], { queryParams: { id: data.id,itinerary_id :data.itinerary_id,trip_id:data.trip_id} });
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