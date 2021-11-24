(function(app) {
	app.CarTypeCreateComponent =
		ng.core.Component({
		selector: 'car-type-create',
		templateUrl: 'views/car-type-create.html',
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
	app.CarTypeCreateComponent.prototype.ngOnInit=function(){
		this.title=_("title55");
		this.nombre=null;
		this.capacidad=null;
		this.listCaracteristicas=[];
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
	app.CarTypeCreateComponent.prototype.checkRol=function(){
		var texto="CREATE-CAR-TYPES";
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'car-type-create') {
				this.title = _("title55");
				this.save = true;
				texto="CREATE-CAR-TYPES";
			} else {
				this.title = _("title56");;
				this.save = false;
				texto="UPDATE-CAR-TYPE";
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
	app.CarTypeCreateComponent.prototype.getData=function(){
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null){
						if(this.active.queryParams._value.hasOwnProperty('id')){
							this.id=this.active.queryParams._value.id;
							this.getService();
						}
					}
				}
			}
		}
	}
	app.CarTypeCreateComponent.prototype.getService=function(){
		let request=this.service.callServicesHttp('car-type-get',"&id="+this.id,null);
		let mensajeAll=_("message_dflt_60");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.CarTypeCreateComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_60");
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
	app.CarTypeCreateComponent.prototype.formattedDataGET=function(data){
		if(data.hasOwnProperty("name")){
			this.nombre=data.name;
		}
		if(data.hasOwnProperty("capacity")){
			this.capacidad=data.capacity;
		}
		if(data.hasOwnProperty("features")){
			this.listCaracteristicas=[];
			if(data.features!=null && data.features.length!=0){
				var objeto={};
				for(var i=0;i<data.features.length;i++){
					if(data.features[i]!=null){
						objeto={};
						objeto.value=data.features[i];
						this.listCaracteristicas.push(objeto);
					}
				}
			}
		}
	}
	app.CarTypeCreateComponent.prototype.getValueMsg=function(){
		var link = ['/car-type-report'];
		this.router.navigate(link);
	}
	app.CarTypeCreateComponent.prototype.addFeature=function(){
		var objeto = { value: ""};
		this.listCaracteristicas.push(objeto);
	}
	app.CarTypeCreateComponent.prototype.deleteFeature = function (index) {
		var provi = this.listCaracteristicas.slice(index + 1);
		this.listCaracteristicas = this.listCaracteristicas.slice(0, index);
		this.listCaracteristicas = this.listCaracteristicas.concat(provi);
	}
	app.CarTypeCreateComponent.prototype.clean=function(){
		this.nombre=null;
		this.capacidad=null;
		this.listCaracteristicas=[];
	}
	app.CarTypeCreateComponent.prototype.done=function(){
		var parametros={};
		if(this.nombre==null || this.nombre==undefined || this.nombre==""){
			this.mensaje=_("warning38");
			this.msg.warning();
			return;
		}else{
			parametros.name=this.nombre.trim().toUpperCase();
		}
		if(this.capacidad==null || this.capacidad==undefined || this.capacidad==""){
			this.mensaje=_("warning39");
			this.msg.warning();
			return;
		}else{
			parametros.capacity=this.capacidad;
		}
		if(this.listCaracteristicas==null || this.listCaracteristicas.length==0){
			this.mensaje=_("warning40");
			this.msg.warning();
			return;
		}
		var lista=[];
		for(var i=0;i<this.listCaracteristicas.length;i++){
			if(this.listCaracteristicas[i]!=null){
				if(!(this.listCaracteristicas[i].value==null || this.listCaracteristicas[i].value==undefined || this.listCaracteristicas[i].value=="")){
					lista.push(this.listCaracteristicas[i].value.trim().toUpperCase());
				}
			}
		}
		if(lista==null || lista.length==0){
			this.mensaje=_("warning40");
			this.msg.warning();
			return;
		}else{
			parametros.features=lista;
		}
		let mensajeAll=_("message_dflt_57");
		let request=null;
		if(this.save){
			request = this.service.callServicesHttp("car-type-post", null, parametros);
		}else{
			mensajeAll=_("message_dflt_58");
			request = this.service.callServicesHttp("car-type-put", "&id="+this.id, parametros);
		}
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.CarTypeCreateComponent.prototype.procesarRespuesta=function(data){
		let mensajeAll=_("message_dflt_57");
		if(!this.save){
			mensajeAll=_("message_dflt_58");
		}
		if(data==null || data==undefined || data==""){
			this.mensaje=mensajeAll;
			this.msg.error();
		}else{
			if (data.status_http == 200) {
				if(this.save){
					this.mensaje=capitalizeOnly(_("success41"));
				}else{
					this.mensaje=capitalizeOnly(_("success42"));
				}
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.CarTypeCreateComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));