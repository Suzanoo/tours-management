# Warning: This app is under development:

# MERN APP: TOUR MANAGEMENT:

## About

- Tour management app.
- User can create tour plan which generate by OpenAI API

## Intro

- Use Docker to create 4 services : mongodb, backend, frontend, admin
- There are things refer to this services name

  - Database name in .env file : `mongodb://mongodb:27017/tours`
  - proxy definition in package.json file of frontend service, and admin service: ` "proxy": "http://backend:5000",`
  - In frontend service and admin service when we deal with API endpoints, we will use service name instead of URL

- You can change services name at docker-compose.yml and change the previous reference too.

## Tools:

- [VSCode](https://code.visualstudio.com/download)
- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/)

## Environments:

- Please see env.example and create your .env file
- Get OpenAI API key from [openai.com](https://openai.com/).
- Get Mapqueest API key from [developer.mapquest.com](https://developer.mapquest.com/user/login).
- Get Mapbox API key from [mapbox](https://www.mapbox.com/) then go to 'frontend/src/components/Map.jsx' find variable mapboxgl.accessToken = '' and assign value.

## Build and Run services

### `docker-compose up -d --build`

## Note

- See another OpenAI model from [here](https://platform.openai.com/docs/models/overview) and if you want to change the model go to file `backend/utils/textComplete.js`.

## INFLUENCES: 😷😼🙏🙏🙏

- https://codepen.io/z-/pen/OBPJKK
- https://www.youtube.com/@TraversyMedia
- https://www.youtube.com/watch?v=9FQrFah9rnc&t=2237s

![Model](https://github.com/Suzanoo/Tour-Plan-AI/blob/main/frontend/src/public/img/prompt.png)

![Model](https://github.com/Suzanoo/Tour-Plan-AI/blob/main/frontend/src/public/img/response.png)
