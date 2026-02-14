<?php
// where submissions will be stored
$file = 'contacts.json';

// get POST data
$name = trim($_POST['name'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '') {
    echo "Invalid input.";
    exit;
}

// load existing
$data = [];
if (file_exists($file)) {
    $raw = file_get_contents($file);
    $data = json_decode($raw, true) ?: [];
}

// add new submission
$data[] = [
    'name'    => htmlspecialchars($name),
    'message' => htmlspecialchars($message),
    'time'    => date('Y-m-d H:i:s')
];

// save JSON
file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// thank you page
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Thank You!</title>
</head>
<body>
    <h1>Thank you for contacting me!</h1>
    <p>Your message has been saved.</p>
</body>
</html>
