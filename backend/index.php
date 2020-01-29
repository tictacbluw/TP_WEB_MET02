<?php
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 'on'); 
date_default_timezone_set('Europe/Paris'); //...K windows
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use Slim\App;
use Slim\Container;
use Tuupola\Base62Proxy as Base62;

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];

$c = new Container($configuration);
$app = new App($c);



$app->add(new Tuupola\Middleware\JwtAuthentication([
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


$app->get('/', function () {
    $date = new DateTime("now");
    echo "API IS RUNNING...<br>";
    echo $date->format('Y-m-d H:i:s');
});

$app->post('/login', function ($request, $response, $args)
{
    $parsedBody = $request->getParsedBody();

    global $entityManager;

    $clientRepository = $entityManager->getRepository('Client');

    $client = $clientRepository->findOneBy(array('email' => $parsedBody["user"]));

    if($client != null)
    {
        $login = $client->getEmail();
        $mdp = $client->getPassword();

        if($parsedBody["user"] == $login && md5($parsedBody["password"]) == $mdp) {
            $now = new DateTime("now");
            $future = new DateTime("now");
            $jti = Base62::encode(random_bytes(16));
            $secret = "Angular.1s_S*#&$";

            $payload = [
                "jti" => $jti,
                "iat" => $now->getTimeStamp(),
                "nbf" => $future->getTimeStamp(),
                "session" => [
                    "username" => $client->getEmail(),
                    "userid" => $client->getId()
                ]
            ];
            $token = JWT::encode($payload, $secret, "HS256");
            return $this->response->withJson(['token' => $token]);
        }
        else
        {
            return $response->withStatus(400);
        }
    }
    else{
        return $response->withStatus(401);
    }

});


    require_once("src/routes.php");






$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
        ->withHeader("Access-Control-Allow-Origin", "*")
        ->withHeader("Access-Control-Allow-Headers","*")
        ->withHeader("Access-Control-Allow-Methods", "HEAD,POST,GET,PUT,PATCH,DELETE");

});
$app->run();

