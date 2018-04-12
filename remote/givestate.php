<?php

$json_config = json_decode(file_get_contents('config.json'));
$dbName = $json_config->dbName;
$dbUser = $json_config->dbUser;
$dbPass = $json_config->dbPass;
$dbHost= $json_config->dbHost;
$projectName = $json_config->projectName;

try
{
    $bdd = new PDO('mysql:host='.$dbHost.';dbname='.$dbName.';charset=utf8', $dbUser, $dbPass);
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}
$req = $bdd->prepare('SELECT current FROM ColorJS WHERE project= ? ');
$req->execute(array($projectName));

$data = $req->fetch();

echo $data['current'];



?>