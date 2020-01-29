<?php
require_once("ClientController.php");
require_once("AddressController.php");

use Slim\Http\Request;
use Slim\Http\Response;

/**
 * @api {post} /client Customer creation
 * @apiName CreateCustomer
 * @apiGroup Customer
 *
 * @apiParam {String} firstname Firstname Name of the Customer
 * @apiParam {String} lastname Lastname Name of the Customer
 * @apiParam {String} password password of the Customer
 * @apiParam {String} phone Phone of the Customer
 * @apiParam {int} civility Civility of the Customer
 * @apiParam {email} email Email of the Customer
 * @apiExample Body-Example:
 *   {
 *       "firstname": "controller",
 *       "lastname": "test",
 *       "password": "mdp",
 *       "phone": "06 00 00 00 00",
 *       "civility": 1,
 *       "email": "test2@test.com"
 *   }
 * @apiSuccess {String} result Success.
 * @apiSuccess {Customer} .
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *       "id": 5,
 *       "nom": "controller",
 *       "prenom": "test",
 *       "phone": "06 32 72 62 61",
 *       "civility": 1,
 *       "email": "test2@test.com"
 *   }
 *
 * @apiError InvalidParams Missing mandatory params.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "missing mandatory params 'firstname' in body"
 *     }
 */
$app->post('/client',function(Request $request, Response $response, array $args) {

    $parsedBody = $request->getParsedBody();
    if(!ClientController::checkMail($parsedBody["email"]))
    {
        $response->write("email must follow the pattern test123@email.fr");
        return $response->withStatus(400);
    }
    if(!ClientController::checkName($parsedBody["firstname"]))
    {
        $response->write("firstname can only contain letter");
        return $response->withStatus(400);
    }
    if(!ClientController::checkName($parsedBody["lastname"]))
    {
        $response->write("lastname can only contain letter");
        return $response->withStatus(400);
    }
    if(!ClientController::checkPassword($parsedBody["password"]))
    {
        $response->write("password must ...");
        return $response->withStatus(400);
    }
    if(!ClientController::checkPhone($parsedBody["phone"]))
    {
        $response->write("phone number must follow the pattern 00 00 00 00 00");
        return $response->withStatus(400);
    }

    ClientController::createClient($parsedBody["firstname"], $parsedBody["lastname"], $parsedBody["phone"],
        $parsedBody["email"], $parsedBody["civility"], $parsedBody["password"]);
});



$app->group('/api', function(\Slim\App $app) {

    /**
     * @api {get} api/client/:id Customer information
     * @apiName GetClient
     * @apiGroup Customer
     *
     * @apiParam {Number} id of the client
     * @apiSuccess Client information.
     *
     * @apiSuccessExample Success-Response:
     *     {
     *       "id": 5,
     *       "nom": "controller",
     *       "prenom": "test",
     *       "phone": "06 32 72 62 61",
     *       "civility": true,
     *       "email": "test2@test.com"
     *       }
     *
     * @apiError InvalidParams Missing mandatory params.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "error": "missing mandatory params 'id'"
     *     }
     */
$app->get('/client/{id}',function(Request $request, Response $response, array $args) {
    if(isset($args["id"]))
    {
        $client = ClientController::getClientById((int)$args["id"]);
        if($client != null)
        {
            $client_array["id"] = $client->getId();
            $client_array["nom"] = $client->getNom();
            $client_array["prenom"] = $client->getPrenom();
            $client_array["phone"] = $client->getPhone();
            $client_array["civility"] = $client->getCivility();
            $client_array["email"] = $client->getEmail();
            $response->write(json_encode($client_array));
            $response->withStatus(200);

            return  $response->withHeader('Content-Type', 'application/json');
        }
        else
        {
            $response->write("client not found");
            return $response->withStatus(404);
        }
    }
    else
    {
        $response->write("Error unexpected id !! ");
        return $response->withStatus(400);
    }
});


    /**
     * @api {put} api/client/:id Customer update
     * @apiName UpdateCustomer
     * @apiGroup Customer
     * @apiParam {Number} id Name of the product
     * @apiParam {String} [firstname] Firstame of the customer
     * @apiParam {String} [lastname] Lastname of the customer
     * @apiParam {String} [email] email of the customer
     * @apiParam {String} [password] password of the customer
     * @apiParam {Number} [civility] civility of the customer
     *
     * @apiExample Body-Example:
     *     {
     *       "email": "newemail@email.fr"
     *     }
     *
     *
     * @apiSuccess {String} result Success.
     * @apiSuccess {Customer} Customer with updated infos.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": 5,
     *       "nom": "controller",
     *       "prenom": "test",
     *       "phone": "06 32 72 62 61",
     *       "civility": true,
     *       "email": "newemail@email.fr"
     *       }
     *
     *
     * @apiError InvalidParams Missing mandatory params.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "error": "id doesn't exist !"
     *     }
     */
$app->put('/client/{id}',function(Request $request, Response $response, array $args)
{
    $parsedBody = $request->getParsedBody();
    global $entityManager;
    $clientRepository = $entityManager->getRepository('Client');
    $client = $clientRepository->findOneBy(array('id' => (int)$args["id"]));
    if($client != null)
    {
        if(isset($parsedBody["firstname"]))
        {
            $client->setPrenom($parsedBody["firstname"]);
        }
        if(isset($parsedBody["lastname"]))
        {
            $client->setNom($parsedBody["lastname"]);
        }
        if(isset($parsedBody["phone"]))
        {
            $client->setPhone($parsedBody["phone"]);
        }
        if(isset($parsedBody["civility"]))
        {
            $client->setPhone($parsedBody["civility"]);
        }
        if(isset($parsedBody["password"]))
        {
            $client->setPassword(md5($parsedBody["password"]));
        }
        if(isset($parsedBody["email"]))
        {
            $client->setEmail($parsedBody["email"]);
        }
        $entityManager->persist($client);
        $entityManager->flush();
        $response->write(json_encode($client));
        return  $response->withHeader('Content-Type', 'application/json');
    }
    else{
        $response->write("id doesn't exist !");
        return $response->withStatus(500);
    }
});

    /**
     * @api {delete} api/client/:id Customer deletion
     * @apiName DeleteCustomer
     * @apiGroup Customer
     *
     * @apiParam {Number} id  ID of the customer
     * @apiSuccess {String} result Success.
     * @apiSuccess {Number} id  Id of the deleted Custome.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *        1
     *     }
     *
     * @apiError InvalidParams Missing mandatory params.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "error": "invalid 'id' customer not found !"
     *     }
     */
$app->delete('/client/{id}',function(Request $request, Response $response, array $args)
{
    global $entityManager;

    if(isset($args["id"]))
    {
        $client = ClientController::getClientById((int)$args["id"]);
        if ($client != null)
        {
            $entityManager->remove($client);
            $entityManager->flush();
            $response->write(json_encode($client->getId()));
            return  $response->withHeader('Content-Type', 'application/json');
        }
        else
        {
            $response->write("id doesn't exist !");
            return $response->withStatus(400);
        }
    }
    else
    {
        $response->write("missing args : id !");
        return $response->withStatus(400);
    }
});

});
