Deliverable 5 – API Development

For this deliverable I created a backend using Node.js, Express.js and MongoDB Atlas.
I made two schemas using Mongoose: one for DegreePlan and one for ChecklistItem.

I also built CRUD endpoints for both models and tested them in Postman.

Steps to run

First make a .env file and put things like:

PORT=3000
MONGODB_URI=your_mongo_atlas_link
DEMO_USER=demo
DEMO_PASS=demo123


Do npm install to get all the packages.

Then run npm run dev.

It will say MongoDB connected and you can open http://localhost:3000
 to see the login page.

Models

DegreePlan

userId

major

school

status

totalCreditsRequired

courses (array with code, title, credits, term)

ChecklistItem

userId

title

dueDate

completed

category

Endpoints

Base path: /api/v1

Degree Plans

POST /degree-plans (make new plan)

GET /degree-plans?userId=... (see list)

GET /degree-plans/:id (see one)

PUT /degree-plans/:id (update)

DELETE /degree-plans/:id (remove)

Checklist

POST /checklist

GET /checklist?userId=...

GET /checklist/:id

PUT /checklist/:id

DELETE /checklist/:id

Testing

I used Postman. I tried POST to create, then GET to list, then PUT to update and DELETE to remove.
Everything gave back JSON and worked the way it should.