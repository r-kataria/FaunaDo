![App Screenshot](docs/nextfauna.png)

# FaunaDo 📝

FaunaDo is a simple to-do list with real-time synchronization. Share the to-do list link with others, and all changes are instantly updated for every user.

NB: This project has been updated to be implemented in FQL10.

## Features 🚀

- **Real-time synchronization**: See updates as they happen across all connected devices.
- **Clean user interface**: Simple and clean design for a smooth experience.
- **Persistent storage**: Your data is stored securely and reliably with FaunaDB.
- **Cross-device support**: Access the to-do list from any device with a browser.

## Tech Stack 🛠️

- **Frontend**: Next.js, Tailwind CSS
- **Database**: FaunaDB
  
## Installation & Setup

Follow these steps to get FaunaDo up and running on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/r-kataria/FaunaDo.git
cd FaunaDo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure FaunaDB

1. **Create a FaunaDB Project:**
   - Log in to [FaunaDB](https://fauna.com/) and create a new project.

2. **Set Up the Database:**
   - **Create a Collection:** Add a collection named `todo`.
   - **Define Roles:**
     - **Public Role:** Create a role named `public` with read and write access to the `todo` collection.
   - **Generate API Keys:**
     - **Server Key:** Generate a key with server-level access.
     - **Public Key:** Generate a key with public access.

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables with your FaunaDB keys:

     ```env
     FAUNADB_SERVER_KEY=your-server-key
     FAUNADB_PUBLIC_KEY=your-public-key
     ```

### 4. Run the Development Server

```bash
npm start
```

### 5. Access the Application

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to start using FaunaDo.

## Contributing 🛠️

Contributions are welcome! Please feel free to submit a pull request or open an issue.