CREATE TABLE team_members (
    id SERIAL PRIMARY KEY,
    name TEXT, father_name TEXT, mother_name TEXT, contact TEXT,
    email TEXT, emergency_contact TEXT, address TEXT, dob DATE,
    doj DATE, pan TEXT, uan TEXT, account_name TEXT, bank_name TEXT,
    ifsc TEXT, branch TEXT, account_number TEXT,
    pan_card TEXT, aadhaar_card TEXT
);