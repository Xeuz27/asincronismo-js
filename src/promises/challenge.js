import fetch from "node-fetch";
const API = "https://api.escuelajs.co/api/v1";

//función que va a recibir como argumento la url que queremos llamar y esto retornará el llamado de fecth: una promesa
function fetchData(urlApi) {
  return fetch(urlApi);
}
//el llamado
fetchData(`${API}/products`)
  .then((response) => response.json())
  .then((products) => {
    console.log(products);
  })
  .then(() => {
    console.log("hola");
  }) //se pueden anidar múltiples .then
  .catch((error) => console.log(error));

fetchData(`${API}/products`)
  .then((response) => response.json()) //se hace la conversión a un objeto json
  .then((products) => {
    console.log(products);
    return fetchData(`${API}/products/${products[0].id}`); // solo se quiere mostrar el primer elemento de la primera solicitud
  })
  .then((response) => response.json()) //se vuelve traer la data
  .then((product) => {
    console.log(product.title);
    return fetchData(`${API}/categories/${product.category.id}`); //se quiere mostrar la categoria de un producto en particular
  })
  .then((response) => response.json())
  .then((category) => {
    console.log(category.name);
  })
  .catch((err) => console.log(err)) //detectar un error
  .finally(() => console.log("Finally")); //es opcional para mostrar que se terminó la solicitud

function postData(urlApi, data) {
  const response = fetch(urlApi, {
    method: "POST", //tiene que ir en mayúscula
    mode: "cors", //cors es el permiso que va a tener, por defecto va estar siempre en cors
    credentials: "same-origin", //es opcional
    headers: {
      "Content-Type": "application/json", //necesario indicar que lo que se está enviando es de tipo json
    },
    body: JSON.stringify(data), //el método JSON.stringify() convierte un objeto o valor de JavaScript en una cadena de texto JSON
  });
  return response;
}
const data = {
  title: "Nunca pares de aprender",
  price: 2,
  description: "A description",
  categoryId: 1,
  images: ["https://placeimg.com/640/480/any"],
};
//podemos usar el postData como una promesa y con .then obtener la respuesta como un objeto json y mostrarlo después en la consola
postData(`${API}/products`, data)
  .then((response) => response.json())
  .then((data) => console.log(data));

function putData(urlApi, dataUpdate) {
  const response = fetch(urlApi, {
    method: "PUT",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUpdate),
  });
  return response;
}

const dataUpdate = {
  title: "Se puede cambiar tambien otras caracteristicas",
  price: 10, // no es necesario colocar todas las características del objeto, solo las que se cambiarán
};

putData(`${API}/products/271`, dataUpdate) //se debe colocar el id del objeto que se quiere modificar
  .then((response) => response.json())
  .then((dataUpdate) => console.log(dataUpdate));

//Eliminar un objeto indicando el id con DELETE
function deleteData(urlApi) {
  //no es necesario pasar la data
  const response = fetch(urlApi, {
    method: "DELETE",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }, //no es necesario especificar el body
  });
  return response;
}

const idNumber = 271; //se debe colocar el id del objeto qu se quiere modificar

deleteData(`${API}/products/${idNumber}`) //no es necesario pasar data
  .then(() => {
    console.log(`Borrado ${idNumber}`); //es opcional imprimir en consola
  });
