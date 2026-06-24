<?php
require_once('../config/connection.php'); // Importa la conexión a la base de datos
// Configuración de encabezados HTTP
header("Access-Control-Allow-Origin: *"); // Permite que cualquier origen pueda acceder a esta API, sin importar su dominio. Esto nos va a ayudar a prevenir los famosos problemas de CORS (Cross-Origin Resource Sharing). ¿Qué es CORS? CORS es una política de seguridad implementada por los navegadores web para restringir las solicitudes HTTP que se puedan hacer a un dominio diferente al que sirvió la página web.
header("Content-Type: application/json; charset=UTF-8"); // Esta cabecer, indica el tipo de contenido que va a ser devuelto por esta API, para este ejemplo, va ser en formato JSON. Además, también especificamos la encodificación de caracteres, en este caso UTF-8.
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE"); // Esta cabecera especifica los métodos HTTP que esta API va a aceptar. Es una cabecera importante para temas de seguridad. ¿Qué ocurre si un cliente intenta hacer una solicitud no permitida? En este caso, el servidor responderá con un código de estado HTTP 405 Method Not Allowed, indicando que el método utilizado en la solicitud no está permitido para el recurso solicitado.
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); // Esta cabecera especifica los encabezados HTTP que se permitirán en las solicitudes o peticiones recibidas por esta API. Es decir, si un cliente hace una solicitud a esta API, y envía una cabecer no permitida, el servidor responderá con un código de estado HTTP 400 Bad Request, indicando que la solicitud no se pudo procesar debido a encabezados no permitidos.

// Obtener el método HTTP de la solicitud
$method = $_SERVER['REQUEST_METHOD']; // Defino una variable, en este caso yo la definí como "method" (Ojo, no importa el nombre que tú coloques). En esta variable estoy almacenando el método HTTP que se utilizó para hacer la solicitud a esta API. ¿Cómo hago esto? Lo hago utilizando la superglobal $_SERVER, que se comporta como un arreglo asociativo que contiene información sobre el servidor y la solicitud actual. La clave 'REQUEST_METHOD' dentro de $_SERVER nos devuelve el método HTTP utilizado en la solicitud (Que por ende, puede ser GET, POST, PUT, PATCH o DELETE).



