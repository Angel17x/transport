(function(app) {
	app.LineViewComponent =
		ng.core.Component({
		selector: 'line-view',
		templateUrl: 'views/line-view.html',
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
	app.LineViewComponent.prototype.ngOnInit=function(){
		this.title=_("title11");
		this.nombre=null;
		this.codigo=null;
		this.modalidad=null;
		this.unidades=null;
		this.expedicion=null;
		this.vencimiento=null;
		this.direccion=null;
		this.listBankAccounts=[];
		this.list
		this.rutas=[];
		this.title2=_("title12");
		this.checkRol();
	}
	app.LineViewComponent.prototype.checkRol=function(){
		var texto="VIEW-LINE";
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
	app.LineViewComponent.prototype.getData=function(){
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
	app.LineViewComponent.prototype.getService=function(){
		let request=this.service.callServicesHttp('line-get',"&id="+this.id,null);
		let mensajeAll=_("message_dflt_3");
		request.subscribe(data => {
			this.procesarRespuestaGET(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.LineViewComponent.prototype.procesarRespuestaGET=function(data){
		let mensajeAll=_("message_dflt_3");
		if (data == null || data == undefined || data == "") {
			this.mensaje = mensajeAll;
			this.msg.error();
		} else {
			if (data.status_http == 200) {
				this.formattedData(data);
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.LineViewComponent.prototype.formattedData=function(data){
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
							objeto.bank=data.bank_accounts[i].bank;
						}
						if(data.bank_accounts[i].hasOwnProperty("number")){
							objeto.number=data.bank_accounts[i].number;
						}
						if(data.bank_accounts[i].hasOwnProperty("id_doc")){
							objeto.id_doc=data.bank_accounts[i].id_doc;
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
							objeto.bank=data.mobile_payment[i].bank;
						}
						if(data.mobile_payment[i].hasOwnProperty("phone")){
							objeto.phone=data.mobile_payment[i].phone;
						}
						if(data.mobile_payment[i].hasOwnProperty("id_doc")){
							objeto.id_doc=data.mobile_payment[i].id_doc;
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
	app.LineViewComponent.prototype.print=function(){
		window.print();
	}
	app.LineViewComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));