(function(app) {
	app.SettingsComponent =
		ng.core.Component({
		selector: 'settings-component',
		templateUrl: 'views/settings.html',
		})
		.Class({
		  constructor: [app.MsgComponent,ng.router.Router,ng.router.ActivatedRoute,app.AppCallService,
		  function(msg,router,active,ser) {
	          this.msg=msg;
	          this.mensaje="";
	          this.router=router;  
	          this.active=active;
			  this.ser=ser;
		  }]
		});
	app.SettingsComponent.prototype.devolverEvent=function(event){
		if(!(event==null || event==undefined || event=="")){
			if(event.keyCode==8){
				if(this.unidad2!=null){
					if(this.unidad2==""){
						this.unidad2="0,00";
					}else{
						if(this.unidad2.length==3){
							this.unidad2="0,"+this.unidad2.charAt(0)+this.unidad2.charAt(2);
						}
					}
				}else{
					this.unidad2="0,00";
				}
			}
		}
	}
	app.SettingsComponent.prototype.keyDown=function(event){
		if(!(event==null || event==undefined || event=="")){
			if(event.keyCode==37 || event.keyCode==38){
				return false;
			}
		}
	}
	app.SettingsComponent.prototype.getEventMonto=function(event){
		if(!(event==null || event==undefined || event=="")){
			if(this.regex.test(event.key)){
				if(this.unidad2!=null){
					if(this.unidad2.length==4){
						if(this.unidad2=="0,00"){
							if(event.key==0 || event.key=="0"){
								return false;
							}else{
								this.unidad2="0,0"+event.key;
								return false;
							}
						}else{
							if(this.unidad2.substring(0,3)=="0,0"){
								this.unidad2="0,"+this.unidad2.charAt(this.unidad2.length-1)+event.key;
								return false;
							}else{
								if(this.unidad2.charAt(0)=="0" || this.unidad2.charAt(0)==0){
									this.unidad2=this.unidad2.charAt(2)+","+this.unidad2.charAt(3)+event.key;
									return false;
								}
							}
						}
					}
				}
			}else{
				return false;
			}
		}
	}
	app.SettingsComponent.prototype.moveCursorToEnd=function() {
		var el=document.getElementById("unidad2");
		if (typeof el.selectionStart == "number") {
			el.selectionStart = el.selectionEnd = el.value.length;
		} else if (typeof el.createTextRange != "undefined") {
			el.focus();
			var range = el.createTextRange();
			range.collapse(false);
			range.select();
		}
	}
	app.SettingsComponent.prototype.changeAmount=function(event){
		if(!(this.unidad2==null || this.unidad2==undefined || this.unidad2=="")){
			if(this.unidad2.length==1){
				this.unidad2="0,0"+this.unidad2;
			}else{
				if(this.unidad2.length==2){
					this.unidad2="0,"+this.unidad2;
				}
			}
		}
	}
	app.SettingsComponent.prototype.inputEvent=function(event){
		if(!(event==null || event==undefined || event=="")){
			if(!(event.data==null || event.data==undefined || event.data=="")){
				if(this.regex.test(event.data)){
					if(this.unidad2!=null){
						if(this.unidad2.length==4){
							if(this.unidad2=="0,00"){
								if(event.data==0 || event.data=="0"){
									document.getElementById("unidad2").value="0,00";
									return false;
								}else{
									document.getElementById("unidad2").value="0,0"+event.data;
									return false;
								}
							}else{
								if(this.unidad2.substring(0,3)=="0,0"){
									document.getElementById("unidad2").value="0,"+this.unidad2.charAt(this.unidad2.length-1)+event.data;
									return false;
								}else{
									if(this.unidad2.charAt(0)=="0" || this.unidad2.charAt(0)==0){
										document.getElementById("unidad2").value=this.unidad2.charAt(2)+","+this.unidad2.charAt(3)+event.data;
										return false;
									}
								}
							}
						}
					}
				}else{
					return false;
				}
			}else{
				if(event.inputType=="deleteContentBackward"){
					if(this.unidad2!=null){
						if(this.unidad2==""){
							document.getElementById("unidad2").value="0,00";
						}else{
							if(this.unidad2.length==3){
								document.getElementById("unidad2").value="0,"+this.unidad2.charAt(0)+this.unidad2.charAt(2);
							}
						}
					}else{
						document.getElementById("unidad2").value="0,00";
					}
				}
			}
		}
	}
	app.SettingsComponent.prototype.ngOnInit=function(){
		this.title=capitalizeOnly(_("title12"));
		this.title1=capitalizeOnly(_("title14"));
		this.title2=capitalizeOnly(_("title15"));
		this.title3=capitalizeOnly(_("title16"));
		this.title_back=_("title17");
		this.title_clean=_("title18");
		this.title_done=_("title19");
		this.listaMonedas=[{value:"VES",label:"Bs",name:capitalizeOnly(_("bs")),check:false},{value:"USD",label:"$",name:capitalizeOnly(_("usd")),check:false}];
		this.unidad1="1,00";
		this.moneda1="VES";
		this.moneda2="VES";
		this.unidad2="0,00";
		this.regex=/^\d+$/;
		$("#unidad2").mask("#.##0,00", {reverse: true});
		this.getServices();
	}
	app.SettingsComponent.prototype.getServices=function(){
		let querys=null;
		let mensajeAll=capitalizeOnly(_("message_dflt_20"));
		let request=this.ser.callServicesHttp("config-general-get", querys, null);
		request.subscribe(data=>{
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.error();
			}else{
				if(data.status_http==200){
					if(!(data==null || data==undefined || data=="" || data.length==0)){
						this.formattedData(data);
					}
				}else{
					this.mensaje=this.ser.processMessageError(data,mensajeAll);
					this.msg.error();
				}
			}
		},err=>{
			this.mensaje=this.ser.processError(err,mensajeAll);
			this.msg.error();
		});
	}
	app.SettingsComponent.prototype.formattedData=function(data){
		if(!(data==null  || data ==undefined || data=="")){
			if(data.hasOwnProperty("currencys")){
				if(!(data.currencys==null || data.currencys==undefined || data.currencys=="" || data.currencys.length==0)){
					for(var i=0;i<data.currencys.length;i++){
						for(var j=0;j<this.listaMonedas.length;j++){
							if(data.currencys[i]!=null){
								if(data.currencys[i]==this.listaMonedas[j].value){
									this.listaMonedas[j].check=true;
								}
							}
						}
					}
				}
			}
			if(data.hasOwnProperty("currency_init")){
				if(!(data.currency_init==null || data.currency_init==undefined || data.currency_init=="")){
					this.moneda1=data.currency_init;
				}
			}
			if(data.hasOwnProperty("unity_init")){
				if(!(data.unity_init==null || data.unity_init==undefined || data.unity_init=="" || data.unity_init==0)){
					try{
						this.unidad1=amountFormattingObject(data.unity_init);
						this.unidad1=this.unidad1.integerPart+","+this.unidad1.decimalPart;
					}catch(er){
					}
				}
			}
			if(data.hasOwnProperty("currency_end")){
				if(!(data.currency_end==null || data.currency_end==undefined || data.currency_end=="")){
					this.moneda2=data.currency_end;
				}
			}
			if(data.hasOwnProperty("unity_end")){
				if(!(data.unity_end==null || data.unity_end==undefined || data.unity_end=="" || data.unity_end==0)){
					try{
						this.unidad2=amountFormattingObject(data.unity_end);
						this.unidad2=this.unidad2.integerPart+","+this.unidad2.decimalPart;
					}catch(er){
					}
				}
			}
		}
	}
	app.SettingsComponent.prototype.clean=function(){
		this.moneda1="VES";
		this.moneda2="VES";
		this.unidad2="0,00";
		this.listaMonedas=[{value:"VES",label:"Bs",name:capitalizeOnly(_("bs")),check:false},{value:"USD",label:"$",name:capitalizeOnly(_("usd")),check:false}];
	}
	app.SettingsComponent.prototype.done=function(){
		var parametros={};
		if(this.listaMonedas==null || this.listaMonedas==undefined || this.listaMonedas=="" || this.listaMonedas.length==0){
			this.mensaje=capitalizeOnly(_("warning18"));
			this.msg.warning();
			return;
		}else{
			var lista=[];
			for(var i=0;i<this.listaMonedas.length;i++){
				if(this.listaMonedas[i]!=null){
					if(this.listaMonedas[i].check==true){
						lista.push(this.listaMonedas[i].value);
					}
				}
			}
			if(lista.length==0){
				this.mensaje=capitalizeOnly(_("warning18"));
				this.msg.warning();
				return;
			}else{
				
			}
		}
		if(this.moneda1==this.moneda2){
			this.mensaje=capitalizeOnly(_("warning20"));
			this.msg.warning();
			return;
		}
		if(this.unidad2==null || this.unidad2==undefined || this.unidad2==""){
			this.mensaje=capitalizeOnly(_("warning19"));
			this.msg.warning();
			return;
		}else{
			var a=null;
			try{
				a = $('#unidad2').val();
				a=a.replace(/\./g,"").replace(/,/g,"");
				a=(replaceAll(a," ","")+"").trim();
			}catch(e){
				a=null;
			}
			var monto=a;
			if(monto==null || monto==undefined || monto==0 || monto==""){
				this.mensaje=capitalizeOnly(_("warning19"));
				this.msg.warning();
				return;
			}
		}
		let querys=null;
		let mensajeAll=capitalizeOnly(_("message_dflt_19"));
		let request=this.ser.callServicesHttp("config-general-post", querys, parametros);
		request.subscribe(data=>{
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.error();
			}else{
				if(data.status_http==200){
					this.mensaje=capitalizeOnly(_("success15"));
					this.msg.info();
				}else{
					this.mensaje=this.ser.processMessageError(data,mensajeAll);
					this.msg.error();
				}
			}
		},err=>{
			this.mensaje=this.ser.processError(err,mensajeAll);
			this.msg.error();
		});
	}
	app.SettingsComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));