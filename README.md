# ai-jobboard

AGI Jobs

A clean AI Jobboard

Use KVDB

User can:
- See all jobs (use the list keys command `curl https://kvdb.io/N7cmQg1DwZbADh2Hu3NncF/     -u 'legal:'`, then get each resource one by one)
- Upload resource (using post to kvdb), triggering a modal, 

Each resource has a title, description, and URL

Make it clean and nice

Show a picture from https://source.unsplash.com/random/?portrait%20professional on the modal for the job

Anyone can edit or delete a resource


## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/ai-jobboard.git
cd ai-jobboard
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
