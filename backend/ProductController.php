<?php
include("vendor/autoload.php");
include("bootstrap.php");

class ProductController
{
    public static function checkPrice($price)
    {
        if((is_int($price) || is_float($price)) && $price > 0)
            return true;
        return false;
    }

    public static function checkQty($qty)
    {
        if(is_int($qty) && $qty >= 0)
            return true;
        return false;
    }

    public static function createProduct($name, $description, $price, $quantity, $img_url, $category)
    {
        try {
            if(self::checkPrice($price) && self::checkQty($quantity))
            {
                global $entityManager;
                $product = new Produit;
                $product->setName(htmlspecialchars($name));
                $product->setDescription(htmlspecialchars($description));
                $product->setPrice($price);
                $product->setQuantity($quantity);
                $product->setImgUrl(htmlspecialchars($img_url));
                $product->setCategorie($category);
                $entityManager->persist($product);
                $entityManager->flush();
                return $product;
            }
        }catch (PDOException $e)
        {
            trigger_error(htmlentities($e->getMessage()));
        }
    }
}

