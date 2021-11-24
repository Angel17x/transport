(function(app) {
	app.SalesReportComponent =
		ng.core.Component({
		selector: 'sales-report',
		templateUrl: 'views/report-sales.html',
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
	app.SalesReportComponent.prototype.ngOnInit=function(){
		this.dataSelected=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=100;
		this.pageSelected=1;
		this.listRegister=[];
		this.listMetodoPago=[{value:null,name:"Todos"},{value:"POS",name:"Punto de venta"},{value:"CASH",name:"Efectivo"},{value:"MOBILE",name:"Pago Móvil"},{value:"TRANSFERENCE",name:"Transferencia"}];
		this.status=null;
		this.nombre=null;
		this.codigo=null;
		this.checkRol();
	}
	app.SalesReportComponent.prototype.checkRol=function(){
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
							if(tabla[i].name=="SALES-REPORT"){
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
								if(tabla[i].tag=="SALES-REPORT"){
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
	app.SalesReportComponent.prototype.formattedActions=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.SalesReportComponent.prototype.formattedView=function(data){
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
	app.SalesReportComponent.prototype.search=function(){
		this.jsonFilter={};
		if(this.init==null || this.init==undefined || this.init=="" || this.end==undefined || this.end==null || this.end==""){
			this.mensaje="Debe ingresar el periodo a buscar";
			this.msg.warning();
			return;
		}else{
			this.jsonFilter.lte=this.end+"T23:59:59.000Z";
			this.jsonFilter.gte=this.init+"T00:00:00.000Z";
		}
		this.jsonFilter.status=["PAID"];
		this.callServices(1, "&limit="+this.detallePorPagina);
	}
	app.SalesReportComponent.prototype.clean=function(){
		this.init=null;
		this.end=null;
		this.linea=null;
		this.destino=null;
		this.metodo=null;
	}
	app.SalesReportComponent.prototype.getCantidadSelected=function(data){
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
	app.SalesReportComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.SalesReportComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.SalesReportComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.SalesReportComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.SalesReportComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.SalesReportComponent.prototype.callServices = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let request = this.service.callServicesHttp("sales-report-acumulate", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.SalesReportComponent.prototype.procesarRespuesta=function(data){
		var key="lines";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			this.listRegister=[];
			this.mensaje=mensajeAll;
			this.msg.error();
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("global_sum")){
					if(!(data.global_sum==null || data.global_sum==undefined || data.global_sum=="")){
						try{
							this.monto_total=amountFormattingObject(data.global_sum.toFixed()*100);
							this.monto_total=this.monto_total.integerPart+","+this.monto_total.decimalPart+" Bs";
							
							this.porcentaje_total=amountFormattingObject(data.global_sum.toFixed()*12);
							this.porcentaje_total=this.porcentaje_total.integerPart+","+this.porcentaje_total.decimalPart+" Bs";
						}catch(et){
						}
					}
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
				}else{
					this.listRegister=[];
				}
			}else{
				this.mensaje=this.service.processMessageError(data,mensajeAll);
				this.msg.error();
			}
		}
	}
	app.SalesReportComponent.prototype.checkAction=function(data){
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
	app.SalesReportComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.hasOwnProperty("payment_methods")){
				if(data.payment_methods!=null && data.payment_methods.length!=0){
					for(var i=0;i<data.payment_methods.length;i++){
						if(data.payment_methods[i]!=null){
							if(!(data.payment_methods[i].sum==null || data.payment_methods[i].sum==undefined || data.payment_methods[i].sum=="")){
								try{
								
									data.payment_methods[i].formatted_amount=amountFormattingObject(data.payment_methods[i].sum.toFixed()*100);
									data.payment_methods[i].formatted_amount=data.payment_methods[i].formatted_amount.integerPart+","+data.payment_methods[i].formatted_amount.decimalPart;
									data.payment_methods[i].formatted_amount=data.payment_methods[i].formatted_amount+" Bs";
								}catch(er){
								}
							}
							if(data.payment_methods[i].hasOwnProperty("payment_method")){
								if(!(data.payment_methods[i].payment_method==null || data.payment_methods[i].payment_method==undefined || data.payment_methods[i].payment_method=="" || data.payment_methods[i].payment_method.length==0)){
									data.payment_methods[i].formatted_payment=_(data.payment_methods[i].payment_method).toUpperCase();
								}
							}
								
						}
					}
				}
			}
			if(data.hasOwnProperty("sum")){
				if(!(data.sum==null || data.sum==undefined || data.sum=="" || data.sum==0)){
					try{
						data.formatted_sum=amountFormattingObject(data.sum.toFixed()*100);
						data.formatted_sum=data.formatted_sum.integerPart+","+data.formatted_sum.decimalPart+" Bs";
					}catch(ew){
					}
					try{
						data.formatted_porcentaje=amountFormattingObject(data.sum.toFixed()*12);
						data.formatted_porcentaje=data.formatted_porcentaje.integerPart+","+data.formatted_porcentaje.decimalPart+" Bs";
					}catch(ew){
						console.log("ew",ew);
					}
				}
			}
			return data;
		}
	}
	app.SalesReportComponent.prototype.deselectedData = function() {
		this.dataSelected = null;
	}
	app.SalesReportComponent.prototype.selectedAction = function(data, action) {
		this.dataSelected = data;
		if (action.hasOwnProperty('name')) {
			switch (action.name) {
				case 'STOP-ACTIVE':{
					$("#modalActivateParada").modal("show");
				}break;
				case 'STOP-INACTIVE':{
					$("#modalInactivateParada").modal("show");
				}break;
				case 'STOP-DELETE':{
					$("#modalDeleteParada").modal("show");
				}break;
				default:{}
			}
		}
	}
	app.SalesReportComponent.prototype.deleteData=function(){
		$("#modalDeleteParada").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning30"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("code")){
				if(!(this.dataSelected.code==null || this.dataSelected.code==undefined || this.dataSelected.code=="")){
					var querys="&code="+this.dataSelected.code;
					let mensajeAll=_("message_dflt_30");
					let request = this.service.callServicesHttp("parada-delete", querys, );
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
	app.SalesReportComponent.prototype.activeData=function(){
		$("#modalActivateParada").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning30"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("code")){
				if(!(this.dataSelected.code==null || this.dataSelected.code==undefined || this.dataSelected.code=="")){
					var querys="&code="+this.dataSelected.code;
					var parametros={
						name:this.dataSelected.name,
						active:true
					};
					let mensajeAll=_("message_dflt_31");
					let request = this.service.callServicesHttp("parada-put", querys, parametros);
					request.subscribe(data => {
						this.procesarRespuestaActivar(data);
					}, err => {
						this.mensaje = this.service.processError(err, mensajeAll);
						this.msg.error();
					});
				}
			}
		}
	
	}
	app.SalesReportComponent.prototype.inactiveData=function(){
		$("#modalInactivateParada").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning30"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("code")){
				if(!(this.dataSelected.code==null || this.dataSelected.code==undefined || this.dataSelected.code=="")){
					var querys="&code="+this.dataSelected.code;
					var parametros={
						name:this.dataSelected.name,
						active:false
					};
					let request = this.service.callServicesHttp("parada-put", querys, parametros);
					let mensajeAll=_("message_dflt_32");
					request.subscribe(data => {
						this.procesarRespuestaDesactivar(data);
					}, err => {
						this.mensaje = this.service.processError(err, mensajeAll);
						this.msg.error();
					});
				}
			}
		}
	}
	app.SalesReportComponent.prototype.procesarRespuestaDelete=function(data){
		let mensajeAll=_("message_dflt_30");
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				this.ngOnInit();
				this.mensaje=capitalizeOnly(_("success20"));
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.SalesReportComponent.prototype.procesarRespuestaActivar=function(data){
		let mensajeAll=_("message_dflt_31")
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				if(data.hasOwnProperty("code")){
					if(this.listRegister!=null && this.listRegister.length!=0){
						for(var i=0;i<this.listRegister.length;i++){
							if(this.listRegister[i]!=null){
								if(this.listRegister[i].code==data.code){
									this.listRegister[i]=this.formattedData(data);
									break;
								}
							}
						}
					}
				}
				this.mensaje=_("success21");
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.SalesReportComponent.prototype.procesarRespuestaDesactivar=function(data){
		let mensajeAll=_("message_dflt_32")
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				if(data.hasOwnProperty("code")){
					if(this.listRegister!=null && this.listRegister.length!=0){
						for(var i=0;i<this.listRegister.length;i++){
							if(this.listRegister[i]!=null){
								if(this.listRegister[i].code==data.code){
									this.listRegister[i]=this.formattedData(data);
									break;
								}
							}
						}
					}
				}
				this.mensaje=_("success22");
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.SalesReportComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));