Team Details App

Objective:An app (web app) to manage team member details with CRUD operations (Create, Read, Update, Delete). The app store team member info in a PostgreSQL database, with validations for input fields.

Features:
Team Member Details:
Name, Father's Name, Mother's Name, Contact Number, Email, Emergency Contact, Address, DOB, Date of Joining, PAN Card, UAN Number.
Bank Details: Account Name, IFSC, Branch, Bank Name, Account Number.
Documents: Upload PAN & Aadhaar cards.
Validations:
Validate's contact numbers (10 digits).
Validate's email ID.
Ensure's required fields are filled.

# Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: PostgreSQL

# Setup Instructions
Clone the Git hub repo,
To install all the requirements 
npm install $(cat requirements.txt | xargs)
Just run this command in terminal.
# Start the Server
node server.js.
## Validations
Contact Number:	Exactly 10 digits, only numbers.
Email:	Must follow a valid email format
Emergency Contact:	Exactly 10 digits, only numbers
Address	Required, minimum 5 characters
PAN Card:	10-character alphanumeric, required
UAN Number:	12-character alphanumeric, required
PAN Card Upload	Must be .jpg, .jpeg, .png, .pdf, required
Aadhaar Upload	Must be .jpg, .jpeg, .png, .pdf, required
