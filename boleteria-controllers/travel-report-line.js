(function(app) {
	app.TravelReportLineComponent =
		ng.core.Component({
		selector: 'travel-report-line',
		templateUrl: 'views/travel-report-line-v5.html',
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
	app.TravelReportLineComponent.prototype.ngOnInit=function(){
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=10;
		this.pageSelected=1;
		this.listRegister=[];
		this.listStatus=[{value:null,name:"Todos"},{value:"PUBLISHED",name:"Publicado"},{value:"UNPUBLISHED",name:"No publicado"},{value:"CLOSE",name:"Cerrado"}];
		this.status=null;
		this.parada=null;
		this.placa=null;
		this.chofer=null;
		this.horario=null;
		this.linea=null;
		this.fecha=null;
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
	app.TravelReportLineComponent.prototype.checkRol=function(){
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
							if(tabla[i].name=="TRIP-LINE"){
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
								if(tabla[i].tag=="TRIP-LINE"){
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
	app.TravelReportLineComponent.prototype.formattedActions=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.TravelReportLineComponent.prototype.formattedView=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.name=="TRIP-LINE-CREATE"){
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
	app.TravelReportLineComponent.prototype.search=function(){
		this.jsonFilter={};
		var datos=[];
		var entity=null;
		if(!(this.init==null || this.init==undefined || this.init=="" || this.end==null || this.end==undefined || this.end=="")){
			this.jsonFilter.departure_date={};
			this.jsonFilter.departure_date.lte=this.end+"T23:59:59.000Z";
			this.jsonFilter.departure_date.gte=this.init+"T00:00:00.000Z";
			this.jsonFilter.departure_date.time_zone=getTimeZone();
		}
		if(!(this.parada==null || this.parada==undefined || this.parada=="" || this.parada=="null")){
			this.jsonFilter.destination_stop=this.parada;
		}
		if(!(this.placa==null || this.placa==undefined || this.placa=="" || this.placa=="null")){
			this.jsonFilter.vehicle=this.placa;
		}
		if(!(this.chofer==null || this.chofer==undefined || this.chofer=="" || this.chofer=="null")){
			this.jsonFilter.driver=this.chofer;
		}
		if(!(this.status==null || this.status==undefined || this.status=="" || this.status=="null")){
			if(this.status=="PUBLISHED"){
				this.jsonFilter.active=true;
				this.jsonFilter.online_sales=true;
				this.jsonFilter.status=["PUBLISHED"];
			}else{
				if(this.status=="INACTIVE"){
					this.jsonFilter.active=false;
				}else{
					if(this.status=="UNPUBLISHED"){
						this.jsonFilter.status=["UNPUBLISHED"];
					}else{
						if(this.status=="CLOSE"){
							this.jsonFilter.online_sales=false;
						}
					}
				}
			}
		}
		this.callServices(1, "&limit="+this.detallePorPagina);
	}
	app.TravelReportLineComponent.prototype.clean=function(){
		this.init=null;
		this.end=null;
		this.parada=null;
		this.placa=null;
		this.chofer=null;
		this.status=null;
	}
	app.TravelReportLineComponent.prototype.getCantidadSelected=function(data){
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
	app.TravelReportLineComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.TravelReportLineComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.TravelReportLineComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.TravelReportLineComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.TravelReportLineComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.TravelReportLineComponent.prototype.callServices = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		this.listRegister=[];
		let querys="&type=PAGINATE"+parametros;
		let request = this.service.callServicesHttp("travel-report-line", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.TravelReportLineComponent.prototype.procesarRespuesta=function(data){
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
	app.TravelReportLineComponent.prototype.checkAction=function(data){
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
	app.TravelReportLineComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			this.listItems=[];
			if(data.hasOwnProperty("fares")){
				if(!(data.fares==null || data.fares==undefined || data.fares.length==0)){
					for(var i=0;i<data.fares.length;i++){
						if(data.fares[i]!=null){
							if(data.fares[i].hasOwnProperty("amount")){
								try{
									data.fares[i].formatted_amount=amountFormattingObject(data.fares[i].amount*100);
									data.fares[i].formatted_amount=data.fares[i].formatted_amount.integerPart+","+data.fares[i].formatted_amount.decimalPart;
									if(data.fares[i].hasOwnProperty("currency")){
										if(!(data.fares[i].currency==null ||data.fares[i].currency==undefined || data.fares[i].currency=="" )){
											data.fares[i].formatted_amount=data.fares[i].formatted_amount+" "+_(data.fares[i].currency);
										}
									}
									
								}catch(er){
									console.log(er);
								}
							}
						}
					}
				}
			}
			if(data.hasOwnProperty("type")){
				if(!(data.type==null || data.type==undefined || data.type=="")){
					data.formatted_type=_(data.type).toUpperCase();
				}
			}
			if(data.hasOwnProperty("departure_date")){
				try{
					data.formatted_departure_date=formattingDate(data.departure_date);
				}catch(er){
				}
			}
			if(data.hasOwnProperty("seats_active") && data.hasOwnProperty("seats_available")){
				try{
					data.ocup=data.seats_active - data.seats_available;
				}catch(er){
				}
			}
			data.actions=[];
			if(this.checkAction("TRIP-DELETE")!=null){
				data.actions.push(this.checkAction("TRIP-DELETE"));
			}
			if(this.checkAction("PASSENGERS-TRIP-LINE")!=null){
				data.actions.push(this.checkAction("PASSENGERS-TRIP-LINE"));
			}
			if(data.hasOwnProperty("active")){
				if(data.active){
					if(data.status=="PUBLISHED"){
						data.formatted_status="PUBLICADO";
						if(data.hasOwnProperty("online_sales")){
							if(!data.online_sales){
								data.formatted_status="CERRADO";
							}else{
								if(this.checkAction("TRIP-CLOSE")!=null){
									data.actions.push(this.checkAction("TRIP-CLOSE"));
								}
							}
						}else{
							data.formatted_status="CERRADO";
						}
						if(this.checkAction("FAST-ENTRY-LINE")!=null){
							data.actions.push(this.checkAction("FAST-ENTRY-LINE"));
						}
					}else{
						data.formatted_status="NO PUBLICADO";
					}
				}else{
					data.formatted_status="SUSPENDIDO";
				}
			}
			return data;
		}
	}
	app.TravelReportLineComponent.prototype.deselectedData = function() {
		this.dataSelected = null;
	}
	app.TravelReportLineComponent.prototype.selectedAction = function(data, action) {
		this.dataSelected = data;
		this.fecha_reactivacion=null;
		this.hora_reactivacion=null;
		if (action.hasOwnProperty('name')) {
			switch (action.name) {
				case 'TRIP-DELETE':{
					$("#modalDeleteTravel").modal("show");
				}break;
				case 'TRIP-CLOSE':{
					$("#modalCloseTravel").modal("show");
				}break;
				case 'TRAVEL-VIEW':{
					this.router.navigate(['/travel-view'], { queryParams: { id: data.id} });
				}break;
				case 'FAST-ENTRY-LINE':{
					this.router.navigate(['/fast-entry-line'], { queryParams: { trip_id: data.id,itinerary_id: data.itinerary_id} });
				}break;
				case 'TRAVEL-UPDATE':{
					this.router.navigate(['/travel-update'], { queryParams: { id: data.id} });
				}break;
				case "PASSENGERS-TRIP-LINE":{
					this.router.navigate(['/travel-passengers'], { queryParams: { trip_id: data.id, itinerary_id:data.itinerary_id, business_id:this.service.getBusinessId()} });
				}break;
				
				default:{}
			}
		}
	}
	app.TravelReportLineComponent.prototype.closeData=function(){
		$("#modalCloseTravel").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning12"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&id="+this.dataSelected.id+"&itinerary_id="+this.dataSelected.itinerary_id+"&check=false";
					let mensajeAll="Error al cerrar viaje"
					let request = this.service.callServicesHttp("travel-close-line", querys,null );
					request.subscribe(data => {
						if (data == null || data == undefined || data == "") {
							this.mensaje = mensajeAll;
							this.msg.error();
						} else {
							if (data.status_http == 200) {
								try{
									for(var i=0;i<this.listRegister.length;i++){
										if(this.listRegister[i]!=null){
											if(this.listRegister[i].id==data.id){
												this.listRegister[i]=this.formattedData(data);
												break;
											}
										}
									}
								}catch(er){
								}
								this.mensaje="Viaje cerrado con exito";
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
	app.TravelReportLineComponent.prototype.deleteData=function(){
		$("#modalDeleteTravel").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning12"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&id="+this.dataSelected.id+"&itinerary_id="+this.dataSelected.itinerary_id;
					let mensajeAll=_("message_dflt_17");
					let request = this.service.callServicesHttp("travel-delete-line", querys,null );
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
	app.TravelReportLineComponent.prototype.procesarRespuestaDelete=function(data){
		let mensajeAll=_("message_dflt_17");
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				this.ngOnInit();
				this.mensaje=capitalizeOnly(_("success1"));
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.TravelReportLineComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));