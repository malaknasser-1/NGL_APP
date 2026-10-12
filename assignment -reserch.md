1. How to send emails from the application
To send emails from a Node.js application, developers commonly use Nodemailer, which is a powerful and popular module for handling email delivery.

Configuration: First, install the package using npm install nodemailer. Then, create a transporter object configured with an SMTP server or an email service provider (such as Gmail, SendGrid, or Mailtrap).

Execution: Use the transporter.sendMail() method by passing an object containing the sender address, recipient email, subject, and the plain text or HTML body content.

2. How to send OTPs via email
Sending a One-Time Password (OTP) via email combines cryptographic or random number generation with the email delivery service.

Generation: Generate a secure, random numeric string (typically 4 to 6 digits long) using standard JavaScript math functions or crypto modules.

Delivery: Format the generated OTP into an HTML template and pass it to the email transport function (like Nodemailer) to deliver it to the user's registered email address.

3. How to store OTPs in Redis
Redis is an in-memory data store that serves as an ideal caching layer for temporary data like OTPs, reducing the load on primary databases like MongoDB.

Data Structure: OTPs are typically stored using a Key-Value pair, where the key is uniquely prefixed with the user's identifier or email (e.g., otp:user@example.com), and the value is the OTP code itself.

Implementation: Using Node.js Redis clients, you can store the code by executing commands like client.set(key, value).

4. How to set an expiration time (TTL) for the stored OTP
A Time-To-Live (TTL) ensures that the OTP automatically expires after a specific duration (e.g., 2 to 5 minutes) for security purposes, eliminating the need for manual deletion logic.

Direct Expiration: You can set the expiration time directly during the set operation by passing options (like { EX: 300 } for 300 seconds).

Explicit Expiration: Alternatively, you can apply a separate expiration command using client.expire(key, seconds) immediately after saving the key-value pair, ensuring Redis automatically purges the code once the time elapses.