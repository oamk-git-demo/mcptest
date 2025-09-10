# mcptest - Node.js Express Server

mcptest is a simple Node.js Express web application with a single GET endpoint. The application serves a basic "Hello from Express server!" message.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and setup the repository:
- Check Node.js version: `node --version` (tested with v20.19.5)
- Check npm version: `npm --version` (tested with 10.8.2)
- Install dependencies: `cd backend && npm install` -- takes 2-3 seconds. NEVER CANCEL. Set timeout to 10+ minutes for safety.
- No build step required - this is a simple Express server

### Run the application:
- ALWAYS run the dependency installation first: `cd backend && npm install`
- Start server: `cd backend && node server.js`
- Server starts immediately and listens on port 3000 by default
- Custom port: `PORT=8080 node server.js`
- Server responds at: `http://localhost:3000` (or custom port)

### Test the application:
- Server endpoint test: `curl http://localhost:3000`
- Expected response: "Hello from Express server!"
- Server starts in under 1 second
- No database or external dependencies required

## Validation

### CRITICAL: Validation Steps
- ALWAYS manually test the server after making any changes by:
  1. Installing dependencies: `cd backend && npm install`
  2. Starting server: `node server.js`
  3. Testing endpoint: `curl http://localhost:3000` in a separate terminal
  4. Verifying response: "Hello from Express server!"
- NEVER CANCEL server startup or dependency installation
- ALWAYS run through complete end-to-end scenario after making changes
- You can build and run the application in any Linux environment with Node.js
- No UI testing framework exists - use curl for endpoint validation

### Security and Dependencies:
- Run security audit: `npm audit` -- should show 0 vulnerabilities
- No linting tools configured currently
- No test suite configured currently
- No CI/CD pipeline configured currently

## Common tasks

### Repository structure
```
mcptest/
├── .gitignore
├── README.md
├── .github/
│   └── copilot-instructions.md (this file)
└── backend/
    ├── package.json
    ├── server.js
    └── todos.json
```

### Key files content:

#### backend/package.json
```json
{
  "name": "mcptest-backend",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

#### backend/server.js
```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### backend/todos.json
```json
[]
```

## Development Guidelines

### Environment Variables:
- `PORT`: Server port (default: 3000)
- No other environment variables required currently

### Making Changes:
- ALWAYS test changes with the validation steps above
- Server auto-restarts are not configured - manually restart after code changes
- File watching is not configured - implement if needed for development
- Keep the simple structure unless adding significant functionality

### Common Development Scenarios:
- Adding new endpoints: Modify `backend/server.js` with new `app.get()`, `app.post()`, etc.
- Adding middleware: Add `app.use()` calls in `backend/server.js`
- Adding dependencies: `cd backend && npm install <package-name>`
- Todos functionality: Currently `todos.json` is unused - implement CRUD operations if needed

### Performance Notes:
- Dependency installation: ~2 seconds
- Server startup: <1 second
- Response time: <10ms for basic endpoints
- Memory usage: ~30MB for basic server

## Troubleshooting

### Common Issues:
- Port already in use: Change PORT environment variable or kill existing process
- Missing dependencies: Run `npm install` in backend directory
- Permission errors: Ensure Node.js and npm are properly installed
- Connection refused: Verify server is running and port is correct

### Debug Commands:
- Check running processes: `ps aux | grep node`
- Check port usage: `netstat -tulpn | grep :3000`
- Test connectivity: `curl -v http://localhost:3000`
- Check logs: Server logs to console, no file logging configured