
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

document.getElementById("slc_distrito").innerHTML = '<option> Teste</option>';


var webservice = {
	doPost : function(da, op){
		var retorno;
        $.ajax({
        	async: false,
	        type: "GET",
	        url: "https://api-era.herokuapp.com/erabot/" + op + "/" + da,
	        cache: false, 

	       // data: da,
	            success: function (msg) {
	                var data = msg.hasOwnProperty("d") ? msg.d : msg;
		            retorno = data;
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
		
		var distritos = webservice.doPost("", "distritos");
		var grupos = webservice.doPost(language,"grupos").grupos;

		var objectivo = webservice.doPost(language,"objectivos").objectivos;
        var concelhos;
        var freguesia;
        var zona;
        var slc_distrito = $("#slc_distrito");
        var slc_concelho = $("#slc_concelho");
        var slc_freguesia = $("#slc_freguesia");
        var slc_zona = $("#slc_zona");
        var slc_grupo = $("#slc_grupo");
        var slc_objectivo = $("#finalidade");
        function update(vet, slc){
            if(vet.constructor === Array){
                vet.forEach(function(value,index, ar){
                    slc.append('<option value= "'+ value.id + '">' + value.nome + '</option>');
                });
            }else{
                slc.append('<option value= "'+ value.id + '">' + value.nome + '</option>');                      
            };
         }
        
     	update(distritos, slc_distrito);

        update(objectivo, slc_objectivo);
        update(grupos, slc_grupo);
  
