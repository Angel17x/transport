(function(app) {
	app.CheckTripComponent =
		ng.core.Component({
		selector: 'check-trip',
		templateUrl: 'views/check-trip.html'
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
	app.CheckTripComponent.prototype.ngOnInit=function(){
		this.title=_("title69");
		this.fecha=null;
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
	app.CheckTripComponent.prototype.checkRol=function(){
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
							if(tabla[i].name=="CHECK-TRIP"){
								flag=true;
								if(tabla[i].hasOwnProperty("actions")){
									if(!(tabla[i].actions==null || tabla[i].actions==undefined || tabla[i].actions=="" || tabla[i].actions.length==0)){
										for(var j=0;j<tabla[i].actions.length;j++){
											if(tabla[i].actions[j]!=null){
												objeto=null;
												objeto=this.formattedActions(tabla[i].actions[j]);
											}
										}
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
	app.CheckTripComponent.prototype.formattedActions=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.name=="CHECK-OPERATION"){
				this.mostrarCheckOperacion=true;
				return null;
			}
			if(data.name=="CHECK-INTT"){
				this.mostrarCheckIntt=true;
				return null;
			}
			return data;
		}
	}
	app.CheckTripComponent.prototype.clean=function(){
		this.fecha=null;
		this.nro=null;
	}
	app.CheckTripComponent.prototype.buscar=function(){
		this.jsonFilter={};
		if(this.fecha==null || this.fecha==undefined || this.fecha==""){
			this.mensaje="Debe ingresar la fecha del viaje";
			this.msg.warning();
			return;
		}else{
			this.jsonFilter.departure_date={};
			this.jsonFilter.departure_date.lte=this.fecha+"T23:59:59.000Z";
			this.jsonFilter.departure_date.gte=this.fecha+"T00:00:00.000Z";
			this.jsonFilter.departure_date.time_zone=getTimeZone();
		}
		if(this.nro==null || this.nro==undefined || this.nro=="" || this.nro==0){
			this.mensaje="Debe ingresar el nro del viaje";
			this.msg.warning();
			return;
		}else{
			var nro=null;
			try{
				nro=parseInt(this.nro.trim());
			}catch(er){
				nro=null;
			}
			if(nro==null){
				this.mensaje="El formato del número del viaje tiene un formato incorrecto";
				this.msg.warning();
				return;
			}else{
				this.jsonFilter.sequence={};
				this.jsonFilter.sequence.lte=nro;
				this.jsonFilter.sequence.gte=nro;
			}	
		}
		this.callServices();
	}
	app.CheckTripComponent.prototype.callServices = function () {
		let mensajeAll=_("message_dflt_81");
		let querys="&type=PAGINATE&limit=1";
		this.sequence=null;
		this.fecha_salida=null;
		this.hora_salida=null;
		this.boarding_gate=null;
		this.drivers=[];
		this.ocupados=null;
		this.line_code=null;
		this.line_name=null;
		let request = this.service.callServicesHttp("travel-report", querys, this.jsonFilter);
		request.subscribe(data => {
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.warning();
				return;
			}else{
				if(data.hasOwnProperty("results")){
					if(data.results==null || data.results.length==0){
						this.mensaje="No hay viajes con ese identificador y/o fecha";
						this.msg.warning();
						return;
					}else{
						try{
							var viaje=data.results[0];
							this.dataSelected=viaje;
							if(viaje.hasOwnProperty("line_code")){
								if(!(viaje.line_code==null || viaje.line_code==undefined || viaje.line_code=="")){
									this.line_code=viaje.line_code;
								}
								if(!(viaje.line_name==null || viaje.line_name==undefined || viaje.line_name=="")){
									this.line_name=viaje.line_name;
								}
							}
							if(viaje.hasOwnProperty("boarding_gate")){
								if(!(viaje.boarding_gate==null || viaje.boarding_gate==undefined || viaje.boarding_gate=="")){
									this.boarding_gate=viaje.boarding_gate;
								}
							}
							if(viaje.hasOwnProperty("sequence")){
								if(!(viaje.sequence==null || viaje.sequence==undefined || viaje.sequence=="")){
									this.sequence=viaje.sequence;
								}
							}
							if(viaje.hasOwnProperty("intt_check")){
								if(viaje.intt_check){
									this.check_intt="SI";
								}else{
									this.check_intt="NO";
								}
							}
							if(viaje.hasOwnProperty("operation_check")){
								if(viaje.operation_check){
									this.operation_check="SI";
								}else{
									this.operation_check="NO";
								}
							}
							if(viaje.hasOwnProperty("seats_active")){
								this.ocupados=viaje.seats_active;
								this.total_puesto=viaje.seats_active;
								if(viaje.hasOwnProperty("seats_available")){
									this.ocupados=viaje.seats_active-viaje.seats_available;
								}
							}
							if(viaje.hasOwnProperty("drivers")){
								this.drivers=viaje.drivers;
							}
							if(viaje.hasOwnProperty("vehicle_license_plate")){
								if(!(viaje.vehicle_license_plate==null || viaje.vehicle_license_plate==undefined || viaje.vehicle_license_plate=="")){
									this.vehicle_license_plate=viaje.vehicle_license_plate;
								}
							}
							if(viaje.hasOwnProperty("departure_date")){
								if(!(viaje.departure_date==null || viaje.departure_date==undefined || viaje.departure_date=="")){
									this.fecha_salida=replaceAll(viaje.departure_date, "T", " ");
									try{
										this.fecha_salida=this.fecha_salida.split(" ");
										this.hora_salida=this.fecha_salida[1];
										this.fecha_salida=this.fecha_salida[0];
									}catch(er){
									}
								}
							}
						}catch(er){
						}
					}
				}else{
					this.mensaje="No hay viajes con ese identificador y/o fecha";
					this.msg.warning();
					return;
				}
			}
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.CheckTripComponent.prototype.openModalINTT=function(){
		$("#modalCheckViajeINTT").modal("show")
	}
	app.CheckTripComponent.prototype.openModalOperaciones=function(){
		$("#modalCheckViajeOperaciones").modal("show");
	}
	app.CheckTripComponent.prototype.checkData=function(item){
		if(item=="INTT"){
			$("#modalCheckViajeINTT").modal('hide');
		}else{
			$("#modalCheckViajeOperaciones").modal('hide');
		}
		
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning12"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&line_id="+this.dataSelected.business_id+"&itinerary_id="+this.dataSelected.itinerary_id+"&id="+this.dataSelected.id+"&check=true";
					let mensajeAll=_("message_dflt_82");
					let request = null;
					if(item=="INTT"){
						$("#modalCheckViajeINTT").modal('hide');
						request = this.service.callServicesHttp("travel-check-intt", querys,null );
					}else{
						$("#modalCheckViajeOperaciones").modal('hide');
						request = this.service.callServicesHttp("travel-check-operation", querys,null );
					}
					request.subscribe(data => {
						if (data == null || data == undefined || data == "") {
							this.mensaje = mensajeAll;
							this.msg.error();
						} else {
							if (data.status_http == 200) {
								if(data.hasOwnProperty("intt_check")){
									if(data.intt_check==true){
										this.check_intt="SI";
									}else{
										this.check_intt="NO";
									}
								}
								if(data.hasOwnProperty("operation_check")){
									if(data.operation_check==true){
										this.operation_check="SI";
									}else{
										this.operation_check="NO";
									}
								}
								this.mensaje=_("success60");
								this.msg.info();
							} else {
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
		}
	
	}
})(window.app || (window.app = {}));