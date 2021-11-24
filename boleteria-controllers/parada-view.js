(function(app) {
	app.CarViewComponent =
		ng.core.Component({
		selector: 'car-view',
		templateUrl: 'views/car-view.html',
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
	app.CarViewComponent.prototype.ngOnInit=function(){
		this.title=capitalizeOnly(_("title3"));
		this.id=null;
		this.placa=null;
		this.conductor=null;
		this.modelo=null;
		this.marca=null;
		this.getData();
	}
	app.CarViewComponent.prototype.getData=function(){
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
	app.CarViewComponent.prototype.getService=function(){
		//GET CAR
	}
	app.CarViewComponent.prototype.formattedData=function(data){
	}
	app.CarViewComponent.prototype.print=function(){
		window.print();
	}
	app.CarViewComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));