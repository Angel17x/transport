(function(app) {
	app.ScheduleReportComponent =
		ng.core.Component({
		selector: 'schedule-report',
		templateUrl: 'views/schedule-report.html',
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
	app.ScheduleReportComponent.prototype.ngOnInit=function(){
		this.dataSelected=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=10;
		this.pageSelected=1;
		this.listRegister=[];
		this.listStatus=[{value:null,name:"Todos"},{value:"ACTIVE",name:"Activo"},{value:"INACTIVE",name:"Inactivo"}];
		this.status=null;
		this.linea=null;
		this.parada=null;
		this.horario=null;
		this.checkRol();
	}
	app.ScheduleReportComponent.prototype.checkRol=function(){
	}
	app.ScheduleReportComponent.prototype.search=function(){
		this.callServices(1,"&offset=0&limit="+this.detallePorPagina);
	}
	app.ScheduleReportComponent.prototype.clean=function(){
		this.status=null;
		this.codigo=null;
		this.linea=null;
		this.parada=null;
		this.horario=null;
	}
	app.ScheduleReportComponent.prototype.getCantidadSelected=function(data){
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
	app.ScheduleReportComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.ScheduleReportComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.ScheduleReportComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.ScheduleReportComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.ScheduleReportComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	/*app.ScheduleReportComponent.prototype.callServices = function (data, parametros) {
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		let key="results";
		let request=this.ser.callServicesHttp('route-report',querys,this.jsonFilter);
		request.subscribe(data=>{
			if(data==null || data==undefined || data==""){
				this.listRegister=[];
				this.mensaje=mensajeAll;
				this.msg.error();
			}else{
				if(data.status_http==200){
					delete data['status_http'];
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
					this.mensaje=this.ser.processMessageError(data,mensajeAll);
					this.msg.error();
				}
			}
		},err=>{
			this.listRegister=[];
			this.mensaje=this.ser.processError(err,mensajeAll);
			this.msg.error();
		});
	}*/
	app.ScheduleReportComponent.prototype.callServices = function (data, parametros) {
		let request=this.service.callServicesHttp('schedule-report',null,null);
		this.procesarRespuesta(request);
	}
	app.ScheduleReportComponent.prototype.procesarRespuesta=function(data){
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
	app.ScheduleReportComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			if(data.hasOwnProperty("status")){
				if(!(data.status==null || data.status==undefined || data.status=="")){
					data.formatted_status=_(data.status).toUpperCase();
				}
			}
			data.actions=[];
			data.actions.push({name:"SCHEDULE-DELETE",functionality_detail:"Eliminar"});
			data.actions.push({name:"SCHEDULE-UPDATE",functionality_detail:"Actualizar horario"});
			if(data.hasOwnProperty("status")){
				if(!(data.status==null || data.status==undefined || data.status=="")){
					data.formatted_status=_(data.status).toUpperCase();
					if(data.status=="ACTIVE"){
						data.actions.push({name:"SCHEDULE-INACTIVE",functionality_detail:"Deshabilitar horario"});
					}else{
						data.actions.push({name:"SCHEDULE-ACTIVE",functionality_detail:"Habilitar horario"});
					}
				}
			}
			return data;
		}
	}
	app.ScheduleReportComponent.prototype.deselectedData = function() {
		this.dataSelected = null;
	}
	app.ScheduleReportComponent.prototype.selectedAction = function(data, action) {
		this.dataSelected = data;
		if (action.hasOwnProperty('name')) {
			switch (action.name) {
				case 'SCHEDULE-DELETE':{
					$("#modalDeleteSchedule").modal("show");
				}break;
				case 'SCHEDULE-ACTIVE':{
					$("#modalActivateSchedule").modal("show");
				}break;
				case 'SCHEDULE-INACTIVE':{
					$("#modalInactivateSchedule").modal("show");
				}break;
				case 'SCHEDULE-UPDATE':{
					this.router.navigate(['/schedule-update'], { queryParams: { id: data.id} });
				}break;
				
				
				default:{}
			}
		}
	}
	app.ScheduleReportComponent.prototype.deleteData=function(){
		$("#modalDeleteSchedule").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning37"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&id="+this.dataSelected.id;
					let request = this.service.callServicesHttp("schedule-delete", querys, null);
					this.procesarRespuestaDelete(request);
				}
			}
		}
	
	}
	app.ScheduleReportComponent.prototype.activeData=function(){
		$("#modalActivateSchedule").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning37"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&id="+this.dataSelected.id;
					let request = this.service.callServicesHttp("schedule-active", querys, null);
					this.procesarRespuestaActivar(request);
				}
			}
		}
	
	}
	app.ScheduleReportComponent.prototype.inactiveData=function(){
		$("#modalInactivateSchedule").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning37"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&id="+this.dataSelected.id;
					let request = this.service.callServicesHttp("schedule-inactive", querys, null);
					this.procesarRespuestaDesactivar(request);
				}
			}
		}
	}
	app.ScheduleReportComponent.prototype.procesarRespuestaDelete=function(data){
		let mensajeAll=_("message_dflt_47");
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				this.ngOnInit();
				this.mensaje=capitalizeOnly(_("success36"));
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.ScheduleReportComponent.prototype.procesarRespuestaActivar=function(data){
		let mensajeAll=_("message_dflt_48")
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
				this.mensaje=_("success37");
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.ScheduleReportComponent.prototype.procesarRespuestaDesactivar=function(data){
		let mensajeAll=_("message_dflt_49")
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
				this.mensaje=_("success38");
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.ScheduleReportComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));