<?php
include("vendor/autoload.php");
include("bootstrap.php");

class CategorieController
{
    public static function createCategory($name)
    {
        try {
            global $entityManager;
            $cat = new Categorie;
            $cat->setName($name);
            $entityManager->persist($cat);
            $entityManager->flush();
            return $cat;
        }
        catch (PDOException $e)
        {
            trigger_error(htmlentities($e->getMessage()));
        }
    }


}