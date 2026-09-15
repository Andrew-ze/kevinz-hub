# Kevinz Jewelry and Bags Hub

## Requirements

Install:

1. Node.js
2. MySQL
3. Git

## Setup

### 1. Create the database

Open MySQL and run:

```sql
SOURCE database/schema.sql;
```

Or copy the contents of `database/schema.sql` into MySQL Workbench.

### 2. Configure environment variables

Copy `.env.example` and rename the copy to `.env`.

Update:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=kevinz_shop
SESSION_SECRET=your_long_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_strong_admin_password
```

### 3. Install dependencies

Inside the project folder:

```bash
npm install
```

### 4. Start the server

```bash
npm start
```

Open:

```text
http://localhost:3000
```

Admin login:

```text
http://localhost:3000/login.html
```

## Important

- Replace the MTN and Airtel numbers in the `settings` table.
- Never upload `.env` to GitHub.
- Change the initial admin password.
- This starter project uses manual payment verification, not a payment API.
- Before production, add stronger validation, HTTPS, rate limiting, CSRF protection, image uploads and proper stock reservation logic.
