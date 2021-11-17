(function(app) {
  app.routing = ng.router.RouterModule.forRoot([
  	{path: '', redirectTo: 'loading', pathMatch: 'full'},
  	{path: 'menu',component:app.MenuComponent},
	{path: 'loading',component:app.LoadingAppComponent},
	
	{path: 'travel-report', component:app.TravelReportComponent},
	{path: 'travel-report-line', component:app.TravelReportLineComponent},
	{path: 'travel-create', component:app.TravelCreateComponent},
	{path: 'travel-create-line', component:app.TravelCreateLineComponent},
	{path: 'travel-update', component:app.TravelCreateComponent},
	{path: 'travel-view', component:app.TravelViewComponent},
	{path: 'travel-passengers', component:app.TripPassengerComponent},
	{path: "fast-entry-line", component:app.FastEntryLine},
	{path: "fast-entry", component:app.FastEntryLine},
	{path: 'not-user', component:app.NotUserComponent},
	{path:'**' , component:app.MenuComponent}
  ],{useHash: true});
})(window.app || (window.app = {}));