# Pokemons

https://github.com/user-attachments/assets/db8034df-e723-490b-bb84-6b2f1c05ff75


## Steps to Set Up Locally

### 1. Install Dependencies

Run `yarn install` in the root directory:

### 2. Navigate to the backend directory and install dependencies there:

`cd packages/backend yarn install`

### 3. Navigate to the frontend directory and install dependencies there:

`cd packages/frontend yarn install`

### 4. Add Environment Variables

#### For Frontend

In your `.env` file, add:

REACT_APP_BASE_URL=http://localhost:4000<br>
NODE_ENV=development<br>

#### For Backend

In your `.env` file, add:

PORT=4000<br>
DATABASE=mongodb://localhost:27017/<br>
TOKEN_SECRET_KEY=secret<br>
TOKEN_EXPIRES=1d<br>
ORIGIN=http://localhost:3000<br>
METHODS=GET,POST<br>
HEADERS=Content-Type,Authorization,credentials<br>
IS_CREDENTIALS=true<br>

### 3. Run MongoDB Locally

Start MongoDB using Homebrew:

`brew services start mongodb-community`

### 4. Create a Test Database

- Create a new database called `Test`.
- Create a collection named `Pokemons`.
- Import data from the `pokedex.json` seed file in `packages/backend/src/database/seed/pokedex.json` into the `Pokemons` collection.
