<?php

/**
 * Routing based on https://www.taniarascia.com/the-simplest-php-router/
 */

$request = $_SERVER['REQUEST_URI'];

/**
 * The root directory where this project lives
 */
$root = '/SL';
$root_len = strlen($root);
$request = substr($request, $root_len);

switch ($request) {
  case '/' :
    require __DIR__ . '/views/login.php';
    break;
  case '':
    require __DIR__ . '/views/login.php';
    break;
  case '/home':
    require __DIR__ . '/views/login.php';
    break;
  case '/compra_direta':
    require __DIR__ . '/views/user/compra_direta.php';
    break;
  default:
    http_response_code(404);
    require __DIR__ . '/views/404.php';
    break;
}

?>