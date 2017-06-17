var BenchmarkAPI = require('benchmarkemail').BenchmarkAPI;

var apiKEY = 'AEBFAFDB-E352-40B6-BFF7-BDC0F4FAD363';

try {
    var api = new BenchmarkAPI(apiKey);

} catch (error) {
    console.log(error.message);

}


api.listAddContacts({ token:'', listID:'', contacts: {email: '', firstname: '', lastname:''}, optin:'' }, function(data, error){

if (error)
    console.log(error.message);
else
    console.log(JSON.stringify(data));


});