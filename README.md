# 🏏 IPL Player Management API

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB** for managing IPL cricket players. It supports CRUD operations, advanced filtering, pagination, and sorting.

---

## 🔗 Live API Endpoint

> Our Hosted URL   
> `https://ipl-player-management.onrender.com/api/v1/players`

---

## 📦 Features

- Add new IPL players with profile image upload
- Update player details and replace image
- Delete player records with image cleanup
- Get individual player details
- List all players with:
  - Pagination
  - Search by name (case-insensitive)
  - Filter by team
  - Sort by runs or salary
  - Combined query options

---

## 🚀 API Endpoints

### ➕ Create a Player

### POST /api/v1/players
- Requires `multipart/form-data` (for image upload)
- Body fields: `name`, `team`, `country`, `runs`, `role`, `salary`, `image` (file)

---

### ✏️ Update a Player
- The body can include any updatable fields and optionally a new image.

---

### ❌ Delete a Player
- Deletes both the player and the associated image from Cloudinary.

---

### 🔍 Get a Player's Full Details


---

### 📄 Get Players with Pagination, Search, Filter, Sort

**Optional Query Parameters:**

| Parameter | Description                       | Example                |
|-----------|-----------------------------------|------------------------|
| page      | Page number                       | `?page=2`              |
| limit     | Number of players per page        | `?limit=5`             |
| search    | Case-insensitive name search      | `?search=virat`        |
| team      | Filter players by team (UPPERCASE)| `?team=CSK`            |
| sortBy    | Sort by runs or salary            | `?sortBy=runs`         |
| order     | Sort order: asc or desc           | `?order=desc`          |

**Example Combination:**
GET /api/v1/players?search=kumar&team=CSK&sortBy=runs&order=asc&page=1&limit=5

---

## 📁 Project Structure

```bash
├── controllers/
│ └── player.controller.js
├── models/
│ └── player.model.js
├── routes/
│ └── player.router.js
├── middlewares/
│ └── multer.middleware.js
├── utils/
│ ├── asyncHandler.js
│ ├── ApiError.js
│ ├── ApiResponse.js
│ └── cloudinary.js
├── validators/
│ └── index.js
└── app.js
```


## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary (for image upload)
- Multer (for handling image uploads)
- Custom Error Handling
- RESTful API Design

---

## 🧪 Sample Player Object

{
"name": "Virat Kohli",
"team": "RCB",
"country": "India",
"runs": 6400,
"role": "Batsman",
"salary": 170000000,
"image": "https://res.cloudinary.com/your-cloud-name/image/upload/virat.jpg"
}


---

## 🧑‍💻 Author

**Shehbaz khan**  
🔗 [GitHub](#) | 📧 iamshehbaz01@gmail.com

---

## 📄 License

This project is licensed under the **MIT License**.
Copy and save this as README.md in your repository. Update the live API endpoint and GitHub link as needed!
