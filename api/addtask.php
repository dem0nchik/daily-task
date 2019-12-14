<?php
    include 'database.php';

    $sim = ["a","b","c","d","e","f","3","4","5","6","7","8","9"];
    function rand_color($sim) {
        $color = "";
        for($i = 0; $i < 6; $i++) {
            $rand = rand(1, count($sim)-1);
            $color = $color . $sim[$rand];
        }
        return $color;
    }
    
    $description = filter_var(trim($_POST["description"]));
    $color = rand_color($sim);
    $chek = 0;
    $mysql->query("INSERT INTO `task` (`description`, `color`, `chek`) VALUES('$description', '$color', '$chek')");
    $mysql->close();
    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    echo json_encode(["succes"=>"ok"]);
?>