(function(app) {
	app.GuideSuperComponent =
		ng.core.Component({
		selector: 'guide-super',
		templateUrl: 'views/guide-super.html',
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
	app.GuideSuperComponent.prototype.ngOnInit=function(){
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
	app.GuideSuperComponent.prototype.seleccionarMan=function(){
		var data=$( "#manualSel" ).val();
		this.listItems=[];
		this.codigo_reserva=null;
		switch (data) {
		    case "supervisor":
		    	this.classInitTab="nav-item active tab tab-selected";
				this.classReservacionesTab="nav-item tab";
				this.classVentasTab="nav-item tab";
				this.classViajesTab="nav-item tab"; 
		    break;
		    case "reservaciones":
		    	this.classInitTab="nav-item tab";
				this.classReservacionesTab="nav-item active tab tab-selected"; 
				this.classVentasTab="nav-item tab";
				this.classViajesTab="nav-item tab"; 
		    break;
		    case "ventas":
		    	this.classInitTab="nav-item tab";
				this.classReservacionesTab="nav-item tab"; 
				this.classVentasTab="nav-item active tab tab-selected"; 
				this.classViajesTab="nav-item tab"; 
		    break;
		    case "viajes":
		    	this.classInitTab="nav-item tab";
				this.classReservacionesTab="nav-item tab"; 
				this.classVentasTab="nav-item tab"; 
				this.classViajesTab="nav-item active tab tab-selected"; 
		    break;
		}
	}
	app.GuideSuperComponent.prototype.checkRol=function(){
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
							if(tabla[i].name=="GUIDE-SUPER"){
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
								if(tabla[i].tag=="GUIDE-SUPER"){
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








	app.GuideSuperComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));