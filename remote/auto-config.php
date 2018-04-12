<?php
//non fonctionnel pour le moment

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

$check = $bdd->prepare('SELECT project FROM ColorJS WHERE project=?');
$check->execute(array($projectName));
$cdata = $check->fetch();
if (isset($cdata['project'])) {
  echo "la table existe déjà";
}
else {
$req = $bdd->prepare('INSERT INTO ColorJS (project, current) VALUES(?, ?)');
$req->execute(array($projectName, 0));

echo "ok ! Système installé!";
}

?>