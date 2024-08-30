export const passwordResetEmailBody = (resetLink: string): string => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        color: #333;
      }
      .container {
        width: 80%;
        margin: auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      h1 {
        color: #333;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
      a {
        color: #1a73e8;
        text-decoration: none;
      }
      .footer {
        font-size: 14px;
        color: #888;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Password Reset Request</h1>
      <p>You are receiving this email because you (or someone else) have requested a password reset for your account.</p>
      <p>Please click on the following link, or paste it into your browser to complete the process:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      <div class="footer">
        <p>Thank you,<br>The Team</p>
      </div>
    </div>
  </body>
  </html>
`;
