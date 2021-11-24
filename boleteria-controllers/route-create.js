(function(app) {
	app.RouteCreateComponent =
		ng.core.Component({
		selector: 'route-create',
		templateUrl: 'views/route-create_v2.html',
		styleUrls: ['styles/route-create.css'],
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
	app.RouteCreateComponent.prototype.ngOnInit=function(){
		this.regex=/^\d+$/;
		this.classView1="col-lg-4 col-md-4 col-sm-6 col-12"
		this.classView2="col-lg-4 col-md-4 col-sm-6 col-12"
		this.classView3="col-lg-4 col-md-4 col-sm-12 col-12";
		this.texto="Crear";
		this.title=capitalizeOnly(_("title14"));
		this.pagingActual={};
		this.detallePorPagina=10
		this.totalPage=1;
		this.pageSelected=1;
		this.pagingActualLine={};
		this.detallePorPaginaLine=10
		this.totalPageLine=1;
		this.pageSelectedLine=1;
		this.line_buscar=null;
		this.parada_buscar=null;
		this.listRegister=[];
		this.listRegisterLine=[];
		this.linea=null;
		this.lineSelected=null;
		this.code=null;
		this.listTrayectos=[];
		this.active_status=true;
		this.monto="0,00";
		$("#monto").mask("#.##0,00", {reverse: true});
		this.listTypes=[{value:"LONG_ROUTE",name:"Ruta Larga"},{value:"SHORT_ROUTE",name:"Ruta Corta"}];
		this.listCurrency=[/*{value:"VES",name:"Bs",decimals:2,display:"BOLÍVAR SOBERANO"},*/{value:"USD",name:"$",decimals:2, display:"DÓLAR ESTADOUNIDENSE"}];
		this.currency=null;
		this.checkRol();
	}
	app.RouteCreateComponent.prototype.devolverEvent=function(event){
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
	app.RouteCreateComponent.prototype.focusMonto=function(){
		$("#monto").mask("#.##0,00", {reverse: true});
	}
	app.RouteCreateComponent.prototype.keyDown=function(event){
		if(!(event==null || event==undefined || event=="")){
			if(event.keyCode==37 || event.keyCode==38){
				return false;
			}
		}
	}
	app.RouteCreateComponent.prototype.getEventMonto=function(event){
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
	app.RouteCreateComponent.prototype.moveCursorToEnd=function() {
		$("#monto").mask("#.##0,00", {reverse: true});
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
	app.RouteCreateComponent.prototype.changeAmount=function(event){
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
	app.RouteCreateComponent.prototype.inputEvent=function(event){
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
	app.RouteCreateComponent.prototype.checkRol=function(){
		var texto="ITINERARY-CREATE";
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'route-create') {
				this.title = _("title14");
				this.save = true;
				texto="ITINERARY-CREATE";
			} else {
				this.title = _("title15");;
				this.save = false;
				this.classView2="col-lg-4 col-md-4 col-sm-6 col-12"
				this.classView3="col-lg-8 col-md-8 col-sm-6 col-12"
				texto="ITINERARY-UPDATE";
				this.texto="Actualizar";
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
	app.RouteCreateComponent.prototype.getData=function(){
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
	app.RouteCreateComponent.prototype.changeType=function(){
		this.monto="0,00";
	}
	app.RouteCreateComponent.prototype.search=function(){
		this.jsonFilter={};
		var datos=[];
		var entity=null;
		if(!(this.nombre_buscar==null || this.nombre_buscar==undefined || this.nombre_buscar=="" || this.nombre_buscar=="null")){
			if(entity==null){
				entity={};
			}
			entity.name="*"+this.nombre_buscar+"*";
		}
		if(entity!=null){
			datos={entity:entity,level: "AND"};
			let aux1=[datos];
			this.jsonFilter.entities=aux1;
		}
		
		this.jsonFilter.sort={"info.created_at":"desc"};
		this.callServices(1, "&limit="+this.detallePorPagina);
	}
	app.RouteCreateComponent.prototype.getCantidadSelected=function(data){
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
	app.RouteCreateComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.RouteCreateComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.RouteCreateComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.RouteCreateComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.RouteCreateComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.RouteCreateComponent.prototype.callServices = function (data, parametros) {
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		let request = this.service.callServicesHttp("parada-report", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.RouteCreateComponent.prototype.procesarRespuesta=function(data){
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
								objeto =data[key][i];
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
	app.RouteCreateComponent.prototype.searchLine=function(){
		this.jsonFilterLine={};
		var datos=[];
		var entity=null;
		if(entity==null){
			entity={};
		}
		entity.active=true;
		if(!(this.linea==null || this.linea==undefined || this.linea=="" || this.linea=="null")){
			if(entity==null){
				entity={};
			}
			entity.name="*"+this.linea+"*";
		}
		if(entity!=null){
			datos={entity:entity,level: "AND"};
			let aux1=[datos];
			this.jsonFilterLine.entities=aux1;
		}
		
		this.jsonFilterLine.sort={"info.created_at":"desc"};
		this.callServicesLine(1, '&limit=' + this.detallePorPaginaLine);
	}
	app.RouteCreateComponent.prototype.getCantidadSelectedLine=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPaginaLine = data.detalles;
			this.totalPageLine = data.pagina;
			if (this.listRegisterLine == null || this.listRegisterLine == undefined || this.listRegisterLine.length == 0) {
				this.mensaje = capitalizeOnly(_("message_dflt_4"));
			} else {
				this.callServicesLine(1, '&limit=' + this.detallePorPaginaLine);
			}
		}
	}
	app.RouteCreateComponent.prototype.getValueFirstLine=function(data){
		this.listRegisterLine = [];
		if (this.pagingActualLine.hasOwnProperty('first_page')) {
			if (!(this.pagingActualLine.first_page == null || this.pagingActualLine.first_page == undefined || this.pagingActualLine.first_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.first_page);
			}
		}
	}
	app.RouteCreateComponent.prototype.getValuePreviousLine=function(data){
		this.listRegisterLine = [];
		if (this.pagingActualLine.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualLine.previous_page == null || this.pagingActualLine.previous_page == undefined || this.pagingActualLine.previous_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.previous_page);
			}
		}
	}
	app.RouteCreateComponent.prototype.getValueLastLine=function(data){
		this.listRegisterLine = [];
		if (this.pagingActualLine.hasOwnProperty('last_page')) {
			if (!(this.pagingActualLine.last_page == null || this.pagingActualLine.last_page == undefined || this.pagingActualLine.last_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.last_page);
			}
		}
	}
	app.RouteCreateComponent.prototype.getValueNextLine=function(data){
		this.listRegisterLine = [];
		if (this.pagingActualLine.hasOwnProperty('next_page')) {
			if (!(this.pagingActualLine.next_page == null || this.pagingActualLine.next_page == undefined || this.pagingActualLine.next_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.next_page);
			}
		}
	}
	app.RouteCreateComponent.prototype.getValueChangeRecordsLine=function(data){
		this.pageSelectedLine = data;
	}
	app.RouteCreateComponent.prototype.callServicesLine= function (data, parametros) {
		this.pageSelectedLine = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		let request = this.service.callServicesHttp("line-report", querys, this.jsonFilterLine);
		request.subscribe(data => {
			this.procesarRespuestaLine(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.RouteCreateComponent.prototype.procesarRespuestaLine=function(data){
		var key="results";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			this.listRegisterLine=[];
			this.mensaje=mensajeAll;
			this.msg.error();
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("count")){
					if(data.count==null || data.count==undefined || data.count==0){
						this.listRegisterLine=[];
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
							this.listRegisterLine = [];
							for (var i = 0; i < data[key].length; i++) {
								objeto = data[key][i];
								if (objeto != null) {
									this.listRegisterLine.push(objeto);
								}
							}
							this.pagingActualLine.count = data.count;
						}else{
							this.listRegisterLine=[];
						}
					}
				}else{
					this.listRegisterLine=[];
				}
			}else{
				this.mensaje=this.service.processMessageError(data,mensajeAll);
				this.msg.error();
			}
		}
	}
	app.RouteCreateComponent.prototype.getService=function(){
		let request=this.service.callServicesHttp('route-get',this.business_id+"?id="+this.id,null);
		let mensajeAll=_("message_dflt_16");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.RouteCreateComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_16");
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
	app.RouteCreateComponent.prototype.formattedDataGET=function(data){
		if(data.hasOwnProperty("line_name")){
			if(!(data.line_name==null || data.line_name==undefined || data.line_name=="")){
				this.lineSelected={};
				this.lineSelected.name=data.line_name;
			}
		}
		if(data.hasOwnProperty("type")){
			if(!(data.type==null || data.type==undefined || data.type=="")){
				this.type=data.type;
			}
		}
		if(data.hasOwnProperty("short_route_rate")){
			if(!(data.short_route_rate==null || data.short_route_rate==undefined || data.short_route_rate=="")){
				try{
					this.monto=amountFormattingObject(data.short_route_rate*100);
					this.monto=this.monto.integerPart+","+this.monto.decimalPart;
				}catch(er){
					this.monto="0,00";
				}
			
			}
		}
		if(data.hasOwnProperty("short_route_rate_currency")){
			if(!(data.short_route_rate_currency==null || data.short_route_rate_currency==undefined || data.short_route_rate_currency=="")){
				this.currency=data.short_route_rate_currency;
			}
		}
		if(data.hasOwnProperty("name")){
			if(!(data.name==null || data.name==undefined || data.name=="")){
				this.code=data.name;
			}
		}
		if(data.hasOwnProperty("active")){
			if(data.active){
				this.active_status=true;
			}else{
				this.active_status=false;
			}
		}
		if(data.hasOwnProperty("stops")){
			this.listTrayectos=[];
			if(!(data.stops==null || data.stops==undefined || data.stops=="" || data.stops.length==0)){
				var objeto={};
				for(var i=0;i<data.stops.length;i++){
					if(data.stops[i]!=null){
						objeto={};
						objeto.name=data.stops[i].name;
						objeto.code=data.stops[i].code;
						this.listTrayectos.push(objeto);
					}
				}
			}
		}
	}
	
	
	

	app.RouteCreateComponent.prototype.selectedParada=function(data){
		if(!(data==null || data==undefined || data=="")){
			if(this.listRegister!=null && this.listRegister.length!=0){
				for(var i=0; i<this.listRegister.length;i++){
					if(this.listRegister[i]!=null){
						if(this.listRegister[i].code==data.code){
							if(this.listRegister[i].classSelected==null){
								this.listTrayectos.push(this.listRegister[i]);
								this.listRegister[i].classSelected="selected";
							}else{
								if(this.listTrayectos!=null && this.listTrayectos.length!=0){
									try{
										for(var j=0;j<this.listTrayectos.length;j++){
											if(this.listTrayectos[j].code==data.code){
													var provi = this.listTrayectos.slice(j + 1);
													this.listTrayectos = this.listTrayectos.slice(0, j);
													this.listTrayectos = this.listTrayectos.concat(provi);
													this.listRegister[i].classSelected=null;
											}
										}
									}catch(er){
									}
									
								}
							
							}
						}
					}
				}
			}
		}
	}
	app.RouteCreateComponent.prototype.quitarLinea=function(){
		this.lineSelected=null;
		if(!(data==null || data==undefined || data=="")){
			if(this.listRegisterLine!=null && this.listRegisterLine.length!=0){
				for(var i=0; i<this.listRegisterLine.length;i++){
					if(this.listRegisterLine[i]!=null){
						this.listRegisterLine[i].classSelected=null;
					}
				}
			}
		}
	}
	app.RouteCreateComponent.prototype.selectLine=function(data){
		this.lineSelected=null;
		if(!(data==null || data==undefined || data=="")){
			if(this.listRegisterLine!=null && this.listRegisterLine.length!=0){
				for(var i=0; i<this.listRegisterLine.length;i++){
					if(this.listRegisterLine[i]!=null){
						if(this.listRegisterLine[i].id==data.id){
							if(this.listRegisterLine[i].classSelected==null){
								this.lineSelected=this.listRegisterLine[i];
								this.listRegisterLine[i].classSelected="selected";
							}else{
								this.listRegisterLine[i].classSelected=null;
							}
						}else{
							this.listRegisterLine[i].classSelected=null;
						}
					}
				}
			}
		}
	}
	app.RouteCreateComponent.prototype.getValueMsg=function(){
		this.router.navigate(['/route-report']);
	}
	app.RouteCreateComponent.prototype.clean=function(){
		this.line_buscar=null;
		this.parada_buscar=null;
		this.listRegister=[];
		this.listRegisterLine=[];
		this.code=null;
		this.currency=null;
		this.monto="0,00";
		this.type=null;
		if(this.save){
			this.linea=null;
			this.lineSelected=null;
			
		}
		this.listTrayectos=[];
	}
	app.RouteCreateComponent.prototype.done=function(){
		var parametros=[];
		if(this.lineSelected==null){
			this.mensaje="Debe seleccionar la linea de la ruta que esta creando";
			this.msg.warning();
			return;
		}
		if(this.code==null || this.code==undefined || this.code==""){
			this.mensaje="Debe seleccionar ingresar el código que identifica la ruta y la línea";
			this.msg.warning();
			return;
		}
		if(this.type==null || this.type==undefined || this.type=="" || this.type=="null"){
			this.mensaje="Debe ingresar el tipo de ruta";
			this.msg.warning();
			return;
		}
		if(this.listTrayectos==null || this.listTrayectos.length<2){
			this.mensaje="Debe seleccionar al menos dos paradas";
			this.msg.warning();
			return;
		}else{
			for(var i=0;i<this.listTrayectos.length;i++){
				if(this.listTrayectos[i]!=null){
					parametros.push(this.listTrayectos[i].code);
				}
			}
		}
		let querys="&line_id="+this.lineSelected.id+"&name="+this.code.trim().toUpperCase()+"&active="+this.active_status+"&type="+this.type;
		if(!this.save){
			querys="&id="+this.id+"&line_id="+this.business_id+"&name="+this.code+"&active="+this.active_status+"&type="+this.type;
		}
		if(this.type=="SHORT_ROUTE"){
			if(this.monto==null || this.monto==undefined || this.monto=="" || this.monto==0){
				this.mensaje=capitalizeOnly("Debe ingresar el monto de la tasa");
				this.msg.warning();
				return;
			}else{
				var a=null;
				var monto=0;
				try{
					a = $("#monto").val();
					a=a.replace(/\./g,"").replace(/,/g,"");
					a=(replaceAll(a," ","")+"").trim();
					monto=(parseFloat(a)/100).toFixed(2);
				}catch(re){
					monto=0;
				}
				if(monto=="" || monto==0){
					this.mensaje="Debe ingresar el monto de la tasa";
					this.msg.warning();
					return;
				}
				monto=parseFloat(monto);
				querys=querys+"&short_route_rate="+monto;
			}
			if(this.currency==null || this.currency==undefined || this.currency=="" || this.currency=="null"){
				this.mensaje="Debe ingresar la moneda de la tarifa";
				this.msg.warning();
				return;
			}else{
				querys=querys+"&short_route_rate_currency="+this.currency;
			
			}
		}
		let request=null;
		let mensajeAll=_("message_dflt_14");
		if(this.save){
			mensajeAll=_("message_dflt_14");
			request = this.service.callServicesHttp("route-post",querys , parametros);
		}else{
			mensajeAll=_("message_dflt_15");
			request = this.service.callServicesHttp("route-put",querys , parametros);
		}
		request.subscribe(data => {
			this.procesarRespuestaDone(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.RouteCreateComponent.prototype.procesarRespuestaDone=function(data){
		let mensajeAll=_("message_dflt_14");
		if(this.save){
			mensajeAll=_("message_dflt_14");
		}else{
			mensajeAll=_("message_dflt_15");
		}
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				if(this.save){
					this.mensaje=capitalizeOnly(_("success18"));
				}else{
					this.mensaje=capitalizeOnly(_("success19"));
				}
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.RouteCreateComponent.prototype.quitarPunto=function(index,data){
		var provi = this.listTrayectos.slice(index + 1);
		this.listTrayectos = this.listTrayectos.slice(0, index);
		this.listTrayectos = this.listTrayectos.concat(provi);
		if(this.listRegister!=null && this.listRegister.length!=0){
			for(var i=0;i<this.listRegister.length;i++){
				if(this.listRegister[i]!=null){
					if(this.listRegister[i].code==data.code){
						this.listRegister[i].classSelected=null;
						break;
					}
				}
			}
		}
	}
	app.RouteCreateComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));