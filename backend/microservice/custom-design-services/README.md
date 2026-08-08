# Custom Design Backend

Stores custom jewellery design submissions (from the frontend) in MongoDB, using the exact `CustomDesign` schema provided.

## Setup

```bash
cd backend
npm install
# edit .env with your MongoDB URI
npm run dev   # or: npm start
```

Requires a running MongoDB instance (local or Atlas). Set `MONGO_URI` in `.env`.

## Folder structure

```
src/
├── config/db.js                     Mongo connection
├── models/CustomDesign.js           Mongoose schema (as provided)
├── controllers/customDesignController.js   CRUD logic
├── routes/customDesignRoutes.js     /api/designs routes
├── middleware/validation.js         request validation
├── middleware/errorHandler.js       404 + central error handler
├── utils/helpers.js                 frontend-payload -> schema mapper, response helpers
├── utils/constants.js               status enums, label maps
├── app.js                           express app (middleware + routes)
└── server.js                        connects DB, starts the server
```

## API

Base URL: `http://localhost:5000/api/designs`

| Method | Endpoint            | Description                                  |
|--------|----------------------|-----------------------------------------------|
| POST   | `/`                  | Create a new design submission                |
| GET    | `/`                  | List designs (`?orderStatus=`, `?email=`, `?page=`, `?limit=`) |
| GET    | `/:id`               | Get a single design                            |
| PUT    | `/:id`                | Update a design (admin edits, estimates, etc.) |
| PATCH  | `/:id/status`        | Update just the `orderStatus`                  |
| DELETE | `/:id`                | Delete a design                                |

### Example: create a design

```bash
curl -X POST http://localhost:5000/api/designs \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "fullName": "Aarav Sharma",
      "email": "aarav@example.com",
      "phone": "9876543210",
      "address": "New Delhi"
    },
    "jewellery": {
      "type": "Ring",
      "material": "Gold",
      "purity": "18K",
      "gemstone": [{ "name": "Diamond", "quantity": 1 }],
      "weight": 6.5,
      "ringSize": "14",
      "style": "Minimal"
    },
    "budget": { "min": 40000, "max": 60000 },
    "design": { "description": "Simple solitaire ring" }
  }'
```

### Frontend integration

The current frontend (`src/services/api/designs.ts`) posts a flatter
`SubmittedDesign` object straight from `DesignContext`. `POST /api/designs`
accepts that shape too — `mapFrontendPayloadToSchema` in
`src/utils/helpers.js` converts it into the nested schema automatically, so
no frontend changes are required beyond pointing `submitDesign()` at
`POST http://localhost:5000/api/designs` instead of `localStorage`.
