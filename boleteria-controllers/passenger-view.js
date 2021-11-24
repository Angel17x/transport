(function(app) {
	app.PassengerViewComponent =
		ng.core.Component({
		selector: 'passenger-view',
		templateUrl: 'views/passenger-view.html',
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
	app.PassengerViewComponent.prototype.ngOnInit=function(){
		this.id=null;
		this.name=null;
		this.documento=null;
		this.phone=null;
		this.email=null;
		this.direccion=null;
		this.getData();
	}
	app.PassengerViewComponent.prototype.getData=function(){
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
	app.PassengerViewComponent.prototype.getService=function(){
		//Servicio 3. GET Passenger
	}
	app.PassengerViewComponent.prototype.formattedData=function(data){
	}
	app.PassengerViewComponent.prototype.print=function(){
		window.print();
	}
	app.PassengerViewComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));