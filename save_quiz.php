<?php
// This script receives quiz answers via POST (JSON or form encoded)
// and appends them to a JSON file for persistence.

// Allow cross-origin requests if needed (optional)
// header('Access-Control-Allow-Origin: *');

// Decode incoming data
$input = file_get_contents('php://input');
$data = json_decode($input, true);
if (!$data) {
    // Fallback for form-encoded data
    $data = $_POST;
}

// Ensure the data directory exists
$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0775, true);
}
$resultsFile = $dataDir . '/quiz_results.json';

// Load existing results
$results = [];
if (file_exists($resultsFile)) {
    $json = file_get_contents($resultsFile);
    $decoded = json_decode($json, true);
    if (is_array($decoded)) {
        $results = $decoded;
    }
}

// Add timestamp to the incoming data
$data['timestamp'] = time();
$results[] = $data;

// Write back to the JSON file with pretty formatting
file_put_contents($resultsFile, json_encode($results, JSON_PRETTY_PRINT));

header('Content-Type: application/json');
echo json_encode(['status' => 'success']);
?>