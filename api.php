<?php

declare(strict_types=1);

const OMDB_API_URL = 'https://www.omdbapi.com/';
const OMDB_API_KEY_FILE = '/etc/responsive-movie-app/api-key';

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function fail(int $status, string $message): never
{
    http_response_code($status);
    echo json_encode(['Response' => 'False', 'Error' => $message]);
    exit;
}

$title = $_GET['title'] ?? '';

if (!is_string($title)) {
    fail(400, 'Invalid movie title.');
}

$title = trim($title);

if ($title === '' || mb_strlen($title) > 200) {
    fail(400, 'Invalid movie title.');
}

$apiKey = @file_get_contents(OMDB_API_KEY_FILE);

if ($apiKey === false || trim($apiKey) === '') {
    fail(500, 'API configuration unavailable.');
}

$query = http_build_query([
    'apikey' => trim($apiKey),
    't' => $title,
    'plot' => 'full',
]);

$ch = curl_init(OMDB_API_URL . '?' . $query);

if ($ch === false) {
    fail(500, 'Unable to initialise API request.');
}

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
    ],
]);

$response = curl_exec($ch);

if ($response === false) {
    curl_close($ch);
    fail(502, 'OMDb is unavailable.');
}

$status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

curl_close($ch);

if ($status < 200 || $status >= 300) {
    fail(502, 'OMDb returned an HTTP error.');
}

if (
    !is_string($contentType)
    || stripos($contentType, 'application/json') === false
) {
    fail(502, 'Unexpected OMDb response.');
}

json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    fail(502, 'Invalid OMDb response.');
}

echo $response;
