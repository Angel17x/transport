(function(app) {
	app.MenuComponent =
		ng.core.Component({
		selector: 'menu-component',
		templateUrl: 'views/menu.html',
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
	app.MenuComponent.prototype.ngOnInit=function(){
		this.formatedName=null;
		this.listMenu=null;
		this.formattedMenu();
	}
	app.MenuComponent.prototype.formattedMenu=function(data){
		if(data!=null){
			data=data.toLowerCase();
		}
		this.title="TERMINAL LA BANDERA";
		this.listMenu=this.getMenu("BANDERA");
		if(this.listMenu==null){
			this.router.navigate(['/not-user']);
		}
	}
	app.MenuComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			data.icon="assets/images/pending_actions.svg";
			if(data.hasOwnProperty("name")){
				if(!(data.name==undefined || data.name==null || data.name=="")){
					if(data.name=="STOPS"){
						data.image="assets/images/room_morado_oscuro.svg";
					}else{
						if(data.name=="CAR-TYPES"){
							data.image="assets/images/estacionamiento.svg";
						}else{
							if(data.name=="LINES"){
								data.image="assets/images/group_morado.svg";
							}else{
								if(data.name=="VEHICLE-OWNER"){
									data.image="assets/images/chofer_morado.svg";
								}else{
									if(data.name=="VEHICLE"){
										data.image="assets/images/emoji_transportation_morado.svg";
									}else{
										if(data.name=="FARE"){
											data.image="assets/images/precios.svg";
										}else{
											if(data.name=="ITINERARY"){
												data.image="assets/images/timeline_morado.svg";
											}else{
												if(data.name=="TRIP"){
													data.image="assets/images/destino.svg";
												}else{
													if(data.name=="DRIVERS"){
														data.image="assets/images/conductor.svg";
													}else{
														if(data.name=="RESERVATION-LINE"){
															data.image="assets/images/campana.svg";
														}else{
															if(data.name=="TRIP-LINE"){
																data.image="assets/images/destino.svg";
															}else{
																if(data.name=="CHECK-PASSENGER"){
																	data.image="assets/images/check.svg";
																}else{
																	if(data.name=="CURRENCY-EXCHANGE"){
																		data.image="assets/images/exchange.svg";
																	}else{
																		if(data.name=="SALES-REPORT"){
																			data.image="assets/images/ventas.svg";
																		}else{
																			if(data.name=="SALES-LINE"){
																				data.image="assets/images/ventas.svg";
																			}else{
																				if(data.name=="CHECK-TRIP"){
																					data.image="assets/images/check.svg";
																				}else{
																					if(data.name=="RESERVATIONS"){
																						data.image="assets/images/campana.svg";
																					}else{
																						if(data.name=="GUIDE-OPER" || data.name=="GUIDE-SUPER" || data.name=="GUIDE-REC"){
																							data.image="assets/images/question.svg";
																						}else{
																							if(data.name=="PRICE-SHORT-ROUTE"){
																								data.image="assets/images/discount.svg";
																							}else{
																								if(data.name=="TERMINAL"){
																									data.image="assets/images/terminal.svg";
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					data.formatted_name=_(data.name);
				}
			}
			return data;
		}
	}
	app.MenuComponent.prototype.getMenu=function(vista){
		var lista=[];
		var lista2=[];
		if(this.ser.getRole()!=null){
			if(this.ser.getRole().hasOwnProperty("views")){
				if(!(this.ser.getRole().views==null || this.ser.getRole().views==undefined || this.ser.getRole().views=="")){
					var tabla=orderList(this.ser.getRole().views);
					for(var i=0;i<tabla.length;i++){
						if(tabla[i]!=null){
							if(tabla[i].name==vista){
								if(tabla[i].hasOwnProperty("actions")){
									if(!(tabla[i].actions==null || tabla[i].actions.length==0)){
										lista.push(this.formattedData(tabla[i]));
									}
								}
							}else{
								if(tabla[i].tag==vista){
									lista2.push(this.formattedData(tabla[i]));
								}
							}
						}
					}
					lista=lista.concat(lista2);
					return lista;
				}
			}else{
				return null;
			}
		}else{
			return null;
		}
	}
	app.MenuComponent.prototype.getRedirect=function(item){
		if(item.hasOwnProperty("name")){
			if(item.hasOwnProperty('url')){
				if(!(item.url==null || item.url==undefined || item.url=="")){
					var array= null;
					try{
						array=item.url.split('?');
					}catch(er5){
						array=null;
					}
					if(array!=null){
						var url_redirect=null;
						if(array[0]=="/section"){
							if(array.length>1){
								try{
									var array2=[];
									array2=array[1].split('&');
									array3=[];
									for(var i=0; i<array2.length;i++){
										array3=[];
										array3=array2[i].split('=');
										if(array3.length>1){
											if(array3[0]=='name'){
												url_redirect=array3[1];
												break;
											}
										}
									}
								}catch(err20){
								}
							}
							if(url_redirect!=null){
								this.formattedMenu(url_redirect);
								this.router.navigate(['/section'], { queryParams: { name: url_redirect} });
							}
						}else{
							if(item.url!=null){
								item.url=item.url.toLowerCase();
							}
							this.router.navigate([item.url]);
						}
					}
				}
			}	
		}
	}
})(window.app || (window.app = {}));