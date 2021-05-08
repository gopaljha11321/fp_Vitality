  window.onload = function() {
            loaddata();
        };
		function loaddata(){
				var url = "https://vitality100.000webhostapp.com/api/read_all.php";
				$.getJSON(url, function(data) {
                    var val= data;
                  var humid=(data['weather'][(Object.keys(data['weather']).length)-1]['hum']);
                   var temper=(data['weather'][(Object.keys(data['weather']).length)-1]['temp']);
                   document.getElementById("temperature").innerHTML = temper;
                   document.getElementById("humidity").innerHTML = humid+"%";
					console.log(data['weather'][(Object.keys(data['weather']).length)-1]['temp']);
				});
            
        }
        window.setInterval(function(){
        loaddata();
            }, 5000);