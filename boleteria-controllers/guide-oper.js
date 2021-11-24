(function(app) {
	app.GuideOperComponent =
		ng.core.Component({
		selector: 'guide-oper',
		templateUrl: 'views/guide-oper.html',
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
	app.GuideOperComponent.prototype.ngOnInit=function(){
		this.title=capitalizeOnly(_("title70"));
		this.classInitTab="nav-item active tab tab-selected";
		this.classCambioTab="nav-item tab";
		this.classConsultaTab="nav-item tab";
		this.dataSelected=null;
		this.pagingActual={};
		this.totalPage=1;
		this.detallePorPagina=10;
		this.pageSelected=1;
		this.listStatus=[{value:null,name:"Todos"},{value:"ACTIVE",name:"Activo"},{value:"INACTIVE",name:"Inactivo"}];
		this.line=null;
		this.status=null;
		this.propietario=null;
		this.marca=null;
		this.model=null;
		this.placa=null;
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
	app.GuideOperComponent.prototype.seleccionarMan=function(){
		var data=$( "#manualSel" ).val();
		this.listItems=[];
		this.codigo_reserva=null;
		switch (data) {
		    case "operador":
		    	this.classInitTab="nav-item active tab tab-selected";
				this.classCambioTab="nav-item tab";
				this.classLineaTab="nav-item tab";
				this.classPropietarioTab="nav-item tab";
				this.classTVehiculoTab="nav-item tab";
				this.classAutomovilTab="nav-item tab";
				this.classConductoresTab="nav-item tab";
				this.classParadasTab="nav-item tab";
				this.classRutasTab="nav-item tab";
				this.classTarifasTab="nav-item tab";
				this.classViajesTab="nav-item tab";
				this.classChequearTab="nav-item tab";
				this.classReservacionesTab="nav-item tab";
		    break;
		    case "cambio":
		    	this.classInitTab="nav-item tab";
				this.classCambioTab="nav-item active tab tab-selected";
				this.classLineaTab="nav-item tab";
				this.classPropietarioTab="nav-item tab";
				this.classTVehiculoTab="nav-item tab";
				this.classAutomovilTab="nav-item tab";
				this.classConductoresTab="nav-item tab";
				this.classParadasTab="nav-item tab";
				this.classRutasTab="nav-item tab";
				this.classTarifasTab="nav-item tab";
				this.classViajesTab="nav-item tab";
				this.classChequearTab="nav-item tab";
				this.classReservacionesTab="nav-item tab";
		    break;
		    case "linea":
		    	this.classInitTab="nav-item tab";
				this.classCambioTab="nav-item tab";
				this.classLineaTab="nav-item active tab tab-selected";
				this.classPropietarioTab="nav-item tab";
				this.classTVehiculoTab="nav-item tab";
				this.classAutomovilTab="nav-item tab";
				this.classConductoresTab="nav-item tab";
				this.classParadasTab="nav-item tab";
				this.classRutasTab="nav-item tab";
				this.classTarifasTab="nav-item tab";
				this.classViajesTab="nav-item tab";
				this.classChequearTab="nav-item tab";
				this.classReservacionesTab="nav-item tab";
		    break;
		    case "propietario":
		    	this.classInitTab="nav-item tab";
				this.classCambioTab="nav-item tab";
				this.classLineaTab="nav-item tab";
				this.classPropietarioTab="nav-item active tab tab-selected";
				this.classTVehiculoTab="nav-item tab";
				this.classAutomovilTab="nav-item tab";
				this.classConductoresTab="nav-item tab";
				this.classParadasTab="nav-item tab";
				this.classRutasTab="nav-item tab";
				this.classTarifasTab="nav-item tab";
				this.classViajesTab="nav-item tab";
				this.classChequearTab="nav-item tab";
				this.classReservacionesTab="nav-item tab";
		    break;
		    case "Tvehiculos":
		    	this.classInitTab="nav-item tab";
				this.classCambioTab="nav-item tab";
				this.classLineaTab="nav-item tab";
				this.classPropietarioTab="nav-item tab";
				this.classTVehiculoTab="nav-item active tab tab-selected";
				this.classAutomovilTab="nav-item tab";
				this.classConductoresTab="nav-item tab";
				this.classParadasTab="nav-item tab";
				this.classRutasTab="nav-item tab";
				this.classTarifasTab="nav-item tab";
				this.classViajesTab="nav-item tab";
				this.classChequearTab="nav-item tab";
				this.classReservacionesTab="nav-item tab";
		    break;
		    case "Automoviles":
		    	this.classInitTab="nav-item tab";
				this.classCambioTab="nav-item tab";
				this.classLineaTab="nav-item tab";
				this.classPropietarioTab="nav-item tab";
				this.classTVehiculoTab="nav-item tab";
				this.classAutomovilTab="nav-item active tab tab-selected";
				this.classConductoresTab="nav-item tab";
				this.classParadasTab="nav-item tab";
				this.classRutasTab="nav-item tab";
				this.classTarifasTab="nav-item tab";
				this.classViajesTab="nav-item tab";
				this.classChequearTab="nav-item tab";
				this.classReservacionesTab="nav-item tab";
		    break;
		    case "Conductores":
		    	this.classInitTab="nav-item tab";
				this.classCambioTab="nav-item tab";
				this.classLineaTab="nav-item tab";
				this.classPropietarioTab="nav-item tab";
				this.classTVehiculoTab="nav-item tab";
				this.classAutomovilTab="nav-item tab";
				this.classConductoresTab="nav-item active tab tab-selected";
				this.classParadasTab="nav-item tab";
				this.classRutasTab="nav-item tab";
				this.classTarifasTab="nav-item tab";
				this.classViajesTab="nav-item tab";
				this.classChequearTab="nav-item tab";
				this.classReservacionesTab="nav-item tab";
		    break;
		    case "Paradas":
		    	this.classInitTab="nav-item tab";
				this.classCambioTab="nav-item tab";
				this.classLineaTab="nav-item tab";
				this.classPropietarioTab="nav-item tab";
				this.classTVehiculoTab="nav-item tab";
				this.classAutomovilTab="nav-item tab";
				this.classConductoresTab="nav-item tab";
				this.classParadasTab="nav-item active tab tab-selected";
				this.classRutasTab="nav-item tab";
				this.classTarifasTab="nav-item tab";
				this.classViajesTab="nav-item tab";
				this.classChequearTab="nav-item tab";
				this.classReservacionesTab="nav-item tab";
		    break;
		    case "Rutas":
		    	this.classInitTab="nav-item tab";
				this.classCambioTab="nav-item tab";
				this.classLineaTab="nav-item tab";
				this.classPropietarioTab="nav-item tab";
				this.classTVehiculoTab="nav-item tab";
				this.classAutomovilTab="nav-item tab";
				this.classConductoresTab="nav-item tab";
				this.classParadasTab="nav-item tab";
				this.classRutasTab="nav-item active tab tab-selected";
				this.classTarifasTab="nav-item tab";
				this.classViajesTab="nav-item tab";
				this.classChequearTab="nav-item tab";
				this.classReservacionesTab="nav-item tab";
		    break;
		    case "Tarifas":
		    	this.classInitTab="nav-item tab";
				this.classCambioTab="nav-item tab";
				this.classLineaTab="nav-item tab";
				this.classPropietarioTab="nav-item tab";
				this.classTVehiculoTab="nav-item tab";
				this.classAutomovilTab="nav-item tab";
				this.classConductoresTab="nav-item tab";
				this.classParadasTab="nav-item tab";
				this.classRutasTab="nav-item tab";
				this.classTarifasTab="nav-item active tab tab-selected";
				this.classViajesTab="nav-item tab";
				this.classChequearTab="nav-item tab";
				this.classReservacionesTab="nav-item tab";
		    break;
		    case "Viajes":
		    	this.classInitTab="nav-item tab";
				this.classCambioTab="nav-item tab";
				this.classLineaTab="nav-item tab";
				this.classPropietarioTab="nav-item tab";
				this.classTVehiculoTab="nav-item tab";
				this.classAutomovilTab="nav-item tab";
				this.classConductoresTab="nav-item tab";
				this.classParadasTab="nav-item tab";
				this.classRutasTab="nav-item tab";
				this.classTarifasTab="nav-item tab";
				this.classViajesTab="nav-item active tab tab-selected";
				this.classChequearTab="nav-item tab";
				this.classReservacionesTab="nav-item tab";
		    break;
		    case "Chequear":
		    	this.classInitTab="nav-item tab";
				this.classCambioTab="nav-item tab";
				this.classLineaTab="nav-item tab";
				this.classPropietarioTab="nav-item tab";
				this.classTVehiculoTab="nav-item tab";
				this.classAutomovilTab="nav-item tab";
				this.classConductoresTab="nav-item tab";
				this.classParadasTab="nav-item tab";
				this.classRutasTab="nav-item tab";
				this.classTarifasTab="nav-item tab";
				this.classViajesTab=
				this.classChequearTab="nav-item active tab tab-selected";
				this.classReservacionesTab="nav-item tab";
		    break;
		    case "Reservaciones":
		    	this.classInitTab="nav-item tab";
				this.classCambioTab="nav-item tab";
				this.classLineaTab="nav-item tab";
				this.classPropietarioTab="nav-item tab";
				this.classTVehiculoTab="nav-item tab";
				this.classAutomovilTab="nav-item tab";
				this.classConductoresTab="nav-item tab";
				this.classParadasTab="nav-item tab";
				this.classRutasTab="nav-item tab";
				this.classTarifasTab="nav-item tab";
				this.classViajesTab="nav-item tab";
				this.classChequearTab="nav-item tab";
				this.classReservacionesTab="nav-item active tab tab-selected";				
		    break;R
		    default:
		        this.classInitTab="nav-item active tab tab-selected";
				this.classCambioTab="nav-item tab";
				this.classLineaTab="nav-item tab";
				this.classTVehiculoTab="nav-item tab";
				this.classAutomovilTab="nav-item tab";
				this.classConductoresTab="nav-item tab";
				this.classParadasTab="nav-item tab";
				this.classRutasTab="nav-item tab";
				this.classViajesTab="nav-item tab";
				this.classChequearTab="nav-item tab";
				this.classReservacionesTab="nav-item tab";
				return;
		    break;
		}
	}
	app.GuideOperComponent.prototype.checkRol=function(){
		this.actions=[];
		this.vistas=[];
		var flag=false;
    	if(this.service.getRole()!=null){
			if(this.service.getRole().hasOwnProperty("views")){
				if(!(this.service.getRole().views==null || this.service.getRole().views==undefined || this.service.getRole().views=="")){
					var tabla=orderList(this.service.getRole().views);
					var objeto=null;
					for(var i=0;i<tabla.length;i++){
						if(tabla[i]!=null){
							if(tabla[i].name=="GUIDE-OPER"){
								flag=true;
								if(tabla[i].hasOwnProperty("actions")){
									if(!(tabla[i].actions==null || tabla[i].actions==undefined || tabla[i].actions=="" || tabla[i].actions.length==0)){
										for(var j=0;j<tabla[i].actions.length;j++){
											if(tabla[i].actions[j]!=null){
												objeto=null;
												objeto=this.formattedActions(tabla[i].actions[j]);
												if(objeto!=null){
													this.actions.push(objeto);
												}
											}
										}
									}
								}
							}else{
								if(tabla[i].tag=="GUIDE-OPER"){
									objeto=null;
									objeto=this.formattedView(tabla[i]);
									if(objeto!=null){
										this.actions.push(objeto);
									}
								}
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








	app.GuideOperComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));