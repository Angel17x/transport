(function(app) {
	app.GeneralReportSalesComponent =
		ng.core.Component({
		selector: 'general-report-sales',
		templateUrl: 'views/general-report-sales-v1.html'
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
	app.GeneralReportSalesComponent.prototype.ngOnInit=function(){
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
		var fecha_actual=new Date();
		var hora = "00";
		var minutos = "00";
		if (fecha_actual.getHours() < 10) {
			hora = "0" + fecha_actual.getHours();
		} else {
			hora = fecha_actual.getHours();
		}
		if (fecha_actual.getMinutes() < 10) {
			minutos = "0" + fecha_actual.getMinutes();
		} else {
			minutos = fecha_actual.getMinutes();
		}
		var dia = fecha_actual.getDate();
		if (dia < 10) {
			dia = "0" + fecha_actual.getDate();
		}
		var mes=fecha_actual.getMonth() + 1;
		if (mes < 10) {
			mes = "0" + mes;
		}
		this.fecha=dia + '-' + mes + '-' + fecha_actual.getFullYear();
		this.hora=hora + ':' + minutos;
		this.tipo="LONG_ROUTE";
		this.listType=[{value:"LONG_ROUTE",name:"Ruta larga"},{value:"SHORT_ROUTE",name:"Ruta corta"}];
		//this.checkRol();
		this.getData();
	}
	app.GeneralReportSalesComponent.prototype.clean=function(){
		this.init=null;
		this.tipo=null;
	}
	app.GeneralReportSalesComponent.prototype.checkRol=function(){
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
							if(tabla[i].name=="COLLECTION-RATIO"){
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
	app.GeneralReportSalesComponent.prototype.getData=function(){
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null){
						if(this.active.queryParams._value.hasOwnProperty('id')){
							this.id=this.active.queryParams._value.id;
						}
					}
				}
			}
		}
	}
	app.GeneralReportSalesComponent.prototype.search=function(){
		this.jsonFilter={};
		if(this.init==null || this.init==undefined || this.init==""){
			this.mensaje="Debe ingresar la fecha a buscar";
			this.msg.warning();
			return;
		}else{
			this.jsonFilter.departure_date=this.init;
		}
		if(this.tipo==null || this.tipo==undefined || this.tipo=="null"){
			this.mensaje="Debe ingresar el tipo de viaje";
			this.msg.warning();
			return;
		}
		this.jsonFilter.status=["PAID"];
		this.jsonFilter.payment_status= ["AUTHORIZED"];
		this.callServices();
	}
	app.GeneralReportSalesComponent.prototype.callServices = function () {
		let mensajeAll=_("message_dflt_1");
		this.data_original=null;
		this.listRegister=[];
		let request = this.service.callServicesHttp("sales-all-line", null, this.jsonFilter);
		request.subscribe(data => {
			this.data_original=data;
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.GeneralReportSalesComponent.prototype.procesarRespuesta=function(data){
		var key="trips";
		let mensajeAll=capitalizeOnly(_("message_dflt_1"));
		if(data==null || data==undefined || data==""){
			this.listRegister=[];
			this.mensaje=mensajeAll;
			this.msg.error();
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("line_name")){
					if(!(data.line_name==null || data.line_name==undefined || data.line_name==undefined)){
						this.line_name=data.line_name;
					}
				}
				if(data.hasOwnProperty("line_code")){
					if(!(data.line_code==null || data.line_code==undefined || data.line_code==undefined)){
						this.line_code=data.line_code;
					}
				}
				if(this.tipo=="LONG_ROUTE"){
					if(data.hasOwnProperty("usd_sum")){
						if(!(data.usd_sum==null || data.usd_sum==undefined || data.usd_sum=="")){
							try{
								var suma=parseFloat(((data.usd_sum*100)/112).toFixed(2));
								this.monto_total_us=amountFormattingObject(data.usd_sum*100);
								this.monto_total_us=this.monto_total_us.integerPart+","+this.monto_total_us.decimalPart+" $";
								
								this.porcentaje_total_us=amountFormattingObject(suma*12);
								this.porcentaje_total_us=this.porcentaje_total_us.integerPart+","+this.porcentaje_total_us.decimalPart+" $";
							}catch(et){
							}
						}
					}
					if(data.hasOwnProperty("ves_sum")){
						if(!(data.ves_sum==null || data.ves_sum==undefined || data.ves_sum=="")){
							var suma=parseFloat(((data.ves_sum*100)/112).toFixed(2));
							this.monto_total=amountFormattingObject(parseFloat(data.ves_sum.toFixed(2))*100);
							this.monto_total=this.monto_total.integerPart+","+this.monto_total.decimalPart+" Bs";
							this.porcentaje_total=amountFormattingObject(suma*12);
							this.porcentaje_total=this.porcentaje_total.integerPart+","+this.porcentaje_total.decimalPart+" Bs";
						}
					}
					if(data.hasOwnProperty("long_route_trips")){
						if(!(data.long_route_trips==null || data.long_route_trips.length==0)){
							var objeto=null;
							this.listRegister = [];
							for(var i=0;i<data.long_route_trips.length;i++){
								if(data.long_route_trips[i]!=null){
									objeto=null;
									objeto = this.formattedData(data.long_route_trips[i]);
									if (objeto != null) {
										this.listRegister.push(objeto);
									}
								}
							}
						}
					}else{
						this.listRegister=[];
					}
				}else{
					if(data.hasOwnProperty("short_route_sum_usd")){
						if(!(data.short_route_sum_usd==null || data.short_route_sum_usd==undefined || data.short_route_sum_usd=="")){
							try{
								this.monto_total_us=amountFormattingObject(data.short_route_sum_usd*100);
								this.monto_total_us=this.monto_total_us.integerPart+","+this.monto_total_us.decimalPart+" $";
							}catch(et){
							}
						}
					}
					if(data.hasOwnProperty("short_route_sum_ves")){
						if(!(data.short_route_sum_ves==null || data.short_route_sum_ves==undefined || data.short_route_sum_ves=="")){
							this.monto_total=amountFormattingObject(parseFloat(data.short_route_sum_ves.toFixed(2))*100);
							this.monto_total=this.monto_total.integerPart+","+this.monto_total.decimalPart+" Bs";
						}
					}
					if(data.hasOwnProperty("short_route_trips")){
						if(!(data.short_route_trips==null || data.short_route_trips.length==0)){
							var objeto=null;
							this.listRegister = [];
							for(var i=0;i<data.short_route_trips.length;i++){
								if(data.short_route_trips[i]!=null){
									objeto=null;
									objeto = this.formattedData(data.short_route_trips[i]);
									if (objeto != null) {
										this.listRegister.push(objeto);
									}
								}
							}
						}
					}else{
						this.listRegister=[];
					}
				}
			}else{
				this.mensaje=this.service.processMessageError(data,mensajeAll);
				this.msg.error();
			}
		}
	}
	app.GeneralReportSalesComponent.prototype.changeType=function(){
		this.listRegister=[];
		this.search();
	}
	app.GeneralReportSalesComponent.prototype.checkAction=function(data){
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
	app.GeneralReportSalesComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.hasOwnProperty("usd_sum")){
				var suma=0;
				var total_12=0;
				var total_6=0;
				if(this.tipo=="LONG_ROUTE"){
					suma=parseFloat(((data.usd_sum*100)/112).toFixed(2));
				}else{
					suma=data.usd_sum;
					
				}
				try{
					data.formatted_usd_sum=amountFormattingObject(data.usd_sum*100);
					data.formatted_usd_sum=data.formatted_usd_sum.integerPart+","+data.formatted_usd_sum.decimalPart+" $";
				}catch(er){
				}
				if(this.tipo=="LONG_ROUTE"){
					try{
						total_12=parseFloat((suma*0.12).toFixed(2));
						data.formatted_usd_porcentaje=amountFormattingObject(suma*12);
						data.formatted_usd_porcentaje=data.formatted_usd_porcentaje.integerPart+","+data.formatted_usd_porcentaje.decimalPart+" $";
					}catch(er){
					}
					try{
						total_6=parseFloat((suma*0.06).toFixed(2));
						data.formatted_usd_porcentaje_6=amountFormattingObject(suma*6);
						data.formatted_usd_porcentaje_6=data.formatted_usd_porcentaje_6.integerPart+","+data.formatted_usd_porcentaje_6.decimalPart+" $";
					}catch(er){
					}
				}
			}
			if(data.hasOwnProperty("ves_sum")){
				if(!(data.ves_sum==null || data.ves_sum==undefined || data.ves_sum=="" || data.ves_sum==0)){
					var suma=0;
					var total_12=0;
					var total_6=0;
					if(this.tipo=="LONG_ROUTE"){
						suma=parseFloat(((data.ves_sum*100)/112).toFixed(2));
					}else{
						suma=data.ves_sum;
					}
					try{
						data.formatted_sum=amountFormattingObject(data.ves_sum*100);
						data.formatted_sum=data.formatted_sum.integerPart+","+data.formatted_sum.decimalPart+" Bs";
					}catch(ew){
					}
					if(this.tipo=="LONG_ROUTE"){
						try{
							total_12=parseFloat((suma*0.12).toFixed(2));
							data.formatted_porcentaje=amountFormattingObject(total_12*100);
							data.formatted_porcentaje=data.formatted_porcentaje.integerPart+","+data.formatted_porcentaje.decimalPart+" Bs";
						}catch(ew){
							console.log("ew",ew);
						}
						try{
							total_6=parseFloat((suma*0.06).toFixed(2));
							data.formatted_porcentaje_6=amountFormattingObject(total_6*100);
							data.formatted_porcentaje_6=data.formatted_porcentaje_6.integerPart+","+data.formatted_porcentaje_6.decimalPart+" Bs";
						}catch(ew){
							console.log("ew",ew);
						}
					}
				}
			}
			return data;
		}
	}
	app.GeneralReportSalesComponent.prototype.redirect=function(data){
		this.router.navigate(['/travel-passengers'], { queryParams: { trip_id: data.trip_id, itinerary_id:data.itinerary_id, business_id:this.service.getBusinessId()} });
	}
	app.GeneralReportSalesComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));