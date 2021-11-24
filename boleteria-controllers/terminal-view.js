(function(app) {
	app.TerminalViewComponent =
		ng.core.Component({
		selector: 'terminal-view',
		templateUrl: 'views/terminal-view.html',
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
	app.TerminalViewComponent.prototype.ngOnInit=function(){
		
		this.title=capitalizeOnly(_("title81"));
		this.id_doc=null
		this.name=null
		this.phone=null
		this.country=null
		this.state=null
		this.country=null
		this.address=null
		this.stop=null
		this.city=null
		
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
	app.TerminalViewComponent.prototype.checkRol=function(){
		var texto="TERMINAL-VIEW";
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
	app.TerminalViewComponent.prototype.getData=function(){
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
	app.TerminalViewComponent.prototype.getService=function(){
		let querys = null
		querys="&id="+this.id

		let request=this.service.callServicesHttp('terminal-get',querys,null);
		let mensajeAll=_("message_dflt_89");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.TerminalViewComponent.prototype.procesarRespuestaGET=function(data){
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
	app.TerminalViewComponent.prototype.formattedDataGET=function(data){
		this.id_doc=null
		this.name=null
		this.phone=null
		this.country=null
		this.state=null
		this.country=null
		this.address=null
		this.stop=null
		
		if(data.hasOwnProperty("id_doc")){
			if(!(data.id_doc==null || data.id_doc==undefined || data.id_doc=="")){
				this.id_doc=data.id_doc
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
	app.TerminalViewComponent.prototype.print=function(){
		window.print();
	}
	app.TerminalViewComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));