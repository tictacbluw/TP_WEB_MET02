<?php
require_once("ProductController.php");

use Slim\Http\Request;
use Slim\Http\Response;


/**
 * @api {get} /catalog
 * @apiName GetCatalog
 * @apiGroup Product
 *
 * @apiSuccess Product catalog.
 *
 * @apiSuccessExample Success-Response:
 *   [
 *     {
 *      "id": 2,
 *      "name": "fzefzfz",
 *       "description": "sdfsdfs",
 *       "price": 1,
 *       "quantity": 1,
 *       "imgUrl": "img_1.jpeg"
 *     },...
 * ]
 *
 * @apiError 503
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 503 Service Unavailable
 */
$app->get('/catalog',function(Request $request, Response $response, array $args)
{
    global $entityManager;
    $products = $entityManager->getRepository('Produit')
        ->createQueryBuilder('p')
        ->getQuery()->getArrayResult();
    return $this->response->withJson($products);
});

/**
 * @api {get} /product/:id Product information
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id IDS of the products
 * @apiSuccess Product information.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "id": 1,
 *       "name": "Product toto",
 *       "description": "Best product ever !",
 *       "price" : 10,
 *       "quantity": 5,
 *       "images" : ["urlimage1.jpg", "urlimage2.jps"]
 *     }
 *
 * @apiError InvalidParams Missing mandatory params.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "missing mandatory params 'name' in body"
 *     }
 */
$app->get('/product/{id}',function(Request $request, Response $response, array $args) {

    if(isset($args["id"]))
    {
        global $entityManager;

        $product = $entityManager->getRepository('Produit')->findOneById((int)$args["id"]);

        if($product != null)
        {
            $product_array["id"] = $product->getId();
            $product_array["name"] = $product->getName();
            $product_array["description"] = $product->getDescription();
            $product_array["price"] = $product->getPrice();
            $product_array["quantity"] = $product->getQuantity();
            $product_array["img_url"] = $product->getImgUrl();
            $product_array["categorie_id"] = $product->getCategorie()->getId();

            $response->withStatus(200);
            return $response->withJson($product_array);
        }
        else
        {
            $response->write("Product not found! ");
            return $response->withStatus(204);
        }
    }
    else
    {
        $response->write("Error unexpected id !! ");
        return $response->withStatus(400);
    }
});





