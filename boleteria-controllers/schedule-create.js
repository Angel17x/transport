(function(app) {
	app.ScheduleCreateComponent =
		ng.core.Component({
		selector: 'schedule-create',
		templateUrl: 'views/schedule-create.html',
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
	app.ScheduleCreateComponent.prototype.ngOnInit=function(){
		this.texto="Crear";
		this.title=capitalizeOnly(_("title17"));
		this.pagingActual={};
		this.detallePorPagina=10
		this.totalPage=1;
		this.pageSelected=1;
		this.line_buscar=null;
		this.parada_buscar=null;
		this.listRegister=[];
		this.isFijo=true;
		this.isVariable=false;
		this.listTrayectos=[];
		this.getData();
	}
	app.ScheduleCreateComponent.prototype.getData=function(){
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'schedule-create') {
				this.title=capitalizeOnly(_("title17"));
				this.texto="Crear";
				this.save = true;
			} else {
				this.title=capitalizeOnly(_("title18"));
				this.texto="Actualizar";
				this.save = false;
				if(this.active.hasOwnProperty('queryParams')){
					if(this.active.queryParams!=null){
						if(this.active.queryParams.hasOwnProperty('_value')){
							if(this.active.queryParams._value!=null){
								if(this.active.queryParams._value.hasOwnProperty('id')){
									this.code=this.active.queryParams._value.id;
									this.getService();
								}
							}
						}
					}
				}
			}
		}
	}
	app.ScheduleCreateComponent.prototype.search=function(){
		this.callServices(1, '&limit=' + this.detallePorPagina);
	}
	app.ScheduleCreateComponent.prototype.getCantidadSelected=function(data){
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
	app.ScheduleCreateComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.ScheduleCreateComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.ScheduleCreateComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.ScheduleCreateComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.ScheduleCreateComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.ScheduleCreateComponent.prototype.getService=function(){
		let request=this.service.callServicesHttp('schedule-get',null,null);
		this.procesarRespuestaGET(request);
	}
	app.ScheduleCreateComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_52");
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
	app.ScheduleCreateComponent.prototype.formattedDataGET=function(data){
		this.routeSelected=null;
		if(data.hasOwnProperty("code")){
			this.routeSelected={};
			this.routeSelected.code=data.code;
			if(data.hasOwnProperty("line")){
				this.routeSelected.line=data.line;
			}
		}
		if(data.hasOwnProperty("trayectos")){
			this.routeSelected.trayectos=[];
			if(!(data.trayectos==null || data.trayectos==undefined || data.trayectos=="" || data.trayectos.length==0)){
				for(var i=0;i<data.trayectos.length;i++){
					if(data.trayectos[i]!=null){
						this.routeSelected.trayectos.push(data.trayectos[i]);
					}
				}
			}
		}
		if(data.hasOwnProperty("schedule")){
			this.horario_fijo=data.schedule;
			this.isFijo=true;
			this.isVariable=false;
		}
		this.lunes=true;
		this.martes=true;
		this.miercoles=true;
		this.jueves=true;
		this.isFeriado=true;
	}
	app.ScheduleCreateComponent.prototype.callServices = function (data, parametros) {
		let request=this.service.callServicesHttp('route-report',null,null);
		this.procesarRespuesta(request);
	}
	app.ScheduleCreateComponent.prototype.procesarRespuesta=function(data){
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
	app.ScheduleCreateComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.ScheduleCreateComponent.prototype.selectedRoute=function(data){
		this.routeSelected=null;
		if(!(data==null || data==undefined || data=="")){
			if(this.listRegister!=null && this.listRegister.length!=0){
				for(var i=0; i<this.listRegister.length;i++){
					if(this.listRegister[i]!=null){
						if(this.listRegister[i].id==data.id){
							if(this.listRegister[i].classSelected==null){
								this.routeSelected=this.listRegister[i];
								this.listRegister[i].classSelected="selected";
							}else{
								this.listRegister[i].classSelected=null;
							}
						}else{
							this.listRegister[i].classSelected=null;
						}
					}
				}
			}
		}
	}
	app.ScheduleCreateComponent.prototype.quitarRoute=function(){
		this.routeSelected=null;
		if(this.listRegister!=null && this.listRegister.length!=0){
			for(var i=0; i<this.listRegister.length;i++){
				if(this.listRegister[i]!=null){
					this.listRegister[i].classSelected=null;
				}
			}
		}
	}
	app.ScheduleCreateComponent.prototype.getValueMsg=function(){
		this.router.navigate(['/schedule-report']);
	}
	app.ScheduleCreateComponent.prototype.selectedTypeHorario=function(){
		this.isFijo=!this.isFijo;
		this.isVariable=!this.isVariable;
	}
	app.ScheduleCreateComponent.prototype.clean=function(){
		this.line_buscar=null;
		this.parada_buscar=null;
		this.listRegister=[];
		this.routeSelected=null;
		this.isFijo=true;
		this.isVariable=false;
		this.horario_fijo=null;
		this.horario_init=null;
		this.horario_fin=null;
		this.frecuencia=null;
		this.lunes=false;
		this.martes=false;
		this.miercoles=false;
		this.jueves=false;
		this.viernes=false;
		this.sabado=false;
		this.domingo=false;
		this.isFeriado=false;
	}
	app.ScheduleCreateComponent.prototype.done=function(){
		var parametros={};
		if(this.routeSelected==null){
			this.mensaje="Debe seleccionar la ruta";
			this.msg.warning();
			return;
		}
		let request=null;
		if(this.save){
			request = this.service.callServicesHttp("schedule-post", null, parametros);
		}else{
			request = this.service.callServicesHttp("schedule-put", null, parametros);
		}
		this.procesarRespuestaDone(request);
	}
	app.ScheduleCreateComponent.prototype.quitarPunto=function(index,data){
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
	app.ScheduleCreateComponent.prototype.procesarRespuestaDone=function(data){
		let mensajeAll=_("message_dflt_50");
		if(this.save){
			mensajeAll=_("message_dflt_50");
		}else{
			mensajeAll=_("message_dflt_51");
		}
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				if(this.save){
					this.mensaje=capitalizeOnly(_("success39"));
				}else{
					this.mensaje=capitalizeOnly(_("success40"));
				}
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.ScheduleCreateComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));