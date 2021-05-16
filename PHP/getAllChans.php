<?php

include 'connect.php';
$pdo = connectDB();


$query = "SELECT * FROM chans";

$sql = $pdo->prepare($query);

$sql->execute(); 

$answer = $sql->fetchAll(\PDO::FETCH_ASSOC); 

$answer = json_encode($answer);

echo $answer;

?>
