(function(app) {
	app.CarCreateComponent =
		ng.core.Component({
		selector: 'car-create',
		templateUrl: 'views/car-create-v1.html',
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
	app.CarCreateComponent.prototype.ngOnInit=function(){
		this.texto="Crear";
		this.claseResponsive="col-lg-4 col-md-4 col-sm-12 col-12";
		this.title=capitalizeOnly(_("title2"));
		this.listType=[{value:null,name:"Ninguno"},{value:"MINIBUS",name:"Bus"},{value:"HIPER",name:"Buscama"},{value:"MINI",name:"Automóvil"}];
		this.pagingActual={};
		this.detallePorPagina=10
		this.totalPage=1;
		this.pageSelected=1;
		this.pagingActualType={};
		this.detallePorPaginaType=10
		this.totalPageType=1;
		this.pageSelectedType=1;
		this.rif_buscar=null;
		this.nombre_buscar=null;
		this.listRegister=[];
		this.listRegisterType=[];
		this.linea=null;
		this.profileSelected=null;
		this.lineSelected=null;
		this.placa=null;
		this.carroceria=null;
		this.capacidad=null;
		this.marca=null;
		this.color=null;
		this.anno=null;
		this.type=null;
		this.nombre_buscar_type=null;
		this.typeSelected=null;
		try{
			var g=document.getElementsByClassName('modal-backdrop')[0];
			if(g!=null){
				var padre=g.parentNode;
				padre.removeChild(g);
			}
		}catch(er){
		}
		this.active_status=true;
		this.checkRol();
	}
	app.CarCreateComponent.prototype.keyPressNumber=function(event){
		return keypressNumbersInteger(event);
	}
	app.CarCreateComponent.prototype.checkRol=function(){
		var texto="CREATE-VEHICLE";
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'car-create') {
				this.title = _("title2");
				this.save = true;
				texto="CREATE-VEHICLE";
			} else {
				this.title = _("title4");;
				this.save = false;
				texto="UPDATE-VEHICLE";
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
	app.CarCreateComponent.prototype.getData=function(){
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'car-create') {
				this.title=capitalizeOnly(_("title2"));
				this.texto="Crear";
				this.save = true;
			} else {
				this.title=capitalizeOnly(_("title4"));
				this.texto="Actualizar";
				this.claseResponsive="col-lg-12 col-md-12 col-sm-12 col-12";
				this.save = false;
				if(this.active.hasOwnProperty('queryParams')){
					if(this.active.queryParams!=null){
						if(this.active.queryParams.hasOwnProperty('_value')){
							if(this.active.queryParams._value!=null){
								if(this.active.queryParams._value.hasOwnProperty('id')){
									this.id=this.active.queryParams._value.id;
									if(this.active.queryParams._value.hasOwnProperty('owner_id')){
										this.owner_id=this.active.queryParams._value.owner_id;
									
									}
									if(this.active.queryParams._value.hasOwnProperty('business_id')){
										this.business_id=this.active.queryParams._value.business_id;
									
									}
									if(this.active.queryParams._value.hasOwnProperty('vehicle_type_id')){
										this.vehicle_type_id=this.active.queryParams._value.vehicle_type_id;
									}
									this.getService();
								}
							}
						}
					}
				}
			}
		}
	}
	app.CarCreateComponent.prototype.search=function(){
		this.jsonFilter={};
		var datos=[];
		var entity={};
		entity.active=true;
		if(!(this.nombre_buscar==null || this.nombre_buscar==undefined || this.nombre_buscar=="" || this.nombre_buscar=="null")){
			if(entity==null){
				entity={};
			}
			entity.name="*"+this.nombre_buscar.trim()+"*";
		}
		if(!(this.rif_buscar==null || this.rif_buscar==undefined || this.rif_buscar=="" || this.rif_buscar=="null" )){
			if(entity==null){
				entity={};
			}
			entity.id_doc="*"+this.rif_buscar.trim()+"*";
		}
		if(entity!=null){
			datos={entity:entity,level: "AND"};
			let aux1=[datos];
			this.jsonFilter.entities=aux1;
		}
		
		this.jsonFilter.sort={"info.created_at":"desc"};
		this.callServices(1,"&offset=0&limit="+this.detallePorPagina);
	}
	app.CarCreateComponent.prototype.getCantidadSelected=function(data){
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
	app.CarCreateComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServices(data, this.pagingActual.first_page);
			}
		}
	}
	app.CarCreateComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServices(data, this.pagingActual.previous_page);
			}
		}
	}
	app.CarCreateComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServices(data, this.pagingActual.last_page);
			}
		}
	}
	app.CarCreateComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServices(data, this.pagingActual.next_page);
			}
		}
	}
	app.CarCreateComponent.prototype.getValueChangeRecords=function(data){
		this.pageSelected = data;
	}
	app.CarCreateComponent.prototype.searchVehicleType=function(){
		this.jsonFilterType={};
		var datos=[];
		var entity=null;
		if(!(this.nombre_buscar_type==null || this.nombre_buscar_type==undefined || this.nombre_buscar_type=="" || this.nombre_buscar_type=="null")){
			if(entity==null){
				entity={};
			}
			entity.name="*"+this.nombre_buscar_type+"*";
		}
		if(entity!=null){
			datos={entity:entity,level: "AND"};
			let aux1=[datos];
			this.jsonFilterType.entities=aux1;
		}
		
		this.jsonFilterType.sort={"info.created_at":"desc"};
		this.callServicesType(1, "&limit="+this.detallePorPaginaType);
	}
	app.CarCreateComponent.prototype.getCantidadSelectedType=function(data){
		if (!(data == null || data == undefined || data == "")) {
			this.detallePorPaginaType = data.detalles;
			this.totalPageType = data.pagina;
			if (this.listRegisterType == null || this.listRegisterType == undefined || this.listRegisterType.length == 0) {
				this.mensaje = capitalizeOnly(_("message_dflt_4"));
			} else {
				this.callServicesType(1, '&limit=' + this.detallePorPaginaType);
			}
		}
	}
	app.CarCreateComponent.prototype.getValueFirstType=function(data){
		this.listRegisterType = [];
		if (this.pagingActualType.hasOwnProperty('first_page')) {
			if (!(this.pagingActualType.first_page == null || this.pagingActualType.first_page == undefined || this.pagingActualType.first_page == "")) {
				this.callServicesType(data, this.pagingActualType.first_page);
			}
		}
	}
	app.CarCreateComponent.prototype.getValuePreviousType=function(data){
		this.listRegisterType = [];
		if (this.pagingActualType.hasOwnProperty('previous_page')) {
			if (!(this.pagingActualType.previous_page == null || this.pagingActualType.previous_page == undefined || this.pagingActualType.previous_page == "")) {
				this.callServicesType(data, this.pagingActualType.previous_page);
			}
		}
	}
	app.CarCreateComponent.prototype.getValueLastType=function(data){
		this.listRegisterType = [];
		if (this.pagingActualType.hasOwnProperty('last_page')) {
			if (!(this.pagingActualType.last_page == null || this.pagingActualType.last_page == undefined || this.pagingActualType.last_page == "")) {
				this.callServicesType(data, this.pagingActualType.last_page);
			}
		}
	}
	app.CarCreateComponent.prototype.getValueNextType=function(data){
		this.listRegisterType = [];
		if (this.pagingActualType.hasOwnProperty('next_page')) {
			if (!(this.pagingActualType.next_page == null || this.pagingActualType.next_page == undefined || this.pagingActualType.next_page == "")) {
				this.callServicesType(data, this.pagingActualType.next_page);
			}
		}
	}
	app.CarCreateComponent.prototype.getValueChangeRecordsType=function(data){
		this.pageSelectedType = data;
	}
	app.CarCreateComponent.prototype.callServicesType = function (data, parametros) {
		let mensajeAll=_("message_dflt_4");
		this.pageSelectedType = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let request = this.service.callServicesHttp("car-type-report", querys, this.jsonFilterType);
		request.subscribe(data => {
			this.procesarRespuestaType(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.CarCreateComponent.prototype.procesarRespuestaType=function(data){
		var key="results";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			this.listRegisterType=[];
			this.mensaje=mensajeAll;
			this.msg.error();
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("count")){
					if(data.count==null || data.count==undefined || data.count==0){
						this.listRegisterType=[];
					}else{
						this.pagingActualType = {};
						this.pagingActualType.count = data.count;
						let auxP = Math.floor(this.pagingActualType.count / this.detallePorPaginaType);
						let restoAux = ((this.pagingActualType.count) % this.detallePorPaginaType);
						if (restoAux == 0) {
							this.totalPageType = auxP;
						} else {
							this.totalPageType = auxP + 1;
						}
						if (data.hasOwnProperty('next_page')) {
							if (data.next_page == null || data.next_page == undefined || data.next_page == "") {
								this.pagingActualType.next_page = null;
							} else {
								this.pagingActualType.next_page = data.next_page;
							}
						} else {
							this.pagingActualType.next_page = null;
						}
						if (data.hasOwnProperty('previous_page')) {
							if (data.previous_page == null || data.previous_page == undefined || data.previous_page == "") {
								this.pagingActualType.previous_page = null;
							} else {
								this.pagingActualType.previous_page = data.previous_page;
							}
						} else {
							this.pagingActualType.previous_page = null;
						}
						if (data.hasOwnProperty('first_page')) {
							if (data.first_page == null || data.first_page == undefined || data.first_page == "") {
								this.pagingActualType.first_page = null;
							} else {
								this.pagingActualType.first_page = data.first_page;
							}
						} else {
							this.pagingActualType.first_page = null;
						}
						if (data.hasOwnProperty('last_page')) {
							if (data.last_page == null || data.last_page == undefined || data.last_page == "") {
								this.pagingActualType.last_page = null;
							} else {
								this.pagingActualType.last_page = data.last_page;
							}
						} else {
							this.pagingActualType.last_page = null;
						}
						if (data.hasOwnProperty(key)) {
							var objeto = {};
							this.listRegisterType = [];
							for (var i = 0; i < data[key].length; i++) {
								objeto = this.formattedDataType(data[key][i]);
								if (objeto != null) {
									this.listRegisterType.push(objeto);
								}
							}
							this.pagingActual.count = data.count;
						}else{
							this.listRegisterType=[];
						}
					}
				}else{
					this.listRegisterType=[];
				}
			}else{
				this.mensaje=this.service.processMessageError(data,mensajeAll);
				this.msg.error();
			}
		}
	}
	app.CarCreateComponent.prototype.formattedDataType=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.CarCreateComponent.prototype.getService=function(){
		let request=this.service.callServicesHttp('car-get',this.business_id+"?id="+this.id+"&owner_id="+this.owner_id+"&vehicle_type_id="+this.vehicle_type_id,null);
		let mensajeAll=_("message_dflt_36");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.CarCreateComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_36");
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
	app.CarCreateComponent.prototype.formattedDataGET=function(data){
		if(data.hasOwnProperty("license_plate")){
			if(!(data.license_plate==null || data.license_plate==undefined || data.license_plate=="")){
				this.placa=data.license_plate;
			}
		}
		if(data.hasOwnProperty("bodywork")){
			if(!(data.bodywork==null || data.bodywork==undefined || data.bodywork=="")){
				this.carroceria=data.bodywork;
			}
		}
		if(data.hasOwnProperty("brand")){
			if(!(data.brand==null || data.brand==undefined || data.brand=="")){
				this.marca=data.brand;
			}
		}
		if(data.hasOwnProperty("year")){
			if(!(data.year==null || data.year==undefined || data.year=="")){
				this.anno=data.year;
			}
		}
		if(data.hasOwnProperty("color")){
			if(!(data.color==null || data.color==undefined || data.color=="")){
				this.color=data.color;
			}
		}
		if(data.hasOwnProperty("vehicle_type_name")){
			if(!(data.vehicle_type_name==null || data.vehicle_type_name==undefined || data.vehicle_type_name=="")){
				this.typeSelected={};
				this.typeSelected.name=data.vehicle_type_name;
				if(data.hasOwnProperty("capacity")){
					this.typeSelected.capacity=data.capacity;
				}
			}
		}
		if(data.hasOwnProperty("owner_name")){
			if(!(data.owner_name==null || data.owner_name==undefined || data.owner_name=="")){
				this.profileSelected={};
				this.profileSelected.name=data.owner_name;
				if(data.hasOwnProperty("owner_id_doc")){
					if(!(data.owner_id_doc==null || data.owner_id_doc==undefined || data.owner_id_doc=="")){
						this.profileSelected.id_doc=data.owner_id_doc;
					}
				}
				if(data.hasOwnProperty("owner_email")){
					if(!(data.owner_email==null || data.owner_email==undefined || data.owner_email=="")){
						this.profileSelected.email=data.owner_email;
					}
				}
				if(data.hasOwnProperty("owner_phone")){
					if(!(data.owner_phone==null || data.owner_phone==undefined || data.owner_phone=="")){
						this.profileSelected.phone=data.owner_phone;
					}
				}
				if(data.hasOwnProperty("line_name")){
					if(!(data.line_name==null || data.line_name==undefined || data.line_name=="")){
						this.profileSelected.line_name=data.line_name;
					}
				}
			}
		}
		if(data.hasOwnProperty("info")){
			if(!(data.info==null || data.info==undefined || data.info=="")){
				if(data.info.hasOwnProperty("created_by_email")){
					if(!(data.info.created_by_email==null || data.info.created_by_email==undefined || data.info.created_by_email=="")){
						this.creado_por=data.info.created_by_email;
					}
				}
				if(data.info.hasOwnProperty("created_at")){
					if(!(data.info.created_at==null || data.info.created_at==undefined || data.info.created_at=="")){
						this.creado_el=formattingDate(data.info.created_at);
					}
				}
				if(data.info.hasOwnProperty("updated_by_email")){
					if(!(data.info.updated_by_email==null || data.info.updated_by_email==undefined || data.info.updated_by_email=="")){
						this.actualizado_por=data.info.updated_by_email;
					}
				}
				if(data.info.hasOwnProperty("updated_at")){
					if(!(data.info.updated_at==null || data.info.updated_at==undefined || data.info.updated_at=="")){
						this.actualizado_el=formattingDate(data.info.updated_at);
					}
				}
			}
		}
	}
	app.CarCreateComponent.prototype.callServices = function (data, parametros) {
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="?type=PAGINATE"+parametros;
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		let request = this.service.callServicesHttp("propietario-report", querys, this.jsonFilter);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.CarCreateComponent.prototype.procesarRespuesta=function(data){
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
	app.CarCreateComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.CarCreateComponent.prototype.selectedPropietario=function(data){
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
	app.CarCreateComponent.prototype.selectedType=function(data){
		this.typeSelected=null;
		if(!(data==null || data==undefined || data=="")){
			if(this.listRegisterType!=null && this.listRegisterType.length!=0){
				for(var i=0; i<this.listRegisterType.length;i++){
					if(this.listRegisterType[i]!=null){
						if(this.listRegisterType[i].id==data.id){
							if(this.listRegisterType[i].listRegisterType==null){
								this.typeSelected=this.listRegisterType[i];
								this.listRegisterType[i].classSelected="selected";
							}else{
								this.listRegisterType[i].classSelected=null;
							}
						}else{
							this.listRegisterType[i].classSelected=null;
						}
					}
				}
			}
		}
	}
	app.CarCreateComponent.prototype.quitarPropietario=function(){
		this.profileSelected=null;
		if(this.listRegister!=null && this.listRegister.length!=0){
			for(var i=0; i<this.listRegister.length;i++){
				if(this.listRegister[i]!=null){
					this.listRegister[i].classSelected=null;
				}
			}
		}
	}
	app.CarCreateComponent.prototype.quitarType=function(){
		this.typeSelected=null;
		if(this.listRegisterType!=null && this.listRegisterType.length!=0){
			for(var i=0; i<this.listRegisterType.length;i++){
				if(this.listRegisterType[i]!=null){
					this.listRegisterType[i].classSelected=null;
				}
			}
		}
	}
	app.CarCreateComponent.prototype.getValueMsg=function(){
		this.router.navigate(['/car-report']);
	}
	app.CarCreateComponent.prototype.clean=function(){
		if(this.save){
			this.typeSelected=null;
			this.profileSelected=null;
			
		}
		
		this.pagingActual={};
		this.detallePorPagina=10
		this.totalPage=1;
		this.pageSelected=1;
		this.rif_buscar=null;
		this.nombre_buscar=null;
		this.listRegister=[];
		this.linea=null;
		this.placa=null;
		this.carroceria=null;
		this.capacidad=null;
		this.marca=null;
		this.color=null;
		this.anno=null;
		this.type=null;
		this.nombre_buscar_type=null;
		this.pagingActualType={};
		this.detallePorPaginaType=10
		this.totalPageType=1;
		this.pageSelectedType=1;
		this.listRegisterType=[];
	}
	app.CarCreateComponent.prototype.done=function(){
		var parametros={};
		if(this.profileSelected==null){
			this.mensaje="Debe seleccionar el propietario del vehículo";
			this.msg.warning();
			return;
		}
		if(this.typeSelected==null){
			this.mensaje="Debe seleccionar el tipo de vehículo";
			this.msg.warning();
			return;
		}
		if(this.placa==null || this.placa==undefined || this.placa==""){
			this.mensaje=capitalizeOnly(_("warning8"));
			this.msg.warning();
			return;
		}else{
			parametros.license_plate=this.placa.trim().toUpperCase();
		}
		if(this.carroceria==null || this.carroceria==undefined || this.carroceria==""){
			this.mensaje=capitalizeOnly(_("warning33"));
			this.msg.warning();
			return;
		}else{
			parametros.bodywork=this.carroceria.trim().toUpperCase();
		}
		if(this.marca==null || this.marca==undefined || this.marca==""){
			this.mensaje=capitalizeOnly(_("warning6"));
			this.msg.warning();
			return;
		}else{
			parametros.brand=this.marca.trim().toUpperCase();
		}
		if(this.color==null || this.color==undefined || this.color==""){
			this.mensaje=capitalizeOnly(_("warning34"));
			this.msg.warning();
			return;
		}else{
			parametros.color=this.color.trim().toUpperCase();
		}
		if(this.anno==null || this.anno==undefined || this.anno==""){
			this.mensaje=capitalizeOnly(_("warning7"));
			this.msg.warning();
			return;
		}else{
			if(!utils_keyNumber((this.anno+"").trim())){
				this.mensaje=_("warning53");
				this.msg.warning();
				return;
			}
			parametros.year=parseInt(this.anno);
		}
		parametros.active=this.active_status;
		let request=null;
		let mensajeAll=_("message_dflt_37");
		if(this.save){
			request = this.service.callServicesHttp("car-post", this.profileSelected.business_id+"?owner_id="+this.profileSelected.id+"&vehicle_type_id="+this.typeSelected.id, parametros);
		}else{
			mensajeAll=_("message_dflt_38");
			request = this.service.callServicesHttp("car-put", this.business_id+"?id="+this.id+"&owner_id="+this.owner_id+"&vehicle_type_id="+this.vehicle_type_id, parametros);
		}
		request.subscribe(data => {
			this.procesarRespuestaDone(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.CarCreateComponent.prototype.procesarRespuestaDone=function(data){
		let mensajeAll=_("message_dflt_37");
		if(this.save){
			mensajeAll=_("message_dflt_37");
		}else{
			mensajeAll=_("message_dflt_38");
		}
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				if(this.save){
					this.mensaje=capitalizeOnly(_("success27"));
				}else{
					this.mensaje=capitalizeOnly(_("success28"));
				}
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.CarCreateComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));