var webservice = {
	doPost : function(da, op){
		var retorno;
		console.log(da);
        $.ajax({

	        type: "GET",
	        url: "https://api-era.herokuapp.com/erabot/" + op + "/" + da, 
	        async: false,

	       // data: da,
	            success: function (msg) {
	                var data = msg.hasOwnProperty("d") ? msg.d : msg;
	                console.log
	                console.log(data);
		            retorno = data;
	            },
	            error: function (e) {

	                console.log(e.responseText);
	            },
	    });
	    return retorno;
	}
}

/*JSON.stringify(data).replace(/},{/g, '},<br/>{')*/