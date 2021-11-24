(function(app) {
	app.FastEntryLine =
		ng.core.Component({
		selector: 'fast-entry-line',
		templateUrl: 'views/fast-entry-line.html'
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
	app.FastEntryLine.prototype.ngOnInit=function(){
		this.listPassenger=[];
		this.listTarifas=[];
		this.listDocs=["V","E","J","G"];
		this.listTypes=[{value:"ADULT",name:"Adulto"},{value:"ELDERLY",name:"Preferencial"},{value:"CHILD",name:"Niño"},{value:"INFANT",name:"Infante"}];
		this.title=_("title68");
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
		this.checkRol();
	}
	app.FastEntryLine.prototype.keyPressNumber=function(event){
		return keypressNumbersInteger(event);
	}
	app.FastEntryLine.prototype.checkRol=function(){
		this.texto_vista="FAST-ENTRY-LINE";
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'fast-entry-line') {
				this.texto_vista="FAST-ENTRY-LINE";
			} else {
				this.texto_vista="FAST-ENTRY";
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
							if(tabla[i].name==this.texto_vista){
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
	app.FastEntryLine.prototype.getData=function(){
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null){
						if(this.active.queryParams._value.hasOwnProperty('trip_id')){
							this.id=this.active.queryParams._value.trip_id;
						}
						if(this.active.queryParams._value.hasOwnProperty('business_id')){
							this.line_id=this.active.queryParams._value.business_id;
						}
						if(this.active.queryParams._value.hasOwnProperty('itinerary_id')){
							this.itinerary_id=this.active.queryParams._value.itinerary_id;
							this.getService();
						}
					}
				}
			}
		}
	}
	app.FastEntryLine.prototype.getService=function(){
		let request=null;
		if(this.texto_vista=="FAST-ENTRY"){
			request=this.service.callServicesHttp('travel-get',this.line_id+"?realm="+this.service.getRealm()+"&itinerary_id="+this.itinerary_id+"&id="+this.id,null);
		}else{
			request=this.service.callServicesHttp('travel-get-line',"&itinerary_id="+this.itinerary_id+"&id="+this.id,null);
		}
		let mensajeAll=_("message_dflt_79");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.FastEntryLine.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_79");
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				if(data.hasOwnProperty("line_code")){
					if(!(data.line_code==null || data.line_code==undefined || data.line_code=="")){
						this.linea=data.line_code;
						if(data.hasOwnProperty("line_name")){
							if(!(data.line_name==null || data.line_name==undefined || data.line_name=="")){
								this.linea=this.linea+" "+data.line_name;
							}
						}
					}
				}
				if(data.hasOwnProperty("sequence")){
					if(!(data.sequence==null || data.sequence==undefined || data.sequence=="")){
						this.viaje=data.sequence;
					}
				}
				if(data.hasOwnProperty("fares")){
					if(!(data.fares==null || data.fares==undefined || data.fares=="" || data.fares.length==0)){
						this.listTarifas=data.fares;
					}
				}
				if(data.hasOwnProperty("departure_date")){
					if(!(data.departure_date==null || data.departure_date==undefined || data.departure_date=="")){
						this.fecha=data.departure_date.replace("T", " ");
					}
				}
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}		
	app.FastEntryLine.prototype.addPassenger=function(){
		var objeto = { id_doc:"V",doc:"",name:"",type:"ADULT"};
		if(this.listTarifas!=null && this.listTarifas.length!=0){
			try{
				objeto.destino=this.listTarifas[0].id;
			}catch(er){
			}
		}
		this.listPassenger.push(objeto);
	}
	app.FastEntryLine.prototype.deletePassenger=function(index){
		var provi = this.listPassenger.slice(index + 1);
		this.listPassenger = this.listPassenger.slice(0, index);
		this.listPassenger = this.listPassenger.concat(provi);
	}
	app.FastEntryLine.prototype.clean=function(){
		this.listPassenger=[];
	}
	app.FastEntryLine.prototype.getValueMsg=function(){
		var link=null;
		if(this.texto_vista=="FAST-ENTRY"){
			link = ['/travel-report'];
		}else{
			link = ['/travel-report-line'];
		}
		this.router.navigate(link);
	}



	app.FastEntryLine.prototype.validarCI=function(data){
		//let arr = []
		for(let i=0; i < data.length; i++){
			let cedula = data[i].id_doc
			let filter = data.filter(el => el.id_doc === cedula)
			if(filter.length > 1){
				//arr.push({index: i, data: filter, ci: cedula, repeat: filter.length})
				return filter
			}
		}
		
		
	}
	

	//aqui es el envio
	app.FastEntryLine.prototype.done=function(){
		var parametros=[];
		if(this.listPassenger==null || this.listPassenger.length==0){
			this.mensaje=_("warning54");
			this.msg.warning();
			return;
		}
		var lista=[];
		var objeto={};
		for(var i=0;i<this.listPassenger.length;i++){
			if(this.listPassenger[i]!=null){
				objeto={};
				if(this.listPassenger[i].hasOwnProperty("type")){
					if(this.listPassenger[i].type==null || this.listPassenger[i].type==undefined || this.listPassenger[i].type==""){
						this.mensaje="Debe ingresar el tipo de pasaje de la línea nro. "+(i+1);
						this.msg.warning();
						return;
					}else{
						objeto.type=this.listPassenger[i].type;
					}
				}else{
					this.mensaje="Debe ingresar el tipo de pasaje de la línea nro. "+(i+1);
					this.msg.warning();
					return;
				}
				if(this.listPassenger[i].type!="INFANT"){
					if(this.listPassenger[i].hasOwnProperty("id_doc")){
					if(this.listPassenger[i].id_doc==null || this.listPassenger[i].id_doc==undefined || this.listPassenger[i].id_doc==""){
						this.mensaje="Debe ingresar el tipo de documento de la línea nro. "+(i+1);
						this.msg.warning();
						return;
					}else{
						objeto.id_doc=this.listPassenger[i].id_doc;
						if(this.listPassenger[i].hasOwnProperty("doc")){
							if(this.listPassenger[i].doc==null || this.listPassenger[i].doc==undefined || this.listPassenger[i].doc==""){
								this.mensaje="Debe ingresar el número de documento de la línea nro. "+(i+1);
								this.msg.warning();
								return;
							}else{
								if(!utils_keyNumber(this.listPassenger[i].doc.trim())){
									this.mensaje="El número de documento de la línea nro. "+(i+1)+" tiene formato incorrecto debe ser sólo números";
									this.msg.warning();
									return;
								}
								this.listPassenger[i].doc=this.listPassenger[i].doc.trim();
								if(this.listPassenger[i].doc.length<9){
									var length=9-this.listPassenger[i].doc.length;
									var aux="";
									for(var j=0;j<length;j++){
										aux=aux+"0";
									}
									this.listPassenger[i].doc=aux+this.listPassenger[i].doc;
								}
								objeto.id_doc=objeto.id_doc+this.listPassenger[i].doc.trim();
							}
						}else{
							this.mensaje="Debe ingresar el número de documento de la línea nro. "+(i+1);
							this.msg.warning();
							return;
						}
					}
				}else{
					this.mensaje="Debe ingresar el tipo de documento de la línea nro. "+(i+1);
					this.msg.warning();
					return;
				}
				}
				if(this.listPassenger[i].hasOwnProperty("name")){
					if(this.listPassenger[i].name==null || this.listPassenger[i].name==undefined || this.listPassenger[i].name==""){
						this.mensaje="Debe ingresar el nombre del pasajero de la línea "+(i+1);
						this.msg.warning();
						return;
					}else{
						objeto.name=this.listPassenger[i].name.trim().toUpperCase();
					}
				}else{
					this.mensaje="Debe ingresar el nombre del pasajero de la línea "+(i+1);
					this.msg.warning();
					return;
				}
				if(this.listPassenger[i].hasOwnProperty("destino")){
					if(this.listPassenger[i].destino==null || this.listPassenger[i].destino==undefined || this.listPassenger[i].destino==""){
						this.mensaje="Debe ingresar el destino del pasajero de la línea "+(i+1);
						this.msg.warning();
						return;
					}else{
						objeto.fare_id=this.listPassenger[i].destino;
					}
				}else{
					this.mensaje="Debe ingresar el destino del pasajero de la línea "+(i+1);
					this.msg.warning();
					return;
				}
				objeto.active=true;
				lista.push(objeto);
			}
		}

		if(this.validarCI(lista)){
			this.mensaje='No puedes repetir la misma cedula mas de una vez!';
			this.msg.warning();
			return;
		}
		let request=null;
		if(this.texto_vista=="FAST-ENTRY"){
			request = this.service.callServicesHttp("fast-entry", this.line_id+"?itinerary_id="+this.itinerary_id+"&trip_id="+this.id, lista);
		}else{
			request = this.service.callServicesHttp("fast-entry-line","&itinerary_id="+this.itinerary_id+"&trip_id="+this.id, lista);
		}
		let mensajeAll=_("message_dflt_78");

		request.subscribe(data => {
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.warning();
				return;
			}else{
				if(data.status_http==200){
					this.mensaje=_("success58");
					this.msg.info();
				}else{
					this.mensaje = this.service.processMessageError(data, mensajeAll);
					this.msg.error();
				}
			}
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.FastEntryLine.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));