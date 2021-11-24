(function(app) {
	app.LineReportComponent =
		ng.core.Component({
		selector: 'line-report',
		templateUrl: 'views/line-report.html',
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
	app.LineReportComponent.prototype.ngOnInit=function(){
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=10;
		this.pageSelected=1;
		this.listRegister=[];
		this.nombre=null;
		this.codigo=null;
		this.modalidad=null;
		this.direccion=null;
		this.status=null;
		this.listStatus=[{value:null,name:"Todos"},{value:"ACTIVE",name:"Activa"},{value:"INACTIVE",name:"Inactiva"}];
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
	app.LineReportComponent.prototype.checkRol=function(){
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
							if(tabla[i].name=="LINES"){
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
								if(tabla[i].tag=="LINES"){
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
	app.LineReportComponent.prototype.formattedActions=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.LineReportComponent.prototype.formattedView=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.name=="CREATE-LINE"){
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
	app.LineReportComponent.prototype.search=function(){
		this.jsonFilter={};
		var datos=[];
		var entity=null;
		if(!(this.nombre==null || this.nombre==undefined || this.nombre=="" || this.nombre=="null")){
			if(entity==null){
				entity={};
			}
			entity.name="*"+this.nombre+"*";
		}
		if(!(this.codigo==null || this.codigo==undefined || this.codigo=="" || this.codigo=="null" )){
			if(entity==null){
				entity={};
			}
			entity.code="*"+this.codigo+"*";
		}
		if(!(this.modalidad==null || this.modalidad==undefined || this.modalidad=="" || this.modalidad=="null")){
			if(entity==null){
				entity={};
			}
			entity.mode="*"+this.modalidad+"*";
		}
		if(!(this.direccion==null || this.direccion==undefined || this.direccion=="" || this.direccion=="null" )){
			if(entity==null){
				entity={};
			}
			entity.address="*"+this.direccion+"*";
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
	app.LineReportComponent.prototype.clean=function(){
		this.nombre=null;
		this.codigo=null;
		this.modalidad=null;
		this.direccion=null;
		this.status=null;
	}
	app.LineReportComponent.prototype.getCantidadSelected=function(data){
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
	app.LineReportComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.LineReportComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.LineReportComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.LineReportComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.LineReportComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.LineReportComponent.prototype.callServices = function (data, parametros) {
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		let request = this.service.callServicesHttp("line-report", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.LineReportComponent.prototype.procesarRespuesta=function(data){
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
	app.LineReportComponent.prototype.checkAction=function(data){
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
	app.LineReportComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.hasOwnProperty("start_date")){
				if(!(data.start_date==null || data.start_date==undefined || data.start_date=="")){
					data.expedicion=formattingDate1(data.start_date);
				}
			}
			if(data.hasOwnProperty("expiration_date")){
				if(!(data.expiration_date==null || data.expiration_date==undefined || data.expiration_date=="")){
					data.vencimiento=formattingDate1(data.expiration_date);
				}
			}
			data.actions=[];
			if(this.checkAction("LINE-DELETE")!=null){
				data.actions.push(this.checkAction("LINE-DELETE"));
			}
			if(this.checkAction("VIEW-LINE")!=null){
				data.actions.push(this.checkAction("VIEW-LINE"));
			}
			if(this.checkAction("UPDATE-LINE")!=null){
				data.actions.push(this.checkAction("UPDATE-LINE"));
			}
			if(this.checkAction("LINE-VIEW-OWNER")!=null){
				data.actions.push(this.checkAction("LINE-VIEW-OWNER"));
			}
			if(this.checkAction("LINE-VIEW-CARS")!=null){
				data.actions.push(this.checkAction("LINE-VIEW-CARS"));
			}
			if(data.hasOwnProperty("active")){
				if(data.active){
					data.formatted_status="ACTIVA";
					if(this.checkAction("LINE-INACTIVE")!=null){
						data.actions.push(this.checkAction("LINE-INACTIVE"));
					}
				}else{
					data.formatted_status="INACTIVA";
					if(this.checkAction("LINE-ACTIVE")!=null){
						data.actions.push(this.checkAction("LINE-ACTIVE"));
					}
				}
			}			
			return data;
		}
	}
	app.LineReportComponent.prototype.deselectedData = function() {
		this.dataSelected = null;
	}
	app.LineReportComponent.prototype.selectedAction = function(data, action) {
		this.dataSelected = data;
		if (action.hasOwnProperty('name')) {
			switch (action.name) {
				case 'LINE-DELETE':{
					$("#modalDeleteLine").modal("show");
				}break;
				case 'LINE-ACTIVE':{
					$("#modalActivateLine").modal("show");
				}break;
				case 'LINE-INACTIVE':{
					$("#modalInactivateLine").modal("show");
				}break;
				case 'VIEW-LINE':{
					this.router.navigate(['/line-view'], { queryParams: { id: data.id} });
				}break;
				case 'UPDATE-LINE':{
					this.router.navigate(['/line-update'], { queryParams: { id: data.id} });
				}break;
				case 'LINE-VIEW-PROPIETARIO':{
					this.router.navigate(['/line-view-propietario'], { queryParams: { id: data.code} });
				}break;
				case 'LINE-VIEW-CAR':{
					this.router.navigate(['/line-view-car'], { queryParams: { id: data.code} });
				}break;
				default:{}
			}
		}
	}
	app.LineReportComponent.prototype.deleteData=function(){
		$("#modalDeleteLine").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning3"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&id="+this.dataSelected.id;
					let mensajeAll=_("message_dflt_9");
					let request = this.service.callServicesHttp("line-delete", querys, null);
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
	app.LineReportComponent.prototype.activeData=function(){
		$("#modalActivateLine").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning3"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&id="+this.dataSelected.id;
					var parametros={};
					try{
						parametros=JSON.stringify(this.dataSelected);
						parametros=JSON.parse(parametros);
						if(parametros.hasOwnProperty("info")){
							delete parametros["info"]
						}
						if(parametros.hasOwnProperty("vencimiento")){
							delete parametros["vencimiento"]
						}
						if(parametros.hasOwnProperty("expedicion")){
							delete parametros["expedicion"]
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
					let mensajeAll=_("message_dflt_45");
					let request = this.service.callServicesHttp("line-put", querys, parametros);
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
	app.LineReportComponent.prototype.inactiveData=function(){
		$("#modalInactivateLine").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning3"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&id="+this.dataSelected.id;
					var parametros={};
					try{
						parametros=JSON.stringify(this.dataSelected);
						parametros=JSON.parse(parametros);
						if(parametros.hasOwnProperty("info")){
							delete parametros["info"]
						}
						if(parametros.hasOwnProperty("vencimiento")){
							delete parametros["vencimiento"]
						}
						if(parametros.hasOwnProperty("expedicion")){
							delete parametros["expedicion"]
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
					let mensajeAll=_("message_dflt_46");
					let request = this.service.callServicesHttp("line-put", querys, parametros);
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
	app.LineReportComponent.prototype.procesarRespuestaDelete=function(data){
		let mensajeAll=_("message_dflt_9");
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				this.ngOnInit();
				this.mensaje=capitalizeOnly(_("success5"));
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.LineReportComponent.prototype.procesarRespuestaActivar=function(data){
		let mensajeAll=_("message_dflt_45")
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				if(data.hasOwnProperty("id")){
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
				}
				this.mensaje=_("success34");
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.LineReportComponent.prototype.procesarRespuestaDesactivar=function(data){
		let mensajeAll=_("message_dflt_46")
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
				this.mensaje=_("success35");
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.LineReportComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));