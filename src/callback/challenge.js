const XMLHttpRequest = require("xmlhttprequest");
const API = "https://api.escuelajs.co/api/v1";
const DONE = 4;
const OK = 200;

function fetchData(urlApi, callback) {
  let xhttp = new XMLHttpRequest();

  xhttp.open("GET", urlApi, true);
  xhttp.onreadystatechange = function (e) {
    if (xhttp.readyState === DONE) {
      if (xhttp.status === OK) {
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        const error = new Error("error" + urlApi);
        return callback(error, null);
      }
    }
  };
  xhttp.send();
}

fetchData(`${API}/products`, function (error1, data1) {
  if (error1) return console.error(error1); //si hay error, devuelve el error

  fetchData(`${API}/products/${data1[0].id}`, function (error2, data2) {
    if (error2) return console.error(error2); //valida el error 2
    //se usa Optional chaining '?.' que es una forma segura de acceder a las propiedades de los objetos anidados, incluso si no existe una propiedad intermedia:

    fetchData(
      `${API}/categories/${data2?.category?.id}`,
      function (error3, data3) {
        if (error3) return console.error(error3);
        //evitar el callback hell
        console.log(data1[0]);
        console.log(data2.title);
        console.log(data3.name);
      }
    );
  });
});
