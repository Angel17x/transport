(function(app) {
	app.TravelViewComponent =
		ng.core.Component({
		selector: 'travel-view',
		templateUrl: 'views/travel-view.html',
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
	app.TravelViewComponent.prototype.ngOnInit=function(){
		this.title=capitalizeOnly(_("title11"));
		this.id=null;
		this.ruta=null;
		this.linea=null;
		this.conductor=null;
		this.auto=null;
		this.fecha_salida=null;
		this.fecha_vencimiento=null;
		this.max=null;
		this.ocupados=null;
		this.disponibles=null;
		this.status=null;
		this.pasajeros=[];
		this.getData();
	}
	app.TravelViewComponent.prototype.getData=function(){
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
	app.TravelViewComponent.prototype.getService=function(){
		//Servicio 3. GET Driver
	}
	app.TravelViewComponent.prototype.formattedData=function(data){
	}
	app.TravelViewComponent.prototype.print=function(){
		window.print();
	}
	app.TravelViewComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));