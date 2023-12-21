# blogg-web

<p align="center">
   <img src="https://github.com/blogg-org/blogg-web/assets/45593423/75587e0e-fee2-4979-a966-cccd37487a43" alt="blogg logo" />
</p>

![blogg homepage](https://github.com/blogg-org/blogg-web/assets/45593423/b068966f-a9f9-445a-88db-6394a424ddb9)

**blogg** is a blog application fully responsive with various screen layouts created using **MERN with TypeScript** and styled using Tailwind CSS. User need to sign in to read blogs.

#### Some features:
- Sign in with Google or using email and password.
- Form inputs implemented using ```react-hook-form``` and validation using ```yup```.
- State management using ```redux-toolkit```.
- Create, read, update and delete blog(s).
- Blogs preview card with cover image and title at homepage.
- Router authentication.
- Change password.
- Reset password with OTP pin sent to the email verified in case of password forgotten.

## Deployment

[https://blogg-web.vercel.app/](https://blogg-web.vercel.app/)

Backend is delpoyed in render.com using its free plan. Sometimes, server takes longer time to start because it goes into sleep mode when it is not active for a long time and if that the case then you may need to wait little longer and you want to refresh page in those times.

Backend code can be found at [https://github.com/blogg-org/blogg-api](https://github.com/blogg-org/blogg-api).

## Setup Project

This is a [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) project created with [Vite](https://vitejs.dev/). Make sure that ```git``` and ```node``` is already installed into your system.

- Clone repository.
  
  ```sh
  git clone git@github.com:blogg-org/blogg-web.git
  ```
  
- Install dependencies.

  ```sh
  npm install
  ```
  
- create ```.env``` file in root directory and add environment variables as specified in ```.env.sample```. You can also copy environment variables from here.

  ```sh
  VITE_BACKEND_BASE_URI="base url of your backend application e.g. http://localhost:4000"
  VITE_GOOGLE_OAUTH_CLIENT_ID=
  VITE_GOOGLE_OAUTH_CLIENT_SECRET=
  ```

- Start development server.

  ```sh
  npm run dev
  ```


