# Práctica de proyecto front-end

## Objetivo
Nos gustaría poder encontrar los sitios en Barcelona de una manera más fácil por eso necesitamos crear una aplicación que nos facilíte la tarea utilizando la API Places de Google.

## Funcionalidad
Por un lado, disponemos de un buscador de sitios. Al introducir un término de búsqueda en el formulario y pulsar intro o el botón de buscar, deben aparecer los sitios en el listado inferior.

Por otro lado, disponemos de unas categorías en el menu lateral. Al clicar sobre una categoría deben aparecer los sitios de esta categoría en el listado de al lado.

Al pulsar sobre un sitio, debe desaparecer el listado de sitios y aparecer la información sobre el sitio (en el archivo index.html es la sección de 'Places details'): Imagen, Nombre del sitio, Dirección del sitio, Teléfono, Puntuación, si esta abierto o Cerrado, el sitio web. En caso de que el sitio tenga comentarios estos deben mostrarse en la sección "Place reviews"

El formato con el que se ha de mostrar la información es igual al del ejemplo que hay precargado en la página. La página debe limpiarse para que al abrirla el formulario esté limpio, aparezca las categorías y no aparezca ningún listado.

## API Google Places
Para obtener la información necesaria deberemos utilizar varios endpoints de la API de Google Places:

Los Ids de categorías son: restaurant, gym, musume, movie_theater, night_club

* Listado de categoría: GET https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.390205,2.154007&radius=15000&type=<ID CATEGORÍA>&key=KEY DE ACCESO
* Búsqueda por sitio: GET https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.390205,2.154007&radius=15000&keyword=<Texto a buscar>&key=KEY DE ACCESO
* Información de un sitio: GET https://maps.googleapis.com/maps/api/place/details/json?placeid=<PLACE ID>&key=KEY DE ACCESO

<a id="install-dependencies"></a>

## Instalar las dependencias:
Desde la raíz del proyecto ejecutar:
```bash
npm install
```

## Modificaciones:
Si se desea modificar el contenido del proyecto (la parte de javascript), después de realizar el cambio deberá ejecutar:
```bash
npm run build
```
Este comando compila todo el contenido de javascript y lo comprime en el fichero **`dist/index.min.js`**

## Levantar el proyecto
Una vez, se han instalado las [dependencias](#install-dependencies), puede abrir directamente el fichero **`dist/index.html`** y accerder a la app.

## Key de la API Google place
Esta API es de pago, aunque se puede obtener una key gratuita (con llamadas límitadas).
El proyecto cuenta con una key de la API (límitada), si el número de llamadas a la API es superado, puedes configurarlo reemplazando la key del fichero **`src/models/PlaceModel.js`**
```javascript
_GoogleMapsLoader.KEY = 'YOUR-API-KEY';
```