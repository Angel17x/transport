	(function(app) {
	app.TerminalCreateComponent =
		ng.core.Component({
		selector: 'terminal-create',
		templateUrl: 'views/terminal-create.html',
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
	app.TerminalCreateComponent.prototype.ngOnInit=function(){
		this.texto=null
		this.setTexto=null
		this.name=null
		this.id_doc=null
		this.phone=null
		this.country=null
		this.state=null
		this.city=null
		this.address=null
		this.stop=null
		this.profileSelected=null
		this.profile=null
		this.rif=null
		this.ci=null
		this.listDocs=['V','J','E']
		this.listCountry=['VE']
		this.type_doc=null
		this.detallePorPagina=5
		this.pagingActual={};
		this.listRegister=[];
		this.jsonFilter={}
		this.converter=null
		this.idTerminal=null
		this.created_by=null
		this.checkRol();
	}
	
	app.TerminalCreateComponent.prototype.checkRol=function(){
		this.texto="TERMINAL-CREATE";

		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'terminal-create') {
				this.title = _("title79");
				this.save = true;
				this.texto="TERMINAL-CREATE";
				this.setTexto='Crear'
			} else {
				this.title = _("title80");;
				this.save = false;
				this.texto="TERMINAL-UPDATE";
				this.setTexto="Actualizar"
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
							if(tabla[i].name==this.texto){
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
	app.TerminalCreateComponent.prototype.getData=function(){
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null){
						if(this.active.queryParams._value.hasOwnProperty('id')){
							this.id_doc=this.active.queryParams._value.id;
							this.getService();
						}
					}
				}
			}
		}
	}
	
	app.TerminalCreateComponent.prototype.getService=function(){
		var querys=null;
		querys="&id="+this.id_doc
		let request=this.service.callServicesHttp('terminal-get',querys,null);
		let mensajeAll=_("message_dflt_89");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.TerminalCreateComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_89");
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
	

	app.TerminalCreateComponent.prototype.formattedDataGET=function(data){
		this.id_doc=null
		this.name=null
		this.phone=null
		this.country=null
		this.state=null
		this.country=null
		this.address=null
		this.stop=null
		this.idTerminal=null
		this.listDocs=null
		this.created_by=null
		if(data.hasOwnProperty("id")){
			if(!(data.id==null || data.id==undefined || data.id=="")){
				this.idTerminal=data.id
			}
		}
		if(data.hasOwnProperty("id_doc")){
			if(!(data.id_doc==null || data.id_doc==undefined || data.id_doc=="")){
				this.converter = data.id_doc.match(/[a-z]+|[^a-z]+/gi);
				this.id_doc=Number(this.converter[1])
				this.listDocs=['V','J','E']
			}
		}
		if(data.hasOwnProperty("name")){
			this.name=data.name
			if(!(data.name==null || data.name==undefined || data.name=="")){
				this.name=data.name
			}
		}
		if(data.hasOwnProperty("phone")){
			if(!(data.phone==null || data.phone==undefined || data.phone=="")){
				this.phone=data.phone
			}
		}
		if(data.hasOwnProperty("country")){
			if(!(data.country==null || data.country==undefined || data.country=="")){
				this.country=data.country
			}
		}
		if(data.hasOwnProperty("state")){
			if(!(data.state==null || data.state==undefined || data.state=="")){
				this.state=data.state
			}
		}
		if(data.hasOwnProperty("address")){
			if(!(data.address==null || data.address==undefined || data.address=="")){
				this.address=data.address
			}
		}
		if(data.hasOwnProperty("stop")){
			if(!(data.stop==null || data.stop==undefined || data.stop=="")){
				this.stop=data.stop
			}
		}
		if(data.hasOwnProperty("city")){
			this.city=data.city
			if(!(data.city==null || data.city==undefined || data.city=="")){
				this.city=data.city
			}
		}
		if(data.hasOwnProperty("info")){
			if(data.info.hasOwnProperty("created_by")){
				if(!(data.info.created_by==null || data.info.created_by==undefined || data.info.created_by==='')){
					this.created_by=data.info.created_by
					if(this.texto === 'TERMINAL-UPDATE'){
						this.searchProfile()
					}
				}
			}
		}
	}
	app.TerminalCreateComponent.prototype.getValueMsg=function(){
		var link = ['/terminal-report'];
		this.router.navigate(link);
	}
	app.TerminalCreateComponent.prototype.clean=function(){
		this.name=null
		this.id_doc=null
		this.phone=null
		this.country=null
		this.state=null
		this.city=null
		this.address=null
		this.stop=null
		this.profileSelected=null
		this.profile=null
		this.rif=null
		this.ci=null
		this.listDocs=['V','J','E']
		this.listCountry=['VE']
		this.type_doc=null
		this.detallePorPagina=5
		this.pagingActual={};
		this.listRegister=[];
		this.jsonFilter={}
	}
	app.TerminalCreateComponent.prototype.ngOnDestroy=function(){
		this.name=null
		this.id_doc=null
		this.phone=null
		this.country=null
		this.state=null
		this.city=null
		this.address=null
		this.stop=null
		this.profileSelected=null
		this.profile=null
		this.rif=null
		this.ci=null
		this.listDocs=['V','J','E']
		this.listCountry=['VE']
		this.type_doc=null
		this.detallePorPagina=5
		this.pagingActual={};
		this.listRegister=[];
		this.jsonFilter={}
	}
	app.TerminalCreateComponent.prototype.selectedType=function(type){
		
		this.type_doc=null
		if(!(type==undefined || type==null || type=='' || type==='t/doc')){
			this.type_doc=type
		}
	}
	app.TerminalCreateComponent.prototype.selectedCountry=function(country){
		this.country=null
		if(!(country==undefined || country==null || country=='' || country==='seleccione un pais *')){
			this.country=country
		}
	}

	app.TerminalCreateComponent.prototype.validatingBody=function(){
		
		const parametros = {}
		let doc = null
		let querys = ''

		if(this.texto === 'TERMINAL-CREATE'){
			if(!this.profileSelected || this.profileSelected==null || this.profileSelected===''){
				this.mensaje='Selecciona un perfil!'
				this.msg.error()
				return
			}
		}
		if(this.texto === 'TERMINAL-UPDATE'){
			if(!this.idTerminal || this.idTerminal==null || this.idTerminal===''){
				this.mensaje='El id de la terminal no existe para actualizar!'
				this.msg.error()
				return
			}
			

			if(this.listRegister[0].hasOwnProperty("id")){
				this.profileSelected = this.listRegister[0]			
			}
		}

			if(!this.type_doc || this.type_doc==null || this.type_doc===''){
				this.mensaje='Porfavor ingresa el tipo de documento!'
				this.msg.error()
				return
			}
			if(!this.id_doc || this.id_doc==null || this.id_doc===''){
				this.mensaje='Porfavor ingresa el numero de Pasaporte/Rif'
				this.msg.error()
				return
			}else{
				let exp = /^(V|E|J|v|e|j)[0-9]{9}$/g
				doc=this.type_doc+this.id_doc
				if(!exp.test(doc)){
						this.mensaje='Porfavor ingresa el numero de Pasaporte/Rif valido'
						this.msg.error()
						return
				}
			}
		
		
		if(!this.name || this.name==null || this.name === ''){
			this.mensaje='Porfavor ingresa el nombre'
			this.msg.error()
			return
		}
		if(!this.phone || this.phone==null || this.phone === ''){
			this.mensaje='Porfavor ingresa el numero de telefono'
			this.msg.error()
			return
		}else{
			const exp = /^(414|424|416|426|412|212)[0-9]{7}$/g
			if(!exp.test(this.phone)){
				this.mensaje='El numero de telefono no debe contener letras, parentesis y/o empezar por "0", sufijos 414|424|416|426|412|212'
				this.msg.error()
				return
			}
		}
		if(!this.country || this.country==null || this.country === ''){
			this.mensaje='Porfavor ingresa el pais'
			this.msg.error()
			return
		}
		if(!this.state || this.state==null || this.state === ''){
			this.mensaje='Porfavor ingresa el estado'
			this.msg.error()
			return
		}
		if(!this.city || this.city==null || this.city === ''){
			this.mensaje='Porfavor ingresa la ciudad'
			this.msg.error()
			return
		}
		if(!this.address || this.address==null || this.address === ''){
			this.mensaje='Porfavor ingresa la direccion'
			this.msg.error()
			return
		}
		if(!this.stop || this.stop==null || this.stop === ''){
			this.mensaje='Porfavor ingresa el codigo de la parada'
			this.msg.error()
			return
		}else{
			if(this.stop.length < 2 || this.stop.length > 5){
				this.mensaje='Porfavor ingresa el codigo de la parada'
				this.msg.error()
				return
			}
		}
		
		parametros.name=(this.name.trim().toUpperCase())
		parametros.id_doc=(doc.trim().toUpperCase())
		parametros.phone=(this.phone.trim())
		parametros.country=(this.country.trim().toUpperCase())
		parametros.state=(this.state.trim().toUpperCase())
		parametros.city=(this.city.trim().toUpperCase())
		parametros.address=(this.address.trim().toUpperCase())
		parametros.stop=(this.stop.trim().toUpperCase())
		parametros.active=true

		
		if(this.texto === 'TERMINAL-UPDATE'){
			querys = '&id='+this.idTerminal+'&profile_id='+this.profileSelected.id+'&country='+parametros.country 
		}
		if(this.texto === 'TERMINAL-CREATE'){
			querys = '&profile_id='+this.profileSelected.id+'&country='+parametros.country 
		}
		this.done(parametros, querys)

	}


	app.TerminalCreateComponent.prototype.done=function(parametros, querys){
		let mensajeAll=_("message_dflt_90");
		var request=null;
		if(this.save){
			request = this.service.callServicesHttp("terminal-create", querys, parametros);
		}else{
			mensajeAll=_("message_dflt_91");
			request = this.service.callServicesHttp("terminal-update", querys, parametros);
		}
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}


	app.TerminalCreateComponent.prototype.procesarRespuesta=function(data){
		let mensajeAll=_("message_dflt_90");
		if(!this.save){
			mensajeAll=_("message_dflt_91");
		}
		if(data==null || data==undefined || data==""){
			this.mensaje=mensajeAll;
			this.msg.error();
		}else{
			if (data.status_http == 200) {
				if(this.save){
					this.mensaje=capitalizeOnly(_("success64"));
				}else{
					this.mensaje=capitalizeOnly(_("success65"));
				}
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}


	app.TerminalCreateComponent.prototype.searchProfile=function(){
		this.jsonFilter={};
		
		if(!(this.profile==null || this.profile==undefined || this.profile=="")){
			this.jsonFilter.profile=this.profile;
			this.jsonFilter.sort={"created_at":"DESC"};
			this.callServicesProfile(1,'&limit='+this.detallePorPagina);
		}else{
			if(this.texto === 'TERMINAL-UPDATE'){
				this.jsonFilter.id=[this.created_by]
				this.callServicesProfile(1,'&limit='+this.detallePorPagina);
			}
			this.callServicesProfile(1,'&limit='+this.detallePorPagina);
		}
		
	}


	app.TerminalCreateComponent.prototype.callServicesProfile = function (data, parametros) {
		this.pageSelected = data;
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		
		let querys="?type=PAGINATE"+parametros
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		let request = this.service.callServicesHttp("profile-system-report", querys, this.jsonFilter);
		request.subscribe(data => {
			
			this.procesarRespuestaProfile(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}

	app.TerminalCreateComponent.prototype.procesarRespuestaProfile=function(data){
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
	app.TerminalCreateComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			return data;
		}
	}
	app.TerminalCreateComponent.prototype.selectedPropietario=function(data){
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
				//--------------------------------
			}
		}
	}
	app.TerminalCreateComponent.prototype.getValueFirst=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('first_page')) {
			if (!(this.pagingActual.first_page == null || this.pagingActual.first_page == undefined || this.pagingActual.first_page == "")) {
				this.callServicesProfile(data, this.pagingActual.first_page);
			}
		}
	}
	app.TerminalCreateComponent.prototype.getValuePrevious=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('previous_page')) {
			if (!(this.pagingActual.previous_page == null || this.pagingActual.previous_page == undefined || this.pagingActual.previous_page == "")) {
				this.callServicesProfile(data, this.pagingActual.previous_page);
			}
		}
	}
	app.TerminalCreateComponent.prototype.getValueLast=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('last_page')) {
			if (!(this.pagingActual.last_page == null || this.pagingActual.last_page == undefined || this.pagingActual.last_page == "")) {
				this.callServicesProfile(data, this.pagingActual.last_page);
			}
		}
	}
	app.TerminalCreateComponent.prototype.getValueNext=function(data){
		this.listRegister = [];
		if (this.pagingActual.hasOwnProperty('next_page')) {
			if (!(this.pagingActual.next_page == null || this.pagingActual.next_page == undefined || this.pagingActual.next_page == "")) {
				this.callServicesProfile(data, this.pagingActual.next_page);
			}
		}
	}
	
	app.TerminalCreateComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));