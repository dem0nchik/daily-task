<?php
    include 'database.php';

    
    $id = filter_var(trim($_POST["id"]));
    $mysql->query("UPDATE `task` SET chek=1 WHERE id='$id'");
    $mysql->close();
    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    echo json_encode(["succes"=>"ok", "id"=>$id]);
?>