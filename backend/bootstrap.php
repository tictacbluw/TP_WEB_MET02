<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
require_once "config.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'driver' => $DB_DRIVER,
'user' => $DB_USER,
'password' => $DB_PASS,
'dbname' => $DB_NAME,
'port' => $DB_PORT
);

$entityManager = EntityManager::create($conn, $config);

?>
