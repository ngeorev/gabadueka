<?php
// send_email.php - Email processing script

// Your email address where you want to receive messages
$your_email = "nikolageorev1@abv.bg"; // CHANGE THIS TO YOUR EMAIL

// Website/company name
$website_name = "DevOps Lab";

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get and sanitize form data
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);
    $send_copy = isset($_POST["send_copy"]) && $_POST["send_copy"] == "yes";
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: contact.html?error=Invalid email address");
        exit;
    }
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        header("Location: contact.html?error=All fields are required");
        exit;
    }
    
    // Create email content for you
    $subject_to_you = "New Contact Form Message from $website_name";
    $email_content_to_you = "
    <html>
    <head>
        <title>New Contact Form Message</title>
    </head>
    <body>
        <h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br(htmlspecialchars($message)) . "</p>
        <hr>
        <p><small>This message was sent from the contact form on $website_name website.</small></p>
    </body>
    </html>
    ";
    
    // Headers for your email
    $headers_to_you = "MIME-Version: 1.0" . "\r\n";
    $headers_to_you .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers_to_you .= "From: $website_name Contact Form <noreply@devopslab.com>" . "\r\n";
    $headers_to_you .= "Reply-To: $name <$email>" . "\r\n";
    
    // Send email to you
    $mail_sent = mail($your_email, $subject_to_you, $email_content_to_you, $headers_to_you);
    
    // If user wants a copy, send it to them too
    $copy_sent = false;
    if ($send_copy && $mail_sent) {
        $subject_to_user = "Copy of your message to $website_name";
        $email_content_to_user = "
        <html>
        <head>
            <title>Copy of Your Message</title>
        </head>
        <body>
            <h2>Copy of Your Message to $website_name</h2>
            <p>Dear $name,</p>
            <p>Thank you for contacting $website_name. Here is a copy of the message you sent:</p>
            <blockquote>" . nl2br(htmlspecialchars($message)) . "</blockquote>
            <p>We will review your message and get back to you soon.</p>
            <p>Best regards,<br>$website_name Team</p>
            <hr>
            <p><small>This is an automated message. Please do not reply to this email.</small></p>
        </body>
        </html>
        ";
        
        $headers_to_user = "MIME-Version: 1.0" . "\r\n";
        $headers_to_user .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers_to_user .= "From: $website_name <noreply@devopslab.com>" . "\r\n";
        
        $copy_sent = mail($email, $subject_to_user, $email_content_to_user, $headers_to_user);
    }
    
    // Redirect based on success/failure
    if ($mail_sent) {
        if ($send_copy && $copy_sent) {
            header("Location: contact.html?success=with_copy");
        } elseif ($send_copy && !$copy_sent) {
            header("Location: contact.html?success=no_copy");
        } else {
            header("Location: contact.html?success=true");
        }
    } else {
        header("Location: contact.html?error=Failed to send email. Please try again later.");
    }
    
    exit;
} else {
    // If someone tries to access this file directly
    header("Location: contact.html");
    exit;
}
?>
