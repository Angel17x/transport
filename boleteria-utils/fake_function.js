function _fakeData(s) {
	if (typeof(fakeData)!='undefined' && fakeData[s]) {
 		return fakeData[s];
 	}
 	return s;
}