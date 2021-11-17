(function(app) {
  app.AppModule =
    ng.core.NgModule({
      imports: [
        ng.platformBrowser.BrowserModule,
        ng.forms.FormsModule,
        ng.router.RouterModule,
        ng.http.HttpModule,
		app.routing
      ],
      declarations: [
		app.MsgComponent,
		app.CustomTableComponent,
		app.LoadingServiceComponent,
		app.NavBarComponent,
		app.LoadingAppComponent,
		app.MenuComponent,
		app.NotUserComponent,
		app.TravelCreateLineComponent,
		app.TravelReportLineComponent,
		app.TravelReportComponent,
		app.TravelCreateComponent,
		app.TravelViewComponent,
		app.TripPassengerComponent,
		app.FastEntryLine,

        app.AppComponent
      ],
      providers: [ 
		app.MsgComponent,
		app.AppCallService,
		app.LoadingServiceComponent
	 ],
      bootstrap: [app.AppComponent]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));