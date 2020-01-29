<?php
require_once("CategorieController.php");
use Slim\Http\Request;
use Slim\Http\Response;

$app->get('/allcategories',function(Request $request, Response $response, array $args)
{
    global $entityManager;
    $products = $entityManager->getRepository('Categorie')
        ->createQueryBuilder('c')
        ->getQuery()->getArrayResult();
    return $this->response->withJson($products);
});