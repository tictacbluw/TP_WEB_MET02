<?php
include("vendor/autoload.php");
include("bootstrap.php");

class AddressController
{

    public static function createAddress($street, $city, $zipcode, $client)
    {
        try {
            global $entityManager;
            $address = new Addresse;
            $address->setRue($street);
            $address->setCity($city);
            $address->setZipcode($zipcode);
            $address->setClient($client);
            $entityManager->persist($address);
            $entityManager->flush();
            return $address;
        }catch (PDOException $e)
        {
            trigger_error(htmlentities($e->getMessage()));
        }
    }
}
