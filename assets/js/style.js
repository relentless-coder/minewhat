function get(url) {
  var http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.onreadystatechange = function() {
    if(http.readyState === 4) {
      if(http.status >= 200 && http.status <= 400) {
        var completeData = JSON.parse(http.responseText);
        console.log(completeData);
        var i = 0;
        var data = completeData.slice(i, i+2);
        console.log(data);
        append(data);
        setInterval(function() {
                  var data = completeData.slice(i, i+2);
                  console.log(data);
                  append(data);
          if(i === (completeData.length - 2)) {
              i = 0;
          } else {
            i += 2;
          }
        }, 2000);
      }
    }
  };
  http.send();
}

function append(data) {
  var templateScript = document.getElementById('popup-product').innerHTML;
  var theTemplate = Handlebars.compile(templateScript);
  var compiledTemplate = theTemplate(data);
  document.getElementById('popup').innerHTML = compiledTemplate;
}

Handlebars.registerHelper('limit_to', function(ary, max, options) {
    if(!ary || ary.length === 0)
        return options.inverse(this);

    var result = [ ];
    result.push(options.fn(ary[0]));
    return result.join('');
});

get("assets/js/data.json");
