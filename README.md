# psolz

This project contains the static website for Pixsolz. A small Node.js backend is included to serve the site and apply some security hardening.

## Running the site

1. Install dependencies (requires Node.js):
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```

The server will serve the static files from the repository root on port 3000 by default. A `/health` endpoint is also provided for basic health checks.
