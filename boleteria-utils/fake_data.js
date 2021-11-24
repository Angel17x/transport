var fakeData = {
	"reservation-report":{
		status_http:200,
		count:3,
		results:[
			{
				id:"100",
				code:"123456",
				salida_nombre:"Terminal de Mérida",
				llegada:"MER",
				formatted_amount:"15.890.900,90 Bs",
				formatted_channel:"WEB",
				date:"2021-06-03",
				schedule:"08:00 pm",
				formatted_method:"PAGO MOVIL",
				banco:"BANCO VENEZUELA",
				users:[
					{name:"MARTHA RODRIGUEZ", rif:"V20000000", phone:"04141234567",email:"prueba@gmail.com",asiento:"C2"},
					{name:"ORLANDO RODRIGUEZ", rif:"V20000001", phone:"04141234567",email:"prueba@gmail.com",asiento:"C3"}
				],
				formatted_status:"PAGADO"
			},
			{
				id:"101",
				code:"123457",
				salida_nombre:"Terminal de Tachira",
				llegada:"TAC",
				formatted_amount:"6.900.000,00 Bs",
				formatted_channel:"WEB",
				formatted_method:"TRANSFERENCIA",
				banco:"BANCO VENEZUELA",
				date:"2021-06-04",
				schedule:"07:00 am",
				users:[
					{name:"MARTHA RODRIGUEZ", rif:"V20000000", phone:"04141234567",email:"prueba@gmail.com"}
				],
				formatted_status:"PENDIENTE"
			},
			{
				id:"102",
				code:"123488",
				salida_nombre:"Terminal de Tachira",
				llegada:"TAC",
				formatted_amount:"101.567.900,00 Bs",
				formatted_channel:"TAQUILLA",
				banco:"BANCO VENEZUELA",
				date:"2021-06-04",
				schedule:"11:30 am",
				users:[
					{name:"MARTHA RODRIGUEZ", rif:"V20000000", phone:"04141234567",email:"prueba@gmail.com"},
					{name:"ORLANDO RODRIGUEZ", rif:"V20000001", phone:"04141234567",email:"prueba@gmail.com"},
					{name:"PRUEBA RODRIGUEZ", rif:"V20000000", phone:"04141234567",email:"prueba@gmail.com"},
				],
				formatted_status:"CANCELADO"
			}
		]	
	},
	"sales-report":{
		status_http:200,
		count:3,
		results:[
			{
				ref:"123456",
				formatted_amount:"15.890.900,90 Bs",
				formatted_channel:"WEB",
				date:"2021-06-03",
				formatted_method:"PAGO MOVIL",
				banco:"BANCO VENEZUELA",
				reserva:"101"
			},
			{
				ref:"123457",
				formatted_amount:"10.890.900,90 Bs",
				formatted_channel:"WEB",
				date:"2021-06-03",
				formatted_method:"TRANSFERENCIA",
				banco:"BANCO VENEZUELA",
				reserva:"102"
			},
			{
				ref:"123458",
				formatted_amount:"8.600.900,90 Bs",
				formatted_channel:"TAQUILLA",
				date:"2021-06-03",
				formatted_method:"PUNTO DE VENTA",
				banco:"BANCO VENEZUELA",
				reserva:"103"
			},
			{
				ref:"123459",
				formatted_amount:"23.690.000,90 Bs",
				formatted_channel:"TAQUILLA",
				date:"2021-06-03",
				formatted_method:"PUNTO DE VENTA",
				banco:"BANCO VENEZUELA",
				reserva:"104"
			},
		]	
	},
	"travel-report-available":{
		status_http:200,
		count:3,
		results:[
			{
				id:"1",
				code:"001",
				cap:60,
				disp:2,
				type:"EXPRESO",
				ocup:50,
				line:"EXPRESOS MARA",
				date:"2021-05-28",
				schedule:"08:00 pm",
				total:30000000,
				llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", currency_symbol:"Bs"
			},
			{
				id:"2",
				code:"002",
				cap:60,
				disp:25,
				type:"EJECUTIVO",
				ocup:35,
				line:"EXPRESOS LOS LLANOS",
				schedule:"09:00 pm",
				date:"2021-05-28",
				total:45789020,
				llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"45.789.020,00", currency_symbol:"Bs"
			},
			{
				id:"3",
				code:"003",
				cap:60,
				disp:45,
				type:"EJECUTIVO",
				ocup:15,
				line:"AUTOEXPRESOS EJECUTIVOS",
				schedule:"10:00 am",
				date:"2021-05-29",
				total:10245900,
				llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"10.245.900,00", currency_symbol:"Bs"
			}
		]	
	},
	"parada-report":{
		status_http:200,
		count:12,
		first_page: "offset=0&limit=10",
		previous_page: "offset=0&limit=10",
		last_page: "offset=0&limit=10",
		next_page: "offset=0&limit=10",
		results:[
			{
				name:"Caracas",
				code:"CCS",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				name:"Barquisimeto",
				code:"BQT",
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				name:"Porlamar",
				code:"PMV",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				name:"Canaima",
				code:"CAJ",
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				name:"Tachira",
				code:"TAC",
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				name:"Mérida",
				code:"MER",
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				name:"Ciudad Bolívar",
				code:"CCB",
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				name:"Anaco",
				code:"ANA",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				name:"Bocono",
				code:"BOC",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				name:"Maturin",
				status:"ACTIVE",
				code:"CCB",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			}
		]	
	},
	"parada-delete":{
		status_http:200,
		msg:"Parada delete success"
	},
	"parada-active":{
		status_http:200,
		name:"Barquisimeto",
		code:"BQT",
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"				
		}
	},
	"parada-inactive":{
		status_http:200,
		name:"Caracas",
		code:"CCS",
		status:"iNACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"				
		}
	},
	"parada-post":{
		status_http:200,
		name:"Barquisimeto",
		code:"BQT",
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"				
		}
	},
	"car-report":{
		status_http:200,
		count:20,
		first_page: "offset=0&limit=10",
		previous_page: "offset=0&limit=10",
		last_page: "offset=0&limit=10",
		next_page: "offset=0&limit=10",
		results:[
			{
				placa:"00AADMA",
				carroceria:"8XL6GC11D2E001576",
				brand:"ENCAVA ENT61032",
				color:"BLANCO MULTICOLOR",
				year:"2002",
				cap:32,
				propietario:"OSCAR OSBEY DEPABLOS",
				line:"EXPRESOS MARA",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				placa:"00AA11H",
				carroceria:"8ZBENJ7Y07V300175",
				brand:"CHEVROLET NPR",
				line:"EXPRESOS MARA",
				color:"BLANCO MULTICOLOR",
				year:"2007",
				cap:32,
				propietario:"LUIS EDUARDO NUMPER",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				placa:"01AADNE",
				carroceria:"I4282",
				brand:"ENCAVA",
				line:"EXPRESOS MARA",
				color:"BLANCO MULTICOLOR",
				year:"1990",
				cap:32,
				propietario:"JOSE ALEXANDER SANCHEZ",
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				placa:"001AC3WS",
				carroceria:"8XL6GC11D7E003881",
				brand:"ENCAVA ENT61032",
				color:"BLANCO MULTICOLOR",
				year:"2007",
				cap:32,
				propietario:"MARTHA VICTORIA RODRIGUEZ",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				placa:"02AA4MS",
				carroceria:"I6479",
				brand:"ENCAVA ENT61032",
				color:"BLANCO MULTICOLOR",
				year:"1998",
				cap:32,
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				placa:"22A07AS",
				carroceria:"I4816",
				brand:"ENCAVA 610-30",
				color:"AZUL BLANCO",
				year:"1993",
				cap:32,
				line:"EXPRESSOS EJECUTIVOS 1",
				propietario:"JESUS FERNANDO",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				placa:"22A07AS",
				carroceria:"I4816",
				brand:"ENCAVA 61032",
				color:"AZUL BLANCO",
				year:"2005",
				cap:32,
				line:"EXPRESSOS EJECUTIVOS 1",
				propietario:"JOSE GREGORIO LOPEZ",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				placa:"00AADMA",
				carroceria:"8XL6GC11D2E001576",
				brand:"ENCAVA ENT61032",
				color:"BLANCO MULTICOLOR",
				year:"2002",
				cap:32,
				propietario:"OSCAR OSBEY DEPABLOS",
				line:"EXPRESOS MARA",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				placa:"00AA11H",
				carroceria:"8ZBENJ7Y07V300175",
				brand:"CHEVROLET NPR",
				line:"EXPRESOS MARA",
				color:"BLANCO MULTICOLOR",
				year:"2007",
				cap:32,
				propietario:"LUIS EDUARDO NUMPER",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				placa:"01AADNE",
				carroceria:"I4282",
				brand:"ENCAVA",
				line:"EXPRESOS MARA",
				color:"BLANCO MULTICOLOR",
				year:"1990",
				cap:32,
				propietario:"JOSE ALEXANDER SANCHEZ",
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
	]	
	},
	"car-delete":{
		status_http:200,
		msg:"Car delete success"
	},
	"car-active":{
		status_http:200,
		placa:"01AADNE",
		carroceria:"I4282",
		brand:"ENCAVA",
		line:"EXPRESOS MARA",
		color:"BLANCO MULTICOLOR",
		year:"1990",
		cap:32,
		propietario:"JOSE ALEXANDER SANCHEZ",
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"	
		}
	},
	"car-inactive":{
		status_http:200,
		placa:"00AADMA",
		carroceria:"8XL6GC11D2E001576",
		brand:"ENCAVA ENT61032",
		color:"BLANCO MULTICOLOR",
		year:"2002",
		cap:32,
		propietario:"OSCAR OSBEY DEPABLOS",
		line:"EXPRESOS MARA",
		status:"INACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"	
		}
	},
	"car-get":{
		status_http:200,
		placa:"00AADMA",
		carroceria:"8XL6GC11D2E001576",
		brand:"ENCAVA ENT61032",
		color:"BLANCO MULTICOLOR",
		year:"2002",
		cap:32,
		type:"HIPER",
		propietario:"OSCAR OSBEY DEPABLOS",
		line:"EXPRESOS MARA",
		status:"INACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"	
		}
	},
	"car-post":{
		status_http:200,
		placa:"00AADMA",
		carroceria:"8XL6GC11D2E001576",
		brand:"ENCAVA ENT61032",
		color:"BLANCO MULTICOLOR",
		year:"2002",
		cap:32,
		type:"HIPER",
		propietario:"OSCAR OSBEY DEPABLOS",
		line:"EXPRESOS MARA",
		status:"INACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"	
		}
	},
	"car-put":{
		status_http:200,
		placa:"00AADMA",
		carroceria:"8XL6GC11D2E001576",
		brand:"ENCAVA ENT61032",
		color:"BLANCO MULTICOLOR",
		year:"2002",
		cap:32,
		type:"HIPER",
		propietario:"OSCAR OSBEY DEPABLOS",
		line:"EXPRESOS MARA",
		status:"INACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"	
		}
	},
	"profile-report":{
		status_http:200,
		"first_page":"offset=0&limit=10",
		"previous_page":"offset=0&limit=10",
		"next_page":"offset=10&limit=10",
		"last_page":"offset=490&limit=10",
		"count":500,
		"results":[
			{"realm":"cuyawa","id":"08a40830-9877-11eb-a704-ff3a36469e8b","alias":"CQUNaf","type":"NATURAL_PERSON","country":"VE","business_name":"MARQUEZ, HENNELY","first_name":"HENNELY","last_name":"MARQUEZ","id_doc_type":"CI","id_doc":"V111112222","phone_deflt":"04141111111","phones":["04141111111"],"email_deflt":"hgmarquezm@gmail.com","emails":["hgmarquezm@gmail.com"],"lock":false,"created_at":"2021-04-08T14:30:57.904749Z","created_by":"hgmarquezm@gmail.com","line":"EXPRESOS MARA S.A",cars:7,status:"ACTIVE"},
			{"realm":"cuyawa","id":"d0aa03c0-9264-11eb-846e-cb101e97f4d7","alias":"MAR","type":"NATURAL_PERSON","country":"VE","business_name":"RODRIGUEZ, MARTHA","first_name":"MARTHA","last_name":"RODRIGUEZ","id_doc_type":"CI","id_doc":"V011111111","favorites_products":[],"customer_products_deflt":"d0aa03c0-9264-11eb-846e-cb101e97f4d7","customer_products":["d0aa03c0-9264-11eb-846e-cb101e97f4d7"],"payment_cards":[],"phone_deflt":"58414936538","phones":["58414936538"],"email_deflt":"vcaldera096@gmail.com","emails":["vcaldera096@gmail.com"],"lock":false,"created_at":"2021-03-31T21:05:26.053Z","created_by":"vcaldera096@gmail.com","updated_at":"2021-03-31T21:06:01.602Z","addresses":[],"bank_accounts":[],"line":"EXPRESOS MARA S.A",status:"ACTIVE"},
			{"realm":"cuyawa","id":"0ebc4690-85a5-11eb-af1a-79d4d68f5a03","alias":"ARMADELYS","type":"NATURAL_PERSON","country":"VE","business_name":"GONZALEZ, ARMADELYS","first_name":"ARMADELYS","last_name":"GONZALEZ","id_doc_type":"CI","id_doc":"V017318902","favorites_products":[],"customer_products_deflt":"0ebc4690-85a5-11eb-af1a-79d4d68f5a03","customer_products":["0ebc4690-85a5-11eb-af1a-79d4d68f5a03"],"payment_cards":[],"phone_deflt":"04123782666","phones":["04123782666"],"email_deflt":"armadelys.gonzalez@credicard.com.ve","emails":["armadelys.gonzalez@credicard.com.ve"],"lock":false,"created_at":"2021-03-15T15:42:32.863Z","created_by":"armadelys.gonzalez@credicard.com.ve","updated_at":"2021-03-15T15:45:48.284Z","addresses":[],"bank_accounts":[],"line":"EXPRESOS MARA S.A",status:"INACTIVE"},
			{"realm":"cuyawa","id":"b34e6540-836f-11eb-aea5-b57aa2feeb84","alias":"AJte0v","type":"NATURAL_PERSON","country":"VE","business_name":"TEST, TEST","first_name":"TEST","last_name":"TEST","id_doc_type":"CI","id_doc":"V111111111","favorites_products":[],"customer_products_deflt":"b34e6540-836f-11eb-aea5-b57aa2feeb84","customer_products":["b34e6540-836f-11eb-aea5-b57aa2feeb84"],"payment_cards":[],"phones":[],"email_deflt":"yzlup2@gmail.com","emails":["yzlup2@gmail.com"],"lock":false,"created_at":"2021-03-12T20:15:34.067Z","created_by":"yzlup2@gmail.com","updated_at":"2021-03-12T21:00:10.699Z","addresses":[],"bank_accounts":[],"line":"EXPRESOS MARA S.A",status:"ACTIVE"},
			{"realm":"cuyawa","id":"5e4da290-67e5-11eb-ab01-198fca500e3f","alias":"MsXFSt","type":"NATURAL_PERSON","country":"VE","business_name":"ULLOA, YAZAL","first_name":"YAZAL","last_name":"ULLOA","id_doc_type":"CI","id_doc":"V563426538","favorites_products":[],"customer_products_deflt":"5e4da290-67e5-11eb-ab01-198fca500e3f","customer_products":["5e4da290-67e5-11eb-ab01-198fca500e3f"],"payment_cards":[],"phones":[],"email_deflt":"yazalulloa@gmail.com","emails":["yazalulloa@gmail.com"],"lock":false,"created_at":"2021-02-05T19:07:19.376Z","created_by":"yazalulloa@gmail.com","updated_at":"2021-02-05T19:08:09.075Z","addresses":[],"bank_accounts":[],"line":"EXPRESOS EJECUTIVOS C.A",cars:3,status:"ACTIVE"},
			{"realm":"cuyawa","id":"1fdf4260-60e3-11eb-955d-07ffb3924c99","alias":"IST 77","type":"LEGAL_PERSON","country":"VE","business_name":"PRUEBA IST","id_doc_type":"RIF","id_doc":"J000000001","favorites_products":[],"customer_products_deflt":"1fdf4260-60e3-11eb-955d-07ffb3924c99","customer_products":["1fdf4260-60e3-11eb-955d-07ffb3924c99"],"payment_cards":[],"phones":[],"email_deflt":"adquirienteist77@gmail.com","emails":["adquirienteist77@gmail.com"],"lock":false,"created_at":"2021-01-27T21:03:37.662Z","created_by":"adquirienteist77@gmail.com","updated_at":"2021-01-27T21:04:49.293Z","addresses":[],"bank_accounts":[],cars:1,status:"INACTIVE"},
			{"realm":"cuyawa","id":"e8f18750-4f6b-11eb-a949-47842556d35c","alias":"PEPE","type":"NATURAL_PERSON","country":"VE","business_name":"RIVAS, PEDRO","first_name":"PEDRO","last_name":"RIVAS","id_doc_type":"CI","id_doc":"V130760534","favorites_products":[],"customer_products_deflt":"e8f18750-4f6b-11eb-a949-47842556d35c","customer_products":["e8f18750-4f6b-11eb-a949-47842556d35c"],"payment_cards":[],"phone_deflt":"04120889747","phones":["04120889747"],"email_deflt":"pedror130@gmail.com","emails":["pedror130@gmail.com"],"lock":false,"created_at":"2021-01-05T15:37:25.404Z","created_by":"pedror130@gmail.com","updated_at":"2021-01-05T15:38:42.426Z","addresses":[],"bank_accounts":[],cars:1,status:"ACTIVE"},
			{"realm":"cuyawa","id":"10fbabe0-4ae4-11eb-af0d-cb2c8b1949d6","alias":"SADAN","type":"NATURAL_PERSON","country":"VE","business_name":"SADAN, KEVIN","first_name":"KEVIN","last_name":"SADAN","id_doc_type":"CI","id_doc":"V025430110","favorites_products":[],"customer_products_deflt":"10fbabe0-4ae4-11eb-af0d-cb2c8b1949d6","customer_products":["10fbabe0-4ae4-11eb-af0d-cb2c8b1949d6"],"payment_cards":[],"phone_deflt":"04241546412","phones":["04241546412"],"email_deflt":"saadann25@gmail.com","emails":["saadann25@gmail.com"],"lock":false,"created_at":"2020-12-30T21:14:56.375Z","created_by":"saadann25@gmail.com","updated_at":"2020-12-30T21:15:32.914Z","addresses":[],"bank_accounts":[],cars:3,status:"ACTIVE"},
			{"realm":"cuyawa","id":"39ff0fe0-4ac2-11eb-b133-fd675d04e6b2","alias":"CABRERAVICTOR1979","type":"NATURAL_PERSON","country":"VE","business_name":"CABRERA ARISTIGUETA, VICTOR ATILIO","first_name":"VICTOR ATILIO","last_name":"CABRERA ARISTIGUETA","id_doc_type":"CI","id_doc":"V015724116","favorites_products":[],"customer_products_deflt":"39ff0fe0-4ac2-11eb-b133-fd675d04e6b2","customer_products":["39ff0fe0-4ac2-11eb-b133-fd675d04e6b2"],"payment_cards":[],"phone_deflt":"04142426388","phones":["04142426388"],"email_deflt":"cabreravictor1979@gmail.com","emails":["cabreravictor1979@gmail.com"],"lock":false,"created_at":"2020-12-30T17:12:42.3Z","created_by":"cabreravictor1979@gmail.com","updated_at":"2020-12-30T17:15:24.255Z","addresses":[],"bank_accounts":[],cars:1,status:"ACTIVE"},
			{"realm":"cuyawa","id":"07aa1830-398a-11eb-b707-3be385b66f46","alias":"xIvshe","type":"LEGAL_PERSON","country":"VE","business_name":"PRUEBA","id_doc_type":"RIF","id_doc":"G200100249","favorites_products":[],"customer_products":[],"payment_cards":[],"phones":[],"email_deflt":"afiliadoprueba12@gmail.com","emails":["afiliadoprueba12@gmail.com"],"lock":false,"created_at":"2020-12-08T19:17:36.212Z","created_by":"afiliadoprueba12@gmail.com","addresses":[],"bank_accounts":[],cars:2,status:"ACTIVE"}
		]
	},
	"propietario-delete":{
		status_http:200,
		msg:"propietario delete success"
	},
	"propietario-active":{
		status_http:200,
		id:"0ebc4690-85a5-11eb-af1a-79d4d68f5a03",
		country:"VE",
		business_name:"GONZALEZ, ARMADELYS",
		first_name:"ARMADELYS",
		last_name:"GONZALEZ",
		id_doc:"V017318902",
		email_deflt:"armadelys.gonzalez@credicard.com.ve",
		created_at:"2021-03-15T15:42:32.863Z",
		created_by:"armadelys.gonzalez@credicard.com.ve",
		updated_at:"2021-03-15T15:45:48.284Z",
		line:"EXPRESOS MARA S.A",
		status:"ACTIVE"
	},
	"propietario-inactive":{
		status_http:200,
		id:"08a40830-9877-11eb-a704-ff3a36469e8b",
		business_name:"MARQUEZ, HENNELY",
		id_doc:"V111112222",
		phone_deflt:"04141111111",
		email_deflt:"hgmarquezm@gmail.com",
		created_at:"2021-04-08T14:30:57.904749Z",
		created_by:"hgmarquezm@gmail.com",
		line:"EXPRESOS MARA S.A",
		cars:7,
		status:"INACTIVE"
	},
	"propietario-get":{
		status_http:200,
		id:"08a40830-9877-11eb-a704-ff3a36469e8b",
		first_name:"HENNELY",
		last_name:"MARQUEZ",
		business_name:"MARQUEZ, HENNELY",
		id_doc:"V111112222",
		phone_deflt:"04141111111",
		email_deflt:"hgmarquezm@gmail.com",
		created_at:"2021-04-08T14:30:57.904749Z",
		created_by:"hgmarquezm@gmail.com",
		line:"EXPRESOS MARA S.A",
		cars_count:7,
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"	
		},
		status:"ACTIVE",
		cars:[{
				placa:"00AADMA",
				carroceria:"8XL6GC11D2E001576",
				brand:"ENCAVA ENT61032",
				color:"BLANCO MULTICOLOR",
				year:"2002",
				cap:32,
				status:"ACTIVE"
			},
			{
				placa:"00AA11H",
				carroceria:"8ZBENJ7Y07V300175",
				brand:"CHEVROLET NPR",
				line:"EXPRESOS MARA",
				color:"BLANCO MULTICOLOR",
				year:"2007",
				cap:32,
				status:"ACTIVE"
			},
			{
				placa:"01AADNE",
				carroceria:"I4282",
				brand:"ENCAVA",
				line:"EXPRESOS MARA",
				color:"BLANCO MULTICOLOR",
				year:"1990",
				cap:32,
				status:"INACTIVE"
			}
		]
	},
	"propietario-post":{
		status_http:200,
		id:"08a40830-9877-11eb-a704-ff3a36469e8b",
		business_name:"MARQUEZ, HENNELY",
		id_doc:"V111112222",
		phone_deflt:"04141111111",
		email_deflt:"hgmarquezm@gmail.com",
		created_at:"2021-04-08T14:30:57.904749Z",
		created_by:"hgmarquezm@gmail.com",
		line:"EXPRESOS MARA S.A",
		cars_count:7,
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
		},
		status:"ACTIVE",
	},
	"propietario-put":{
		status_http:200,
		id:"08a40830-9877-11eb-a704-ff3a36469e8b",
		business_name:"MARQUEZ, HENNELY",
		id_doc:"V111112222",
		phone_deflt:"04141111111",
		email_deflt:"hgmarquezm@gmail.com",
		created_at:"2021-04-08T14:30:57.904749Z",
		created_by:"hgmarquezm@gmail.com",
		line:"EXPRESOS MARA S.A",
		cars_count:7,
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"	
		},
		status:"ACTIVE",
	},
	"line-report":{
		status_http:200,
		count:3,
		first_page: "offset=0&limit=10",
		previous_page: "offset=0&limit=10",
		last_page: "offset=0&limit=10",
		next_page: "offset=0&limit=10",
		results:[
			{
				name:"EXPRESOS MARA",
				expedicion:"2021-05-17",
				vencimiento:"2025-05-17",
				modalidad:"POR PUESTO INTERURBANO",
				code:"PIDF0007",
				rutas:5,
				unidades:["MINIBUS","POR PUESTO"],
				address:"AV. CONSTITUCION TERMINAL DE PASAJEROS, CASILLA NRO. 15 MARACAY EDO.ARAGUA",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				name:"EXPRESOS EJECUTIVOS",
				expedicion:"2020-04-09",
				modalidad:"POR PUESTO INTERURBANO",
				vencimiento:"2025-04-21",
				code:"PIDF0008",
				unidades:["HIPERBUS"],
				rutas:9,
				address:"AV. LAS ACACIAS TERMINAL DE PASAJEROS, CASILLA NRO. 15 PUERTO ORDAZ EDO.BOLÍVAR",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				name:"EXPRESOS LOS LLANOS",
				expedicion:"2020-05-10",
				vencimiento:"2025-05-10",
				rutas:20,
				modalidad:"POR PUESTO INTERURBANO",
				code:"PIDF0009",
				unidades:["HIPERBUS"],
				address:"AV. LAS ACACIAS TERMINAL DE PASAJEROS, CASILLA NRO. 20 PUERTO ORDAZ EDO.BOLÍVAR",
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			}
		]	
	},
	"line-delete":{
		status_http:200,
		msg:"line delete success"
	},
	"line-active":{
		status_http:200,
		name:"EXPRESOS LOS LLANOS",
		expedicion:"2020-05-10",
		vencimiento:"2025-05-10",
		rutas:20,
		modalidad:"POR PUESTO INTERURBANO",
		code:"PIDF0009",
		unidades:["HIPERBUS"],
		address:"AV. LAS ACACIAS TERMINAL DE PASAJEROS, CASILLA NRO. 20 PUERTO ORDAZ EDO.BOLÍVAR",
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"
		}
	},
	"line-inactive":{
		status_http:200,
		name:"EXPRESOS MARA",
		expedicion:"2021-05-17",
		vencimiento:"2025-05-17",
		modalidad:"POR PUESTO INTERURBANO",
		code:"PIDF0007",
		rutas:5,
		unidades:["MINIBUS","POR PUESTO"],
		address:"AV. CONSTITUCION TERMINAL DE PASAJEROS, CASILLA NRO. 15 MARACAY EDO.ARAGUA",
		status:"INACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"
		}
	},
	"line-post":{
		status_http:200,
		name:"EXPRESOS MARA",
		expedicion:"2021-05-17",
		vencimiento:"2025-05-17",
		modalidad:"POR PUESTO INTERURBANO",
		code:"PIDF0007",
		rutas:5,
		unidades:["MINIBUS","POR PUESTO"],
		address:"AV. CONSTITUCION TERMINAL DE PASAJEROS, CASILLA NRO. 15 MARACAY EDO.ARAGUA",
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com"
		}
	},
	"line-get":{
		status_http:200,
		name:"EXPRESOS MARA",
		expedicion:"2021-05-17",
		vencimiento:"2025-05-17",
		modalidad:"POR PUESTO INTERURBANO",
		code:"PIDF0007",
		rutas:5,
		unidades:["MINIBUS","POR PUESTO"],
		address:"AV. CONSTITUCION TERMINAL DE PASAJEROS, CASILLA NRO. 15 MARACAY EDO.ARAGUA",
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com"
		}
	},
	"line-put":{
		status_http:200,
		name:"EXPRESOS MARA",
		expedicion:"2021-05-17",
		vencimiento:"2025-05-17",
		modalidad:"POR PUESTO INTERURBANO",
		code:"PIDF0007",
		rutas:5,
		unidades:["MINIBUS","POR PUESTO"],
		address:"AV. CONSTITUCION TERMINAL DE PASAJEROS, CASILLA NRO. 15 MARACAY EDO.ARAGUA",
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"
		}
	},
	"line-get-routes":{
		status_http:200,
		name:"EXPRESOS MARA",
		expedicion:"2021-05-17",
		vencimiento:"2025-05-17",
		modalidad:"POR PUESTO INTERURBANO",
		code:"PIDF0007",
		rutas:5,
		unidades:["MINIBUS","POR PUESTO"],
		address:"AV. CONSTITUCION TERMINAL DE PASAJEROS, CASILLA NRO. 15 MARACAY EDO.ARAGUA",
		status:"ACTIVE",
		routes:[
			{code:1,name:"CCS-TERMINAL PASAJEROS LA BANDERA,MRC-TURMERO,MRC-MARACAY"},
			{code:2,name:"CCS-TERMINAL PASAJEROS LA BANDERA,MRC-MARIARA,MRC-SAN JOAQUIN, MRC-GUACARA, VAL-VALENCIA"}
		],
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"
		}
	},
	"line-get-propietarios":{
		status_http:200,
		name:"EXPRESOS MARA",
		code:"PIDF0007",
		results:[
			{"realm":"cuyawa","id":"08a40830-9877-11eb-a704-ff3a36469e8b","alias":"CQUNaf","type":"NATURAL_PERSON","country":"VE","business_name":"MARQUEZ, HENNELY","first_name":"HENNELY","last_name":"MARQUEZ","id_doc_type":"CI","id_doc":"V111112222","phone_deflt":"04141111111","phones":["04141111111"],"email_deflt":"hgmarquezm@gmail.com","emails":["hgmarquezm@gmail.com"],"lock":false,"created_at":"2021-04-08T14:30:57.904749Z","created_by":"hgmarquezm@gmail.com","line":"EXPRESOS MARA S.A",cars:7,status:"ACTIVE"},
			{"realm":"cuyawa","id":"d0aa03c0-9264-11eb-846e-cb101e97f4d7","alias":"MAR","type":"NATURAL_PERSON","country":"VE","business_name":"RODRIGUEZ, MARTHA","first_name":"MARTHA","last_name":"RODRIGUEZ","id_doc_type":"CI","id_doc":"V011111111","favorites_products":[],"customer_products_deflt":"d0aa03c0-9264-11eb-846e-cb101e97f4d7","customer_products":["d0aa03c0-9264-11eb-846e-cb101e97f4d7"],"payment_cards":[],"phone_deflt":"58414936538","phones":["58414936538"],"email_deflt":"vcaldera096@gmail.com","emails":["vcaldera096@gmail.com"],"lock":false,"created_at":"2021-03-31T21:05:26.053Z","created_by":"vcaldera096@gmail.com","updated_at":"2021-03-31T21:06:01.602Z","addresses":[],"bank_accounts":[],"line":"EXPRESOS MARA S.A",status:"ACTIVE"},
			{"realm":"cuyawa","id":"0ebc4690-85a5-11eb-af1a-79d4d68f5a03","alias":"ARMADELYS","type":"NATURAL_PERSON","country":"VE","business_name":"GONZALEZ, ARMADELYS","first_name":"ARMADELYS","last_name":"GONZALEZ","id_doc_type":"CI","id_doc":"V017318902","favorites_products":[],"customer_products_deflt":"0ebc4690-85a5-11eb-af1a-79d4d68f5a03","customer_products":["0ebc4690-85a5-11eb-af1a-79d4d68f5a03"],"payment_cards":[],"phone_deflt":"04123782666","phones":["04123782666"],"email_deflt":"armadelys.gonzalez@credicard.com.ve","emails":["armadelys.gonzalez@credicard.com.ve"],"lock":false,"created_at":"2021-03-15T15:42:32.863Z","created_by":"armadelys.gonzalez@credicard.com.ve","updated_at":"2021-03-15T15:45:48.284Z","addresses":[],"bank_accounts":[],"line":"EXPRESOS MARA S.A",status:"INACTIVE"},
			{"realm":"cuyawa","id":"b34e6540-836f-11eb-aea5-b57aa2feeb84","alias":"AJte0v","type":"NATURAL_PERSON","country":"VE","business_name":"TEST, TEST","first_name":"TEST","last_name":"TEST","id_doc_type":"CI","id_doc":"V111111111","favorites_products":[],"customer_products_deflt":"b34e6540-836f-11eb-aea5-b57aa2feeb84","customer_products":["b34e6540-836f-11eb-aea5-b57aa2feeb84"],"payment_cards":[],"phones":[],"email_deflt":"yzlup2@gmail.com","emails":["yzlup2@gmail.com"],"lock":false,"created_at":"2021-03-12T20:15:34.067Z","created_by":"yzlup2@gmail.com","updated_at":"2021-03-12T21:00:10.699Z","addresses":[],"bank_accounts":[],"line":"EXPRESOS MARA S.A",status:"ACTIVE"},
			{"realm":"cuyawa","id":"5e4da290-67e5-11eb-ab01-198fca500e3f","alias":"MsXFSt","type":"NATURAL_PERSON","country":"VE","business_name":"ULLOA, YAZAL","first_name":"YAZAL","last_name":"ULLOA","id_doc_type":"CI","id_doc":"V563426538","favorites_products":[],"customer_products_deflt":"5e4da290-67e5-11eb-ab01-198fca500e3f","customer_products":["5e4da290-67e5-11eb-ab01-198fca500e3f"],"payment_cards":[],"phones":[],"email_deflt":"yazalulloa@gmail.com","emails":["yazalulloa@gmail.com"],"lock":false,"created_at":"2021-02-05T19:07:19.376Z","created_by":"yazalulloa@gmail.com","updated_at":"2021-02-05T19:08:09.075Z","addresses":[],"bank_accounts":[],"line":"EXPRESOS EJECUTIVOS C.A",cars:3,status:"ACTIVE"},
			{"realm":"cuyawa","id":"1fdf4260-60e3-11eb-955d-07ffb3924c99","alias":"IST 77","type":"LEGAL_PERSON","country":"VE","business_name":"PRUEBA IST","id_doc_type":"RIF","id_doc":"J000000001","favorites_products":[],"customer_products_deflt":"1fdf4260-60e3-11eb-955d-07ffb3924c99","customer_products":["1fdf4260-60e3-11eb-955d-07ffb3924c99"],"payment_cards":[],"phones":[],"email_deflt":"adquirienteist77@gmail.com","emails":["adquirienteist77@gmail.com"],"lock":false,"created_at":"2021-01-27T21:03:37.662Z","created_by":"adquirienteist77@gmail.com","updated_at":"2021-01-27T21:04:49.293Z","addresses":[],"bank_accounts":[],cars:1,status:"INACTIVE"},
			{"realm":"cuyawa","id":"e8f18750-4f6b-11eb-a949-47842556d35c","alias":"PEPE","type":"NATURAL_PERSON","country":"VE","business_name":"RIVAS, PEDRO","first_name":"PEDRO","last_name":"RIVAS","id_doc_type":"CI","id_doc":"V130760534","favorites_products":[],"customer_products_deflt":"e8f18750-4f6b-11eb-a949-47842556d35c","customer_products":["e8f18750-4f6b-11eb-a949-47842556d35c"],"payment_cards":[],"phone_deflt":"04120889747","phones":["04120889747"],"email_deflt":"pedror130@gmail.com","emails":["pedror130@gmail.com"],"lock":false,"created_at":"2021-01-05T15:37:25.404Z","created_by":"pedror130@gmail.com","updated_at":"2021-01-05T15:38:42.426Z","addresses":[],"bank_accounts":[],cars:1,status:"ACTIVE"},
			{"realm":"cuyawa","id":"10fbabe0-4ae4-11eb-af0d-cb2c8b1949d6","alias":"SADAN","type":"NATURAL_PERSON","country":"VE","business_name":"SADAN, KEVIN","first_name":"KEVIN","last_name":"SADAN","id_doc_type":"CI","id_doc":"V025430110","favorites_products":[],"customer_products_deflt":"10fbabe0-4ae4-11eb-af0d-cb2c8b1949d6","customer_products":["10fbabe0-4ae4-11eb-af0d-cb2c8b1949d6"],"payment_cards":[],"phone_deflt":"04241546412","phones":["04241546412"],"email_deflt":"saadann25@gmail.com","emails":["saadann25@gmail.com"],"lock":false,"created_at":"2020-12-30T21:14:56.375Z","created_by":"saadann25@gmail.com","updated_at":"2020-12-30T21:15:32.914Z","addresses":[],"bank_accounts":[],cars:3,status:"ACTIVE"},
			{"realm":"cuyawa","id":"39ff0fe0-4ac2-11eb-b133-fd675d04e6b2","alias":"CABRERAVICTOR1979","type":"NATURAL_PERSON","country":"VE","business_name":"CABRERA ARISTIGUETA, VICTOR ATILIO","first_name":"VICTOR ATILIO","last_name":"CABRERA ARISTIGUETA","id_doc_type":"CI","id_doc":"V015724116","favorites_products":[],"customer_products_deflt":"39ff0fe0-4ac2-11eb-b133-fd675d04e6b2","customer_products":["39ff0fe0-4ac2-11eb-b133-fd675d04e6b2"],"payment_cards":[],"phone_deflt":"04142426388","phones":["04142426388"],"email_deflt":"cabreravictor1979@gmail.com","emails":["cabreravictor1979@gmail.com"],"lock":false,"created_at":"2020-12-30T17:12:42.3Z","created_by":"cabreravictor1979@gmail.com","updated_at":"2020-12-30T17:15:24.255Z","addresses":[],"bank_accounts":[],cars:1,status:"ACTIVE"},
			{"realm":"cuyawa","id":"07aa1830-398a-11eb-b707-3be385b66f46","alias":"xIvshe","type":"LEGAL_PERSON","country":"VE","business_name":"PRUEBA","id_doc_type":"RIF","id_doc":"G200100249","favorites_products":[],"customer_products":[],"payment_cards":[],"phones":[],"email_deflt":"afiliadoprueba12@gmail.com","emails":["afiliadoprueba12@gmail.com"],"lock":false,"created_at":"2020-12-08T19:17:36.212Z","created_by":"afiliadoprueba12@gmail.com","addresses":[],"bank_accounts":[],cars:2,status:"ACTIVE"}
		],
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"
		}
	},
	"line-get-cars":{
		status_http:200,
		name:"EXPRESOS MARA",
		code:"PIDF0007",
		results:[
			{
				placa:"00AADMA",
				carroceria:"8XL6GC11D2E001576",
				brand:"ENCAVA ENT61032",
				color:"BLANCO MULTICOLOR",
				year:"2002",
				cap:32,
				propietario:"OSCAR OSBEY DEPABLOS",
				line:"EXPRESOS MARA",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				placa:"00AA11H",
				carroceria:"8ZBENJ7Y07V300175",
				brand:"CHEVROLET NPR",
				line:"EXPRESOS MARA",
				color:"BLANCO MULTICOLOR",
				year:"2007",
				cap:32,
				propietario:"LUIS EDUARDO NUMPER",
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				placa:"01AADNE",
				carroceria:"I4282",
				brand:"ENCAVA",
				line:"EXPRESOS MARA",
				color:"BLANCO MULTICOLOR",
				year:"1990",
				cap:32,
				propietario:"JOSE ALEXANDER SANCHEZ",
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			}],
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"
		}
	},
	"route-report":{
		status_http:200,
		count:4,
		first_page: "offset=0&limit=10",
		previous_page: "offset=0&limit=10",
		last_page: "offset=0&limit=10",
		next_page: "offset=0&limit=10",
		results:[
			{
				id:"1",
				code:"001",
				line:"EXPRESOS MARA",
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"ANA",name_llegada:"Anaco",punto_llegada:"Terminal de Anaco", amount:"40.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"TIG",name_llegada:"El tigre",punto_llegada:"Terminal del Tigre", amount:"50.000.000,00", coin:"Bs"},
					{id:"4",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"POZ",name_llegada:"Puerto Ordaz",punto_llegada:"Terminal de Puerto Ordaz", amount:"60.000.000,00", coin:"Bs"},
					{id:"5",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"SAN",name_llegada:"San Felix",punto_llegada:"Terminal de San Félix", amount:"65.000.000,00", coin:"Bs"}
				],
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"2",
				code:"002",
				line:"EXPRESOS LOS LLANOS",
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"GUA",name_llegada:"El sombrero",punto_llegada:"Terminal del Sombrero", amount:"50.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"3",
				code:"003",
				line:"AUTOEXPRESOS EJECUTIVOS",
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"}, 
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MAT",name_llegada:"Maturin",punto_llegada:"Terminal de Maturin", amount:"65.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"4",
				code:"004",
				line:"AUTOEXPRESOS EJECUTIVOS",
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MAT",name_llegada:"Maturin",punto_llegada:"Terminal de Maturin", amount:"65.000.000,00", coin:"Bs"},
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la ",llegada_parada:"GUA",name_llegada:"Caripe del Guaracharo",punto_llegada:"Parada de pasajeros", amount:"75.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
		]	
	},
	"route-delete":{
		status_http:200,
		msg:"Route delete success"
	},
	"route-active":{
		status_http:200,
		id:"1",
		code:"001",
		line:"EXPRESOS MARA",
		trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"ANA",name_llegada:"Anaco",punto_llegada:"Terminal de Anaco", amount:"40.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"TIG",name_llegada:"El tigre",punto_llegada:"Terminal del Tigre", amount:"50.000.000,00", coin:"Bs"},
					{id:"4",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"POZ",name_llegada:"Puerto Ordaz",punto_llegada:"Terminal de Puerto Ordaz", amount:"60.000.000,00", coin:"Bs"},
					{id:"5",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"SAN",name_llegada:"San Felix",punto_llegada:"Terminal de San Félix", amount:"65.000.000,00", coin:"Bs"}
		],
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"	
		}
	},
	"route-inactive":{
		status_http:200,
		id:"2",
		code:"002",
		line:"EXPRESOS LOS LLANOS",
		trayectos:[
			{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
			{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"},
			{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"GUA",name_llegada:"El sombrero",punto_llegada:"Terminal del Sombrero", amount:"50.000.000,00", coin:"Bs"}
		],
		status:"INACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"
		}
	},
	"route-post":{
		status_http:200,
		id:"1",
		code:"001",
		line:"EXPRESOS MARA",
		trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"ANA",name_llegada:"Anaco",punto_llegada:"Terminal de Anaco", amount:"40.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"TIG",name_llegada:"El tigre",punto_llegada:"Terminal del Tigre", amount:"50.000.000,00", coin:"Bs"},
					{id:"4",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"POZ",name_llegada:"Puerto Ordaz",punto_llegada:"Terminal de Puerto Ordaz", amount:"60.000.000,00", coin:"Bs"},
					{id:"5",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"SAN",name_llegada:"San Felix",punto_llegada:"Terminal de San Félix", amount:"65.000.000,00", coin:"Bs"}
		],
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com"
		}
	},
	"route-put":{
		status_http:200,
		id:"1",
		code:"001",
		line:"EXPRESOS MARA",
		trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"ANA",name_llegada:"Anaco",punto_llegada:"Terminal de Anaco", amount:"40.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"TIG",name_llegada:"El tigre",punto_llegada:"Terminal del Tigre", amount:"50.000.000,00", coin:"Bs"},
					{id:"4",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"POZ",name_llegada:"Puerto Ordaz",punto_llegada:"Terminal de Puerto Ordaz", amount:"60.000.000,00", coin:"Bs"},
					{id:"5",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"SAN",name_llegada:"San Felix",punto_llegada:"Terminal de San Félix", amount:"65.000.000,00", coin:"Bs"}
		],
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com",
			updated_at:"2021-05-26T01:55:01.008Z",
			updated_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			updated_by_email:"admin@paguetodo.com"	
		}
	},
	"route-get":{
		status_http:200,
		id:"1",
		code:"001",
		line:"EXPRESOS MARA",
		trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"ANA",name_llegada:"Anaco",punto_llegada:"Terminal de Anaco", amount:"40.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"TIG",name_llegada:"El tigre",punto_llegada:"Terminal del Tigre", amount:"50.000.000,00", coin:"Bs"},
					{id:"4",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"POZ",name_llegada:"Puerto Ordaz",punto_llegada:"Terminal de Puerto Ordaz", amount:"60.000.000,00", coin:"Bs"},
					{id:"5",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"SAN",name_llegada:"San Felix",punto_llegada:"Terminal de San Félix", amount:"65.000.000,00", coin:"Bs"}
		],
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com"
		}
	},
	"schedule-report":{
		status_http:200,
		count:8,
		first_page: "offset=0&limit=10",
		previous_page: "offset=0&limit=10",
		last_page: "offset=0&limit=10",
		next_page: "offset=0&limit=10",
		results:[
			{
				id:"1",
				code:"001",
				line:"EXPRESOS MARA",
				schedule:"08:00 pm",
				days:["Lunes","Martes","Miercoles","Jueves"],
				feriados:false,
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"ANA",name_llegada:"Anaco",punto_llegada:"Terminal de Anaco", amount:"40.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"TIG",name_llegada:"El tigre",punto_llegada:"Terminal del Tigre", amount:"50.000.000,00", coin:"Bs"},
					{id:"4",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"POZ",name_llegada:"Puerto Ordaz",punto_llegada:"Terminal de Puerto Ordaz", amount:"60.000.000,00", coin:"Bs"},
					{id:"5",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"SAN",name_llegada:"San Felix",punto_llegada:"Terminal de San Félix", amount:"65.000.000,00", coin:"Bs"}
				],
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"2",
				code:"002",
				line:"EXPRESOS LOS LLANOS",
				schedule:"09:00 pm",
				feriados:true,
				days:["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"],
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"GUA",name_llegada:"El sombrero",punto_llegada:"Terminal del Sombrero", amount:"50.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"3",
				code:"003",
				line:"AUTOEXPRESOS EJECUTIVOS",
				schedule:"10:00 am",
				days:["Lunes"],
				feriados:true,
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"}, 
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MAT",name_llegada:"Maturin",punto_llegada:"Terminal de Maturin", amount:"65.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"4",
				code:"004",
				line:"AUTOEXPRESOS EJECUTIVOS",
				schedule:"11:00 am",
				feriados:false,
				days:["Martes","Miercoles"],
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MAT",name_llegada:"Maturin",punto_llegada:"Terminal de Maturin", amount:"65.000.000,00", coin:"Bs"},
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la ",llegada_parada:"GUA",name_llegada:"Caripe del Guaracharo",punto_llegada:"Parada de pasajeros", amount:"75.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"5",
				code:"005",
				line:"EXPRESOS MARA",
				schedule:"09:00 pm",
				days:["Lunes","Martes","Miercoles","Jueves"],
				feriados:false,
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"ANA",name_llegada:"Anaco",punto_llegada:"Terminal de Anaco", amount:"40.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"TIG",name_llegada:"El tigre",punto_llegada:"Terminal del Tigre", amount:"50.000.000,00", coin:"Bs"},
					{id:"4",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"POZ",name_llegada:"Puerto Ordaz",punto_llegada:"Terminal de Puerto Ordaz", amount:"60.000.000,00", coin:"Bs"},
					{id:"5",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"SAN",name_llegada:"San Felix",punto_llegada:"Terminal de San Félix", amount:"65.000.000,00", coin:"Bs"}
				],
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"6",
				code:"002",
				line:"EXPRESOS LOS LLANOS",
				schedule:"11:00 am",
				days:["Lunes","Martes","Miercoles","Jueves","Viernes"],
				feriados:true,
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"GUA",name_llegada:"El sombrero",punto_llegada:"Terminal del Sombrero", amount:"50.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"7",
				code:"003",
				line:"AUTOEXPRESOS EJECUTIVOS",
				schedule:"12:00 pm",
				days:["Domingo"],
				feriados:false,
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"}, 
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MAT",name_llegada:"Maturin",punto_llegada:"Terminal de Maturin", amount:"65.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"8",
				code:"004",
				line:"AUTOEXPRESOS EJECUTIVOS",
				schedule:"1:00 pm",
				days:["Sabados"],
				feriados:false,
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MAT",name_llegada:"Maturin",punto_llegada:"Terminal de Maturin", amount:"65.000.000,00", coin:"Bs"},
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la ",llegada_parada:"GUA",name_llegada:"Caripe del Guaracharo",punto_llegada:"Parada de pasajeros", amount:"75.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"9",
				code:"010",
				line:"RAPIDOS 1",
				schedule_init:"08:00 am",
				schedule_end:"08:00 pm",
				frequency:"30 minutos",
				days:["Lunes","Martes","Miercoles","Jueves"],
				feriados:false,
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"10.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"10",
				code:"010",
				line:"RAPIDOS 1",
				schedule_init:"08:00 am",
				schedule_end:"05:00 pm",
				frequency:"15 minutos",
				days:["Lunes","Martes","Miercoles","Jueves"],
				feriados:false,
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de maracay", amount:"10.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
		]	
	},
	"schedule-delete":{
		status_http:200,
		msg:"Schedule delete success"
	},
	"schedule-active":{
		status_http:200,
		id:"1",
		code:"001",
		line:"EXPRESOS MARA",
		schedule:"08:00 pm",
		days:["Lunes","Martes","Miercoles","Jueves"],
		feriados:false,
		trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"ANA",name_llegada:"Anaco",punto_llegada:"Terminal de Anaco", amount:"40.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"TIG",name_llegada:"El tigre",punto_llegada:"Terminal del Tigre", amount:"50.000.000,00", coin:"Bs"},
					{id:"4",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"POZ",name_llegada:"Puerto Ordaz",punto_llegada:"Terminal de Puerto Ordaz", amount:"60.000.000,00", coin:"Bs"},
					{id:"5",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"SAN",name_llegada:"San Felix",punto_llegada:"Terminal de San Félix", amount:"65.000.000,00", coin:"Bs"}
		],
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com"	
		}
	},
	"schedule-inactive":{
		status_http:200,
		id:"2",
		code:"002",
		line:"EXPRESOS LOS LLANOS",
		schedule:"09:00 pm",
		feriados:true,
		days:["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"],
		trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"GUA",name_llegada:"El sombrero",punto_llegada:"Terminal del Sombrero", amount:"50.000.000,00", coin:"Bs"}
		],
		status:"INACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com"	
		}
	},
	"schedule-post":{
		status_http:200,
		id:"2",
		code:"002",
		line:"EXPRESOS LOS LLANOS",
		schedule:"09:00 pm",
		feriados:true,
		days:["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"],
		trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"GUA",name_llegada:"El sombrero",punto_llegada:"Terminal del Sombrero", amount:"50.000.000,00", coin:"Bs"}
		],
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com"	
		}
	},
	"schedule-get":{
		status_http:200,
		id:"2",
		code:"002",
		line:"EXPRESOS LOS LLANOS",
		schedule:"09:00",
		feriados:true,
		days:["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"],
		trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"GUA",name_llegada:"El sombrero",punto_llegada:"Terminal del Sombrero", amount:"50.000.000,00", coin:"Bs"}
		],
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com"	
		}
	},
	"schedule-put":{
		status_http:200,
		id:"2",
		code:"002",
		line:"EXPRESOS LOS LLANOS",
		schedule:"09:00",
		feriados:true,
		days:["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"],
		trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"GUA",name_llegada:"El sombrero",punto_llegada:"Terminal del Sombrero", amount:"50.000.000,00", coin:"Bs"}
		],
		status:"ACTIVE",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com"	
		}
	},
	"travel-report":{
		status_http:200,
		count:10,
		first_page: "offset=0&limit=10",
		previous_page: "offset=0&limit=10",
		last_page: "offset=0&limit=10",
		next_page: "offset=0&limit=10",
		results:[
			{
				id:"1",
				code:"001",
				cap:60,
				disp:10,
				ocup:50,
				line:"EXPRESOS MARA",
				date:"2021-05-28",
				schedule:"08:00 pm",
				drivers:[{business_name:"JOSE MARTINEZ",id_doc:"V123456789"},{business_name:"CARLOS PEREZ",id_doc:"V123456789"}],
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"ANA",name_llegada:"Anaco",punto_llegada:"Terminal de Anaco", amount:"40.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"TIG",name_llegada:"El tigre",punto_llegada:"Terminal del Tigre", amount:"50.000.000,00", coin:"Bs"},
					{id:"4",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"POZ",name_llegada:"Puerto Ordaz",punto_llegada:"Terminal de Puerto Ordaz", amount:"60.000.000,00", coin:"Bs"},
					{id:"5",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"SAN",name_llegada:"San Felix",punto_llegada:"Terminal de San Félix", amount:"65.000.000,00", coin:"Bs"}
				],
				"car":{
					placa:"01AADNE",
					carroceria:"I4282",
					brand:"ENCAVA",
					line:"EXPRESOS MARA",
					color:"BLANCO MULTICOLOR",
					year:"1990",
					cap:32,
					propietario:"JOSE ALEXANDER SANCHEZ",
					status:"ACTIVE"
				},
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"2",
				code:"002",
				cap:60,
				disp:25,
				ocup:35,
				line:"EXPRESOS LOS LLANOS",
				schedule:"09:00 pm",
				date:"2021-05-28",
				drivers:[{business_name:"ANDRES LOPEZ",id_doc:"V1111111"},{business_name:"ALEXANDER RODON",id_doc:"20200578"}],
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"GUA",name_llegada:"El sombrero",punto_llegada:"Terminal del Sombrero", amount:"50.000.000,00", coin:"Bs"}
				],
				status:"INACTIVE",
				"car":{
					placa:"00AADMA",
					carroceria:"8XL6GC11D2E001576",
					brand:"ENCAVA ENT61032",
					color:"BLANCO MULTICOLOR",
					year:"2002",
					cap:32,
					type:"HIPER",
					propietario:"OSCAR OSBEY DEPABLOS",
					line:"EXPRESOS MARA",
					status:"INACTIVE",
				},
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"3",
				code:"003",
				cap:60,
				disp:45,
				ocup:15,
				line:"AUTOEXPRESOS EJECUTIVOS",
				schedule:"10:00 am",
				date:"2021-05-29",
				drivers:[{business_name:"LEANDRO CASADIEGO",id_doc:"V23456780"},{business_name:"LUIS PRADO",id_doc:"V11345678"}],
				"car":{
					placa:"00AADMA",
					carroceria:"8XL6GC11D2E001576",
					brand:"ENCAVA ENT61032",
					color:"BLANCO MULTICOLOR",
					year:"2002",
					cap:32,
					type:"HIPER",
					propietario:"OSCAR OSBEY DEPABLOS",
					line:"EXPRESOS MARA",
					status:"INACTIVE",
				},
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"}, 
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MAT",name_llegada:"Maturin",punto_llegada:"Terminal de Maturin", amount:"65.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"4",
				code:"004",
				line:"AUTOEXPRESOS EJECUTIVOS",
				schedule:"11:00 am",
				date:"2021-05-29",
				cap:60,
				disp:50,
				ocup:10,
				drivers:[{business_name:"ABRAHAM PEREZ",id_doc:"V17666789"},{business_name:"JOSE ESPINOZA",id_doc:"V16789000"}],
				"car":{
					placa:"00AADMA",
					carroceria:"8XL6GC11D2E001576",
					brand:"ENCAVA ENT61032",
					color:"BLANCO MULTICOLOR",
					year:"2002",
					cap:32,
					type:"HIPER",
					propietario:"OSCAR OSBEY DEPABLOS",
					line:"EXPRESOS MARA",
					status:"INACTIVE",
				},
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MAT",name_llegada:"Maturin",punto_llegada:"Terminal de Maturin", amount:"65.000.000,00", coin:"Bs"},
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la ",llegada_parada:"GUA",name_llegada:"Caripe del Guaracharo",punto_llegada:"Parada de pasajeros", amount:"75.000.000,00", coin:"Bs"}
				],
				status:"CLOSED",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"5",
				cap:60,
				disp:0,
				ocup:60,
				code:"005",
				line:"EXPRESOS MARA",
				schedule:"09:00 pm",
				date:"2021-05-30",
				drivers:[{business_name:"ABRAHAM PEREZ",id_doc:"V17666789"},{business_name:"JOSE ESPINOZA",id_doc:"V16789000"}],
				"car":{
					placa:"00AADMA",
					carroceria:"8XL6GC11D2E001576",
					brand:"ENCAVA ENT61032",
					color:"BLANCO MULTICOLOR",
					year:"2002",
					cap:32,
					type:"HIPER",
					propietario:"OSCAR OSBEY DEPABLOS",
					line:"EXPRESOS MARA",
					status:"INACTIVE",
				},
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"ANA",name_llegada:"Anaco",punto_llegada:"Terminal de Anaco", amount:"40.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"TIG",name_llegada:"El tigre",punto_llegada:"Terminal del Tigre", amount:"50.000.000,00", coin:"Bs"},
					{id:"4",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"POZ",name_llegada:"Puerto Ordaz",punto_llegada:"Terminal de Puerto Ordaz", amount:"60.000.000,00", coin:"Bs"},
					{id:"5",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"SAN",name_llegada:"San Felix",punto_llegada:"Terminal de San Félix", amount:"65.000.000,00", coin:"Bs"}
				],
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"6",
				code:"002",
				cap:60,
				disp:60,
				ocup:0,
				line:"EXPRESOS LOS LLANOS",
				drivers:[{business_name:"CARLOS MENDEZ",id_doc:"V188888888"},{business_name:"JOSE MARQUEZ",id_doc:"V5356546"}],
				schedule:"11:00 am",
				date:"2021-05-29",
				"car":{
					placa:"00AADMA",
					carroceria:"8XL6GC11D2E001576",
					brand:"ENCAVA ENT61032",
					color:"BLANCO MULTICOLOR",
					year:"2002",
					cap:32,
					type:"HIPER",
					propietario:"OSCAR OSBEY DEPABLOS",
					line:"EXPRESOS MARA",
					status:"INACTIVE",
				},
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"GUA",name_llegada:"El sombrero",punto_llegada:"Terminal del Sombrero", amount:"50.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"7",
				code:"003",
				line:"AUTOEXPRESOS EJECUTIVOS",
				schedule:"12:00 pm",
				date:"2021-05-29",
				cap:60,
				disp:30,
				ocup:30,
				"car":{
					placa:"00AADMA",
					carroceria:"8XL6GC11D2E001576",
					brand:"ENCAVA ENT61032",
					color:"BLANCO MULTICOLOR",
					year:"2002",
					cap:32,
					type:"HIPER",
					propietario:"OSCAR OSBEY DEPABLOS",
					line:"EXPRESOS MARA",
					status:"INACTIVE",
				},
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"}, 
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MAT",name_llegada:"Maturin",punto_llegada:"Terminal de Maturin", amount:"65.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"8",
				code:"004",
				line:"AUTOEXPRESOS EJECUTIVOS",
				schedule:"1:00 pm",
				date:"2021-05-30",
				cap:60,
				disp:40,
				ocup:20,
				drivers:[{business_name:"LOPEZ OBRADOR",id_doc:"V1333333"},{business_name:"SIMON BOLIVAR",id_doc:"V555555555"}],
				car:{
					placa:"001AC3WS",
					carroceria:"8XL6GC11D7E003881",
					brand:"ENCAVA ENT61032",
					color:"BLANCO MULTICOLOR",
					year:"2007",
					cap:32,
					propietario:"MARTHA VICTORIA RODRIGUEZ",
					status:"ACTIVE"
				},
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MAT",name_llegada:"Maturin",punto_llegada:"Terminal de Maturin", amount:"65.000.000,00", coin:"Bs"},
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la ",llegada_parada:"GUA",name_llegada:"Caripe del Guaracharo",punto_llegada:"Parada de pasajeros", amount:"75.000.000,00", coin:"Bs"}
				],
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"9",
				code:"010",
				date:"2021-05-27",
				schedule:"09:00 am",
				cap:32,
				disp:10,
				ocup:22,
				drivers:[{business_name:"JOSE ESPINOZA",id_doc:"V16789000"}],
				"car":{
					placa:"00AADMA",
					carroceria:"8XL6GC11D2E001576",
					brand:"ENCAVA ENT61032",
					color:"BLANCO MULTICOLOR",
					year:"2002",
					cap:32,
					type:"HIPER",
					propietario:"OSCAR OSBEY DEPABLOS",
					line:"EXPRESOS MARA",
					status:"INACTIVE",
				},
				line:"RAPIDOS 1",
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"10.000.000,00", coin:"Bs"}
				],
				status:"COMPLETED",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
			{
				id:"10",
				code:"010",
				line:"RAPIDOS 1",
				date:"2021-05-28",
				schedule:"09:00 am",
				cap:5,
				disp:0,
				ocup:5,
				drivers:[{business_name:"MONICA PEREZ",id_doc:"V17655589"}],
				"car":{
					placa:"00AADMA",
					carroceria:"8XL6GC11D2E001576",
					brand:"ENCAVA ENT61032",
					color:"BLANCO MULTICOLOR",
					year:"2002",
					cap:32,
					type:"HIPER",
					propietario:"OSCAR OSBEY DEPABLOS",
					line:"EXPRESOS MARA",
					status:"INACTIVE",
				},
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de maracay", amount:"10.000.000,00", coin:"Bs"}
				],
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
			},
		]	
	},
	"travel-delete":{
		status_http:200,
		msg:"Viaje delete success"
	},
	"travel-active":{
		status_http:200,
				id:"1",
				code:"001",
				cap:60,
				disp:10,
				ocup:50,
				line:"EXPRESOS MARA",
				date:"2021-05-28",
				schedule:"08:00 pm",
				drivers:[{business_name:"JOSE MARTINEZ",id_doc:"V123456789"},{business_name:"CARLOS PEREZ",id_doc:"V123456789"}],
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"ANA",name_llegada:"Anaco",punto_llegada:"Terminal de Anaco", amount:"40.000.000,00", coin:"Bs"},
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"TIG",name_llegada:"El tigre",punto_llegada:"Terminal del Tigre", amount:"50.000.000,00", coin:"Bs"},
					{id:"4",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"POZ",name_llegada:"Puerto Ordaz",punto_llegada:"Terminal de Puerto Ordaz", amount:"60.000.000,00", coin:"Bs"},
					{id:"5",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"SAN",name_llegada:"San Felix",punto_llegada:"Terminal de San Félix", amount:"65.000.000,00", coin:"Bs"}
				],
				"car":{
					placa:"01AADNE",
					carroceria:"I4282",
					brand:"ENCAVA",
					line:"EXPRESOS MARA",
					color:"BLANCO MULTICOLOR",
					year:"1990",
					cap:32,
					propietario:"JOSE ALEXANDER SANCHEZ",
					status:"ACTIVE"
				},
				status:"ACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
	},
	"travel-inactive":{
		status_http:200,
				id:"3",
				code:"003",
				cap:60,
				disp:45,
				ocup:15,
				line:"AUTOEXPRESOS EJECUTIVOS",
				schedule:"10:00 am",
				date:"2021-05-29",
				drivers:[{business_name:"LEANDRO CASADIEGO",id_doc:"V23456780"},{business_name:"LUIS PRADO",id_doc:"V11345678"}],
				"car":{
					placa:"00AADMA",
					carroceria:"8XL6GC11D2E001576",
					brand:"ENCAVA ENT61032",
					color:"BLANCO MULTICOLOR",
					year:"2002",
					cap:32,
					type:"HIPER",
					propietario:"OSCAR OSBEY DEPABLOS",
					line:"EXPRESOS MARA",
					status:"INACTIVE",
				},
				trayectos:[
					{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
					{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"}, 
					{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MAT",name_llegada:"Maturin",punto_llegada:"Terminal de Maturin", amount:"65.000.000,00", coin:"Bs"}
				],
				status:"INACTIVE",
				info:{
					created_at:"2021-03-23T01:55:01.008Z",
					created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
					created_by_email:"admin@paguetodo.com"	
				}
	},
	"travel-complete":{
		status_http:200,
		id:"3",
		code:"003",
		cap:60,
		disp:45,
		ocup:15,
		line:"AUTOEXPRESOS EJECUTIVOS",
		schedule:"10:00 am",
		date:"2021-05-29",
		drivers:[{business_name:"LEANDRO CASADIEGO",id_doc:"V23456780"},{business_name:"LUIS PRADO",id_doc:"V11345678"}],
		"car":{
			placa:"00AADMA",
			carroceria:"8XL6GC11D2E001576",
			brand:"ENCAVA ENT61032",
			color:"BLANCO MULTICOLOR",
			year:"2002",
			cap:32,
			type:"HIPER",
			propietario:"OSCAR OSBEY DEPABLOS",
			line:"EXPRESOS MARA",
			status:"INACTIVE",
		},
		trayectos:[
			{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
			{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"}, 
			{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MAT",name_llegada:"Maturin",punto_llegada:"Terminal de Maturin", amount:"65.000.000,00", coin:"Bs"}
		],
		status:"COMPLETED",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com"	
		}
	},
	"travel-cancel":{
		status_http:200,
		id:"3",
		code:"003",
		cap:60,
		disp:45,
		ocup:15,
		line:"AUTOEXPRESOS EJECUTIVOS",
		schedule:"10:00 am",
		date:"2021-05-29",
		drivers:[{business_name:"LEANDRO CASADIEGO",id_doc:"V23456780"},{business_name:"LUIS PRADO",id_doc:"V11345678"}],
		"car":{
			placa:"00AADMA",
			carroceria:"8XL6GC11D2E001576",
			brand:"ENCAVA ENT61032",
			color:"BLANCO MULTICOLOR",
			year:"2002",
			cap:32,
			type:"HIPER",
			propietario:"OSCAR OSBEY DEPABLOS",
			line:"EXPRESOS MARA",
			status:"INACTIVE",
		},
		trayectos:[
			{id:"1",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"VAL",name_llegada:"Valencia",punto_llegada:"Terminal de valencia", amount:"30.000.000,00", coin:"Bs"}, 
			{id:"2",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MRY",name_llegada:"Maracay",punto_llegada:"Terminal de Maracay", amount:"35.000.000,00", coin:"Bs"}, 
			{id:"3",salida_parada:"CCS",name_salida:"Caracas",punto_salida:"Terminal de la bandera",llegada_parada:"MAT",name_llegada:"Maturin",punto_llegada:"Terminal de Maturin", amount:"65.000.000,00", coin:"Bs"}
		],
		status:"CANCELED",
		info:{
			created_at:"2021-03-23T01:55:01.008Z",
			created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",
			created_by_email:"admin@paguetodo.com"	
		}
	},
	"config-general-post":{
		status_http:200,
		msg:"SUCCESS"
	},
	"config-general-get":{
		status_http:200,
		currencys:["VES"],
		currency_init:"USD",
		unity_init:100,
		currency_end:"VES",
		unity_end:53090000
	},
	"controlnumber-delete":{
		status_http:200,
		realm:"cuyawa",
		id:"9243ab50-caae-11ea-8120-919ed15f1e8b",
		order: "1",
		control_init:"100",
		control_end:"999",
		info:{created_at:"2018-07-16T20:25:11.100874Z",created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",created_by_email:"admin@paguetodo.com"}
	},
	"controlnumber-post":{
		status_http:200,
		realm:"cuyawa",
		id:"9243ab50-caae-11ea-8120-919ed15f1e8b",
		order: "1",
		control_init:"100",
		control_end:"999",
		info:{created_at:"2018-07-16T20:25:11.100874Z",created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",created_by_email:"admin@paguetodo.com"}
	},
	"invoice-report":{
		status_http:200,
		count:1,
		first_page: "offset=0&limit=10",
		last_page: null,
		next_page: null,
		results:[
			{
				realm:"cuyawa",
				id:"9243ab50-caae-11ea-8120-919ed15f1e8b",emition_date: "2018-07-16T20:25:11.100874Z",control_number:"12040409",invoice_number:"1123",client_name:"RAUL GUZMAN",client_id_doc:"V14678098",amount:1212345678,status:"PAID",info:{created_at:"2018-07-16T20:25:11.100874Z",created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",created_by_email:"admin@paguetodo.com"}}
		]
	},
	"invoice-post":{
		status_http:200,
		message:"OK"
	},
	"invoice-get":{
		status_http:200,
		realm:"cuyawa",
		id:"9243ab50-caae-11ea-8120-919ed15f1e8b",
		emition_date: "2018-07-16T20:25:11.100874Z",
		control_number:"12040409",
		invoice_number:"1123",
		currency:"Bs",
		value_tax:16,
		tax:6098,
		total:39998,
		business_info:{
			business_name:"CONSORCIO CREDICARD C.A",
			id_doc_type:"RIF",
			id_doc:" J002664436",
			url_imagen:"https://paguetodo.com/wp-content/uploads/2020/04/Logo-Credicard-vertical.png",
			address:"Av.Principal El Bosque, entre Av. Santa Lucia y Santa Isabel. Edif. Torre Credicard, Piso 19 y 20. Ofic: 3315051302 Urb. El Bosque, Caracas (Chacao) Miranda. Zona Postal 1050",
			phone:"+5804148832104"
		},
		client_info:{
			business_name:"Martha Rodriguez",
			id_doc_type:"CI",
			id_doc:" V20503096",
			address:"Residencias Porticos del Este. Plaza Venezuela, Caracas (Chacao) Miranda. Zona Postal 1050",
			phone:"+584149365384"
		},
		printing_info:{
			url_image:"https://static.paguetodo.com/images/factura_economica.png",
			id_doc_type:"RIF",
			id_doc:"J401766501"
		},
		control_info:{
			quantity:50,
			init:500,
			end:550
		},
		items:[{name:"Equipo Banco Venezuela", quantity:1, price:10000, total:10000},
		{name:"Gastos admninistrativos", quantity:1, price:23900, total:23900}],
		subtotal:33900,status:"PAID",info:{created_at:"2018-07-16T20:25:11.100874Z",created_by:"3606bce0-0d0c-11e8-bf0a-6b5a224d7afd",created_by_email:"admin@paguetodo.com"}
	}
};