<?php
include 'connect.php';
$pdo = connectDB();

$query = "SELECT * FROM team WHERE name = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['user']);
$sql->execute();

$answer = $sql->fetchAll(\PDO::FETCH_NUM); 

$answer = json_encode($answer);
if($answer == '[]'){
  $query = "INSERT INTO `team`( `name`, `password`, `cash`,`email`) VALUES (?,?,1500,?)";
  $sql = $pdo->prepare($query);

  $sql->bindParam(1, $_GET['user']);
  $sql->bindParam(2, $_GET['pass']);
    $sql->bindParam(3, $_GET['email']);

  $sql->execute();

}
?>
