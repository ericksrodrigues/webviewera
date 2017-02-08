var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var webservice = {
	doPost : function(da, op, callback){
		var retorno;
        $.ajax({
        	async: true,
	        type: "GET",
	        url: "https://api-era.herokuapp.com/erabot/" + op + "/" + da,
	        cache: false, 

	       // data: da,
	            success: function (msg) {
	                var data = msg.hasOwnProperty("d") ? msg.d : msg;
		            callback(data);
	            },
	            error: function (e) {

	                console.log(e.responseText);
	            },
	    });
	    return retorno;
	},
	doBodyBOT: function(da, op){
		let retorno;
		console.log(JSON.stringify(da));
		$.ajax({
			type: "POST",
			url: "https://erafake.herokuapp.com/user/" + op,
			data: JSON.stringify(da),

			
			datatype: "json",
	        contentType: "application/json; charset=utf-8",
			sucess: function (msg){
				var data = msg;
				console.log(data);
				retorno = data;
			},
			error: function(e){

				console.log("error" + e.responseText);
			}


		});
	}
}
		var language = getUrlParameter("idioma");
		var messenger_identifier = getUrlParameter("messenger_identifier");
		if(!language){
			language = "PT";
		}
			webservice.doPost("", "distritos", function(data){
				var distritos = data;
				console.log("AGORA" + distritos)
		        var slc_distrito = $("#slc_distrito");

		        update(distritos, slc_distrito);
			});

		var grupos = webservice.doPost(language,"grupos").grupos;
		var objectivo = webservice.doPost(language,"objectivos").objectivos;
        var concelhos;
        var freguesia;
        var zona;
        var slc_concelho = $("#slc_concelho");
        var slc_freguesia = $("#slc_freguesia");
        var slc_zona = $("#slc_zona");
        var slc_grupo = $("#slc_grupo");
        var slc_objectivo = $("#finalidade");
        function update(vet, slc){
            if(vet.constructor === Array){
                vet.forEach(function(value,index, ar){
                    slc.append($('<option>',{
                        text : value.nome,
                        "value": value.id 
                    }));
                });
            }else{
                    slc.append($('<option>',{
                        text : vet.nome,
                        "value": vet.id 
                    }));
                }
        }
        update(objectivo, slc_objectivo);
        update(grupos, slc_grupo);
  
