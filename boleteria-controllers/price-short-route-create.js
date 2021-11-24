(function(app) {
	app.PriceShortRouteCreateComponent =
		ng.core.Component({
		selector: 'price-short-route-create',
		templateUrl: 'views/price-short-route-create.html',
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
	app.PriceShortRouteCreateComponent.prototype.ngOnInit=function(){
		this.title=_("title77");
		this.monto=null;
		this.listMonedas=returnCurrency();
		this.moneda="USD";
		$("#monto").mask("#.##0,00", {reverse: true});
		this.checkRol();
	}
	app.PriceShortRouteCreateComponent.prototype.checkRol=function(){
		var texto="PRICE-SHORT-ROUTE-CREATE";
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
	app.PriceShortRouteCreateComponent.prototype.getValueMsg=function(){
		var link = ['/currency-exchange-report'];
		this.router.navigate(link);
	}
	app.PriceShortRouteCreateComponent.prototype.clean=function(){
		this.monto=null;
		this.moneda="USD";
	}
	app.PriceShortRouteCreateComponent.prototype.done=function(){
		var parametros={};
		var querys="";
		var monto=0;
		if(this.monto==null || this.monto==undefined || this.monto==""){
			this.mensaje=_("warning59");
			this.msg.warning();
			return;
		}else{
			try{
				var a = $('#monto').val();
				a=a.replace(/\./g,"").replace(/,/g,"");
				a=(replaceAll(a," ","")+"").trim();
				monto=(parseFloat(a)/100).toFixed(2);
			}catch(re){
				monto=0;
			}
			if(monto=="" || monto==0){
				this.mensaje=_("warning59");
				this.msg.warning();
				return;
			}
			monto=parseFloat(monto);
		}
		if(this.moneda==null || this.moneda==undefined || this.moneda=="" || this.moneda=="null"){
			this.mensaje=_("warning60");
			this.msg.warning();
			return;
		}else{
			querys=querys+"&currency="+this.moneda;
		}
		let mensajeAll=_("message_dflt_87");
		let request = this.service.callServicesHttp("price-short-route-post", querys, monto);
		request.subscribe(data => {
			this.procesarRespuesta(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.PriceShortRouteCreateComponent.prototype.getValueMsg=function(){
		var link = ['/price-short-route-report'];
		this.router.navigate(link);
	}
	app.PriceShortRouteCreateComponent.prototype.procesarRespuesta=function(data){
		let mensajeAll=_("message_dflt_87");
		if(data==null || data==undefined || data==""){
			this.mensaje=mensajeAll;
			this.msg.error();
		}else{
			if (data.status_http == 200) {
				this.mensaje=capitalizeOnly(_("success62"));
				this.msg.info();
			} else {
				this.mensaje = this.service.processMessageError(data, mensajeAll);
				this.msg.error();
			}
		}
	}
	app.PriceShortRouteCreateComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));