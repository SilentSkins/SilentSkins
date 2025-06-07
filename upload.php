<?php
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["skinFile"]["name"]);
if (move_uploaded_file($_FILES["skinFile"]["tmp_name"], $target_file)) {
    echo "Upload successful.";
} else {
    echo "Error uploading file.";
}
?>
