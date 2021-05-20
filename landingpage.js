  window.onload = function() {
            loaddata();
        };
		function loaddata(){
				var url = "https://vitality100.000webhostapp.com/api/read_all.php";
				$.getJSON(url, function(data) {
                    var val= data;
                  var humid=(data['weather'][(Object.keys(data['weather']).length)-1]['hum']);
                   var temper=(data['weather'][(Object.keys(data['weather']).length)-1]['temp']);
		   var body=(data['weather'][(Object.keys(data['weather']).length)-1]['body']);
		   var heart= (data['weather'][(Object.keys(data['weather']).length)-1]['heart']);
		   var oxygen = (data['weather'][(Object.keys(data['weather']).length)-1]['oxygen']);
                   document.getElementById("temperature").innerHTML = temper;
                   document.getElementById("humidity").innerHTML = humid+"%";
		   document.getElementById("body_tmp").innerHTML = body;
		   document.getElementById("heart_rate").innerHTML = heart;
		   document.getElementById("oxygen").innerHTML = oxygen;
					
					console.log(data['weather'][(Object.keys(data['weather']).length)-1]['temp']);
				});
            
        }
        window.setInterval(function(){
        loaddata();
            }, 5000);
