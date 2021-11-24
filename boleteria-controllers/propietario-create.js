(function(app) {
	app.PropietarioCreateComponent =
		ng.core.Component({
		selector: 'propietario-create',
		templateUrl: 'views/propietario-create-v2.html',
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
	app.PropietarioCreateComponent.prototype.ngOnInit=function(){
		this.title=_('title7');
		this.pagingActualLine={};
		this.detallePorPaginaLine=10
		this.totalPageLine=1;
		this.pageSelectedLine=1;
		this.listRegisterLine=[];
		this.listDocs=["V","E","G","J"];
		this.id_doc="V";
		this.doc=null;
		this.nombre=null;
		this.apellido=null;
		this.telefono=[];
		this.email=[];
		this.etiqueta=null;
		this.isRif=true;
		this.isCi=false;
		this.save=true;
		this.texto="Guardar";
		this.active_status=true;
		this.clase="col-lg-8 col-md-8 col-sm-6 col-12";
		this.business_name=null;
		this.checkRol();
	}
	app.PropietarioCreateComponent.prototype.keyPress=function(event){
		return keypressNumbersInteger(event);
	}
	app.PropietarioCreateComponent.prototype.checkRol=function(){
		var texto="CREATE-VEHICLE-OWNER";
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'propietario-create') {
				this.title = _("title7");
				this.save = true;
				texto="CREATE-VEHICLE-OWNER";
			} else {
				this.title = _("title8");;
				this.save = false;
				this.clase="col-lg-12 col-md-12 col-sm-12 col-12";
				texto="UPDATE-VEHICLE-OWNER";
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
	app.PropietarioCreateComponent.prototype.getData=function(){
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'propietario-create') {
				this.title=_('title7')
				this.save = true;
				this.texto="Guardar";
			} else {
				this.title = _('title8')
				this.save = false;
				this.texto="Actualizar";
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
		}
	}
	app.PropietarioCreateComponent.prototype.getService=function(){
		let request=this.service.callServicesHttp('propietario-get',this.business_id+"?realm="+this.service.getRealm()+"&id="+this.id,null);
		let mensajeAll=_("message_dflt_42");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.PropietarioCreateComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_42");
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
	app.PropietarioCreateComponent.prototype.formattedDataGET=function(data){
		var id_doc=null;
		try{
			var id_doc=data.id_doc.charAt(0);
			
		}catch(er){
		}	
		if(data.hasOwnProperty("name")){
			if(!(data.name==null || data.name==undefined || data.name=="")){
				if(id_doc=="V" || id_doc=="E"){
					try{
						data.name=data.name.split(",");
						if(data.name.length==1){
							this.nombre=data.name[0].trim();
						}else{
							if(data.name.length==2){
								this.nombre=data.name[0].trim();
								this.apellido=data.name[1].trim()
							}
						}
					}catch(er){
					}
				}else{
					this.business_name=data.name;
				}
			}
		}
		if(data.hasOwnProperty("phone")){
			if(!(data.phone==null || data.phone==undefined || data.phone=="")){
				this.telefono=data.phone;
			}
		}
		if(data.hasOwnProperty("email")){
			if(!(data.email==null || data.email==undefined || data.email=="")){
				this.email=data.email;
			}
		}
		if(data.hasOwnProperty("line_name")){
			if(!(data.line_name==null || data.line_name==undefined || data.line_name=="")){
				this.lineSelected={};
				this.lineSelected.name=data.line_name;
				this.lineSelected.id=this.line_id;
			}
		}
		if(data.hasOwnProperty("active")){
			this.active_status=data.active;
		}
		try{
			if(data.hasOwnProperty("id_doc")){
				if(!(data.id_doc==null || data.id_doc==undefined || data.id_doc=="")){
					this.id_doc=data.id_doc.charAt(0);
					this.doc=data.id_doc.substring(1,data.id_doc.length);
				}
			}
		}catch(er){
		}
	}
	app.PropietarioCreateComponent.prototype.searchLine=function(){
		this.jsonFilter={};
		var datos=[];
		var entity=null;
		entity={};
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
			this.jsonFilter.entities=aux1;
		}
		
		this.jsonFilter.sort={"info.created_at":"desc"};
		this.callServicesLine(1,"&offset=0&limit=" + this.detallePorPaginaLine);
	}
	app.PropietarioCreateComponent.prototype.getCantidadSelectedLine=function(data){
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
	app.PropietarioCreateComponent.prototype.getValueFirstLine=function(data){
		this.listRegisterLine = [];
		if (this.pagingActualLine.hasOwnProperty('first_page')) {
			if (!(this.pagingActualLine.first_page == null || this.pagingActualLine.first_page == undefined || this.pagingActualLine.first_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.first_page);
			}
		}
	}
	app.PropietarioCreateComponent.prototype.getValuePreviousLine=function(data){
		this.listRegisterLine = [];
		if (this.pagingActualLine.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualLine.previous_page == null || this.pagingActualLine.previous_page == undefined || this.pagingActualLine.previous_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.previous_page);
			}
		}
	}
	app.PropietarioCreateComponent.prototype.getValueLastLine=function(data){
		this.listRegisterLine = [];
		if (this.pagingActualLine.hasOwnProperty('last_page')) {
			if (!(this.pagingActualLine.last_page == null || this.pagingActualLine.last_page == undefined || this.pagingActualLine.last_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.last_page);
			}
		}
	}
	app.PropietarioCreateComponent.prototype.getValueNextLine=function(data){
		this.listRegisterLine = [];
		if (this.pagingActualLine.hasOwnProperty('next_page')) {
			if (!(this.pagingActualLine.next_page == null || this.pagingActualLine.next_page == undefined || this.pagingActualLine.next_page == "")) {
				this.callServicesLine(data, this.pagingActualLine.next_page);
			}
		}
	}
	app.PropietarioCreateComponent.prototype.getValueChangeRecordsLine=function(data){
		this.pageSelectedLine = data;
	}
	app.PropietarioCreateComponent.prototype.callServicesLine= function (data, parametros) {
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
			this.procesarRespuestaLine(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.PropietarioCreateComponent.prototype.procesarRespuestaLine=function(data){
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
								objeto = this.formattedDataLine(data[key][i]);
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
	app.PropietarioCreateComponent.prototype.formattedDataLine=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.PropietarioCreateComponent.prototype.quitarLinea=function(){
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
	app.PropietarioCreateComponent.prototype.selectLine=function(data){
		this.lineSelected=null;
		if(!(data==null || data==undefined || data=="")){
			if(this.listRegisterLine!=null && this.listRegisterLine.length!=0){
				for(var i=0; i<this.listRegisterLine.length;i++){
					if(this.listRegisterLine[i]!=null){
						if(this.listRegisterLine[i].code==data.code){
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
	app.PropietarioCreateComponent.prototype.getValueMsg=function(){
		this.router.navigate(['/propietario-report']);
	}
	app.PropietarioCreateComponent.prototype.clean=function(){
		this.listRegisterLine=[];
		this.nombre=null;
		this.apellido=null;
		this.telefono=null;
		this.business_name=null;
		this.email=null;
		if(this.save){
			this.doc=null;
			this.id_doc="V";
			this.lineSelected=null;
		}
	}
	app.PropietarioCreateComponent.prototype.done=function(){
		var parametros={};
		if(this.lineSelected==null){
			this.mensaje="Debe seleccionar la linea a la que pertenece el propietario";
			this.msg.warning();
			return;
		}
		if(this.id_doc==null || this.id_doc==undefined || this.id_doc=="" || this.id_doc=="null"){
			this.mensaje="Debe seleccionar el tipo de documento";
			this.msg.warning();
			return;
		}else{
			parametros.id_doc=this.id_doc;
		}
		if(this.doc==null || this.doc==undefined || this.doc==""){
			this.mensaje="Debe ingresar el número de RIF/CI del propietario";
			this.msg.warning();
			return;
		}else{
			this.doc=this.doc.trim();
			var length=0;
			if(this.doc.length<9){
				length=9-this.doc.length;
				var aux="";
				for(var i=0;i<length;i++){
					aux=aux+"0";
				}
				this.doc=aux+this.doc;
			}
			parametros.id_doc=parametros.id_doc+this.doc;
			
		}
		if(this.id_doc=="V" || this.id_doc=="E"){
			if(this.nombre==null || this.nombre==undefined || this.nombre==""){
				this.mensaje="Debe ingresar el nombre del propietario";
				this.msg.warning();
				return;
			}else{
				parametros.name=this.nombre.trim().toUpperCase();
			}
			if(this.apellido==null || this.apellido==undefined || this.apellido==""){
				this.mensaje="Debe ingresar el apellido del propietario";
				this.msg.warning();
				return;
			}else{
				parametros.name=parametros.name+" , "+this.apellido.trim().toUpperCase();
			}
		}else{
			if(this.id_doc=="J" || this.id_doc=="G"){
				if(this.business_name==null || this.business_name==undefined || this.business_name==""){
					this.mensaje="Debe ingresar la razón social";
					this.msg.warning();
					return;
				}else{
					parametros.name=this.business_name.trim().toUpperCase();
				}
			}
		}
		
		
		if(!(this.telefono==null || this.telefono=="" || this.telefono==undefined || this.telefono.trim()=="")){
			var aux=this.telefono;
			parametros.phone=aux+"";
			var question=aux.substring(0,3);
			if(!(question=="414" || question=="416" || question=="424" || question=="426" || question=="412")){
				this.mensaje="El formato del teléfono ingresado es incorrecto debe comenzar por 414 | 416 | 426 | 424 |412";
				this.msg.warning();
				return;
			}else{
				if(!utils_keyNumber(aux)){
					this.mensaje="El formato del teléfono ingresado es incorrecto debe ser sólo números";
					this.msg.warning();
					return;
				}
			}
			parametros.phone=parametros.phone.trim();
		}
		if(!(this.email==null || this.email=="" || this.email==undefined || this.email.trim()=="")){
			if(!(validarEmail(this.email.trim()))){
				this.mensaje="El correo electrónico ingresado tiene formato incorrecto";
				this.msg.warning();
				return;
			}
			parametros.email=this.email.trim().toLowerCase();
		}
		parametros.active=this.active_status;
		let request=null;
		let mensajeAll=_("message_dflt_43");
		if(this.save){
			request = this.service.callServicesHttp("propietario-post", this.lineSelected.id, parametros);
		}else{
			mensajeAll=_("message_dflt_44");
			request = this.service.callServicesHttp("propietario-put", this.business_id+"?id="+this.id, parametros);
		}
		request.subscribe(data => {
			this.procesarRespuestaDone(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.PropietarioCreateComponent.prototype.procesarRespuestaDone=function(data){
		let mensajeAll=_("message_dflt_43");
		if(this.save){
			mensajeAll=_("message_dflt_43");
		}else{
			mensajeAll=_("message_dflt_44");
		}
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				if(this.save){
					this.mensaje=capitalizeOnly(_("success32"));
				}else{
					this.mensaje=capitalizeOnly(_("success33"));
				}
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.PropietarioCreateComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));