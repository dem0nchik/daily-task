<?php
    include 'database.php';
    header("Access-Control-Allow-Origin: *");
    $name = filter_var(trim($_POST["name"]));
    
    $result = $mysql->query("SELECT * FROM `user` WHERE `name` = '$name'");
    $user = $result->fetch_assoc();
    if(count($user) == 0) {
        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");
        echo json_encode(["error"=>'user not found']);
        exit();
    }

    setcookie('user', $user['name'], time() + 3600 * 24, "/");
    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    echo json_encode(["name"=>$user['name']]);
    
    $mysql->close();

?>