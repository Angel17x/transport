(function(app) {
	app.TicketPreimpresoComponent =
		ng.core.Component({
		selector: 'ticket-preimpreso',
		templateUrl: 'views/ticket-preimpreso.html'
		})
	.Class({
		constructor: [ng.router.ActivatedRoute,ng.router.Router,app.AppCallService,app.MsgComponent,
			function(active,router,service,msg) {
				this.active=active;
				this.router=router;
				this.service=service;
				this.msg=msg;
			}
		]
	});
	app.TicketPreimpresoComponent.prototype.ngOnInit=function(){
		this.title=_("title78")
		this.listItems=[];
        this.checkRol();
	}
	app.TicketPreimpresoComponent.prototype.checkRol=function(){
		var texto="TICKET-PREIMPRESO-RESERVATION-LINE";
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
	app.TicketPreimpresoComponent.prototype.getData=function(){
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null){
						if(this.active.queryParams._value.hasOwnProperty('id')){
							this.reservation_id=this.active.queryParams._value.id;
						}
						if(this.active.queryParams._value.hasOwnProperty('itinerary_id')){
							this.itinerary_id=this.active.queryParams._value.itinerary_id;
						}
						if(this.active.queryParams._value.hasOwnProperty('trip_id')){
							this.trip_id=this.active.queryParams._value.trip_id;
						}
						this.getReservation();
					}
				}
			}
		}
	
    }
	app.TicketPreimpresoComponent.prototype.getReservation=function(){
		let request=this.service.callServicesHttp('reservation-get-line',"&id="+this.reservation_id+"&itinerary_id="+this.itinerary_id+"&trip_id="+this.trip_id,null);
		let mensajeAll=_("message_dflt_56");
		request.subscribe(data => {
			this.formattedData(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.TicketPreimpresoComponent.prototype.formattedData=function(data){
		this.parada=null;
			if(!(data==null || data==undefined || data=="")){
				if(data.hasOwnProperty("trip_id")){
					if(!(data.trip_id==null || data.trip_id==undefined || data.trip_id=="")){
						this.trip_id=data.trip_id;
					}
				}
				if(data.hasOwnProperty("trip_departure_date")){
					if(!(data.trip_departure_date==null || data.trip_departure_date==undefined || data.trip_departure_date=="")){
						this.fecha_salida=formattingDate(data.trip_departure_date);
						try{
							this.fecha_salida=this.fecha_salida.split(" ");
							this.hora=this.fecha_salida[1];
							this.fecha_salida=this.fecha_salida[0];
						}catch(er){
						}
					}
				}
				if(data.hasOwnProperty("line_name")){
					if(!(data.line_name==null || data.line_name==undefined || data.line_name=="")){
						this.line_name=data.line_name;
					}
				}
				if(data.hasOwnProperty("status")){
					if(!(data.status==null || data.status==undefined || data.status=="")){
						this.status=_(data.status).toUpperCase();
					}
				}
				if(data.hasOwnProperty("itinerary_id")){
					if(!(data.itinerary_id==null || data.itinerary_id==undefined || data.itinerary_id=="")){
						this.itinerary_id=data.itinerary_id;
					}
				}
				if(data.hasOwnProperty("info")){
					if(!(data.info==null || data.info==undefined || data.info=="")){
						if(data.info.hasOwnProperty("created_at")){
							if(!(data.info.created_at==null || data.info.created_at==undefined || data.info.created_at=="")){
								try{
									var aux=data.info.created_at.split("T");
									this.fecha_emision=aux[0];
								}catch(er){
								}
							}
						}
					}
				}
				if(data.hasOwnProperty("sequence")){
					if(!(data.sequence==null || data.sequence==undefined || data.sequence=="")){
						this.sequence=data.sequence;
					}
				}
				if(data.hasOwnProperty("vehicle_license_plate")){
					if(!(data.vehicle_license_plate==null || data.vehicle_license_plate==undefined || data.vehicle_license_plate=="")){
						this.placa=data.vehicle_license_plate;
					}
				}
				if(data.hasOwnProperty("vehicle_type_name")){
					if(!(data.vehicle_type_name==null || data.vehicle_type_name==undefined || data.vehicle_type_name=="")){
						this.vehicle_type_name=data.vehicle_type_name;
					}
				}
				if(data.hasOwnProperty("number_of_passengers")){
					if(!(data.number_of_passengers==null || data.number_of_passengers==undefined || data.number_of_passengers=="")){
						this.number_of_passengers=data.number_of_passengers;
					}
				}
				this.listPayments=[];
				if(data.hasOwnProperty("payments")){
					if(data.payments!=null && data.payments.length!=0){
						var objeto={};
						for(var i=0;i<data.payments.length;i++){
							if(data.payments[i]!=null){
								objeto={};
								objeto=data.payments[i];
								if(objeto.hasOwnProperty("collector_bank")){
									if(!(objeto.collector_bank==null || objeto.collector_bank==undefined || objeto.collector_bank=="")){
										objeto.banco=returnBankSelected(objeto.collector_bank);
									}
								}
								if(objeto.hasOwnProperty("payment_method")){
									if(!(objeto.payment_method==null || objeto.payment_method==undefined || objeto.payment_method=="")){
										objeto.metodo=_(objeto.payment_method).toUpperCase();
									}
								}
								if(objeto.hasOwnProperty("amount")){
									if(!(objeto.amount==null || objeto.amount==undefined || objeto.amount=="")){
										objeto.formatted_amount=amountFormattingObject(objeto.amount*100);
										objeto.formatted_amount=objeto.formatted_amount.integerPart+","+objeto.formatted_amount.decimalPart;
										if(objeto.hasOwnProperty("currency")){
											if(!(objeto.currency==null || objeto.currency==undefined || objeto.currency=="")){
												objeto.formatted_amount=objeto.formatted_amount+" "+objeto.currency;
											}
										}
									}
								}
								if(objeto.status!="DELETED"){
									this.listPayments.push(objeto);
								}
								
							}
						}
					}
				}
				if(data.hasOwnProperty("passengers")){
					if(data.passengers!=null && data.passengers.length!=0){
						var objeto={};
						for(var i=0;i<data.passengers.length;i++){
							if(data.passengers[i]!=null){
								objeto={};
								if(this.parada==null || this.parada==""){
									if(data.passengers[i].hasOwnProperty("destination_stop_code")){
										if(!(data.passengers[i].destination_stop_code==null || data.passengers[i].destination_stop_code==undefined || data.passengers[i].destination_stop_code=="")){
											this.parada=data.passengers[i].destination_stop_code;
											if(data.passengers[i].hasOwnProperty("destination_stop_name")){
												if(!(data.passengers[i].destination_stop_name==null || data.passengers[i].destination_stop_name==undefined || data.passengers[i].destination_stop_name=="")){
													this.parada=this.parada+" - "+data.passengers[i].destination_stop_name;
													this.stop=data.passengers[i].destination_stop_code;
												}
											}
										}
									}
								}
								if(data.passengers[i].hasOwnProperty("name")){
									if(!(data.passengers[i].name==null || data.passengers[i].name==undefined || data.passengers[i].name=="")){
										objeto.name=data.passengers[i].name;
									}
								}
								if(data.passengers[i].hasOwnProperty("type")){
									if(!(data.passengers[i].type==null || data.passengers[i].type==undefined || data.passengers[i].type=="")){
										objeto.formatted_type=_(data.passengers[i].type).toUpperCase();
									}
								}
								if(data.passengers[i].hasOwnProperty("id_doc")){
									if(!(data.passengers[i].id_doc==null || data.passengers[i].id_doc==undefined || data.passengers[i].id_doc=="")){
										objeto.id_doc=data.passengers[i].id_doc;
									}
								}
								if(data.passengers[i].hasOwnProperty("amount_to_pay")){
									if(!(data.passengers[i].amount_to_pay==null || data.passengers[i].amount_to_pay==undefined || data.passengers[i].amount_to_pay=="")){
										try{
											objeto.monto=amountFormattingObject(data.passengers[i].amount_to_pay*100);
											objeto.monto=objeto.monto.integerPart+","+objeto.monto.decimalPart;
											if(data.passengers[i].hasOwnProperty("fare_currency")){
												this.moneda=_(data.passengers[i].fare_currency);
												objeto.monto=objeto.monto+" "+_(data.passengers[i].fare_currency);
											}
											this.currency=data.passengers[i].fare_currency;
										}catch(er){
										}
									}
								}
								this.listItems.push(objeto);
							}
						}
					}
				}
				if(data.hasOwnProperty("total_by_currency")){
					if(!(data.total_by_currency==undefined || data.total_by_currency=="" || data.total_by_currency==null)){
						if(data.total_by_currency.hasOwnProperty("USD")){
							if(!(data.total_by_currency.USD== null || data.total_by_currency.USD==undefined || data.total_by_currency.USD=="")){
								try{
									this.total=data.total_by_currency.USD;
									this.total_formatted=amountFormattingObject(data.total_by_currency.USD*100);
									this.total_formatted=this.total_formatted.integerPart+","+this.total_formatted.decimalPart;
									this.total_formatted=this.total_formatted+" USD";
								}catch(er1){
								}
							}
						}
						if(data.total_by_currency.hasOwnProperty("VES")){
							if(!(data.total_by_currency.VES== null || data.total_by_currency.VES==undefined || data.total_by_currency.VES=="")){
								try{
									this.moneda_bs="VES";
									this.total_formatted_bs=amountFormattingObject(data.total_by_currency.VES*100);
									this.total_formatted_bs=this.total_formatted_bs.integerPart+","+this.total_formatted_bs.decimalPart;
									this.total_formatted_bs=this.total_formatted_bs+" VES";
								}catch(er1){
								}
							}else{
								if(data.total_by_currency.hasOwnProperty("VED")){
									if(!(data.total_by_currency.VED== null || data.total_by_currency.VED==undefined || data.total_by_currency.VED=="")){
										try{
											this.moneda_bs="VED";
											this.total_formatted_bs=amountFormattingObject(data.total_by_currency.VED*100);
											this.total_formatted_bs=this.total_formatted_bs.integerPart+","+this.total_formatted_bs.decimalPart;
											this.total_formatted_bs=this.total_formatted_bs+" VED";
										}catch(er1){
										}
									}
								}
							}
						}else{
							if(data.total_by_currency.hasOwnProperty("VED")){
								if(!(data.total_by_currency.VED== null || data.total_by_currency.VED==undefined || data.total_by_currency.VED=="")){
									try{
										this.moneda_bs="VED";
										this.total_formatted_bs=amountFormattingObject(data.total_by_currency.VED*100);
										this.total_formatted_bs=this.total_formatted_bs.integerPart+","+this.total_formatted_bs.decimalPart;
										this.total_formatted_bs=this.total_formatted_bs+" VED";
									}catch(er1){
									}
								}
							}
						}
					}
				}
				if(data.hasOwnProperty("rates")){
					if(!(data.rates==null || data.rates==undefined || data.rates=="")){
						if(data.rates.hasOwnProperty("USD")){
							if(!(data.rates.USD==null || data.rates.USD==undefined || data.rates.USD=="")){
								try{
									this.formatted_tasa_cambio=amountFormattingObject(data.rates.USD*100);
									this.formatted_tasa_cambio=this.formatted_tasa_cambio.integerPart+","+this.formatted_tasa_cambio.decimalPart;
									if(this.moneda_bs!=null && this.moneda_bs!=undefined){
										this.formatted_tasa_cambio=this.formatted_tasa_cambio+" "+this.moneda_bs;
									}else{
										this.formatted_tasa_cambio=this.formatted_tasa_cambio+" Bs";
									}
								}catch(er){
								}
							}
									
						}
					}
				}
			}
			
	}
	app.TicketPreimpresoComponent.prototype.back=function(){
        window.history.back();
    }
	app.TicketPreimpresoComponent.prototype.print=function(){
		window.print();
	}
})(window.app || (window.app = {}));