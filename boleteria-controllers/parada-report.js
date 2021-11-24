(function(app) {
	app.ParadaReportComponent =
		ng.core.Component({
		selector: 'parada-report',
		templateUrl: 'views/parada-report-v1.html',
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
	app.ParadaReportComponent.prototype.ngOnInit=function(){
		this.dataSelected=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=10;
		this.pageSelected=1;
		this.listRegister=[];
		this.listStatus=[{value:null,name:"Todos"},{value:"ACTIVE",name:"Activa"},{value:"INACTIVE",name:"Inactiva"}];
		this.status=null;
		this.nombre=null;
		this.codigo=null;
		this.checkRol();
	}
	app.ParadaReportComponent.prototype.checkRol=function(){
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
							if(tabla[i].name=="STOPS"){
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
								if(tabla[i].tag=="STOPS"){
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
	app.ParadaReportComponent.prototype.formattedActions=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.ParadaReportComponent.prototype.formattedView=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.name=="STOP-CREATE"){
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
	app.ParadaReportComponent.prototype.search=function(){
		this.jsonFilter={};
		var datos=[];
		var entity=null;
		if(!(this.codigo ==null || this.codigo ==undefined || this.codigo =="" || this.codigo=="null")){
			entity={};
			entity={code :"*"+this.codigo+"".trim()+"*"};
		}
		if(!(this.nombre==null || this.nombre==undefined || this.nombre=="" || this.nombre=="null" || this.nombre=="Todos")){
			if(entity==null){
				entity={};
			}
			entity.name="*"+this.nombre+"*";
		}
		if(!(this.status==null || this.status==undefined || this.status=="" || this.status=="null" || this.status=="Todos")){
			if(entity==null){
				entity={};
			}
			if(this.status=="ACTIVE"){
				entity.active=true;
			}else{
				entity.active=false;
			}
		}
		if(entity!=null){
			datos={entity:entity,level: "AND"};
			let aux1=[datos];
			this.jsonFilter.entities=aux1;
		}
		
		this.jsonFilter.sort={"info.created_at":"desc"};
		this.callServices(1, "&limit="+this.detallePorPagina);
	}
	app.ParadaReportComponent.prototype.clean=function(){
		this.nombre=null;
		this.codigo=null;
		this.status=null;
	}
	app.ParadaReportComponent.prototype.getCantidadSelected=function(data){
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
	app.ParadaReportComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.ParadaReportComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.ParadaReportComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.ParadaReportComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.ParadaReportComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.ParadaReportComponent.prototype.callServices = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let request = this.service.callServicesHttp("parada-report", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.ParadaReportComponent.prototype.procesarRespuesta=function(data){
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
	app.ParadaReportComponent.prototype.checkAction=function(data){
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
	app.ParadaReportComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			data.actions=[];
			if(this.checkAction("STOP-DELETE")!=null){
				data.actions.push(this.checkAction("STOP-DELETE"));
			}
			if(data.hasOwnProperty("active")){
				if(data.active){
					data.formatted_status="Activa";
					if(this.checkAction("STOP-INACTIVE")!=null){
						data.actions.push(this.checkAction("STOP-INACTIVE"));
					}
				}else{
					data.formatted_status="Inactiva";
					if(this.checkAction("STOP-ACTIVE")!=null){
						data.actions.push(this.checkAction("STOP-ACTIVE"));
					}
				}
			}else{
				data.formatted_status="Inactiva";
				if(this.checkAction("STOP-ACTIVE")!=null){
					data.actions.push(this.checkAction("STOP-ACTIVE"));
				}
			}
			return data;
		}
	}
	app.ParadaReportComponent.prototype.deselectedData = function() {
		this.dataSelected = null;
	}
	app.ParadaReportComponent.prototype.selectedAction = function(data, action) {
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
	app.ParadaReportComponent.prototype.deleteData=function(){
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
	app.ParadaReportComponent.prototype.activeData=function(){
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
	app.ParadaReportComponent.prototype.inactiveData=function(){
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
	app.ParadaReportComponent.prototype.procesarRespuestaDelete=function(data){
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
	app.ParadaReportComponent.prototype.procesarRespuestaActivar=function(data){
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
	app.ParadaReportComponent.prototype.procesarRespuestaDesactivar=function(data){
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
	app.ParadaReportComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));