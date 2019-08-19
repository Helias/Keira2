<?php

try {

  $host = "";  
  $dbname = "";
  $user = "";
  $pass = "";
    
  # MySQL with PDO_MYSQL
  $REMOTE_DB = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
 

}
catch(PDOException $e) {
    echo $e->getMessage();
}


