<?php
date_default_timezone_set('Europe/Paris'); //...K windows
header("Access-Control-Allow-Origin: *");
require 'vendor/autoload.php';

use \Firebase\JWT\JWT;
use Tuupola\Base62Proxy as Base62;
use Slim\Http\Request;
use Slim\Http\Response;


$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];




$product_catalog;

$product_catalog[0] = array(
    'name' => 'Armani Red Silk Shirt',
    'price' => 379.99,
    'qty' => 10,
    'description' => 'http',
    'img' => 'http'
  );

  $product_catalog[1] = array(
    'name' => 'Armani Red Silk Shirt',
    'price' => 379.99,
    'qty' => 10,
    'description' => 'http',
    'img' => 'http'
  );


$client;


$client[0] = array(
    'firstname' => 'toto',
    'lastname' => 'tata'
  );

  $client[1] = array(
    'firstname' => 'tutu',
    'lastname' => 'titi'
  );

$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);





$app->add(new Slim\Middleware\JwtAuthentication([
    "path" => "/api", 
    "secret" => "Angular.1s_S*#&$",
    "algorithm" => ["HS256"],
    "error" => function ($request, $response, $arguments) {
        $data["status"] = "error";
        $data["message"] = $arguments["message"];
        return $response
            ->withHeader("Content-Type", "application/json")
            ->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
]));



$app->group('/api', function(\Slim\App $app) {

    global $client;
    global $product_catalog;
    $app->get('/product/{id}',function(Request $request, Response $response, array $args) use($product_catalog){  
        
        if(isset($args["id"]) && isset($product_catalog[$args["id"]]))
        {
            $response->write(json_encode($product_catalog[$args["id"]]));
            return  $response->withHeader('Content-Type', 'application/json');
        }
        else
        {
            $response->write("Error unexpected id !! ");
            return $response->withStatus(400); 
        }
       });

    $app->post('/product',function(Request $request, Response $response, array $args) use($product_catalog) {  
        
        $parsedBody = $request->getParsedBody();
        if(isset($parsedBody["name"]) && isset($parsedBody["qty"]) && isset($parsedBody["price"]) && isset($parsedBody["description"]) && isset($parsedBody["img"])) // + Check types ! 
        {
             array_push($product_catalog, $parsedBody);

            $response->write(json_encode( end($product_catalog)));
            return  $response->withHeader('Content-Type', 'application/json');
        }
        else
        {
            $response->write("Error bad params !! ");
            return $response->withStatus(400); 
        }
       });

    $app->put('/product/:id',function(Request $request, Response $response, array $args) use($product_catalog) {  

        if(isset($args["id"]) && isset($product_catalog[$args["id"]]))
        {
            $parsedBody = $request->getParsedBody();
            $product_catalog[$args["id"]] = $parsedBody;
            $response->write(json_encode($product_catalog[$args["id"]]));
            return  $response->withHeader('Content-Type', 'application/json');
        }
        else
        {
            $response->write("Error unexpected id !! ");
            return $response->withStatus(400); 
        }
       });




       $app->delete('/product/:id',function(Request $request, Response $response, array $args)  use($product_catalog) {  
        if(isset($args["id"]) && isset($product_catalog[$args["id"]]))
        {
            $response->write(json_encode($product_catalog[$args["id"]]));
            return  $response->withHeader('Content-Type', 'application/json');
        }
        else
        {
            $response->write("Error unexpected id !! ");
            return $response->withStatus(400); 
        }

       });




    // Client section
    $app->get('/client/:id',function(Request $request, Response $response, array $args)  use($client) {   
        if(isset($args["id"]) && isset($client[$args["id"]]))
        {
            $response->write(json_encode($client[$args["id"]]));
            return  $response->withHeader('Content-Type', 'application/json');
        }
        else
        {
            $response->write("Error unexpected id !! ");
            return $response->withStatus(400); 
        }
       });



    $app->post('/client',function(Request $request, Response $response, array $args)  use($client) {     });

    $app->put('/client/:id',function(Request $request, Response $response, array $args)  use($client) {     });
  
    $app->delete('/client/:id',function(Request $request, Response $response, array $args)  use($client) {     });



       });
  
   


    // Product section
    $app->get('/catalog',function(Request $request, Response $response, array $args) use($product_catalog) {

        $response->write(json_encode($product_catalog));
        return  $response->withHeader('Content-Type', 'application/json');

    });


$app->get('/', function () {
    $date = new DateTime("now");
    echo "API IS RUNNING...<br>";
    echo $date->format('Y-m-d H:i:s');
});

$app->post('/login', function ($request, $response, $args) 
{
    $login = "toto";
    $mdp = "test";

    $parsedBody = $request->getParsedBody();

    if($parsedBody["user"] == $login && $parsedBody["password"] == $mdp)
    {
        $now = new DateTime("now");
        $future = new DateTime("now");
        $jti = Base62::encode(random_bytes(16));
        $secret = "Angular.1s_S*#&$";
    
        $payload = [
            "jti" => $jti,
            "iat" => $now->getTimeStamp(),
            "nbf" => $future->getTimeStamp(),
            "session" => [
                "username" => "toto",
                "userid" => 1,
                "shoppingCart" => []
                ]
            ];
    
        $token = JWT::encode($payload, $secret, "HS256");
    
        return $this->response->withJson(['token' => $token]);
    }
    else{
        return $response->withStatus(401); 
    }

});




$app->run();
?>