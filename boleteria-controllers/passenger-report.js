(function(app) {
	app.PassengerReportComponent =
		ng.core.Component({
		selector: 'passenger-report',
		templateUrl: 'views/passenger-report.html',
		})
		.Class({
		  constructor: [app.MsgComponent,ng.router.Router,ng.router.ActivatedRoute,
		  function(msg,router,active) {
	          this.msg=msg;
	          this.mensaje="";
	          this.router=router;  
	          this.active=active;
		  }]
		});
	app.PassengerReportComponent.prototype.ngOnInit=function(){
		this.dataSelected=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=10;
		this.pageSelected=1;
		this.listRegister=[];
		this.nombre=null;
		this.doc=null;
		this.email=null;
		this.direccion=null;
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
	}
	app.PassengerReportComponent.prototype.search=function(){
	}
	app.PassengerReportComponent.prototype.clean=function(){
		this.nombre=null;
		this.doc=null;
		this.email=null;
	}
	app.PassengerReportComponent.prototype.getCantidadSelected=function(data){
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
	app.PassengerReportComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.PassengerReportComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.PassengerReportComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.PassengerReportComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.PassengerReportComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.PassengerReportComponent.prototype.callServices = function (data, parametros) {
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		let key="results";
		let request=this.service.callServicesHttp('passenger-report',querys,this.jsonFilter);
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
					this.mensaje=this.service.processMessageError(data,mensajeAll);
					this.msg.error();
				}
			}
		},err=>{
			this.listRegister=[];
			this.mensaje=this.service.processError(err,mensajeAll);
			this.msg.error();
		});
	}
	app.PassengerReportComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.PassengerReportComponent.prototype.deselectedData = function() {
		this.dataSelected = null;
	}
	app.PassengerReportComponent.prototype.selectedAction = function(data, action) {
		this.dataSelected = data;
		if (action.hasOwnProperty('name')) {
			switch (action.name) {
				case 'PASSENGER-VIEW':{
					this.router.navigate(['/passenger-view'], { queryParams: { id: data.id} });
				}break;
				case 'PASSENGER-UPDATE':{
					this.router.navigate(['/passenger-update'], { queryParams: { id: data.id} });
				}break;
				case 'PASSENGER-DELETE':{
					$("#deletePassenger").modal();
				}break;
				default:{}
			}
		}
	}
	app.PassengerReportComponent.prototype.deleteData=function(){
		$("#deletePassenger").modal('hide');
		if(this.dataSelected==null || this.dataSelected==undefined || this.dataSelected==""){
			this.mensaje=capitalizeOnly(_("warning2"));
			this.msg.warning();
			return;
		}else{
			if(this.dataSelected.hasOwnProperty("id")){
				if(!(this.dataSelected.id==null || this.dataSelected.id==undefined || this.dataSelected.id=="")){
					var querys="&id="+this.dataSelected.id;
					let mensajeAll = capitalizeOnly(_("message_dflt_8"));
					let request = this.service.callServicesHttp("passenger-delete", querys, null);
					request.subscribe(data => {
						if (data == null || data == undefined || data == "") {
							this.mensaje = mensajeAll;
							this.msg.error();
						} else {
							if (data.status_http == 200) {
								delete data['status_http'];
								this.ngOnInit();
								this.mensaje=capitalizeOnly(_("success4"));
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
	app.PassengerReportComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));