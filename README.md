## 🏏 IPL Player Management API

A RESTful API for managing IPL players. This API allows you to **Create**, **Read**, **Update**, **Delete**, and **Search** for IPL players with additional support for **filtering**, **pagination**, **sorting**, and **image uploads using Cloudinary**.


🔗 Live API Endpoint
Replace with your deployed URL once hosted
http://localhost:8000/api/v1/players

📦 Features
Add new IPL players with profile image upload

Update player details and replace image

Delete player records with image cleanup

Get individual player details

List all players with:

Pagination

Search by name (case-insensitive)

Filter by team

Sort by runs or salary

Combined query options

🚀 API Endpoints
➕ Create a Player
http
Copy
Edit
POST /api/v1/players
Requires multipart/form-data (image upload)

Body fields: name, team, country, runs, role, salary, image (file)

✏️ Update a Player
http
Copy
Edit
PATCH /api/v1/players/:id
Body can include any updatable fields and optionally a new image.

❌ Delete a Player
http
Copy
Edit
DELETE /api/v1/players/:id
Deletes both the player and the associated image from Cloudinary.

🔍 Get a Player's Full Details
http
Copy
Edit
GET /api/v1/players/:id/description
📄 Get Players with Pagination, Search, Filter, Sort
h
Copy
Edit
GET /api/v1/players
Optional Query Parameters:
Parameter	Description	Example
page	Page number	?page=2
limit	Number of players per page	?limit=5
search	Case-insensitive name search	?search=virat
team	Filter players by team (UPPERCASE)	?team=CSK
sortBy	Sort by runs or salary	?sortBy=runs
order	Sort order: asc or desc	?order=desc

Example Combination:
http
Copy
Edit
GET /api/v1/players?search=kumar&team=CSK&sortBy=runs&order=asc&page=1&limit=5
📁 Project Structure
pgsql
Copy
Edit
├── controllers/
│   └── player.controller.js
├── models/
│   └── player.model.js
├── routes/
│   └── player.router.js
├── middlewares/
│   └── multer.middleware.js
├── utils/
│   ├── asyncHandler.js
│   ├── ApiError.js
│   ├── ApiResponse.js
│   └── cloudinary.js
├── validators/
│   └── index.js
└── app.js
🛠️ Technologies Used
Node.js

Express.js

MongoDB (Mongoose)

Cloudinary (for image upload)

Multer (for handling image uploads)

Custom Error Handling

RESTful API Design

🧪 Sample Player Object
json
Copy
Edit
{
  "name": "Virat Kohli",
  "team": "RCB",
  "country": "India",
  "runs": 6400,
  "role": "Batsman",
  "salary": 170000000,
  "image": "https://res.cloudinary.com/your-cloud-name/image/upload/virat.jpg"
}
🧑‍💻 Author
Shehbaz
🔗 GitHub | 📧 iamshehbaz01@gmail.com

📄 License
This project is licensed under the MIT License.

