<?php
if (mail("test507@abv.bg", "Test Subject", "Test message")) {
    echo "Mail function works!";
} else {
    echo "Mail function failed.";
}
?>