// Procesamos la solicitud según el método HTTP
switch ($method) { // Utilizamos la condicional switch-case para evaluar el valor de la variable $method. NOTA: Técnicamente igual podríamos utilizar una estructura if-else, sin embargo el switch-case es un método más limpio
    case 'GET':
        // Bloque de código con estructura y operaciones para manejar solicitudes GET (Si, aquí usarías tus prepared statements, pero tu respuesta será en JSON)
        // Endpoint para obtener categorías filtradas por id - http://localhost/gestor_bibliotecario/api/api-categorias.php?id=1
        if (isset($_GET['id'])) { // Con el método isset() verificamos que la variable $_GET['id'] esté definida es decir, que exista y que su valor no sea null
            $id = intval($_GET['id']); // Si la variable $_GET['id'] está definida, la almacenamos en una variable llamada $id. Nota: También podríamos trabajarla con la variable superglobal.
            $stmt = $conn->prepare("SELECT id, nombre, descripcion FROM categorias WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $resultado = $stmt->get_result();
            if ($resultado->num_rows > 0) {
                $categoria = $resultado->fetch_assoc();
                echo json_encode($categoria);
            } else {
                echo json_encode(array("mensaje" => "Categoría no encontrada"));
            }
            $stmt->close();
            $conn->close();
        } elseif (isset($_GET['nombre'])) {  // Endpoint para obtener categorías filtradas por nombre - http://localhost/gestor_bibliotecario/api/api-categorias.php?nombre="Ficcion"
            $nombre = trim($_GET['nombre']);
            $stmt = $conn->prepare("SELECT id, nombre, descripcion FROM categorias WHERE nombre LIKE ?");
            $nombre_param = "%$nombre%"; // Como es una consulta de tipo "LIKE" agregamos los comodines "%" al inicio y al final. Esto nos permite buscar coincidencias parciales en la columna nombre. Por ejemplo, si el cliente envía "Ficcion", la consulta buscará cualquier categoría que tenga "Ficcion", ya sea al inicio o al final
            $stmt->bind_param("s", $nombre_param);
            $stmt->execute();
            $resultado = $stmt->get_result();
            $categorias = array();
            if ($resultado->num_rows > 0) {
                while ($row = $resultado->fetch_assoc()) {
                    $categorias[] = $row;
                }
                echo json_encode($categorias);
            } else {
                echo json_encode(array("mensaje" => "Categoría no encontrada"));
            }
            $stmt->close();
            $conn->close();
        } else { // Operación para obtener todos los registros de la tabla "categorias" - http://localhost/gestor_bibliotecario/api/api-categorias.php
            $stmt = $conn->prepare("SELECT id, nombre, descripcion FROM categorias");
            $stmt->execute();
            $resultado = $stmt->get_result();
            $categorias = array();
            while ($row = $resultado->fetch_assoc()) {
                $categorias[] = $row;
            }
            $respuesta = json_encode($categorias);
            echo $respuesta;
            $stmt->close();
            $conn->close();
        }
        break;
    case 'POST':
        // Bloque de código con estructura y operaciones para manejar solicitudes POST
        // Operación para crear un nuevo registro en la tabla "categorías"
        // Endpoint para crear una nueva categoría - http://localhost/gestor_bibliotecario/api/api-categorias.php
        $data = json_decode(file_get_contents("php://input"), true); // Aquí lo que estoy haciendo es crear una variable llamada $data, y esta variable contiene la decodificación de los datos JSON, que se realiza mediante el método json_decode(). ¿A qué se refiere o para qué me sirve la decodificación? Recuerda que el cliente envía los datos en formato JSON, entonces para poder trabajarlos en nuestro código PHP necesitamos convertirlos de formato JSON a un formato que PHP pueda entender, en este caso usaremos un arreglo asociativo. El método json_decode() hace tal cual eso, convierte una cadena JSON en una estructura de datos de PHP. El parámetro file_get_contents("php://input") se utiliza para leer el cuerpo de la solicitud HTTP, y el parámetro true, indica que el resultado debe ser un arreglo asociativo.
        $nombre = trim($data['nombre'] ?? "");
        $descripcion = trim($data['descripcion'] ?? "");
        if(!empty($nombre) && !empty($descripcion)){
            $stmt = $conn->prepare("INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)");
            $stmt->bind_param("ss", $nombre, $descripcion);
            if($stmt->execute()){
                http_response_code(201); // Código HTTP indicando que el recurso fue creado exitosamente. Recuerda que el código 201 es un código de estado HTTP que indica que la solicitud se ha completado con éxito y que se ha creado un nuevo recurso como resultado de la solicitud. En este caso, estamos indicando que la categoría fue creada exitosamente.
                echo json_encode(array("mensaje" => "Categoría creada exitosamente")); // Con json_encode(), hacemos lo contrario que con json_decode(), es decir, convertimos un arreglo asociativo de PHP a una cadena en formato JSON. Posteriormente enviamos la respuesta al cliente con echo.
            }else{
                http_response_code(500); // Código HTTP indicando que ocurrió un error interno en el servidor.
                echo json_encode(array("mensaje" => "Error al crear la categoría " . $stmt->error)); // En caso de que ocurra un error al ejecutar la consulta, enviamos un mensaje de error al cliente con el detalle del error.
            }
        }else{
            http_response_code(400); // Código HTTP indicando que la solicitud es inválida.
            echo json_encode(array("mensaje" => "El nombre y la descripción son obligatorios"));
        }
        break;
    case 'PUT':
        // Bloque de código con estructura y operaciones para manejar solicitudes PUT
        break;
    case 'PATCH':
        // Bloque de código con estructura y operaciones para manejar solicitudes PATCH
        break;
    case 'DELETE':
        // Bloque de código con estructura y operaciones para manejar solicitudes DELETE
        break;
    default:
        // Mensajito por si no cae en ninguna de los casos anteriores
        break;
}
