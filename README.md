# DataPool

DataPool is a Git-inspired repository management platform that combines a
web application with a command-line interface (CLI).

It allows users to create and manage repositories, add and commit files,
push repository data to cloud storage, view files, track commit history,
create issues, star repositories, follow users, and monitor contribution
activity.

The project is built with React, Node.js, Express, MongoDB, and Amazon S3.

---

## Features

### Repository Management

- Create repositories
- Public and private repositories
- Toggle repository visibility
- Delete repositories
- View repository details
- View repository files
- Search your repositories

### File & Version Management

- Initialize repositories using the DataPool CLI
- Add files
- Commit changes
- Push repository data
- Pull repository data
- Revert commits
- View file contents
- View commit history

### Collaboration

- User profiles
- Follow and unfollow users
- View other users
- Star repositories
- View starred repositories
- Create repository issues

### Contribution Tracking

- Track repository activity
- Contribution history
- GitHub-style contribution heatmap

### Authentication

- User signup
- User login
- JWT-based authentication
- Password hashing using bcrypt
- Protected repository operations

### DataPool CLI

DataPool provides a globally installable CLI through npm.

The CLI provides Git-inspired commands for interacting with DataPool
repositories.

---

# Tech Stack

## Frontend

- React 19
- React Router
- Vite
- Tailwind CSS 4
- Axios
- Primer React
- @uiw/react-heat-map

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Socket.IO
- Axios
- UUID
- dotenv
- AWS SDK

## Cloud Storage

- Amazon S3

## CLI

- Node.js
- Axios
- dotenv
- UUID
- npm

---

# Architecture

DataPool consists of three major parts:

```text
                    ┌──────────────────┐
                    │   React Frontend │
                    │                  │
                    │ Dashboard        │
                    │ Repositories     │
                    │ Profiles         │
                    │ Issues           │
                    └────────┬─────────┘
                             │
                             │ REST API
                             ▼
                    ┌──────────────────┐
                    │ Node.js /        │
                    │ Express Backend  │
                    │                  │
                    │ Authentication   │
                    │ Repositories     │
                    │ Commits          │
                    │ Issues           │
                    │ Users            │
                    └───────┬────┬─────┘
                            │    │
                   ┌────────┘    └─────────┐
                   ▼                        ▼
            ┌──────────────┐        ┌──────────────┐
            │   MongoDB    │        │  Amazon S3   │
            │              │        │              │
            │ Users        │        │ Repository   │
            │ Repositories │        │ Files        │
            │ Commits      │        │              │
            │ Issues       │        └──────────────┘
            └──────────────┘


                    ┌──────────────────┐
                    │   DataPool CLI   │
                    │                  │
                    │ init             │
                    │ add              │
                    │ commit           │
                    │ push             │
                    │ pull             │
                    │ revert           │
                    └────────┬─────────┘
                             │
                             ▼
                    DataPool Backend