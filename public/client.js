console.log("Client side code running");

const button = document.getElementById('enter');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
  var data = JSON.stringify({name : document.getElementById("name").value});
fetch('/clicked', {method: 'POST', body: data, headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        }})
    .then(function(response) {
      if(response.ok) {
//console.log(response.data);
        response.json().then(function(json){
          console.log(json);
          var formDiv = document.getElementById('form');
          for(var i in json){
           var doc = json[i];
           var newDiv = document.createElement('div');
           newDiv.innerHTML = '<a href="https://www.google.com/maps/place/' + doc.address + '">' + doc.name + '</a>';
           formDiv.appendChild(newDiv);
          }
         });
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});
