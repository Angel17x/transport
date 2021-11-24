(function(app) {
    app.AppCallService = ng.core.
    Injectable().Class({
        constructor: [ng.http.Http, app.LoadingServiceComponent, function(http, loading) {
            this._url =getApi();
            this.http = http;
            this.loading = loading;
			this.timeout="30000";
			this.enlace_api=getEnlaceApi();
			this.enlace_api_deegle=getEnlaceApiDeegle()
			this.enlace_api_deegle_v2=getEnlaceApiDeegle2()		
			this.enlace_auth=getEnlaceAuth();

        }]
	});
	app.AppCallService.prototype.callServices=function(path, method, parameters, head, auth, format_out,format_in,show,time){
		let url=this._url;
		let headers=new Headers();
		if(!(head==null || head==undefined || head=="")){
			headers=head;
		}
		var parametros="";
		if (path == undefined || path == '' || path == null) {
            url = '';
        } else {
            url = url+path;
        }
		if(!(format_in==null || format_in==undefined || format_in=="")){
			headers['Content-Type']=format_in.trim().toLowerCase();
		}
		if(auth){
			headers['Authorization']='bearer '+this.getAccessToken();
		}
		if(format_in==null && !auth){
			headers=null;
		}
		if(format_in=="multipart/form-data"){
			delete headers['Content-Type'];
			parametros=parameters;
		}else{
			if (!(parameters == undefined || parameters == null || parameters == '')) {
				if (jQuery.isEmptyObject(parameters)) {
					parametros = parameters;
				}else {
					if(format_in=="application/json"){
						parametros = JSON.stringify(parameters);
					}else{
						parametros = parameters;
					}
				}
			}
		}
		if(show){
			this.loading.showPleaseWait();
		}
		let peticion=null;
        switch (method) {
            case 'GET':{
                if(headers!=null){
					peticion = this.http.get(url,{headers});
				}else{
					peticion = this.http.get(url);
				}
            }break;
            case 'POST':{
				if(headers==null){
					 peticion = this.http.post(url, parametros,null);
				}else{
					 peticion = this.http.post(url, parametros,{headers});
				}
            }break;
            case 'PUT':{
                peticion = this.http.put(url, parametros,{headers});
            }break;
            case 'DELETE':{
				if(headers!=null){
					peticion = this.http.delete(url,{headers});
				}else{
					peticion = this.http.delete(url);
				}
            }break;
            default:{
                return null;
            }
        }
		if(time==null){
			time=this.timeout;
		}
		let resultado = peticion.timeout(time, new Error('TIMEOUT'))
		.map(res => {
            this.loading.hidePleaseWait();
			return this.processResponse(format_out,res);
        });
		return resultado;
	}
	app.AppCallService.prototype.fakeData=function(data){
		var data1=_fakeData(data);
		return data1;
	}
	app.AppCallService.prototype.processResponse=function(format,res){
		var status=null;
		if(res.hasOwnProperty('status')){
           status=res.status;
			if(status==202 || status=="202" || status=="403" || status==403){
				var aux = res.json();
				if(aux.hasOwnProperty("message")){
					if(!(aux.message==undefined || aux.message==null || aux.message=="")){
						if(aux.message=="UNAUTHORIZED_SESSION" || aux.message=="SESSION_CLOSED" 
						|| aux.message=="SESSION_EXPIRED" || aux.message=="SESSION_NOT_FOUND" || aux.message=="INVALID_AUTHORIZATION" ){
							doLogout();
							alert(_(aux.message.toLowerCase()));
							window.location.href=redirectUri();
						}
					}
				}	
			}else{
				if(status==401 || status==403){
						window.location.href=redirectUri();
				}
			}
        }
		if (format == "JSON") {
            try {
				var status=null;
				if(res.hasOwnProperty('status')){
                    status=res.status;
                }
                res = res.json();
				try{
                    var valor=Array.isArray(res);
					if(valor){
                        var aux=res;
                        res={
                            body:aux,
                            status_http:status
                        };
                    }else{
                        res.status_http=status; 
                    }
                }catch(err1){
                    console.log('Error al procesar',err1);
                }
                res.status_http=status;
				return res;
			} catch (err) {
                res = {
					status_http:500,
					message:"ERROR",
                    typeSys: 'ERROR',
                    value: 'NOT_JSON'
                };
                return res;
            }
        }else {
			if(format=="CSV"){
				 try {
					res = res._body;
					return res.toString();
				} catch (err) {
					res = "Error";
					return res;
				}
			}else{
				console.log('res',res);
				res=res._body.blob();
				return res
			}
           
        }
	}
	app.AppCallService.prototype.callServicesHttp=function(ser,querys,param){
		//unction(path, method, parameters, head, auth, format_out,format_in,show,time){
			if(this.getAccessToken()==null){
				doLogout();
				alert("Sesión vencida");
				window.location.href=redirectUri();
			}else{
				let request=null;
		switch(ser){
			case 'init-auth':{
				request=this.callServices('deegle_auth/init/'+getClient()+querys,"GET",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'logout':{
				request=this.callServices(this.enlace_auth+'/session/close',"DELETE",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'parada-post':{
				request=this.callServices(this.enlace_api+'/stop?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'parada-report':{
				request=this.callServices(this.enlace_api+'/stop/search?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'parada-delete':{
				request=this.callServices(this.enlace_api+'/stop?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"DELETE",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'parada-put':{
				request=this.callServices(this.enlace_api+'/stop?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'car-type-post':{
				request=this.callServices(this.enlace_api+'/vehicle_type?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'car-type-put':{
				request=this.callServices(this.enlace_api+'/vehicle_type?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'car-type-report':{
				request=this.callServices(this.enlace_api+'/vehicle_type/search?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'car-type-delete':{
				request=this.callServices(this.enlace_api+'/vehicle_type?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"DELETE",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'car-type-get':{
				request=this.callServices(this.enlace_api+'/vehicle_type?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"GET",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'line-post':{
				request=this.callServices(this.enlace_api+'/line?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'line-report':{
				request=this.callServices(this.enlace_api+'/line/search?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'line-delete':{
				request=this.callServices(this.enlace_api+'/line?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"DELETE",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'line-get':{
				request=this.callServices(this.enlace_api+'/line?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"GET",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'line-put':{
				request=this.callServices(this.enlace_api+'/line?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'propietario-post':{
				request=this.callServices(this.enlace_api+'/vehicle_owner/line/'+querys+'?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'propietario-put':{
				request=this.callServices(this.enlace_api+'/vehicle_owner/line/'+querys+'&realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'propietario-report':{
				request=this.callServices(this.enlace_api+'/vehicle_owner/search?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'propietario-delete':{
				request=this.callServices(this.enlace_api+'/vehicle_owner/line/'+querys+'&realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"DELETE",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'parada-report-open':{
				request=this.callServices(this.enlace_api+'_open/stop/report?realm='+this.getRealm()+querys,"POST",param,null,false,"JSON","text/plain",false,null);
				return request;
			}break;
			case 'propietario-get':{
				request=this.callServices(this.enlace_api+'/vehicle_owner/line/'+querys,"GET",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'car-post':{
				request=this.callServices(this.enlace_api+'/vehicle/line/'+querys+'&realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'car-put':{
				request=this.callServices(this.enlace_api+'/vehicle/line/'+querys+"&realm="+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'car-report':{
				request=this.callServices(this.enlace_api+'/vehicle/search?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'car-delete':{
				request=this.callServices(this.enlace_api+'/vehicle/line/'+querys+"&realm="+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"DELETE",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'car-get':{
				request=this.callServices(this.enlace_api+'/vehicle/line/'+querys+"&realm="+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"GET",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'car-report-line':{
				request=this.callServices(this.enlace_api+'/vehicle/report/line?realm='+this.getRealm()+"&line_id="+this.getBusinessId()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'fare-post':{
				request=this.callServices(this.enlace_api+'/fare?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'fare-report':{
				request=this.callServices(this.enlace_api+'/fare/report?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'fare-report-line':{
				request=this.callServices(this.enlace_api+'/fare/line/report?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'fare-search':{
				request=this.callServices(this.enlace_api+'/fare/search?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'fare-delete':{
				request=this.callServices(this.enlace_api+'/fare?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"DELETE",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'fare-get':{
				request=this.callServices(this.enlace_api+'/fare/line/'+querys,"GET",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'fare-put':{
				request=this.callServices(this.enlace_api+'/fare?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'route-post':{
				request=this.callServices(this.enlace_api+'/itinerary?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'route-put':{
				request=this.callServices(this.enlace_api+'/itinerary?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'route-delete':{
				request=this.callServices(this.enlace_api+'/itinerary?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"DELETE",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'route-get':{
				request=this.callServices(this.enlace_api+'/itinerary/line/'+querys+'&realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"GET",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'route-search':{
				request=this.callServices(this.enlace_api+'/itinerary/search?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'route-report':{
				request=this.callServices(this.enlace_api+'/itinerary/report?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'route-line-report':{
				request=this.callServices(this.enlace_api+'/itinerary/line/report?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'driver-post':{
				request=this.callServices(this.enlace_api+'/driver/line/'+querys+'?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'driver-put':{
				request=this.callServices(this.enlace_api+'/driver/line/'+querys+'&realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'driver-report-v1':{
				request=this.callServices(this.enlace_api+'/driver/report?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'driver-report':{
				request=this.callServices(this.enlace_api+'/driver/search?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'driver-delete':{
				request=this.callServices(this.enlace_api+'/driver/line/'+querys+'&realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"DELETE",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'driver-get':{
				request=this.callServices(this.enlace_api+'/driver/line/'+querys+'&realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry(),"GET",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'travel-post':{
				request=this.callServices(this.enlace_api+'/trip/line/'+querys+"&user_email="+this.getEmail()+"&user_id="+this.getUserId()+"&business_id="+this.getBusinessId(),"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'travel-post-line':{
				request=this.callServices(this.enlace_api+'/trip?realm='+this.getRealm()+querys+"&user_id="+this.getUserId()+"&business_id="+this.getBusinessId()+"&realm="+this.getRealm(),"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'travel-put':{
				request=this.callServices(this.enlace_api+'/trip/line/'+querys+"&user_id="+this.getUserId()+"&business_id="+this.getBusinessId()+"&realm="+this.getRealm()+"&user_email="+this.getEmail(),"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'travel-report':{
				request=this.callServices(this.enlace_api+'/trip/system_report?realm='+this.getRealm()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'travel-delete':{
				request=this.callServices(this.enlace_api+'/trip/line/'+querys+"&user_id="+this.getUserId()+"&business_id="+this.getBusinessId(),"DELETE",param,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'travel-delete-line':{
				request=this.callServices(this.enlace_api+'/trip?realm='+this.getRealm()+querys,"DELETE",param,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'fast-entry':{
				request=this.callServices(this.enlace_api+'/reservation/fast_entry/'+querys+"&realm="+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&business_id="+this.getBusinessId(),"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'fast-entry-line':{
				request=this.callServices(this.enlace_api+"/reservation/fast_entry?realm="+this.getRealm()+"&user_id="+this.getUserId()+"&business_id="+this.getBusinessId()+"&user_email="+this.getEmail()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'travel-get':{
				request=this.callServices(this.enlace_api+'/trip/line/'+querys,"GET",param,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'travel-get-line':{
				request=this.callServices(this.enlace_api+'/trip?realm='+this.getRealm()+querys,"GET",param,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'travel-report-line':{
				request=this.callServices(this.enlace_api+'/trip/report/line?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'profile-report':{
				request=this.callServices(this.enlace_api_deegle+'/profile/search'+querys,"POST",param,null,true,"JSON",'application/json',true,null);
				return request;
			}break;
			case 'reservation-report-line':{
				request=this.callServices(this.enlace_api+'/reservation/line/report?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'reservation-report':{
				request=this.callServices(this.enlace_api+'/reservation/report?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'reservation-post':{
				request=this.callServices(this.enlace_api+'/reservation?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'reservation-get-line':{
				request=this.callServices(this.enlace_api+'/reservation?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+querys,"GET",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'reservation-delete':{
				request=this.callServices(this.enlace_api+'/reservation?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+querys,"DELETE",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'reservation-cancel':{
				request=this.callServices(this.enlace_api+'/reservation/cancel?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+querys,"PUT",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'reservation-validate':{
				request=this.callServices(this.enlace_api+'/reservation/validate_payments?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+querys,"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'line-get-reservation':{
				request=this.callServices(this.enlace_api+'/line?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+"&id="+this.getBusinessId(),"GET",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'add-payment-reservation':{
				request=this.callServices(this.enlace_api+'/reservation/ticket/add_payments?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+"&business_id="+this.getBusinessId()+querys,"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'delete-payment-reservation':{
				request=this.callServices(this.enlace_api+'/reservation/delete_payments?realm='+this.getRealm()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&country="+this.getCountry()+"&business_id="+this.getBusinessId()+querys,"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'travel-passenger':{
				request=this.callServices(this.enlace_api+'/passenger/trip/report?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'travel-passenger-operation':{
				request=this.callServices(this.enlace_api+'/passenger/trip/report/'+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'passenger-report':{
				request=this.callServices(this.enlace_api+'/passenger/report?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'passenger-report-line':{
				request=this.callServices(this.enlace_api+'/passenger/line/report?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'passenger-change-status':{
				request=this.callServices(this.enlace_api+'/passenger/status?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+querys,"PUT",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'currency-exchange-report':{
				request=this.callServices(this.enlace_api+'/currency_exchange_rate/report?realm='+this.getRealm()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'currency-exchange-post':{
				request=this.callServices(this.enlace_api+'/currency_exchange_rate?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+querys,"POST",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'sales-report-acumulate':{
				request=this.callServices(this.enlace_api+'/reservation/ves_payments?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail(),"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'travel-check-intt':{
				request=this.callServices(this.enlace_api+"/trip/intt_check?realm="+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+querys,"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'travel-check-operation':{
				request=this.callServices(this.enlace_api+"/trip/operation_check?realm="+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+querys,"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'travel-close-line':{
				request=this.callServices(this.enlace_api+"/trip/online_sales_check?realm="+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+"&line_id="+this.getBusinessId()+querys,"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'travel-report-available':{
				request=this.callServices(this.enlace_api+'_open/trip/report?realm='+this.getRealm()+querys,"POST",param,null,false,"JSON","application/json",false,null);
				return request;
			}break;
			case 'travel-line-trasbordo':{
				request=this.callServices(this.enlace_api+'/passenger/transfer?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail(),"PUT",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'sales-all-line':{
				request=this.callServices(this.enlace_api+'/payment/line_aggregation?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail(),"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'get-exchanged':{
				request=this.callServices(this.enlace_api+'_open/currency_exchange_rates?realm='+getRealm(),"GET",null,null,false,"JSON",null,false,null);
				return request;
			}break;
			case 'price-short-route-report':{
				request=this.callServices(this.enlace_api+'/short_route_price/report?realm='+getRealm()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'terminal-create':{
				request=this.callServices(this.enlace_api+'/terminal?realm='+this.getRealm()+'&user_id='+this.getUserId()+'&user_email='+this.getEmail()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'profile-system-report':{
				request=this.callServices(this.enlace_api_deegle_v2+'/profiles/system_report?realm='+this.getRealm()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'terminal-system-report':{
				request=this.callServices(this.enlace_api+'/terminal/system_report?realm='+this.getRealm()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			case 'terminal-delete':{
				request=this.callServices(this.enlace_api+'/terminal?realm='+this.getRealm()+querys,"DELETE",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'terminal-get':{
				request=this.callServices(this.enlace_api+'/terminal?realm='+this.getRealm()+querys,"GET",null,null,true,"JSON",null,true,null);
				return request;
			}break;
			case 'terminal-update':{
				request=this.callServices(this.enlace_api+'/terminal?realm='+this.getRealm()+'&user_id='+this.getUserId()+'&user_email='+this.getEmail()+querys,"PUT",param,null,true,"JSON",null,true,null);
				return request;
			}break;
			default:{
			}
		}
			
		}
	}
	app.AppCallService.prototype.callServicesCountry=function(country) {
		var url = null;
		if (!(country == null || country == undefined || country == "")) {
			switch (country) {
				case 'VE':{
					url = "https://static.paguetodo.com/resources/countries/venezuela.json";
				}break;
				default:{}
			}
			this.loading.showPleaseWait();
			let peticion = this.http.get(url)
			.map(res => {
				res = res.json();
						return res;
			});
			return peticion;
		}
	}
	app.AppCallService.prototype.removeKey=function(key){
		try{
			localStorage.removeItem(key);
			sessionStorage.removeItem(key);
		}catch(Er){
		}
	}
	app.AppCallService.prototype.setInit=function(data){
		data=JSON.stringify(data);
		localStorage.setItem('init',data);
	}
	app.AppCallService.prototype.getInit=function(){
		var aux=localStorage.getItem('init');
		if(aux==null){
			return null;
		}else{
			try{
				return JSON.parse(aux);
			}catch(e){
				return null;
			}
		}
	}
	app.AppCallService.prototype.getAccessToken=function(){
		return localStorage.getItem('access_token');
	}
	app.AppCallService.prototype.getRealm=function(){
		if(this.getRole()==null){
			return null;
		}else{
			if(this.getRole().hasOwnProperty("realm")){
				return this.getRole().realm;
			}else{
				return null;
			}
		}
	}
	app.AppCallService.prototype.getCurrency=function(){
		var aux=localStorage.getItem('init');
		if(aux!=null){
			try{
				aux=JSON.parse(aux);
				aux=aux.country.currency;
			}catch(er){
				console.log("er",er);
				aux=null;
			}
			return aux;
		}else{
			return aux;
		}
	}
	app.AppCallService.prototype.getCountry=function(){
		var aux=localStorage.getItem('init');
		if(aux!=null){
			try{
				aux=JSON.parse(aux);
				aux=aux.country.alpha2;
			}catch(er){
				console.log("er",er);
				aux=null;
			}
			return aux;
		}else{
			return aux;
		}
	}
	app.AppCallService.prototype.getUserId=function(){
		if(this.getRole()==null){
			return null;
		}else{
			if(this.getRole().hasOwnProperty("user_id")){
				return this.getRole().user_id;
			}else{
				return null;
			}
		}
	}
	app.AppCallService.prototype.getUserName=function(){
		if(this.getRole()==null){
			return null;
		}else{
			if(this.getRole().hasOwnProperty("user_name")){
				return this.getRole().user_name;
			}else{
				return null;
			}
		}
	}
	app.AppCallService.prototype.setRole=function(data){
		data=JSON.stringify(data);
		localStorage.setItem('role',data);
	}
	app.AppCallService.prototype.getRole=function(){
		var aux=localStorage.getItem('role');
		if(aux==null){
			return null;
		}else{
			try{
				return JSON.parse(aux);
			}catch(er1){
				return null;
			}
		}
	}
	app.AppCallService.prototype.getBusinessId=function(){
		aux=this.getRole();
		if(aux==null){
			return null;
		}else{
			try{
				aux=aux.business_id;
				return aux;
			}catch(er){
				return null;
			}				
		}			
	}
	app.AppCallService.prototype.getBusinessName=function(){
		aux=this.getRole();
		if(aux==null){
			return null;
		}else{
			try{
				aux=aux.owner_name;
				return aux;
			}catch(er){
				console.log("er",er);
				return null;
			}				
		}	
	}
	app.AppCallService.prototype.getEmail=function(){
		aux=this.getRole();
		if(aux==null){
			return null;
		}else{
			try{
				aux=aux.user_email;
				return aux;
			}catch(er){
				return null;
			}				
		}	
	}
	app.AppCallService.prototype.getBusinessEmail=function(){
		aux=this.getRole();
		if(aux==null){
			return null;
		}else{
			try{
				aux=aux.owner_email;
				return aux;
			}catch(er){
				return null;
			}				
		}	
	}
	app.AppCallService.prototype.processError=function(err,msg){
		let mensaje=msg;
		this.loading.hidePleaseWait();
		try {
			var status = "";
			if (err.hasOwnProperty('status')) {
				var contexto=this;
				status = err.status + ', ';
				if(err.status==401){
					mensaje="Sesión cerrada";
					setTimeout(function() {
						doLogout();
						window.location.href=redirectUri();
					}, 2000);
				}else{
					if(err.status==403){
						mensaje="Sesión expirada";
						setTimeout(function() {
						doLogout();
						window.location.href=redirectUri();
					}, 2000);
					}else{
						if (err.hasOwnProperty('_body')) {
							var aux = JSON.parse(err._body);
							if (aux.hasOwnProperty('message')) {
								if(aux.message==null || aux.message==undefined || aux.message==""){
									mensaje=msg;
								}else{
									if(aux.message.toUpperCase()=="FAILED_REQUEST"){
										mensaje=msg;
									}else{
										mensaje= status + translate(aux.message, 'ES').toUpperCase();
									}
								}
							} else {
								if (err.hasOwnProperty('statusText')) {
									mensaje = status + err.statusText;
								} else {
									mensaje = msg;
								}
							}
						} else {
							mensaje = msg;
						}
					}
				}
			}else{
				mensaje=msg;
			}
		} catch (err1) {
			mensaje = msg;
		}
		return mensaje;
	}
	app.AppCallService.prototype.processMessageError=function(data,mensaje){
		if (data.hasOwnProperty('message')) {
			var auxMsg = "";
			var titleMsg = "";
			if (data.message == null || data.message == undefined || data.message == "") {
				titleMsg =mensaje;
			} else {
				data.message=data.message.toLowerCase();
				titleMsg = _(data.message);
			}
			if (data.hasOwnProperty('cause')) {
				if (!(data.cause == null || data.cause == undefined || data.cause == "" || data.cause.length == 0)) {
					for (var i = 0; i < data.cause.length; i++) {
						if(data.cause[i]!=null){
							data.cause[i]=data.cause[i].toLowerCase();
							auxMsg = auxMsg+ " "+ _(data.cause[i]);
						}
					}
					if (auxMsg != "") {
						titleMsg = titleMsg+ ": " + auxMsg;
					}
				}
			}
			mensaje = titleMsg;
			return mensaje;
		} else {
			return mensaje;
		}
	}
})(window.app || (window.app = {}));