(function(app) {
	app.NotUserComponent =
		ng.core.Component({
		selector: 'not-user',
		templateUrl: 'views/not-user.html'
		})
		.Class({
		  constructor: [ng.router.ActivatedRoute,
		                ng.router.Router,
		  function(active,router) {
			  this.active=this.active;
			  this.router=router;
		  }]
		});
	app.NotUserComponent.prototype.ngOnInit=function(){
		try{
			var g=document.getElementsByClassName('modal-backdrop')[0];
			if(g!=null){
				var padre=g.parentNode;
				padre.removeChild(g);
			}
		}catch(y){
		}
		try{
			var g=document.getElementById('sidenav-overlay');
			if(g!=null){
				var padre=g.parentNode;
				padre.removeChild(g);
			}
		}catch(r4){
		}
	}
	app.NotUserComponent.prototype.redirect=function(item){
		this.router.navigate(['/loading']);
	}
	app.NotUserComponent.prototype.goInit=function(){
		window.location.href=redirectUri();
	}
})(window.app || (window.app = {}));