function formattingIntegerPart(integerPart) {
  var auxCaracter = "";
  var isNegative = false;
  auxCaracter = integerPart.charAt(0);
  var enteroAux = integerPart;
  if (auxCaracter == '-') {
    integerPart = integerPart.substring(1, integerPart.length);
    isNegative = true;
    isNegative = true;
  }
  var cadena = '';
  var posicion = 0;
  if (integerPart.length > 3) {
    for (var i = 0; i < integerPart.length; i++) {
      if (i == 0) {
        posicion = integerPart.length;
      }
      if (posicion <= 3) {
        cadena = integerPart.substring(0, posicion) + cadena;
        if (isNegative) {
          cadena = '-' + cadena;
        }
        return cadena;
      } else {
        cadena = '.' + integerPart.substring(posicion - 3, posicion) + cadena;
        posicion = posicion - 3;
      }
    }
  } else {
    cadena = integerPart;
  }
  if (isNegative) {
    cadena = '-' + cadena;
  }
  return cadena;
}
function returnBancos(){
	var lista=[
		{value:"BDV", name:"Banco de Venezuela"},
		{value:"SOFITASA", name:"Banco sofitasa"},
		{value:"BNC", name:"Banco nacional de crédito"},
		{value:"BANESCO", name:"Banesco banco universal"},
		{value:"CARONI", name:"Banco caroní"},
		{value:"PLAZA", name:"Banco plaza"},
		{value:"BANGENTE", name:"Banco de la gente emprendedora"},
		{value:"BANCO100", name:"100% banco"},
		{value:"DELSUR", name:"Delsur banco universal"},
		{value:"BAV", name:"Banco agrícola de venezuela"},
		{value:"BANCRECER", name:"Bancrecer"},
		{value:"ACTIVO", name:"Banco activo"},
		{value:"BANCAMIGA", name:"Bancamiga"},
		{value:"BANPLUS", name:"Banplus"},
		{value:"BVC", name:"Venezolano de crédito"},
		{value:"MERCANTIL", name:"Banco mercantil"},
		{value:"BBVA", name:"Banco provincial"},
		{value:"EXTERIOR", name:"Banco exterior c.a."},
		{value:"BICENTENARIO", name:"Banco bicentenario"},
		{value:"BANFANB", name:" Banco de la fuerza armada nacional bolivariana"},
		{value:"MIBANCO", name:"Mi banco"},
		{value:"BOD", name:"Banco occidental de descuento"},
		{value:"TESORO", name:"Banco del tesoro"},
		{value:"BANCARIBE", name:"Bancaribe c.a"},
		{value:"BFC", name:"Banco fondo común c.a."}
	];
	return lista;
}
function returnMonedas(){
	return [{value:"VES",name:"Bs",decimals:2,display:"BOLÍVAR SOBERANO"},{value:"USD",name:"$",decimals:2, display:"DÓLAR ESTADOUNIDENSE"},{value:"VED",name:"Bs",decimals:2,display:"BOLÍVAR DIGITAL"}];
}
function returnBankSelected(data){
	if(data==null || data==undefined || data==""){
		return null;
	}else{
		var lista=returnBancos();
		if(lista!=null && lista.length!=0){
			for(var i=0;i<lista.length;i++){
				if(lista[i]!=null){
					if(lista[i].hasOwnProperty("value")){
						if(lista[i].value==data){
							return lista[i].name;
						}
					}
				}
			}
		}
	}
}
function amountFormattingObject(amount) {
  var retorno = {
    integerPart: '',
    decimalPart: ''
  };
  var monto = (amount / 100).toFixed(2);
  var parteDecimal = '';
  var parteEntera = '';
  if (monto.toString().indexOf('.') > 0) {
    var array = monto.toString().split('.');
    parteEntera = array[0];
    if (array[1].length < 2) {
      parteDecimal = array[1] + '0';
    } else {
      parteDecimal = array[1];
    }
  } else {
    parteEntera = monto.toString();
    parteDecimal = '00';
  }
  retorno.integerPart = formattingIntegerPart(parteEntera);
  retorno.decimalPart = parteDecimal;
  return retorno;
}
function trunc (x, posiciones = 0) {
  var s = x.toString()
  var l = s.length
  var decimalLength = s.indexOf('.') + 1
  var numStr = s.substr(0, decimalLength + posiciones)
  return Number(numStr)
}
function validarEmail(valor) {
  if (valor.indexOf('&') >= 0) {
    return false;
  }
  if (valor.indexOf('/') >= 0) {
    return false;
  }
  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(valor)) {
    return true;
  } else {
    return false;
  }
}
function utils_keyNumber(data) {
	var patron = /^[0-9]*$/;
	if (patron.test(data))
	    return true;
	  else
	    return false;
}
function keypressNumbersInteger(event) {
  var key = event.keyCode || event.which;
  var tecla = String.fromCharCode(key).toLowerCase();
  var letras = "0123456789";
  var especiales = [8];
  var tecla_especial = false
  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }
  if (letras.indexOf(tecla) == -1 && !tecla_especial)
    return false;
}
function formattingDate(date) {
  date = replaceAll(date, "T", " ");
  var newDate = new Date(date);
  var hora = "00";
  var minutos = "00";
  if (newDate.getHours() < 10) {
    hora = "0" + newDate.getHours();
  } else {
    hora = newDate.getHours();
  }
  if (newDate.getMinutes() < 10) {
    minutos = "0" + newDate.getMinutes();
  } else {
    minutos = newDate.getMinutes();
  }
  var dia = newDate.getDate();
  if (dia < 10) {
    dia = "0" + newDate.getDate();
  }
  var mes=newDate.getMonth() + 1;
  if (mes < 10) {
    mes = "0" + mes;
  }
  var dateFormatting = dia + '-' + mes + '-' + newDate.getFullYear() + ' ' + hora + ':' + minutos;
  return dateFormatting;
}
function formattingDate1(date) {
  date = replaceAll(date, "T", " ");
  
  var newDate = new Date(date);
  var hora = "00";
  var minutos = "00";
  if (newDate.getHours() < 10) {
    hora = "0" + newDate.getHours();
  } else {
    hora = newDate.getHours();
  }
  if (newDate.getMinutes() < 10) {
    minutos = "0" + newDate.getMinutes();
  } else {
    minutos = newDate.getMinutes();
  }
  var dia = newDate.getDate();
  if (dia < 10) {
    dia = "0" + newDate.getDate();
  }
  var mes=newDate.getMonth() + 1;
  if (mes < 10) {
    mes = "0" + mes;
  }
  var dateFormatting = dia + '-' + mes + '-' + newDate.getFullYear();
  return dateFormatting;
}
function formattingDate2(date) {
  date = replaceAll(date, "T", " ");
  try{
	  date=date.split(" ");
	  return date[0];
  }catch(er){
	  return null
  }
}
function replaceAll(text, busca, reemplaza) {
  if (text == null || text == undefined) {
    return text;
  } else {
    while (text.toString().indexOf(busca) != -1)
      text = text.toString().replace(busca, reemplaza);
    return text;
  }
}
function capitalizeOnly(data) {
  if (data == null || data == undefined) {
    return "";
  } else {
    var aux = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    return aux;
  }
};
function orderList(lista){
	if(lista==null || lista==undefined || lista.length==0){
		return null;
	}else{
		var n=lista.length;
		var n, i, k, aux;
		for (k = 1; k < n; k++) {
			for (i = 0; i < (n - k); i++) {
				if (lista[i].sort > lista[i + 1].sort) {
					aux = lista[i];
					lista[i] = lista[i + 1];
					lista[i + 1] = aux;
				}
			}
		}
		return lista;
	}						
}
function getTimeZone(){
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function keyPressValidarLetrasNumerosSimplesGuionesPisos(event) {
  var key = event.keyCode || event.which;
  var tecla = String.fromCharCode(key).toLowerCase();
  var letras = "abcdefghijklmnopqrstuvwxyz0123456789";
  var especiales = [8, 45, 95];
  var tecla_especial = false
  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }
  if (letras.indexOf(tecla) == -1 && !tecla_especial)
    return false;
}
function validarLetrasNumerosSimplesGuionesPiso(data) {
  var patron = /^([a-zA-Z-Z]|[0-9]|-|_)*$/;
  if (patron.test(data))
    return true;
  else
    return false;
}
function keypressvalidarEmail(event, data) {
  var key = event.keyCode || event.which;
  var tecla = String.fromCharCode(key).toLowerCase();
  var letras = "abcdefghijklmnopqrstuvwxyz0123456789";
  var especiales = [8, 38, 45, 46, 64, 95];
  var tecla_especial = false
  for (var i in especiales) {
    if (key == especiales[i]) {
      if (key == 64) {
        if (data.indexOf(tecla) > -1) {
          tecla_especial = false;
          break;
        }
      }
      if (key == 46) {
        if (data != null) {
          if (data.charAt(data.length - 1) == tecla) {
            tecla_especial = false;
            break;
          }
        }
      }
      tecla_especial = true;
      break;
    }
  }
  if (letras.indexOf(tecla) == -1 && !tecla_especial)
    return false;
}
function keyPressValidarLetrasyOtrosCaracteres(event) {
  var key = event.keyCode || event.which;
  var tecla = String.fromCharCode(key).toLowerCase();
  var letras = "abcdefghijklmnopqrstuvwxyz0123456789\u00D1\u00F1\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA";
  var especiales = [8, 32, 35, 36, 37, 38, 64, 45, 46, 95];
  var tecla_especial = false
  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }
  if (letras.indexOf(tecla) == -1 && !tecla_especial)
    return false;
}
function formatearTelefono(cuenta) {
  var numeroCtaFormt;
  if (cuenta != undefined) {
    if (cuenta.length >= 5) {
      var aux = cuenta;
      numeroCtaFormt = "("+aux.substring(0, 4)+")" + "-" + aux.substring(4, 7) + ' ' + aux.substring(7, aux.length);
    } else {
      numeroCtaFormt = cuenta;
    }
    return numeroCtaFormt;
  }
}
function returnCurrency(){
	return [{value:"VES",name:"Bolívares"},{value:"USD",name:"Dolar"},{value:"PTR",name:"Petro"},{value:"EUR",name:"Euro"}];
}