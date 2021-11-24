(function(app) {
	app.CheckPassengerComponent =
		ng.core.Component({
		selector: 'check-passenger',
		templateUrl: 'views/check-passenger.html'
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
	app.CheckPassengerComponent.prototype.ngOnInit=function(){
		this.title=_("title66");
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=10;
		this.pageSelected=1;
		this.listRegister=[];
		this.doc=null;
		this.reservacion=null;
		var newDate=new Date();
		var dia = newDate.getDate();
		if (dia < 10) {
			dia = "0" + newDate.getDate();
		}
		var mes=(newDate.getMonth() + 1);
		if (mes < 10) {
			mes = "0" + mes;
		}
		this.fecha = newDate.getFullYear() + '-' + mes + '-' + dia;
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
	app.CheckPassengerComponent.prototype.checkRol=function(){
		var texto="CHECK-PASSENGER";
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
	app.CheckPassengerComponent.prototype.search=function(){
		this.jsonFilter={};
		if(this.fecha==null || this.fecha==undefined || this.fecha==""){
			this.mensaje="Debe ingresar la fecha de salida";
			this.msg.warning();
			return;
		}else{
			this.jsonFilter.trip_departure_date={};
			this.jsonFilter.trip_departure_date.lte=this.fecha+"T23:59:59.000Z";
			this.jsonFilter.trip_departure_date.gte=this.fecha+"T00:00:00.000Z";
			this.jsonFilter.trip_departure_date.time_zone=getTimeZone();
		}
		if((this.reservacion==null || this.reservacion==undefined || this.reservacion=="" || this.reservacion==0) && (this.doc==null || this.doc==undefined || this.doc=="")){
			this.mensaje="Debe ingresar el número de reservación o número de documento del pasajero";
			this.msg.warning();
			return;
		}
		if(!(this.reservacion==null || this.reservacion==undefined || this.reservacion=="" || this.reservacion==0)){
			var reserva=null;
			try{
				reserva=parseInt(this.reservacion.trim());
			}catch(er){
				reserva=null;
			}
			if(reserva==null){
				this.mensaje="El formato de la reserva tiene un formato incorrecto";
				this.msg.warning();
				return;
			}else{
				this.jsonFilter.reservation_sequence={};
				this.jsonFilter.reservation_sequence.lte=reserva;
				this.jsonFilter.reservation_sequence.gte=reserva;
			}	
		}
		if(!(this.doc==null || this.doc==undefined || this.doc=="")){
			this.jsonFilter.passenger=this.doc.trim();
		}
		this.callServices(1, "&limit="+this.detallePorPagina);
	}
	app.CheckPassengerComponent.prototype.clean=function(){
		var newDate=new Date();
		var dia = newDate.getDate();
		if (dia < 10) {
			dia = "0" + newDate.getDate();
		}
		var mes=(newDate.getMonth() + 1);
		if (mes < 10) {
			mes = "0" + mes;
		}
		this.fecha = newDate.getFullYear() + '-' + mes + '-' + dia;
		this.doc=null;
		this.reservacion=null;
	}
	app.CheckPassengerComponent.prototype.getCantidadSelected=function(data){
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
	app.CheckPassengerComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.CheckPassengerComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.CheckPassengerComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.CheckPassengerComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.CheckPassengerComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.CheckPassengerComponent.prototype.callServices = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="&type=PAGINATE"+parametros;
		let request = this.service.callServicesHttp("passenger-report", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.CheckPassengerComponent.prototype.procesarRespuesta=function(data){
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
	app.CheckPassengerComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.hasOwnProperty("type")){
				if(!(data.type==null || data.type==undefined || data.type=="")){
					data.formatted_type=_(data.type).toUpperCase();
				}
			}
			if(data.hasOwnProperty("status")){
				if(!(data.status==null || data.status==undefined || data.status=="")){
					data.formatted_status=_(data.status).toUpperCase();
				}
			}
			return data;
		}
	}
	app.CheckPassengerComponent.prototype.changeStatus=function(item,data){
		if(item==null || item==undefined || item==""){
			this.mensaje=capitalizeOnly(_("warning50"));
			this.msg.warning();
			return;
		}else{
			var querys="&itinerary_id="+item.itinerary_id+"&trip_id="+item.trip_id+"&id="+item.id+"&business_id="+item.business_id+"&status="+data+"&vehicle_type_id="+item.vehicle_type_id;
			let mensajeAll=_("message_dflt_76");
			let request = this.service.callServicesHttp("passenger-change-status", querys,null );
				request.subscribe(data => {
					if(data==null || data==undefined || data==""){
						this.mensaje=mensajeAll;
						this.msg.error();
					}else{
						if(data.status_http==200){
							try{
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
								this.mensaje=_("success56");
								this.msg.info();
							}catch(er){
							}
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
})(window.app || (window.app = {}));