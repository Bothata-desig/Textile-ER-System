# Textiles ERP Backend

This is the backend server for the Textiles ERP system, built with **Node.js**, **Express**, **TypeScript**, and **MongoDB Atlas** (using Mongoose).  
It provides RESTful APIs for managing staff users and department activities.

---

## 📁 Project Structure

```
backend/
│
├── .env                   # Environment variables (MongoDB URI)
├── package.json           # NPM dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── src/
    ├── db.ts              # MongoDB connection setup
    ├── server.ts          # Express server entry point
    ├── models/
    │   ├── User.ts        # Mongoose User schema/model
    │   └── Activity.ts    # Mongoose Activity schema/model
    └── routes/
        ├── user.ts        # User API routes
        └── activity.ts    # Activity API routes
```

---
