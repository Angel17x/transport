(function(app) {
	app.LineCreateComponent =
		ng.core.Component({
		selector: 'line-create',
		templateUrl: 'views/line-create-v1.html',
		})
		.Class({
		  constructor: [app.MsgComponent,ng.router.Router,ng.router.ActivatedRoute,app.AppCallService,
		  function(msg,router,active,ser) {
	          this.msg=msg;
	          this.mensaje="";
	          this.router=router;  
	          this.active=active;
			  this.service=ser;
		  }]
		});
	app.LineCreateComponent.prototype.ngOnInit=function(){
		
		this.classCreate="col-lg-8 col-md-8 col-sm-6 col-12";
		this.listDocs=["V","E","J","G"];
		this.listBankAccounts=[];
		this.listPagoMovil=[];
		this.listBancos=returnBancos();
		this.title=capitalizeOnly(_("title9"));
		this.profileSelected=null;
		this.texto="Crear";
		this.expedicion=null;
		this.vencimiento=null;
		this.nombre=null;
		this.modalidad=null;
		this.codigo=null;
		this.active_status=true;
		this.save=true;
		this.rif_buscar=null;
		this.nombre_buscar=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=10;
		this.pageSelected=1;
		this.listRegister=[];
		this.checkRol();
	}
	app.LineCreateComponent.prototype.keyPressOnlyNumbers=function(event){
		return keypressNumbersInteger(event);
	}
	app.LineCreateComponent.prototype.checkRol=function(){
		var texto="CREATE-LINE";
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'line-create') {
				this.title = _("title9");
				this.save = true;
				texto="CREATE-LINE";
			} else {
				this.title = _("title10");;
				this.save = false;
				this.classCreate="col-lg-12 col-md-12 col-sm-12 col-12"
				texto="UPDATE-LINE";
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
	app.LineCreateComponent.prototype.getData=function(){
		if (this.active.url._value[0].path == 'line-create') {
			this.title=_('title9')
			this.save = true;
			this.texto="Guardar";
		} else {
			if (this.active.url.hasOwnProperty('_value')) {
				this.title = _('title10')
				this.save = false;
				this.texto="Actualizar";
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
		}
	}
	app.LineCreateComponent.prototype.getService=function(){
		let request=this.service.callServicesHttp('line-get',"&id="+this.id,null);
		let mensajeAll=_("message_dflt_3");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.LineCreateComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_3");
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
	app.LineCreateComponent.prototype.formattedDataGET=function(data){
		if(data.hasOwnProperty("name")){
			if(!(data.name==null || data.name==undefined || data.name=="")){
				this.nombre=data.name;
			}
		}
		if(data.hasOwnProperty("bank_accounts")){
			if(!(data.bank_accounts==null || data.bank_accounts.length==0)){
				var objeto={};
				this.listBankAccounts=[];
				for(var i=0;i<data.bank_accounts.length;i++){
					if(data.bank_accounts[i]!=null){
						objeto={};
						if(data.bank_accounts[i].hasOwnProperty("bank")){
							objeto.banco=data.bank_accounts[i].bank;
						}
						if(data.bank_accounts[i].hasOwnProperty("number")){
							objeto.cuenta=data.bank_accounts[i].number;
						}
						if(data.bank_accounts[i].hasOwnProperty("id_doc")){
							try{
								objeto.id_doc_type=data.bank_accounts[i].id_doc.charAt(0);
								objeto.documento=data.bank_accounts[i].id_doc.substring(1,data.bank_accounts[i].id_doc.length);
							}catch(er){
							}
						}
						this.listBankAccounts.push(objeto);
					}
				}
			}
		}
		if(data.hasOwnProperty("mobile_payment")){
			if(!(data.mobile_payment==null || data.mobile_payment.length==0)){
				var objeto={};
				this.listPagoMovil=[];
				for(var i=0;i<data.mobile_payment.length;i++){
					if(data.mobile_payment[i]!=null){
						objeto={};
						if(data.mobile_payment[i].hasOwnProperty("bank")){
							objeto.banco=data.mobile_payment[i].bank;
						}
						if(data.mobile_payment[i].hasOwnProperty("phone")){
							objeto.telefono=data.mobile_payment[i].phone;
						}
						if(data.mobile_payment[i].hasOwnProperty("id_doc")){
							try{
								objeto.id_doc_type=data.mobile_payment[i].id_doc.charAt(0);
								objeto.documento=data.mobile_payment[i].id_doc.substring(1,data.mobile_payment[i].id_doc.length);
							}catch(er){
							}
						}
						this.listPagoMovil.push(objeto);
					}
				}
			}
		}
		if(data.hasOwnProperty("start_date")){
			if(!(data.start_date==null || data.start_date==undefined || data.start_date=="")){
				this.expedicion=formattingDate2(data.start_date);
			}
		}
		if(data.hasOwnProperty("expiration_date")){
			if(!(data.expiration_date==null || data.expiration_date==undefined || data.expiration_date=="")){
				this.vencimiento=formattingDate2(data.expiration_date);
			}
		}
		if(data.hasOwnProperty("code")){
			if(!(data.code==null || data.code==undefined || data.code=="")){
				this.codigo=data.code;
			}
		}
		if(data.hasOwnProperty("mode")){
			if(!(data.mode==null || data.mode==undefined || data.mode=="")){
				this.modalidad=data.mode;
			}
		}
		if(data.hasOwnProperty("active")){
			this.active_status=data.active;
		}
		if(data.hasOwnProperty("address")){
			if(!(data.address==null || data.address==undefined || data.address=="")){
				this.direccion=data.address;
			}
		}
	}
	app.LineCreateComponent.prototype.getValueMsg=function(){
		var link = ['/line-report'];
		this.router.navigate(link);
	}
	app.LineCreateComponent.prototype.clean=function(){
		this.expedicion=null;
		this.vencimiento=null;
		this.nombre=null;
		this.modalidad=null;
		this.codigo=null;
		this.direccion=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=10;
		this.pageSelected=1;
		this.profileSelected=null;
		this.listRegister=[];
		this.listBankAccounts=[];
		this.listPagoMovil=[];
		this.profileSelected=null;
	}
	app.LineCreateComponent.prototype.search=function(){
		this.jsonFilter={};
		var datos=[];
		var range=[];
		var entity=null;
		if(!(this.nombre_buscar==null || this.nombre_buscar==undefined || this.nombre_buscar=="")){
			entity={};
			entity={business_name:"*"+this.nombre_buscar.trim()+"*"};
		}
		if(!(this.rif_buscar==null || this.rif_buscar==undefined || this.rif_buscar=="")){
			if(entity==null){
				entity={};
			}
			entity.id_doc="*"+this.rif_buscar+"*";
		}
		if(entity!=null){
			datos={entity:entity,level: "AND"};
			let aux1=[datos];
			this.jsonFilter={entities:aux1};
		}
		this.jsonFilter.sort={"created_at":"DESC"};
		this.callServices(1,'&limit='+this.detallePorPagina);
	}
	app.LineCreateComponent.prototype.getCantidadSelected=function(data){
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
	app.LineCreateComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.LineCreateComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.LineCreateComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.LineCreateComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.LineCreateComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.LineCreateComponent.prototype.callServices = function (data, parametros) {
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		let request = this.service.callServicesHttp("profile-report", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.LineCreateComponent.prototype.procesarRespuesta=function(data){
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
	app.LineCreateComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.LineCreateComponent.prototype.addBankAccount=function(){
		var objeto = { value: ""};
		this.listBankAccounts.push(objeto);
	}
	app.LineCreateComponent.prototype.deleteCuentaBancaria = function (index) {
		var provi = this.listBankAccounts.slice(index + 1);
		this.listBankAccounts = this.listBankAccounts.slice(0, index);
		this.listBankAccounts = this.listBankAccounts.concat(provi);
	}
	app.LineCreateComponent.prototype.addPagoMovil=function(){
		var objeto = { value: ""};
		this.listPagoMovil.push(objeto);
	}
	app.LineCreateComponent.prototype.deletePagoMovil = function (index) {
		var provi = this.listPagoMovil.slice(index + 1);
		this.listPagoMovil = this.listPagoMovil.slice(0, index);
		this.listPagoMovil = this.listPagoMovil.concat(provi);
	}
	app.LineCreateComponent.prototype.selectedPropietario=function(data){
		this.profileSelected=null;
		if(!(data==null || data==undefined || data=="")){
			if(this.listRegister!=null && this.listRegister.length!=0){
				for(var i=0; i<this.listRegister.length;i++){
					if(this.listRegister[i]!=null){
						if(this.listRegister[i].id==data.id){
							if(this.listRegister[i].classSelected==null){
								this.profileSelected=this.listRegister[i];
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
	app.LineCreateComponent.prototype.done=function(){
		var parametros={};
		if(this.save){
			if(this.profileSelected==null || this.profileSelected==undefined || this.profileSelected==""){
				this.mensaje="Debe seleccionar el representante de la línea";
				this.msg.warning();
				return;
			}
		}
		if(this.expedicion==null || this.expedicion==undefined || this.expedicion==""){
			this.mensaje="La fecha de expedición no puede estar vacía";
			this.msg.warning();
			return;
		}else{
			parametros.start_date=this.expedicion+"T00:01:01.000Z";
		}
		if(this.vencimiento==null || this.vencimiento==undefined || this.vencimiento==""){
			this.mensaje="La fecha de vencimiento no puede estar vacía";
			this.msg.warning();
			return;
		}else{
			parametros.expiration_date=this.vencimiento+"T23:59:59.000Z";
		}
		if(this.codigo==null || this.codigo==undefined || this.codigo==""){
			this.mensaje="Debe ingresar el código de la línea";
			this.msg.warning();
			return;
		}else{
			parametros.code=this.codigo.toUpperCase().trim();
		}
		if(this.nombre==null || this.nombre==undefined || this.nombre==""){
			this.mensaje="Debe ingresar el nombre de la línea";
			this.msg.warning();
			return;
		}else{
			parametros.name=this.nombre.toUpperCase().trim();
		}
		if(this.modalidad==null || this.modalidad==undefined || this.modalidad==""){
			this.mensaje="Debe ingresar el modalidad del transporte"
			this.msg.warning();
			return;
		}else{
			parametros.mode=this.modalidad.toUpperCase().trim();
		}
		if(this.direccion==null || this.direccion==undefined || this.direccion==""){
			this.mensaje="Debe ingresar la dirección de la sede de la linea de transporte";
			this.msg.warning();
			return;
		}else{
			parametros.address=this.direccion.toUpperCase().trim();
		}
		if(!(this.listBankAccounts==null || this.listBankAccounts.length==0)){
			parametros.bank_accounts=[];
			var objeto={};
			for(var i=0;i<this.listBankAccounts.length;i++){
				if(this.listBankAccounts[i]!=null){
					objeto={};
					if(this.listBankAccounts[i].hasOwnProperty("banco")){
						if(this.listBankAccounts[i].banco==null || this.listBankAccounts[i].banco==undefined || this.listBankAccounts[i].banco==""){
							this.mensaje="Debe seleccionar el banco de la línea "+(i+1);
							this.msg.warning();
							return;
						}else{
							objeto.bank=this.listBankAccounts[i].banco;
						}
						if(this.listBankAccounts[i].cuenta==null || this.listBankAccounts[i].cuenta==undefined || this.listBankAccounts[i].cuenta==""){
							this.mensaje="Debe ingresar el número de cuenta de la línea "+(i+1);
							this.msg.warning();
							return;
						}else{
							if(!utils_keyNumber(this.listBankAccounts[i].cuenta.trim())){
								this.mensaje="El formato del número de cuenta ingresado en la línea "+(i+1)+" es incorrecto, deben ser sólo números";
								this.msg.warning();
								return;
							}
							objeto.number=this.listBankAccounts[i].cuenta;
						}
						if(this.listBankAccounts[i].id_doc_type==null || this.listBankAccounts[i].id_doc_type==undefined || this.listBankAccounts[i].id_doc_type==""){
							this.mensaje="Debe ingresar el tipo de documento de la línea "+(i+1);
							this.msg.warning();
							return;
						}else{
							objeto.id_doc=this.listBankAccounts[i].id_doc_type;
						}
						if(this.listBankAccounts[i].documento==null || this.listBankAccounts[i].documento==undefined || this.listBankAccounts[i].documento==""){
							this.mensaje="Debe ingresar el número de documento de la línea "+(i+1);
							this.msg.warning();
							return;
						}else{
							var length=0;
							if(!utils_keyNumber(this.listBankAccounts[i].documento.trim())){
								this.mensaje="El formato del número de documento ingresado en la línea "+(i+1)+" es incorrecto, deben ser sólo números";
								this.msg.warning();
								return;
							}
							if(this.listBankAccounts[i].documento.length<9){
								length=9-this.listBankAccounts[i].documento.length;
								var aux1="";
								for(var j=0;j<length;j++){
									aux1=aux1+"0";
								}
								this.listBankAccounts[i].documento=aux1+this.listBankAccounts[i].documento;
							}
							objeto.id_doc=objeto.id_doc+this.listBankAccounts[i].documento;
						}
						objeto.active=true;
						parametros.bank_accounts.push(objeto);
					}
				}
			}
		}
		if(!(this.listPagoMovil==null || this.listPagoMovil.length==0)){
			parametros.mobile_payment=[];
			var objeto={};
			for(var i=0;i<this.listPagoMovil.length;i++){
				if(this.listPagoMovil[i]!=null){
					objeto={};
					if(this.listPagoMovil[i].hasOwnProperty("banco")){
						if(this.listPagoMovil[i].banco==null || this.listPagoMovil[i].banco==undefined || this.listPagoMovil[i].banco==""){
							this.mensaje="Debe seleccionar el banco de la línea "+(i+1);
							this.msg.warning();
							return;
						}else{
							objeto.bank=this.listPagoMovil[i].banco;
						}
						if(this.listPagoMovil[i].telefono==null || this.listPagoMovil[i].telefono==undefined || this.listPagoMovil[i].telefono==""){
							this.mensaje="Debe ingresar el teléfono de la línea "+(i+1);
							this.msg.warning();
							return;
						}else{
							var phone=this.listPagoMovil[i].telefono.substring(0,3);
							if(!(phone=="414" || phone=="416" || phone=="424" || phone=="426" || phone=="412")){
								this.mensaje="El formato del teléfono ingresado es incorrecto debe comenzar por 414 | 416 | 426 | 424 |412";
								this.msg.warning();
								return;
							}
							if(!utils_keyNumber(this.listPagoMovil[i].telefono.trim())){
								this.mensaje="El formato del teléfono ingresado en la línea "+(i+1)+" es incorrecto, deben ser sólo números";
								this.msg.warning();
								return;
							}
							objeto.phone=this.listPagoMovil[i].telefono;
						}
						if(this.listPagoMovil[i].id_doc_type==null || this.listPagoMovil[i].id_doc_type==undefined || this.listPagoMovil[i].id_doc_type==""){
							this.mensaje="Debe ingresar el tipo de documento de la línea "+(i+1);
							this.msg.warning();
							return;
						}else{
							objeto.id_doc=this.listPagoMovil[i].id_doc_type;
						}
						if(this.listPagoMovil[i].documento==null || this.listPagoMovil[i].documento==undefined || this.listPagoMovil[i].documento==""){
							this.mensaje="Debe ingresar el número de documento de la línea "+(i+1);
							this.msg.warning();
							return;
						}else{
							var length=0;
							if(!utils_keyNumber(this.listPagoMovil[i].documento.trim())){
								this.mensaje="El formato del número de documento ingresado en la línea "+(i+1)+" es incorrecto, deben ser sólo números";
								this.msg.warning();
								return;
							}
							if(this.listPagoMovil[i].documento.length<9){
								length=9-this.listPagoMovil[i].documento.length;
								var aux1="";
								for(var j=0;j<length;j++){
									aux1=aux1+"0";
								}
								this.listPagoMovil[i].documento=aux1+this.listPagoMovil[i].documento;
							}
							objeto.id_doc=objeto.id_doc+this.listPagoMovil[i].documento;
						}
						objeto.active=true;
						parametros.mobile_payment.push(objeto);
					}
				}
			}
		}
		parametros.active=this.active_status;
		let request=null;
		if(this.save){
			request = this.service.callServicesHttp("line-post","&id="+this.profileSelected.id , parametros);
		}else{
			request = this.service.callServicesHttp("line-put", "&id="+this.id, parametros);
		}
		let mensajeAll=_("message_dflt_1");
		if(this.save){
			mensajeAll=_("message_dflt_1");
		}else{
			mensajeAll=_("message_dflt_2");
		}
		request.subscribe(data => {
			this.procesarRespuestaDone(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.LineCreateComponent.prototype.procesarRespuestaDone=function(data){
		let mensajeAll=_("message_dflt_1");
		if(this.save){
			mensajeAll=_("message_dflt_1");
		}else{
			mensajeAll=_("message_dflt_2");
		}
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				if(this.save){
					this.mensaje=capitalizeOnly(_("success16"));
				}else{
					this.mensaje=capitalizeOnly(_("success17"));
				}
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.LineCreateComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));