$app->group('/api', function(\Slim\App $app) {
/**
 * @api {post} /product/ Product creation
 * @apiName CreateProduct
 * @apiGroup Product
 *
 * @apiParam {String} name Name of the product
 * @apiParam {String} [description] Description of the product
 * @apiParam {Number} [price] Price of the product
 * @apiParam {Number} [quantity] Quantity of the product
 * @apiParam {String[]} [images] Images of the product
* @apiExample Body-Example:
 *     {
 *       "name": "Product toto",
 *       "description": "Best product ever !",
 *       "price" : 10,
 *       "quantity": 5,
 *       "img" : "urlimage1.jpg"
 *     }
 *
 * @apiSuccess {String} result Success.
 * @apiSuccess {Number} id  Id of the created Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": "Product Created",
 *       "id": 1
 *     }
 *
 * @apiError InvalidParams Missing mandatory params.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "missing mandatory params 'name' in body"
 *     }
 */
$app->post('/product',function(Request $request, Response $response) {

    global $entityManager;
    $parsedBody = $request->getParsedBody();
    if(isset($parsedBody["name"]) && isset($parsedBody["quantity"]) && isset($parsedBody["price"])
        && isset($parsedBody["description"]) && isset($parsedBody["img"]))
    {
        $cat = $entityManager->getRepository('Categorie')->findOneById(1);

        $product =  ProductController::createProduct($parsedBody["name"], $parsedBody["description"], $parsedBody["price"],
            $parsedBody["quantity"], $parsedBody["img"], $cat);

        $product_array["id"] = $product->getId();
        $product_array["name"] = $product->getName();
        $product_array["description"] = $product->getDescription();
        $product_array["price"] = $product->getPrice();
        $product_array["quantity"] = $product->getQuantity();
        $product_array["img_url"] = $product->getImgUrl();
        $product_array["categorie_id"] = $product->getCategorie()->getId();
        $response->withStatus(201);
        return $response->withJson($product_array);
    }
    else
    {
        $response->write("Error bad params !! ");
        return $response->withStatus(400);
    }
});




/**
 * @api {put} /product/:id Product update
 * @apiName UpdateProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id Name of the product
 * @apiParam {String} [name] Name of the product
 * @apiParam {String} [description] Description of the product
 * @apiParam {Number} [price] Price of the product
 * @apiParam {Number} [quantity] Quantity of the product
 * @apiParam {String[]} [images] Images of the product
 *
 * @apiExample Body-Example:
 *     {
 *       "name": "New Product toto",
 *     }
 *
 *  
 * @apiSuccess {String} result Success.
 * @apiSuccess {Product} Product with updated infos.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": "Product Updated",
 *       "Product": {
 *                      "id":1,
 *                      "name": "New Product toto",
 *                      "description": "Best product ever !",
 *                      "price" : 10,
 *                      "quantity": 5,
 *                      "images" : ["urlimage1.jpg", "urlimage2.jps"]
 *                  }
 *     }
 *
 * @apiError InvalidParams Missing mandatory params.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "missing at least one param in body"
 *     }
 */
$app->put('/product/{id}',function(Request $request, Response $response, array $args) {

    if(isset($args["id"]))
    {
        global $entityManager;
        $parsedBody = $request->getParsedBody();
        $product = $entityManager->getRepository('Produit')->findOneById((int)$args["id"]);
        if($product != null)
        {
            if(isset($parsedBody["name"]))
            {
                $product->setName(htmlspecialchars($parsedBody["name"]));
            }
            if(isset($parsedBody["description"]))
            {
                $product->setDescription(htmlspecialchars($parsedBody["description"]));
            }
            if(isset($parsedBody["price"]) && ProductController::checkPrice($parsedBody["price"]))
            {
                $product->setPrice($parsedBody["price"]);
            }
            if(isset($parsedBody["quantity"]) && ProductController::checkQty($parsedBody["quantity"]))
            {
                $product->setQuantity($parsedBody["quantity"]);
            }
            if(isset($parsedBody["img_url"]))
            {
                $product->setImgUrl(htmlspecialchars($parsedBody["img_url"]));
            }
            if(isset($parsedBody["category_id"]))
            {
                $cat = $entityManager->getRepository('Categorie')->findOneById((int)$parsedBody["category_id"]);
                if($cat != null)
                {
                    $product->setCategorie($cat);
                }
            }
            $entityManager->persist($product);
            $entityManager->flush();

            $product_update["id"] = $product->getId();
            $product_update["name"] = $product->getName();
            $product_update["description"] = $product->getDescription();
            $product_update["price"] = $product->getPrice();
            $product_update["quantity"] = $product->getQuantity();
            $product_update["img_url"] = $product->getImgUrl();
            $product_update["category_id"] = $product->getCategorie()->getId();
            $response->write(json_encode($product_update));
            return $response->withStatus(200);

        }
        else
        {
            $response->write("Product not found !");
            return $response->withStatus(404);
        }

        return  $response->withHeader('Content-Type', 'application/json');
    }
    else
    {
        $response->write("Error unexpected id !! ");
        return $response->withStatus(400);
    }
});




/**
 * @api {delete} /product/:id Product deletion
 * @apiName DeleteProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id  ID of the product
 * @apiSuccess {String} result Success.
 * @apiSuccess {Number} id  Id of the deleted Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": "Product deleted",
 *       "id": 1
 *     }
 *
 * @apiError InvalidParams Missing mandatory params.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "invalid 'id' product not found !"
 *     }
 */
$app->delete('/product/{id}',function(Request $request, Response $response, array $args) {
    if(isset($args["id"]))
    {
        global $entityManager;
        $product = $entityManager->getRepository('Produit')->findOneById((int)$args["id"]);
        if($product != null)
        {
            $product_delete["id"] = $product->getId();
            $product_delete["name"] = $product->getName();
            $product_delete["description"] = $product->getDescription();
            $product_delete["price"] = $product->getPrice();
            $product_delete["quantity"] = $product->getQuantity();
            $product_delete["img_url"] = $product->getImgUrl();
            $product_delete["category_id"] = $product->getCategorie()->getId();

            $entityManager->remove ($product);
            $entityManager->flush ();

            $response->write(json_encode($product_delete));
            return $response->withStatus(200);
        }
    }
    else
    {
        $response->write("Error unexpected id !! ");
        return $response->withStatus(400);
    }

});
});
