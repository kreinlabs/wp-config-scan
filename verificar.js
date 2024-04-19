document.addEventListener('DOMContentLoaded', function() {
    var url = '';  // La URL se obtendrá directamente del contenido de la pestaña
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      url = tabs[0].url;
      verificarURL(url);
    });
  });
  
  function verificarURL(pageUrl) {
    var url = pageUrl.endsWith('/') ? pageUrl.slice(0, -1) : pageUrl;  // Asegura que no termina con '/'
    console.log("URL actual: " + url);
    var rutas = ['/wp-json/wp/v2/users', '/wp-login.php', '/xmlrpc.php', '/feed', '/cron.php', '/wp-sitemap.xml'];
  
    rutas.forEach(ruta => {
      fetch(url + ruta)
        .then(response => {
          if (response.ok) {
            console.log("La ruta " + ruta + " devuelve un código " + response.status + " (OK).");
            document.getElementById("resultado").innerText += "La ruta " + ruta + " devuelve un código " + response.status + " (Failed).\n";
          } else {
            console.log("La ruta " + ruta + " no devuelve un código 200 (OK).");
            document.getElementById("resultado").innerText += "La ruta " + ruta + " no devuelve un código 200 (OK).\n";
          }
        })
        .catch(error => {
          console.error("Error al intentar acceder a la ruta " + ruta + ": ", error);
          document.getElementById("resultado").innerText += "Error al intentar acceder a la ruta " + ruta + ": " + error + "\n";
        });
    });
  }
  