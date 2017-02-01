var webservice = {
	webMethod : "http://ws.era.pt/chatbot/service.asmx/",
	doPost : function(da, op){
		var retorno;
		console.log(da);
        $.ajax({

	        type: "POST",
	        url: this.webMethod + op, 
	        async: false,

	        data: Object.assign({},{token: "2f30fa79-28c0-44c9-8adb-f244a85cef27"},da),
	            success: function (msg) {
	                var data = msg.hasOwnProperty("d") ? msg.d : msg;
	                var x2js = new X2JS();
		            retorno = x2js.xml2json(data);
	            },
	            error: function (e) {

	                console.log(e.responseText);
	            },
	    });
	    return retorno;
	},
	getConcelho: function(dist){
		var retorno;
		  $.ajax({
	        type: "POST",
	        url: this.webMethod, 
	        async: false,

	        data: {
	        	token: "2f30fa79-28c0-44c9-8adb-f244a85cef27", 
	        	distrito: dist
	        },
	            success: function (msg) {
	                var data = msg.hasOwnProperty("d") ? msg.d : msg;
	                var x2js = new X2JS();
		            var concelhos = x2js.xml2json(data);
		            retorno = distritos;
	            },
	            error: function (e) {

	                console.log(e.responseText);
	            },
	    });

		 return retorno;
	}
}

/*JSON.stringify(data).replace(/},{/g, '},<br/>{')*/