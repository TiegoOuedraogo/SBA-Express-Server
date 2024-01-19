# Recipe Sharing Platform

## Description

Recipe Sharing Platform is a web application where users can share their favorite recipes, browse recipes submitted by others, and leave comments. Each recipe includes a title, description, ingredients list, and preparation instructions.

## Features

- **View Recipes**: Users can view a list of all submitted recipes.
- **Submit Recipes**: Registered users can submit new recipes.
- **Edit Recipes**: Recipe authors can edit their submitted recipes.
- **Delete Recipes**: Recipe authors can delete their submitted recipes.
- **Leave Comments**: Users can comment on recipes to share their thoughts or tips.

## Technologies

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Frontend**: EJS, HTML, CSS
- **Authentication**:jwt
- **Password Hashing**: bcryptjs
- **Session Management**: express-session

## Setup

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
2. https://github.com/TiegoOuedraogo/SBA-Express-Server.git
3. Create a `.env` file in the root directory and add the following:
   MONGODB_URI=mongodb://localhost:27017/yourDatabaseName
   SESSION_SECRET=yourSecretKey
4.  Start the application: npm start

## Usage

1. **View Recipes**: Access the home page to view all recipes.
2. **Submit Recipes**: Navigate to the 'Submit Recipe' page to add a new recipe.
3. **Edit/Delete Recipes**: Use the 'Edit' or 'Delete' buttons on your recipes.
4. **Comment on Recipes**: Use the comment section under each recipe to leave comments.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.


