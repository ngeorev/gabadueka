<?php
// send_email_simple.php - Simple text-only version

$your_email = "nikolageorev1@abv.bg"; // CHANGE THIS
$website_name = "DevOps Lab";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST["message"]));
    $send_copy = isset($_POST["send_copy"]) && $_POST["send_copy"] == "yes";
    
    // Basic validation
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: contact.html?error=Please fill all fields correctly");
        exit;
    }
    
    // Email to you
    $subject = "New Contact: $name";
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n\n";
    $email_content .= "--\nSent from $website_name contact form";
    
    $headers = "From: $website_name <noreply@devopslab.com>\r\n";
    $headers .= "Reply-To: $name <$email>\r\n";
    
    // Send email
    if (mail($your_email, $subject, $email_content, $headers)) {
        
        // Send copy to user if requested
        if ($send_copy) {
            $user_subject = "Copy: Your message to $website_name";
            $user_message = "Dear $name,\n\nThank you for contacting $website_name.\n\n";
            $user_message .= "Your message:\n$message\n\n";
            $user_message .= "We'll respond as soon as possible.\n\nBest regards,\n$website_name Team";
            
            $user_headers = "From: $website_name <noreply@devopslab.com>\r\n";
            mail($email, $user_subject, $user_message, $user_headers);
            
            header("Location: contact.html?success=with_copy");
        } else {
            header("Location: contact.html?success=true");
        }
        
    } else {
        header("Location: contact.html?error=Email failed to send");
    }
    
    exit;
}

header("Location: contact.html");
?>
