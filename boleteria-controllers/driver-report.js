(function(app) {
	app.DriverReportComponent =
		ng.core.Component({
		selector: 'driver-report',
		templateUrl: 'views/driver-report-v1.html',
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
	app.DriverReportComponent.prototype.ngOnInit=function(){
		this.dataSelected=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=10;
		this.pageSelected=1;
		this.listRegister=[];
		this.listStatus=[{value:null,name:"Todos"},{value:"ACTIVE",name:"Activo"},{value:"INACTIVE",name:"Inactivo"}];
		this.status=null;
		this.nombre=null;
		this.doc=null;
		this.email=null;
		this.linea=null;
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
	app.DriverReportComponent.prototype.checkRol=function(){
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
							if(tabla[i].name=="DRIVERS"){
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
								if(tabla[i].tag=="DRIVERS"){
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
	app.DriverReportComponent.prototype.formattedActions=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.name=="DRIVER-REPORT"){
				return null;
			}
			return data;
		}
	}
	app.DriverReportComponent.prototype.formattedView=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.name=="DRIVER-CREATE"){
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
	app.DriverReportComponent.prototype.clean=function(){
		this.nombre=null;
		this.doc=null;
		this.marca=null;
		this.rif=null;
		this.email=null;
		this.linea=null;
		this.status=null;
	}
	app.DriverReportComponent.prototype.search=function(){
		this.jsonFilter={};
		var datos=[];
		var entity=null;
		if(!(this.nombre==null || this.nombre==undefined || this.nombre=="" || this.nombre=="null")){
			if(entity==null){
				entity={};
			}
			entity.name="*"+this.nombre.trim()+"*";
		}
		if(!(this.doc==null || this.doc==undefined || this.doc=="" || this.doc=="null" )){
			if(entity==null){
				entity={};
			}
			entity.id_doc="*"+this.doc.trim()+"*";
		}
		if(!(this.email==null || this.email==undefined || this.email=="" || this.email=="null")){
			if(entity==null){
				entity={};
			}
			entity.email="*"+this.email.trim()+"*";
		}
		if(!(this.linea==null || this.linea==undefined || this.linea=="")){
			if(entity==null){
				entity={};
			}
			entity.line_name="*"+this.linea.trim()+"*";
		}
		if(!(this.status==null || this.status==undefined || this.status=="" || this.status=="null" )){
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
		this.callServices(1,"&offset=0&limit="+this.detallePorPagina);
	}
	
	app.DriverReportComponent.prototype.getCantidadSelected=function(data){
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
	app.DriverReportComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.DriverReportComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.DriverReportComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.DriverReportComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.DriverReportComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.DriverReportComponent.prototype.callServices = function (data, parametros) {
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		let request = this.service.callServicesHttp("driver-report", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.DriverReportComponent.prototype.procesarRespuesta=function(data){
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
	app.DriverReportComponent.prototype.checkAction=function(data){
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
	app.DriverReportComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			data.actions=[];
			if(this.checkAction("DRIVER-DELETE")!=null){
				data.actions.push(this.checkAction("DRIVER-DELETE"));
			}
			if(this.checkAction("DRIVER-UPDATE")!=null){
				data.actions.push(this.checkAction("DRIVER-UPDATE"));
			}
			if(this.checkAction("DRIVER-VIEW")!=null){
				data.actions.push(this.checkAction("DRIVER-VIEW"));
			}
			if(data.hasOwnProperty("active")){
				if(data.active){
					data.formatted_status="ACTIVO";
					if(this.checkAction("DRIVER-INACTIVE")!=null){
						data.actions.push(this.checkAction("DRIVER-INACTIVE"));
					}
				}else{
					data.formatted_status="INACTIVO";
					if(this.checkAction("DRIVER-ACTIVE")!=null){
						data.actions.push(this.checkAction("DRIVER-ACTIVE"));
					}
					
				}
			}	
			return data;
		}
	}
	app.DriverReportComponent.prototype.deselectedData = function() {
		this.dataSelected = null;
	}
	app.DriverReportComponent.prototype.selectedAction = function(data, action) {
		this.dataSelected = data;
		if (action.hasOwnProperty('name')) {
			switch (action.name) {
				case 'DRIVER-DELETE':{
					$("#modalDeleteDriver").modal("show");
				}break;
				case 'DRIVER-UPDATE':{
					this.router.navigate(['/driver-update'], { queryParams: { id: data.id,business_id:data.business_id} });
				}break;
				case 'DRIVER-ACTIVE':{
					$("#modalActivateDriver").modal("show");
				}break;
				case 'DRIVER-INACTIVE':{
					$("#modalInactivateDriver").modal("show");
				}break;
				
				
				
				default:{}
			}
		}
	}
	app.DriverReportComponent.prototype.deleteData=function(){
		$("#modalDeleteDriver").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning48"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys=this.dataSelected.business_id+"?id="+this.dataSelected.id;
					let mensajeAll=_("message_dflt_67");
					let request = this.service.callServicesHttp("driver-delete", querys, null);
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
	app.DriverReportComponent.prototype.activeData=function(){
		$("#modalActivateDriver").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning48"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys=this.dataSelected.business_id+"?id="+this.dataSelected.id;
					var parametros={};
					try{
						parametros=JSON.stringify(this.dataSelected);
						parametros=JSON.parse(parametros);
						if(parametros.hasOwnProperty("info")){
							delete parametros["info"]
						}
						if(parametros.hasOwnProperty("formatted_status")){
							delete parametros["formatted_status"]
						}
						if(parametros.hasOwnProperty("actions")){
							delete parametros["actions"]
						}
						parametros.active=true;
					}catch(er){
					}
					let mensajeAll=_("message_dflt_68");
					let request = this.service.callServicesHttp("driver-put", querys, parametros);
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
	app.DriverReportComponent.prototype.inactiveData=function(){
		$("#modalInactivateDriver").modal("hide");
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning48"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys=this.dataSelected.business_id+"?id="+this.dataSelected.id;
					var parametros={};
					try{
						parametros=JSON.stringify(this.dataSelected);
						parametros=JSON.parse(parametros);
						if(parametros.hasOwnProperty("info")){
							delete parametros["info"]
						}
						if(parametros.hasOwnProperty("formatted_status")){
							delete parametros["formatted_status"]
						}
						if(parametros.hasOwnProperty("actions")){
							delete parametros["actions"]
						}
						parametros.active=false;
					}catch(er){
					}
					let mensajeAll=_("message_dflt_69");
					let request = this.service.callServicesHttp("driver-put", querys, parametros);
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
	app.DriverReportComponent.prototype.procesarRespuestaDelete=function(data){
		let mensajeAll=_("message_dflt_67");
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				this.ngOnInit();
				this.mensaje=capitalizeOnly(_("success49"));
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.DriverReportComponent.prototype.procesarRespuestaActivar=function(data){
		let mensajeAll=_("message_dflt_68")
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				if(data.hasOwnProperty("id")){
					if(this.listRegister!=null && this.listRegister.length!=0){
						for(var i=0;i<this.listRegister.length;i++){
							if(this.listRegister[i]!=null){
								if(this.listRegister[i].id==data.id && this.listRegister[i].business_id==data.business_id){
									this.listRegister[i]=this.formattedData(data);
									break;
								}
							}
						}
					}
				}
				this.mensaje=_("success50");
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.DriverReportComponent.prototype.procesarRespuestaDesactivar=function(data){
		let mensajeAll=_("message_dflt_69")
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				if(data.hasOwnProperty("id")){
					if(this.listRegister!=null && this.listRegister.length!=0){
						for(var i=0;i<this.listRegister.length;i++){
							if(this.listRegister[i]!=null){
								if(this.listRegister[i].id==data.id && this.listRegister[i].business_id==data.business_id){
									this.listRegister[i]=this.formattedData(data);
									break;
								}
							}
						}
					}
				}
				this.mensaje=_("success51");
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.DriverReportComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));