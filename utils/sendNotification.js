export const sendStockAlert = (book) => {
    console.log(`Stock alert: The stock for the book "${book.title}" (ISBN: ${book.ISBN}) is low. Only ${book.stock} left!`);
    
    // Optionally, here you can send actual emails, SMS, or Slack messages using external services.
    // For email, you can use nodemailer, sendgrid, etc.
  };
  