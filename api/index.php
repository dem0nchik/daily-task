<?php
if($_COOKIE['user'] == '') {
    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    echo json_encode(["error"=>'user not found']);
} else {
    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    echo json_encode(["text"=>$_COOKIE['user'] ]);
}
?>