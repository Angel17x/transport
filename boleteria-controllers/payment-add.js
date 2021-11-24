(function(app) {
	app.PaymentAddComponent =
		ng.core.Component({
		selector: 'payment-add',
		templateUrl: 'views/payment-add-v3.html',
		})
		.Class({
		  constructor: [app.MsgComponent,ng.router.Router,ng.router.ActivatedRoute,app.AppCallService,
		  function(msg,router,active,ser) {
	          this.msg=msg;
	          this.mensaje="";
	          this.router=router;  
	          this.active=active;
			  this.service=ser;
		  }]
		});
	app.PaymentAddComponent.prototype.ngOnInit=function(){
		this.listAsientos="";
		this.listPagos=[{type:""}];
		this.listItems=[];
		this.listItemsAsientos=[];
		this.typePayment=null;
		this.listPagoMovil=[];
		this.listTransferencias=[];
		this.listTipos=[{value:"CASH",name:"Efectivo"},{value:"POS",name:"Punto de venta"},{value:"MOBILE",name:"Pago Móvil"},{value:"TRANSFERENCE",name:"Transferencia"}];
		this.listMonedas=[{value:"USD",name:"$"},{value:"VED",name:"Bs"}];
		this.currency="USD";
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
		this.monto="0,00";
		this.faltante_dolares=0;
		this.faltante_dolares_formatted="0,00";
		this.faltantes_bs=0;
		this.faltantes_bs_formatted="0,00";
		$("#monto1").mask("#.##0,00", {reverse: true});
		this.checkRol();
	}
	app.PaymentAddComponent.prototype.getValueMsg=function(){
		if(this.ruta=="add-payment"){
			
		}else{
			if(this.status_question=="PAID"){
				$("#modalOtherReservation").modal("show");
			}
		}
	}
	app.PaymentAddComponent.prototype.checkRol=function(){
		var texto="ADD-PAYMENT";
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
	app.PaymentAddComponent.prototype.getData=function(){
		if (this.active.url.hasOwnProperty('_value')) {
			if (this.active.url._value[0].path == 'add-payment') {
				this.ruta="add-payment";
			} else {
				this.ruta="add-payment-taquilla";
			}
		}
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
						this.getReservationLine();
					}
				}
			}
		}
	}
	app.PaymentAddComponent.prototype.getReservation=function(){
		let request=this.service.callServicesHttp('reservation-get-line',"&id="+this.reservation_id+"&itinerary_id="+this.itinerary_id+"&trip_id="+this.trip_id,null);
		let mensajeAll=_("message_dflt_56");
		request.subscribe(data => {
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.warning();
			}else{
				if(data.status_http==200){
					this.formattedData(data);
				}else{
					this.mensaje=this.service.processMessageError(data,mensajeAll);
					this.msg.error();
				}
			}
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.PaymentAddComponent.prototype.formattedData=function(data){
		this.parada=null;
		this.listItems=[];
		this.listItemsAsientos=[];
			if(!(data==null || data==undefined || data=="")){
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
						this.status_question=data.status;
					}
				}
				if(data.hasOwnProperty("itinerary_id")){
					if(!(data.itinerary_id==null || data.itinerary_id==undefined || data.itinerary_id=="")){
						this.itinerary_id=data.itinerary_id;
					}
				}
				if(data.hasOwnProperty("sequence")){
					if(!(data.sequence==null || data.sequence==undefined || data.sequence=="")){
						this.sequence=data.sequence;
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
				this.listAsientos="";
				if(data.hasOwnProperty("seats")){
					if(data.seats!=null && data.seats.length!=0){
						for(var i=0;i<data.seats.length;i++){
							if(i!=data.seats.length-1){
								this.listAsientos=this.listAsientos+data.seats[i]+" - ";
							}else{
								this.listAsientos=this.listAsientos+data.seats[i];
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
								this.faltante_dolares=data.total_by_currency.USD;
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
								this.moneda_bolivares="VES";
								this.faltante_bs=data.total_by_currency.VES;
								this.total_formatted_bs=amountFormattingObject(data.total_by_currency.VES*100);
								this.total_formatted_bs=this.total_formatted_bs.integerPart+","+this.total_formatted_bs.decimalPart;
								this.total_formatted_bs=this.total_formatted_bs+" VES";
							}catch(er1){
							}
						}else{
							if(data.total_by_currency.hasOwnProperty("VED")){
								if(!(data.total_by_currency.VED== null || data.total_by_currency.VED==undefined || data.total_by_currency.VED=="")){
									try{
										this.moneda_bolivares="VED";
										this.faltante_bs=data.total_by_currency.VED;
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
									this.moneda_bolivares="VED";
									this.faltante_bs=data.total_by_currency.VED;
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
								this.tasa_bs=data.rates.USD;
								this.formatted_tasa_cambio=amountFormattingObject(data.rates.USD*100);
								this.formatted_tasa_cambio=this.formatted_tasa_cambio.integerPart+","+this.formatted_tasa_cambio.decimalPart;
								if(this.moneda_bolivares!=null && this.moneda_bolivares!=undefined){
									this.formatted_tasa_cambio=this.formatted_tasa_cambio+" "+this.moneda_bolivares;
								}else{
									this.formatted_tasa_cambio=this.formatted_tasa_cambio+" Bs";
								}
							}catch(er){
							}
						}
								
					}
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
								if(objeto.status!="DELETED"){
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
											if(objeto.hasOwnProperty("currency")){
												var aux=0;
												if(objeto.currency=="VED"){
													this.faltante_bs=this.faltante_bs-objeto.amount;
													aux=0;
													try{
														aux=parseFloat((objeto.amount/this.tasa_bs).toFixed(2));
													}catch(er){
														aux=0;
													}
													this.faltante_dolares=this.faltante_dolares-aux;
												}else{
													if(objeto.currency=="USD"){
														this.faltante_dolares=this.faltante_dolares-objeto.amount;
														aux=0;
														try{
															aux=parseFloat((objeto.amount*this.tasa_bs).toFixed(2));
														}catch(er){
															aux=0;
														}
														this.faltante_bs=this.faltante_bs-aux;
													}else{
														if(objeto.currency=="VES"){
															this.faltante_bs=this.faltante_bs-objeto.amount;
															aux=0;
															try{
																aux=parseFloat((objeto.amount/this.tasa_bs).toFixed(2));
															}catch(er){
																aux=0;
															}
														}
													}
												}
											}
											objeto.formatted_amount=amountFormattingObject(objeto.amount*100);
											objeto.formatted_amount=objeto.formatted_amount.integerPart+","+objeto.formatted_amount.decimalPart;
											if(objeto.hasOwnProperty("currency")){
												if(!(objeto.currency==null || objeto.currency==undefined || objeto.currency=="")){
													objeto.formatted_amount=objeto.formatted_amount+" "+objeto.currency;
												}
											}
										}
									}
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
								if(data.passengers[i].type!="INFANT"){
									this.listItemsAsientos.push(objeto);
								}
								this.listItems.push(objeto);
							}
						}
					}
				}
				
			}
			
	}
	app.PaymentAddComponent.prototype.openModalPayment=function(){
		this.telefono_pago_movil=null;
		this.typePayment="CASH";
		this.monto=null;
		this.banco=null;
		this.currency="USD";
		this.listPagos=[];
		$("#modalMediosPago").modal("show");
	}
	app.PaymentAddComponent.prototype.cleanData=function(){
		this.telefono_pago_movil=null;
		this.typePayment="CASH";
		this.monto=null;
		this.banco=null;
		this.referencia_pago_movil=null;
	}
	app.PaymentAddComponent.prototype.changeMoneda=function(item,index){
		try{
			this.faltante_dolares_formatted=null;
			this.faltante_bs_formatted=null;
			var objeto=null;
			if(item.currency=="VED"){
				this.listPagos[index].monto=amountFormattingObject(this.faltante_bs*100);
				this.listPagos[index].monto=this.listPagos[index].monto.integerPart+","+this.listPagos[index].monto.decimalPart;
			}else{
				this.listPagos[index].monto=amountFormattingObject(this.faltante_dolares*100);
				this.listPagos[index].monto=this.listPagos[index].monto.integerPart+","+this.listPagos[index].monto.decimalPart;
			}
		}catch(Er){
		}
	}
	app.PaymentAddComponent.prototype.getReservationLine=function(){
		let request=this.service.callServicesHttp('line-get-reservation',null,null);
		let mensajeAll=_("message_dflt_3");
		request.subscribe(data => {
			this.formattedLinePayments(data);
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.PaymentAddComponent.prototype.formattedLinePayments=function(data){
		if(!(data==null || data==undefined || data=="")){
			if(data.hasOwnProperty("mobile_payment")){
				if(data.mobile_payment!=null && data.mobile_payment.length!=0){
					this.listPagoMovil=data.mobile_payment;
					for(var i=0;i<this.listPagoMovil.length;i++){
						if(this.listPagoMovil[i]!=null){
							if(this.listPagoMovil[i].hasOwnProperty("bank")){
								if(!(this.listPagoMovil[i].bank==null || this.listPagoMovil[i].bank==undefined || this.listPagoMovil[i].bank=="")){
									this.listPagoMovil[i].name=returnBankSelected(this.listPagoMovil[i].bank);
								}
							}
						}
					}
				}
			}
			if(data.hasOwnProperty("bank_accounts")){
				if(data.bank_accounts!=null && data.bank_accounts.length!=0){
					this.listTransferencias=data.bank_accounts;
					for(var i=0;i<this.listTransferencias.length;i++){
						if(this.listTransferencias[i]!=null){
							if(this.listTransferencias[i].hasOwnProperty("bank")){
								if(!(this.listTransferencias[i].bank==null || this.listTransferencias[i].bank==undefined || this.listTransferencias[i].bank=="")){
									this.listTransferencias[i].name=returnBankSelected(this.listTransferencias[i].bank);
								}
							}
						}
					}
				}
			}
		}
	}
	app.PaymentAddComponent.prototype.addPayment=function(){
		$("#modalMediosPago").modal("hide");
		if(this.listPagos==null || this.listPagos.length==0){
			this.mensaje="Debe adicionar al menos un pago a la reservación";
			this.msg.warning();
			return;
		}else{
			var parametros={};
			var objeto={};
			var a=null;
			var monto=0;
			var newDate = new Date();
			var dia = newDate.getDate();
			if (dia < 10) {
				dia = "0" + newDate.getDate();
			}
			var mes=newDate.getMonth() + 1;
			if (mes < 10) {
				mes = "0" + mes;
			}
			var fecha=newDate.getFullYear()+"-"+mes+"-"+dia;
			for(var i=0;i<this.listPagos.length;i++){
				if(this.listPagos[i]!=null){
					objeto={};
					if(this.listPagos[i].hasOwnProperty("type")){
						if(this.listPagos[i].type==null || this.listPagos[i].type==undefined || this.listPagos[i].type==""){
							this.mensaje="Debe seleccionar el tipo de pago de la linea "+(i+1);
							this.msg.warning();
							return;
						}else{
							if(this.listPagos[i].currency==null || this.listPagos[i].currency==undefined || this.listPagos[i].currency==""){
								this.mensaje="Debe seleccionar la moneda de la línea "+(i+1);
								this.msg.warning();
								return;
							}else{
								objeto.currency=this.listPagos[i].currency;
							}
							if(this.listPagos[i].currency==null || this.listPagos[i].currency==undefined || this.listPagos[i].currency==""){
								this.mensaje="Debe seleccionar la moneda";
								this.msg.warning();
								return;
							}else{
								objeto.currency=this.listPagos[i].currency;
							}
							if(this.listPagos[i].monto==null || this.listPagos[i].monto==undefined || this.listPagos[i].monto==""){
								this.mensaje="Debe seleccionar el monto de la línea "+(i+1);
								this.msg.warning();
								return;
							}else{
								try{
									a = $('#monto1'+i).val();
									a=a.replace(/\./g,"").replace(/,/g,"");
									a=(replaceAll(a," ","")+"").trim();
									monto=(parseFloat(a)/100).toFixed(2);
								}catch(re){
									monto=0;
								}
								if(monto=="" || monto==0){
									this.mensaje="Debe ingresar el monto de la línea "+(i+1);
									this.msg.warning();
									return;
								}
								monto=parseFloat(monto);
								objeto.amount=monto;
							}
							if(this.listPagos[i].type=="CASH"){
								if(!parametros.hasOwnProperty("cash_payments")){
									parametros.cash_payments=[];
								}
								parametros.cash_payments.push(objeto);
							}else{
								if(this.listPagos[i].type=="POS"){
									if(!parametros.hasOwnProperty("pos_payments")){
										parametros.pos_payments=[];
									}
									parametros.pos_payments.push(objeto);
								}else{
									if(this.listPagos[i].type=="MOBILE"){
										var id_doc=null;
										var phone=null;
										if(this.listPagos[i].banco==null || this.listPagos[i].banco==undefined || this.listPagos[i].banco==""){
											this.mensaje="Debe ingresar el banco receptor de la linea "+(i+1);
											this.msg.warning();
											return;
										}
										if(this.listPagoMovil!=null && this.listPagoMovil.length!=0){
											for(var j=0;j<this.listPagoMovil.length;j++){
												if(this.listPagoMovil[j]!=null){
													if(this.listPagoMovil[j].bank==this.listPagos[i].banco){
														id_doc=this.listPagoMovil[j].id_doc;
														phone=this.listPagoMovil[j].phone;
														break;
													}
												}
											}
										}
										if(this.listPagos[i].telefono_pago_movil==null || this.listPagos[i].telefono_pago_movil==undefined || this.listPagos[i].telefono_pago_movil==""){
											this.mensaje="Debe ingresar el teléfono de la transacción de la línea "+(i+1);
											this.msg.warning();
											return;
										}else{
											var question=this.listPagos[i].telefono_pago_movil.substring(0,3);
											if(!(question=="414" || question=="416" || question=="424" || question=="426" || question=="412")){
												this.mensaje="El formato del teléfono ingresado es incorrecto debe comenzar por 414 | 416 | 426 | 424 |412";
												this.msg.warning();
												return;
											}
										}
										if(this.listPagos[i].referencia_pago_movil==null || this.listPagos[i].referencia_pago_movil==undefined || this.listPagos[i].referencia_pago_movil==""){
											this.mensaje="Debe ingresar la referencia de la transacción  de la línea "+(i+1);
											this.msg.warning();
											return;
										}
										objeto.date_of_payment=fecha;
										objeto.collector_bank=this.listPagos[i].banco;
										objeto.collector_id_doc=id_doc;
										objeto.collector_phone=phone
										objeto.payer_phone=this.listPagos[i].telefono_pago_movil;
										objeto.payer_reference=this.listPagos[i].referencia_pago_movil;
										objeto.payer_bank=this.listPagos[i].banco;
										if(!parametros.hasOwnProperty("mobile_payments")){
											parametros.mobile_payments=[];
										}
										parametros.mobile_payments.push(objeto);
									}else{
										if(this.listPagos[i].type=="TRANSFERENCE"){
											var id_doc=null;
											var number=null;
											if(this.listPagos[i].banco==null || this.listPagos[i].banco==undefined || this.listPagos[i].banco==""){
												this.mensaje="Debe ingresar el banco receptor de la linea "+(i+1);
												this.msg.warning();
												return;
											}
											if(this.listTransferencias!=null && this.listTransferencias.length!=0){
												for(var j=0;j<this.listTransferencias.length;j++){
													if(this.listTransferencias[j]!=null){
														if(this.listTransferencias[j].bank==this.listPagos[j].banco){
															id_doc=this.listTransferencias[j].id_doc;
															number=this.listTransferencias[j].number;
															break;
														}
													}
												}
											}
											if(this.listPagos[i].referencia_pago_movil==null || this.listPagos[i].referencia_pago_movil==undefined || this.listPagos[i].referencia_pago_movil==""){
												this.mensaje="Debe ingresar la referencia de la transacción  de la línea "+(i+1);
												this.msg.warning();
												return;
											}
											objeto.date_of_payment=fecha;
											objeto.collector_bank=this.listPagos[i].banco;
											objeto.collector_id_doc=id_doc;
											objeto.collector_bank_account_number=number;
											objeto.payer_reference=this.listPagos[i].referencia_pago_movil;
											objeto.payer_bank=this.listPagos[i].banco;
											if(!parametros.hasOwnProperty("transfer_payments")){
												parametros.transfer_payments=[];
											}
											parametros.transfer_payments.push(objeto);
										}
									}
								}
							}
						}
					}
				}
			}
			if(this.listItemsAsientos!=null && this.listItemsAsientos.length!=0){
				parametros.seats=[];
				for(var i=0;i<this.listItemsAsientos.length;i++){
					if(this.listItemsAsientos[i]!=null){
						if(this.listItemsAsientos[i].hasOwnProperty("asiento")){
							if(this.listItemsAsientos[i].asiento==null || this.listItemsAsientos[i].asiento==undefined || this.listItemsAsientos[i].asiento==""){
								this.mensaje="Debe ingresar el número de asiento "+(i+1);
								this.msg.warning();
								return;
							}else{
								parametros.seats.push(this.listItemsAsientos[i].asiento.trim());
							}
						}
					}
				}
			}
			if(parametros.seats==null || parametros.seats==undefined || parametros.seats.length==0){
				this.mensaje="Debe ingresar un número de asiento";
				this.msg.warning();
				return;
			}
			this.addPaymentService(parametros);
		}
	}
	app.PaymentAddComponent.prototype.addPaymentService=function(parametros){
		let request=this.service.callServicesHttp('add-payment-reservation',"&id="+this.reservation_id+"&itinerary_id="+this.itinerary_id+"&trip_id="+this.trip_id,parametros);
		let mensajeAll=_("message_dflt_74");
		request.subscribe(data => {
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.warning();
			}else{
				if(data.status_http==200){
					this.formattedData(data);
					this.mensaje="Pago adicionado con éxito";
					this.msg.info();
				}else{
					this.mensaje=this.service.processMessageError(data,mensajeAll);
					this.msg.error();
				}
			}
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.PaymentAddComponent.prototype.openModalDelete=function(data){
		this.dataSelected=data;
		this.motivo_borrado=null;
		$("#modalDeletePayment").modal("show");
	}
	app.PaymentAddComponent.prototype.deletePaymentSave=function(){
		$("#modalDeletePayment").modal("hide");
		if(this.motivo_borrado==null  || this.motivo_borrado==undefined || this.motivo_borrado==""){
			this.mensaje="Debe ingresar el motivo por la cual esta borrando el pago";
			this.msg.warning();
			return;
		}
		var parametros=[{payment_id:this.dataSelected.id,reason:this.motivo_borrado.trim().toUpperCase()}];
		let mensajeAll=_("message_dflt_84");
		let request=this.service.callServicesHttp('delete-payment-reservation',"&id="+this.reservation_id+"&itinerary_id="+this.itinerary_id+"&trip_id="+this.trip_id,parametros);

		request.subscribe(data => {
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.warning();
			}else{
				if(data.status_http==200){
					this.formattedData(data);
					this.mensaje=_("success61");
					this.msg.info();
				}else{
					this.mensaje=this.service.processMessageError(data,mensajeAll);
					this.msg.error();
				}
			}
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
		});
	}
	app.PaymentAddComponent.prototype.deletePago= function (index) {
		var provi = this.listPagos.slice(index + 1);
		this.listPagos = this.listPagos.slice(0, index);
		this.listPagos = this.listPagos.concat(provi);
	}
	
	app.PaymentAddComponent.prototype.addPago=function(){
		var objeto = { type: "",monto:"0,00"};
		this.listPagos.push(objeto);
	}
	app.PaymentAddComponent.prototype.focusMonto=function(){
		$(".moneda1").mask("#.##0,00", {reverse: true});
	}
	app.PaymentAddComponent.prototype.redirectReservation=function(){
		this.router.navigate(['/new-sales-line']);
	}
	app.PaymentAddComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));