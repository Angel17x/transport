(function(app) {
	app.PassengerCreateComponent =
		ng.core.Component({
		selector: 'passenger-create',
		templateUrl: 'views/passenger-create.html',
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
	app.PassengerCreateComponent.prototype.ngOnInit=function(){
		this.title="Nuevo pasajero";
		this.id=null;
		this.name=null;
		this.id_doc="V";
		this.doc=null;
		this.telefono=[];
		this.email=[];
		this.direccion=null;
		this.listDocs=["V","E","G","J"];
		this.etiqueta=null;
		this.isRif=true;
		this.isCi=false;
		$('#phone').inputmask("(9999) 999-9999");
		this.save=true;
		this.getData();
	}
	app.PassengerCreateComponent.prototype.getData=function(){
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'passenger-create') {
				this.title="Nuevo Pasajero";
				this.save = true;
			} else {
				this.title = "Actualizar datos del pasajeros";
				this.save = false;
				this.getService();
			}
		}
	}
	app.PassengerCreateComponent.prototype.getService=function(){
		//GET PASSENGER
	}
	app.PassengerCreateComponent.prototype.getValueMsg=function(){
	}
	app.PassengerCreateComponent.prototype.clean=function(){
		this.name=null;
		this.id_doc=null;
		this.doc=null;
		this.telefono=[];
		this.email=[];
		this.direccion=null;
		this.isRif=true;
		this.isCi=false;
		this.id_doc="V";
		this.phone=null;
	}
	app.PassengerCreateComponent.prototype.selectTypeDoc=function(){
		this.isRif=!this.isRif;
		this.isCi=!this.isCi;
	}
	app.PassengerCreateComponent.prototype.done=function(){
		var parametros={};
		if(this.name==null || this.name==undefined || this.name==""){
			this.mensaje=capitalizeOnly(_("message_dflt_1"));
			this.msg.warning();
			return;
		}else{
			
		}
		if(this.id_doc==null || this.id_doc==undefined || this.id_doc==""){
			this.mensaje=capitalizeOnly(_("message_dflt_2"));
			this.msg.warning();
			return;
		}else{
			
		}
		if(this.doc==null || this.doc==undefined || this.doc==""){
			this.mensaje=capitalizeOnly(_("message_dflt_3"));
			this.msg.warning();
			return;
		}else{
			
		}
		if(!(this.phone==null || this.phone=="" || this.phone==undefined || this.phone.trim()=="")){
		}
		if(!(this.email==null || this.email=="" || this.email==undefined || this.email.trim()=="")){
		}
		if(!(this.direccion==null || this.direccion==undefined || this.direccion=="" || this.direccion.trim()=="")){
		}
		//POST y PUT de pasajero
	}
	app.PassengerCreateComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));