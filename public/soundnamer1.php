<?php
$extension = ".mp3";
$f = fopen('chunk', 'r');
$size = filesize("chunk");
$lines = [];
while (!feof($f)) {
    $lines[] = fgets($f);
}

$oggFiles = [];
foreach($lines as $line)
{
    if (strpos($line, ".ogg") !== false) {
        $tag = "resources/";
        $pos = strpos($line, "resources/");
        $str = substr($line, $pos + strlen($tag));
        $pos = strpos($str, ".ogg");
        $str = substr($str, 0, $pos);
        $names = explode('.', $str);
        $oggFiles[$names[0]] = $str;
    }
}

foreach($lines as &$line)
{
    if (strpos($line, ".m4a") !== false) {
        $tag = "resources/";
        $pos = strpos($line, "resources/");
        $str = substr($line, $pos + strlen($tag));
        $pos = strpos($str, ".m4a");
        $str = substr($str, 0, $pos);
        $names = explode('.', $str);
        $line = str_replace($str, $oggFiles[$names[0]], $line);
    }
}

foreach($lines as &$line)
{
    if (strpos($line, ".mp3") !== false) {
        $tag = "resources/";
        $pos = strpos($line, "resources/");
        $str = substr($line, $pos + strlen($tag));
        $pos = strpos($str, ".mp3");
        $str = substr($str, 0, $pos);
        $names = explode('.', $str);
        $line = str_replace($str, $oggFiles[$names[0]], $line);
    }
}

fclose($f);
file_put_contents("chunk_new.txt", $lines);
echo "done";
?>