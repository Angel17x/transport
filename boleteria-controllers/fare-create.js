		(function(app) {
	app.FareCreateComponent =
		ng.core.Component({
		selector: 'fare-create',
		templateUrl: 'views/fare-create-v2.html',
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
	app.FareCreateComponent.prototype.devolverEvent=function(event){
			if(!(event==null || event==undefined || event=="")){
				if(event.keyCode==8){
					if(this.monto!=null){
						if(this.monto==""){
							this.monto="0,00";
						}else{
							if(this.monto.length==3){
								this.monto="0,"+this.monto.charAt(0)+this.monto.charAt(2);
							}
						}
					}else{
						this.monto="0,00";
					}
				}
			}
		}
		app.FareCreateComponent.prototype.keyDown=function(event){
			if(!(event==null || event==undefined || event=="")){
				if(event.keyCode==37 || event.keyCode==38){
					return false;
				}
			}
		}
		app.FareCreateComponent.prototype.getEventMonto=function(event){
			if(!(event==null || event==undefined || event=="")){
				if(this.regex.test(event.key)){
					if(this.monto!=null){
						if(this.monto.length==4){
							if(this.monto=="0,00"){
								if(event.key==0 || event.key=="0"){
									return false;
								}else{
									this.monto="0,0"+event.key;
									return false;
								}
							}else{
								if(this.monto.substring(0,3)=="0,0"){
									this.monto="0,"+this.monto.charAt(this.monto.length-1)+event.key;
									return false;
								}else{
									if(this.monto.charAt(0)=="0" || this.monto.charAt(0)==0){
										this.monto=this.monto.charAt(2)+","+this.monto.charAt(3)+event.key;
										return false;
									}
								}
							}
						}
					}
				}else{
					return false;
				}
			}
		}
		app.FareCreateComponent.prototype.moveCursorToEnd=function() {
			var el=document.getElementById("monto");
			if (typeof el.selectionStart == "number") {
				el.selectionStart = el.selectionEnd = el.value.length;
			} else if (typeof el.createTextRange != "undefined") {
				el.focus();
				var range = el.createTextRange();
				range.collapse(false);
				range.select();
			}
		}
		app.FareCreateComponent.prototype.changeAmount=function(event){
			if(!(this.monto==null || this.monto==undefined || this.monto=="")){
				if(this.monto.length==1){
					this.monto="0,0"+this.monto;
				}else{
					if(this.monto.length==2){
						this.monto="0,"+this.monto;
					}
				}
			}
		}
		app.FareCreateComponent.prototype.inputEvent=function(event){
			if(!(event==null || event==undefined || event=="")){
				if(!(event.data==null || event.data==undefined || event.data=="")){
					if(this.regex.test(event.data)){
						if(this.monto!=null){
							if(this.monto.length==4){
								if(this.monto=="0,00"){
									if(event.data==0 || event.data=="0"){
										document.getElementById("monto").value="0,00";
										return false;
									}else{
										document.getElementById("monto").value="0,0"+event.data;
										return false;
									}
								}else{
									if(this.monto.substring(0,3)=="0,0"){
										document.getElementById("monto").value="0,"+this.monto.charAt(this.monto.length-1)+event.data;
										return false;
									}else{
										if(this.monto.charAt(0)=="0" || this.monto.charAt(0)==0){
											document.getElementById("monto").value=this.monto.charAt(2)+","+this.monto.charAt(3)+event.data;
											return false;
										}
									}
								}
							}
						}
					}else{
						return false;
					}
				}else{
					if(event.inputType=="deleteContentBackward"){
							if(this.monto!=null){
							if(this.monto==""){
								document.getElementById("monto").value="0,00";
							}else{
								if(this.monto.length==3){
									document.getElementById("monto").value="0,"+this.monto.charAt(0)+this.monto.charAt(2);
								}
							}
						}else{
							document.getElementById("monto").value="0,00";
						}
					}
				}
			}
		}
	app.FareCreateComponent.prototype.keyupsearch=function(event,service){
		try{
			if (event.keyCode == 13) {
				if(service=='LINEA'){
					this.buscarLinea();
				}else{
					if(service=='TIPO'){
						this.buscarType();
					}
				}
			}
		}catch(err){
			
		}
	}	
	app.FareCreateComponent.prototype.ngOnInit=function(){
		this.regex=/^\d+$/;
		this.title=capitalizeOnly(_("title58"));
		$("#monto").mask("#.##0,00", {reverse: true});
		this.save=true;
		this.lineaSelected=null;
		this.lineaSelectedShow=null;
		this.tipoSelectedShow=null;
		this.tipoSelected=null;
		this.nombre=null;
		this.monto=null;
		this.paradaSelectedSalidaShow=null;
		this.paradaSelectedSalida=null;
		this.paradaSelectedLlegadaShow=null;
		this.paradaSelectedLlegada=null;
		this.pagingActualLine={};
		this.totalPageLine=1;
		this.pageSelectedLine=1;
		this.detallePorPaginaLine=10;
		this.listLines=[];
		this.pagingActualType={};
		this.totalPageType=1;
		this.pageSelectedType=1;
		this.detallePorPaginaType=10;
		this.listTypes=[];
		this.pagingActualParada={};
		this.totalPageParada=1;
		this.pageSelectedParada=1;
		this.detallePorPaginaParada=10;
		this.listParadas=[];
		this.parada_buscar=null;
		this.type_buscar=null;
		this.texto="Guardar";
		this.mostrarCargando=false;
		this.imagenCargando="assets/images/loading.gif";
		this.listCurrency=[/*{value:"VES",name:"Bs",decimals:2,display:"BOLÍVAR SOBERANO"},*/{value:"USD",name:"$",decimals:2, display:"DÓLAR ESTADOUNIDENSE"}];
		this.currency="USD";
		this.monto_base=null;
		this.monto="0,00";
		this.typeRuta="LONG_ROUTE";
		this.listTypesRuta=[{value:"SHORT_ROUTE",name:"Ruta corta"},{value:"LONG_ROUTE",name:"Ruta larga"}];
		this.checkRol();
	}
	app.FareCreateComponent.prototype.checkRol=function(){
		var texto="FARE-CREATE";
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'fare-create') {
				this.title = _("title58");
				this.save = true;
				texto="FARE-CREATE";
			} else {
				this.title = _("title59");;
				this.save = false;
				texto="FARE-UPDATE";
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
	app.FareCreateComponent.prototype.getData=function(){
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null){
						if(this.active.queryParams._value.hasOwnProperty('id')){
							this.id=this.active.queryParams._value.id;
							if(this.active.queryParams._value.hasOwnProperty('business_id')){
								this.business_id=this.active.queryParams._value.business_id;
								if(this.active.queryParams._value.hasOwnProperty('vehicle_type_id')){
									this.vehicle_type_id=this.active.queryParams._value.vehicle_type_id;
									this.getService();
								}
							}
						}
					}
				}
			}
		}
	}
	
	app.FareCreateComponent.prototype.getService=function(){
		let request=this.service.callServicesHttp('fare-get',this.business_id+"?realm="+this.service.getRealm()+"&id="+this.id+"&vehicle_type_id="+this.vehicle_type_id,null);
		let mensajeAll=_("message_dflt_64");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.FareCreateComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_64");
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
	app.FareCreateComponent.prototype.formattedDataGET=function(data){
		if(data.hasOwnProperty("line_name")){
			this.line_name=data.line_name;
		}
		if(data.hasOwnProperty("route_type")){
			if(!(data.route_type==null || data.route_type==undefined || data.route_type=="")){
				this.typeRuta=data.route_type;
			}
		}
		if(data.hasOwnProperty("vehicle_type_id")){
			this.tipoSelected={};
			this.tipoSelected.id=data.vehicle_type_id;
			if(data.hasOwnProperty("vehicle_type_name")){
				this.tipoSelected.name=data.vehicle_type_name;
				this.tipoSelectedShow=data.vehicle_type_name;
			}
		}
		if(data.hasOwnProperty("start_stop_code")){
			this.paradaSelectedSalida={};
			this.paradaSelectedSalida.code=data.start_stop_code;
			if(data.hasOwnProperty("start_stop_name")){
				this.paradaSelectedSalida.name=data.start_stop_name;
				this.paradaSelectedSalidaShow=data.start_stop_code+" - "+data.start_stop_name;
			}
		}
		if(data.hasOwnProperty("destination_stop_code")){
			this.paradaSelectedLlegada={};
			this.paradaSelectedLlegada.code=data.destination_stop_code;
			if(data.hasOwnProperty("destination_stop_name")){
				this.paradaSelectedLlegada.name=data.destination_stop_code;
				this.paradaSelectedLlegadaShow=data.destination_stop_code+" - "+data.destination_stop_name;
			}
		}
		if(data.hasOwnProperty("name")){
			this.nombre=data.name;
		}
		if(data.hasOwnProperty("amount")){
			if(this.typeRuta=="LONG_ROUTE"){
				this.monto_base=data.amount;
				this.monto_base=amountFormattingObject(this.monto_base*100);
				this.monto_base=this.monto_base.integerPart+","+this.monto_base.decimalPart;
				try{
					this.monto=((112*data.amount)/100).toFixed(2);
					this.monto=amountFormattingObject(this.monto*100);
					this.monto=this.monto.integerPart+","+this.monto.decimalPart;
				}catch(er){
				}
			}else{
				try{
					this.monto=amountFormattingObject(data.amount*100);
					this.monto=this.monto.integerPart+","+this.monto.decimalPart;
					var monto1=0
					try{
						monto1=trunc(((data.amount*100)/112), 2);
					}catch(er){
						monto1=0
					}
					this.monto_base=amountFormattingObject(monto1*100);
					this.monto_base=this.monto_base.integerPart+","+this.monto_base.decimalPart;
				}catch(er){
				}
			}
		}
		if(data.hasOwnProperty("currency")){
			this.currency=data.currency;
		}
	}
	app.FareCreateComponent.prototype.getValueMsg=function(){
		var link = ['/fare-report'];
		this.router.navigate(link);
	}
	app.FareCreateComponent.prototype.clean=function(){
		if(this.save){
			this.lineaSelected=null;
			this.lineaSelectedShow=null;
			this.tipoSelectedShow=null;
			this.tipoSelected=null;
			this.paradaSelectedSalidaShow=null;
			this.paradaSelectedSalida=null;
			this.paradaSelectedLlegadaShow=null;
			this.paradaSelectedLlegada=null;
		}
		this.typeRuta="LONG_ROUTE";
		this.nombre=null;
		this.monto=null;
		this.currency=null;
		this.monto_base=null;
		this.pagingActualLine={};
		this.totalPageLine=1;
		this.pageSelectedLine=1;
		this.detallePorPaginaLine=10;
		this.mensajeServicio=null;
		this.mostrarCargando=false;
		this.linea_buscar=null;
		this.listLines=[];
		this.pagingActualType={};
		this.totalPageType=1;
		this.pageSelectedType=1;
		this.detallePorPaginaType=10;
		this.listTypes=[];
	}
	app.FareCreateComponent.prototype.getCantidadSelectedLine=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPagina = data.detalles;
			this.totalPageLine= data.pagina;
			if (this.listLines == null || this.listLines == undefined || this.listLines.length == 0) {
				this.mensajeServicio = capitalizeOnly(_("message_dflt_4"));
			} else {
				this.callServicesLine(1, '&limit=' + this.detallePorPaginaLine);
			}
		}
	}
	app.FareCreateComponent.prototype.getValueFirstLine=function(data){
		this.listLines = [];
		if (this.pagingActualLine.hasOwnProperty('first_page')) {
			if (!(this.pagingActualLine.first_page == null || this.pagingActualLine.first_page == undefined || this.pagingActualLine.first_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.first_page);
			}
		}
	}
	app.FareCreateComponent.prototype.getValuePreviousLine=function(data){
		this.listLines = [];
		if (this.pagingActualLine.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualLine.previous_page == null || this.pagingActualLine.previous_page == undefined || this.pagingActualLine.previous_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.previous_page);
			}
		}
	}
	app.FareCreateComponent.prototype.getValueLastLine=function(data){
		this.listLines = [];
		if (this.pagingActualLine.hasOwnProperty('last_page')) {
			if (!(this.pagingActualLine.last_page == null || this.pagingActualLine.last_page == undefined || this.pagingActualLine.last_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.last_page);
			}
		}
	}
	app.FareCreateComponent.prototype.getValueNextLine=function(data){
		this.listLines = [];
		if (this.pagingActualLine.hasOwnProperty('next_page')) {
			if (!(this.pagingActualLine.next_page == null || this.pagingActualLine.next_page == undefined || this.pagingActualLine.next_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.next_page);
			}
		}
	}
	app.FareCreateComponent.prototype.getValueChangeRecordsLine=function(data){
		this.pageSelectedLine = data;
	}
	app.FareCreateComponent.prototype.callServicesLine = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelected = data;
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
	app.FareCreateComponent.prototype.procesarRespuestaLine=function(data){
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
	
	
	app.FareCreateComponent.prototype.getCantidadSelectedType=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPaginaType = data.detalles;
			this.totalPageType= data.pagina;
			if (this.listTypes == null || this.listTypes == undefined || this.listTypes.length == 0) {
				this.mensajeServicio = capitalizeOnly(_("message_dflt_4"));
			} else {
				this.callServicesType(1, '&limit=' + this.detallePorPaginaType);
			}
		}
	}
	app.FareCreateComponent.prototype.getValueFirstType=function(data){
		this.listTypes = [];
		if (this.pagingActualType.hasOwnProperty('first_page')) {
			if (!(this.pagingActualType.first_page == null || this.pagingActualType.first_page == undefined || this.pagingActualType.first_page == "")) {
				this.callServicesType(data, this.pagingActualType.first_page);
			}
		}
	}
	app.FareCreateComponent.prototype.getValuePreviousType=function(data){
		this.listTypes = [];
		if (this.pagingActualType.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualType.previous_page == null || this.pagingActualType.previous_page == undefined || this.pagingActualType.previous_page == "")) {
				this.callServicesType(data, this.pagingActualType.previous_page);
			}
		}
	}
	app.FareCreateComponent.prototype.getValueLastType=function(data){
		this.listTypes = [];
		if (this.pagingActualType.hasOwnProperty('last_page')) {
			if (!(this.pagingActualType.last_page == null || this.pagingActualType.last_page == undefined || this.pagingActualType.last_page == "")) {
				this.callServicesType(data, this.pagingActualType.last_page);
			}
		}
	}
	app.FareCreateComponent.prototype.getValueNextType=function(data){
		this.listTypes = [];
		if (this.pagingActualType.hasOwnProperty('next_page')) {
			if (!(this.pagingActualType.next_page == null || this.pagingActualType.next_page == undefined || this.pagingActualType.next_page == "")) {
				this.callServicesType(data, this.pagingActualType.next_page);
			}
		}
	}
	app.FareCreateComponent.prototype.getValueChangeRecordsType=function(data){
		this.pageSelectedType = data;
	}
	app.FareCreateComponent.prototype.callServicesType = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		this.mostrarCargando=true;
		let request = this.service.callServicesHttp("car-type-report", querys, this.jsonFilterType);
		request.subscribe(data => {
			this.mostrarCargando=false;
			this.procesarRespuestaType(data);
		}, err => {
			this.mostrarCargando=false;
			this.mensajeServicio = this.service.processError(err, mensajeAll);
		});
	}
	app.FareCreateComponent.prototype.procesarRespuestaType=function(data){
		var key="results";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			this.listTypes=[];
			this.mensajeServicio=mensajeAll;
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("count")){
					if(data.count==null || data.count==undefined || data.count==0){
						this.listTypes=[];
					}else{
						this.pagingActualType = {};
						this.pagingActualType.count = data.count;
						let auxP = Math.floor(this.pagingActualType.count / this.detallePorPaginaType);
						let restoAux = ((this.pagingActualType.count) % this.detallePorPaginaType);
						if (restoAux == 0) {
							this.totalPageType = auxP;
						} else {
							this.totalPageType = auxP + 1;
						}
						if (data.hasOwnProperty('next_page')) {
							if (data.next_page == null || data.next_page == undefined || data.next_page == "") {
								this.pagingActualType.next_page = null;
							} else {
								this.pagingActualType.next_page = data.next_page;
							}
						} else {
							this.pagingActualType.next_page = null;
						}
						if (data.hasOwnProperty('previous_page')) {
							if (data.previous_page == null || data.previous_page == undefined || data.previous_page == "") {
								this.pagingActualType.previous_page = null;
							} else {
								this.pagingActualType.previous_page = data.previous_page;
							}
						} else {
							this.pagingActualType.previous_page = null;
						}
						if (data.hasOwnProperty('first_page')) {
							if (data.first_page == null || data.first_page == undefined || data.first_page == "") {
								this.pagingActualType.first_page = null;
							} else {
								this.pagingActualType.first_page = data.first_page;
							}
						} else {
							this.pagingActualType.first_page = null;
						}
						if (data.hasOwnProperty('last_page')) {
							if (data.last_page == null || data.last_page == undefined || data.last_page == "") {
								this.pagingActualType.last_page = null;
							} else {
								this.pagingActualType.last_page = data.last_page;
							}
						} else {
							this.pagingActualType.last_page = null;
						}
						if (data.hasOwnProperty(key)) {
							var objeto = {};
							this.listTypes = [];
							for (var i = 0; i < data[key].length; i++) {
								objeto = data[key][i];
								if (objeto != null) {
									this.listTypes.push(objeto);
								}
							}
							this.pagingActualType.count = data.count;
						}else{
							this.listTypes=[];
						}
					}
				}else{
					this.listTypes=[];
				}
			}else{
				this.mensajeServicio=this.service.processMessageError(data,mensajeAll);
			}
		}
	}
	
	app.FareCreateComponent.prototype.getCantidadSelectedParada=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPaginaParada = data.detalles;
			this.totalPageParada= data.pagina;
			if (this.listParadas == null || this.listParadas == undefined || this.listParadas.length == 0) {
				this.mensajeServicio = capitalizeOnly(_("message_dflt_4"));
			} else {
				this.callServicesParada(1, '&limit=' + this.detallePorPaginaParada);
			}
		}
	}
	app.FareCreateComponent.prototype.getValueFirstParada=function(data){
		this.listParadas = [];
		if (this.pagingActualParada.hasOwnProperty('first_page')) {
			if (!(this.pagingActualParada.first_page == null || this.pagingActualParada.first_page == undefined || this.pagingActualParada.first_page == "")) {
				this.callServicesParada(data, this.pagingActualParada.first_page);
			}
		}
	}
	app.FareCreateComponent.prototype.getValuePreviousParada=function(data){
		this.listParadas = [];
		if (this.pagingActualParada.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualParada.previous_page == null || this.pagingActualParada.previous_page == undefined || this.pagingActualParada.previous_page == "")) {
				this.callServicesParada(data, this.pagingActualParada.previous_page);
			}
		}
	}
	app.FareCreateComponent.prototype.getValueLastParada=function(data){
		this.listParadas = [];
		if (this.pagingActualParada.hasOwnProperty('last_page')) {
			if (!(this.pagingActualParada.last_page == null || this.pagingActualParada.last_page == undefined || this.pagingActualParada.last_page == "")) {
				this.callServicesParada(data, this.pagingActualParada.last_page);
			}
		}
	}
	app.FareCreateComponent.prototype.getValueNextParada=function(data){
		this.listParadas = [];
		if (this.pagingActualParada.hasOwnProperty('next_page')) {
			if (!(this.pagingActualParada.next_page == null || this.pagingActualParada.next_page == undefined || this.pagingActualParada.next_page == "")) {
				this.callServicesParada(data, this.pagingActualParada.next_page);
			}
		}
	}
	app.FareCreateComponent.prototype.getValueChangeRecordsParada=function(data){
		this.pageSelectedParada = data;
	}
	app.FareCreateComponent.prototype.callServicesParada = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelectedParada = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="&type=PAGINATE"+parametros;
		this.mostrarCargando=true;
		let request = this.service.callServicesHttp("parada-report", querys, this.jsonFilterParada);
		request.subscribe(data => {
			this.mostrarCargando=false;
			this.procesarRespuestaParada(data);
		}, err => {
			this.mostrarCargando=false;
			this.mensajeServicio = this.service.processError(err, mensajeAll);
		});
	}
	app.FareCreateComponent.prototype.procesarRespuestaParada=function(data){
		var key="results";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			this.listParadas=[];
			this.mensajeServicio=mensajeAll;
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("count")){
					if(data.count==null || data.count==undefined || data.count==0){
						this.listParadas=[];
					}else{
						this.pagingActualParada = {};
						this.pagingActualParada.count = data.count;
						let auxP = Math.floor(this.pagingActualParada.count / this.detallePorPaginaParada);
						let restoAux = ((this.pagingActualParada.count) % this.detallePorPaginaParada);
						if (restoAux == 0) {
							this.totalPageParada = auxP;
						} else {
							this.totalPageParada = auxP + 1;
						}
						if (data.hasOwnProperty('next_page')) {
							if (data.next_page == null || data.next_page == undefined || data.next_page == "") {
								this.pagingActualParada.next_page = null;
							} else {
								this.pagingActualParada.next_page = data.next_page;
							}
						} else {
							this.pagingActualParada.next_page = null;
						}
						if (data.hasOwnProperty('previous_page')) {
							if (data.previous_page == null || data.previous_page == undefined || data.previous_page == "") {
								this.pagingActualParada.previous_page = null;
							} else {
								this.pagingActualParada.previous_page = data.previous_page;
							}
						} else {
							this.pagingActualParada.previous_page = null;
						}
						if (data.hasOwnProperty('first_page')) {
							if (data.first_page == null || data.first_page == undefined || data.first_page == "") {
								this.pagingActualParada.first_page = null;
							} else {
								this.pagingActualParada.first_page = data.first_page;
							}
						} else {
							this.pagingActualParada.first_page = null;
						}
						if (data.hasOwnProperty('last_page')) {
							if (data.last_page == null || data.last_page == undefined || data.last_page == "") {
								this.pagingActualParada.last_page = null;
							} else {
								this.pagingActualParada.last_page = data.last_page;
							}
						} else {
							this.pagingActualParada.last_page = null;
						}
						if (data.hasOwnProperty(key)) {
							var objeto = {};
							this.listParadas = [];
							for (var i = 0; i < data[key].length; i++) {
								objeto = data[key][i];
								if (objeto != null) {
									this.listParadas.push(objeto);
								}
							}
							this.pagingActualParada.count = data.count;
						}else{
							this.listParadas=[];
						}
					}
				}else{
					this.listParadas=[];
				}
			}else{
				this.mensajeServicio=this.service.processMessageError(data,mensajeAll);
			}
		}
	}
	
	app.FareCreateComponent.prototype.openModalLineas=function(){
		this.mensajeServicio=null;
		this.mostrarCargando=false;
		this.linea_buscar=null;
		this.listLines=[];
		$("#modalLineas").modal("show");
	}
	app.FareCreateComponent.prototype.openModalTypes=function(){
		this.mensajeServicio=null;
		this.mostrarCargando=false;
		this.type_buscar=null;
		this.listTypes=[];
		$("#modalType").modal("show");
	}
	app.FareCreateComponent.prototype.openModalParadas=function(punto){
		this.mensajeServicio=null;
		this.mostrarCargando=false;
		this.parada_buscar=null;
		this.listParadas=[];
		this.punto=punto;
		$("#modalParada").modal("show");
	}
	app.FareCreateComponent.prototype.buscarLinea=function(){
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
	app.FareCreateComponent.prototype.buscarType=function(){
		this.jsonFilterType={};
		var datos=[];
		var entity=null;
		if(!(this.type_buscar==null || this.type_buscar==undefined || this.type_buscar=="" || this.type_buscar=="null")){
			if(entity==null){
				entity={};
			}
			entity.name="*"+this.type_buscar+"*";
		}
		if(entity==null){
			entity={};
		}
		entity.active=true;
		if(entity!=null){
			datos={entity:entity,level: "AND"};
			let aux1=[datos];
			this.jsonFilterType.entities=aux1;
		}
		
		this.jsonFilterType.sort={"info.created_at":"desc"};
		this.callServicesType(1,"&offset=0&limit="+this.detallePorPaginaType);
	}
	app.FareCreateComponent.prototype.selectedLinea=function(item){
		if(item!=null){
			$("#modalLineas").modal("hide");
			this.lineaSelected=item;
			if(item.hasOwnProperty("name")){
				this.lineaSelectedShow=item.name;
			}
		}
	}
	app.FareCreateComponent.prototype.selectedType=function(item){
		if(item!=null){
			$("#modalType").modal("hide");
			this.tipoSelected=item;
			if(item.hasOwnProperty("name")){
				this.tipoSelectedShow=item.name;
			}
		}
	}
	app.FareCreateComponent.prototype.selectedParada=function(item){
		$("#modalParada").modal("hide");
		if(this.punto=="SALIDA"){
			this.paradaSelectedSalida=item;
			if(item.hasOwnProperty("name")){
				this.paradaSelectedSalidaShow=item.code+" - "+item.name;
			}
		}else{
			this.paradaSelectedLlegada=item;
			if(item.hasOwnProperty("name")){
				this.paradaSelectedLlegadaShow=item.code+" - "+item.name;
			}
		}
	}
	app.FareCreateComponent.prototype.buscarParada=function(){
		this.jsonFilterParada={};
		var datos=[];
		var entity=null;
		if(!(this.parada_buscar==null || this.parada_buscar==undefined || this.parada_buscar=="" || this.parada_buscar=="null")){
			if(entity==null){
				entity={};
			}
			entity.name="*"+this.parada_buscar+"*";
		}
		if(entity==null){
			entity={};
		}
		entity.active=true;
		if(entity!=null){
			datos={entity:entity,level: "AND"};
			let aux1=[datos];
			this.jsonFilterParada.entities=aux1;
		}
		
		this.jsonFilterParada.sort={"info.created_at":"desc"};
		this.callServicesParada(1, "&limit="+this.detallePorPaginaParada);
	}
	app.FareCreateComponent.prototype.done=function(){
		var parametros={};
		parametros.rates={}
		parametros.rates.INFANT=0;
		parametros.rates.CHILD=112;
		parametros.rates.ADULT=112;
		parametros.rates.ELDERLY=56;
		parametros.rates.SOCIAL_HELP=0;
		parametros.rates.COURTESY=12;
		var querys=null;
		if(this.save){
			if(this.lineaSelected==null || this.lineaSelected==undefined || this.lineaSelected==""){
				this.mensaje=capitalizeOnly(_("warning3"));
				this.msg.warning();
				return;
			}else{
				querys="&line_id="+this.lineaSelected.id;
			}
			if(this.tipoSelected==null || this.tipoSelected==undefined || this.tipoSelected==""){
				this.mensaje=capitalizeOnly(_("warning41"));
				this.msg.warning();
				return;
			}else{
				querys=querys+"&vehicle_type_id="+this.tipoSelected.id;
			}
			if(this.paradaSelectedSalida==null || this.paradaSelectedSalida==undefined || this.paradaSelectedSalida==""){
				this.mensaje=capitalizeOnly(_("warning43"));
				this.msg.warning();
				return;
			}else{
				querys=querys+"&start_stop_code="+this.paradaSelectedSalida.code;
			}
			if(this.paradaSelectedLlegada==null || this.paradaSelectedLlegada==undefined || this.paradaSelectedLlegada==""){
				this.mensaje=capitalizeOnly(_("warning44"));
				this.msg.warning();
				return;
			}else{
				querys=querys+"&destination_stop_code="+this.paradaSelectedLlegada.code;
			}
		}
		if(this.nombre==null || this.nombre==undefined || this.nombre==""){
			this.mensaje=capitalizeOnly(_("warning45"));
			this.msg.warning();
			return;
		}else{
			parametros.name=this.nombre.trim().toUpperCase();
		}
		if(this.typeRuta==null || this.typeRuta==undefined || this.typeRuta==""){
			this.mensaje="Debe seleccionar el tipo de ruta";
			this.msg.warning();
			return;
		}else{
			parametros.route_type=this.typeRuta;
		}
		if(this.monto==null || this.monto==undefined || this.monto=="" || this.monto==0){
			this.mensaje=capitalizeOnly(_("warning46"));
			this.msg.warning();
			return;
		}else{
			var a=null;
			var monto=0;
			try{
				if(this.typeRuta=="LONG_ROUTE"){
					a = $("#monto_base").val();
					a=a.replace(/\./g,"").replace(/,/g,"");
					a=(replaceAll(a," ","")+"").trim();
					monto=(parseFloat(a)/100).toFixed(2);
				}else{
					a = $("#monto").val();
					a=a.replace(/\./g,"").replace(/,/g,"");
					a=(replaceAll(a," ","")+"").trim();
					monto=(parseFloat(a)/100).toFixed(2);
				}
			}catch(re){
				monto=0;
			}
			if(monto=="" || monto==0){
				this.mensaje="Debe ingresar el monto de la tarfifa";
				this.msg.warning();
				return;
			}
			monto=parseFloat(monto);
			parametros.amount=monto;
		}
		if(this.currency==null || this.currency==undefined || this.currency=="" || this.currency=="null"){
			this.mensaje="Debe ingresar la moneda de la tarifa";
			this.msg.warning();
			return;
		}else{
			parametros.currency=this.currency;
			
		}
		let mensajeAll=_("message_dflt_61");
		let request=null;
		if(this.save){
			request = this.service.callServicesHttp("fare-post", querys, parametros);
		}else{
			mensajeAll=_("message_dflt_62");
			request = this.service.callServicesHttp("fare-put", "&id="+this.id+"&line_id="+this.business_id+"&vehicle_type_id="+this.vehicle_type_id, parametros);
		}
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.FareCreateComponent.prototype.changeTarifa=function(){
		var monto=0;
		try{
			a = $("#monto").val();
			a=a.replace(/\./g,"").replace(/,/g,"");
			a=(replaceAll(a," ","")+"").trim();
			monto=(parseFloat(a)/100).toFixed(2);
		}catch(re){
			monto=0;
		}
		var monto1=0
		try{
			monto1=trunc(((monto*100)/112), 2);
		}catch(er){
			monto1=0
		}
		try{
			this.monto_base=amountFormattingObject(monto1*100);
			this.monto_base=this.monto_base.integerPart+","+this.monto_base.decimalPart;
		}catch(er){
		}
		
	}
	app.FareCreateComponent.prototype.procesarRespuesta=function(data){
		let mensajeAll=_("message_dflt_61");
		if(!this.save){
			mensajeAll=_("message_dflt_62");
		}
		if(data==null || data==undefined || data==""){
			this.mensaje=mensajeAll;
			this.msg.error();
		}else{
			if (data.status_http == 200) {
				if(this.save){
					this.mensaje=capitalizeOnly(_("success44"));
				}else{
					this.mensaje=capitalizeOnly(_("success45"));
				}
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.FareCreateComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));