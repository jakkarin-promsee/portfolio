# Calisthenics course booking MVP — server

**The backend companion to the [client MVP](../client/README.md).**

Express · TypeScript · MongoDB/Mongoose · JWT

This service persists user, trainer, and admin accounts. It supports user registration, role-specific sign-in, session checks, admin-created trainer accounts, and service/database/environment status. Booking, plan purchases, payments, coach schedules, and skill progress are **not API features yet**; the client currently demonstrates those with sample data.

## Run locally

1. Install Node.js and npm (this snapshot was compiled with Node.js 24) and provide a reachable MongoDB instance.
2. In `server/`, install dependencies:

   ```sh
   npm ci
   ```

3. Create `server/.env` with your own values:

   ```dotenv
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017
   JWT_SECRET=replace-with-a-long-random-secret
   JWT_EXPIRES_IN=7d
   # Optional admin bootstrap:
   # ADMIN_EMAIL=admin@example.com
   # ADMIN_PASSWORD=replace-with-a-unique-password
   # ADMIN_NAME=System Admin
   # ADMIN_ENFORCE_SINGLE_ADMIN=false
   ```

4. Start the API:

   ```sh
   npm run dev
   ```

The process connects to MongoDB before listening. The root route is [http://localhost:5000/](http://localhost:5000/); an aggregate status response is at [http://localhost:5000/api/status/all](http://localhost:5000/api/status/all). The database name is currently fixed to `Untitle` in `src/config/db.ts`, even if the connection URI contains another database name.

The admin bootstrap runs at startup when both `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set. It creates an admin if missing, or synchronizes that account's name, role, and password. Setting `ADMIN_ENFORCE_SINGLE_ADMIN=true` also demotes other admins to users. Use these variables deliberately against a database that may already contain accounts.

## API routes

All responses are JSON. Authenticated routes require `Authorization: Bearer <JWT>`.

| Method | Path | Purpose | Access |
| --- | --- | --- | --- |
| `GET` | `/` | Basic hello response | Public |
| `POST` | `/api/auth/register` | Create a user account and return user + token | Public |
| `POST` | `/api/auth/login` | Sign in through `user`, `trainer`, or `admin` portal | Public |
| `GET` | `/api/auth/me` | Validate a token; return fresh user + token | Signed in |
| `POST` | `/api/auth/admin/create-trainer` | Create a trainer account | Admin |
| `GET` | `/api/status/` | Runtime, uptime, and memory | Public |
| `GET` | `/api/status/database` | MongoDB connection state | Public |
| `GET` | `/api/status/env` | Presence of required environment variables | Public |
| `GET` | `/api/status/all` | Combined server, database, and environment check | Public |

Example user registration:

```sh
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo User","email":"demo@example.com","password":"choose-a-password"}'
```

Example role-specific login:

```sh
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"choose-a-password","portal":"user"}'
```

The login portal must match the account role. `register` always creates a `user`; trainers come from the admin route. A user has `name`, lowercase unique `email`, hashed `password`, `role` (`user`, `trainer`, `admin`), and `status` (`active`, `blocked`, `suspended`). Suspended or blocked accounts cannot sign in. JWT expiry defaults to `7d` when `JWT_EXPIRES_IN` is omitted.

## Code map

| Location | Responsibility |
| --- | --- |
| `src/app.ts` | Express setup, route mounting, startup, MongoDB connection |
| `src/config/db.ts` | Mongoose connection and fixed database name |
| `src/models/user.model.ts` | User schema and bcrypt password hashing |
| `src/controllers/auth.controller.ts` | Register, login, me, trainer creation |
| `src/middlewares/auth.middleware.ts` | JWT and role guards |
| `src/controllers/status.controller.ts` | Runtime and connection checks |
| `src/utils/bootstrap-admin.ts` | Optional environment-driven admin sync |

### Repository hierarchy

```text
server/
├── src/
│   ├── config/               # MongoDB connection
│   ├── controllers/          # Auth and status request handlers
│   ├── middlewares/          # JWT, role, and error middleware
│   ├── models/               # Mongoose user model
│   ├── routes/               # Express route definitions
│   ├── types/                # Shared request types
│   ├── utils/                # Admin account bootstrap
│   └── app.ts                # App setup and startup
├── AGENTS.md                 # Guidance for future coding agents
├── README.md                 # Setup, API contract, and MVP boundaries
├── nodemon.json              # Development reload configuration
├── package.json              # Scripts and dependencies
├── tsconfig.json             # TypeScript compiler settings
└── vercel.json               # Deployment configuration to verify
```

```sh
npm run dev    # nodemon + ts-node
npm run build  # compile TypeScript into dist/
npm start      # run compiled dist/app.js
```

The service currently allows CORS with the default `cors()` configuration, exposes status details publicly, and does not have booking or payment persistence. Input validation, rate limiting, restricted CORS, production error handling, and a serverless-compatible deployment path should be addressed before using this API for real customers. A `vercel.json` file exists, but the current startup path opens a listener after MongoDB connection, so deployment behavior needs separate verification.

## License

Original code and documentation authored by Jakkarin Promsee are licensed under the [MIT License](LICENSE). Third-party code, assets, datasets, and other materials are not covered by this license; their original terms apply.
