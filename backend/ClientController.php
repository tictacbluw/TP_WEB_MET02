<?php
include("vendor/autoload.php");
include("bootstrap.php");

class ClientController
{
	/**
	 * Check if e-mail is correct based on regex
	 * @param String   $email  e-mail to test
	 * @return Boolean
	 */
	public static function checkMail($email)
	{
		return preg_match ( " /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/ " , $email );
	}

	/**
	 * Check if phone number is correct based on regex
	 * @param String   $phone  phone number to test
	 * @return Boolean
	 */
	public static function checkPhone($phone)
	{
		return preg_match ( " /^(\d\d\s){4}(\d\d)$/ " , $phone );
	}

	/**
	 * Check if name is correct based on regex
	 * can be used to check firstname or lastname
	 * @param String   $name   name to test
	 * @return Boolean
	 */
	public static function checkName($name)
	{
        return preg_match (" /^\w+$/ ", $name);
	}

	/**
	 * Check if password is correct based on regex
	 * @param String   $password   password to test
	 * @return Boolean
	 */
	public static function checkPassword($password)
	{
        return preg_match (" /^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/ ", $password);
	}


    /**
     * Create a new Client and store it in the database
     * @param String $firstname client's firstname
     * @param String $lastname client's lastname
     * @param String $phone client's phone number
     * @param String $email client's e-mail
     * @param int $civility client's civility 0 for women, 1 for men
     * @param String $password client's password
     * @return Client  $Client return client object or null if fail
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
	public static function createClient($firstname, $lastname, $phone, $email, $civility, $password)
	{
		try {
			if(self::checkMail($email) && self::checkPhone($phone) && self::checkpassword($password) && self::checkName($firstname) && self::checkName($lastname))
			{
				global $entityManager;
				$client = new Client;
				$client->setNom($lastname);
				$client->setPrenom($firstname);
				$client->setPhone($phone);
				$client->setCivility($civility);
				$client->setEmail($email);
				$client->setPassword(md5($password));
				$entityManager->persist($client);
				$entityManager->flush();
				return $client;
			}
		} catch (PDOException $e)
		{
			trigger_error(htmlentities($e->getMessage()));
		}
	}

	public static function getClientById($id)
	{
		global $entityManager;
		$clientRepository = $entityManager->getRepository('Client');
		return $clientRepository->findOneBy(array('id' => $id));
	}
}


