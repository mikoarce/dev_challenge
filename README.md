### TouchBistro Full Stack Developer Challenge

The project is organized into 3 main packages:
- Backend: `/api`
- Frontend: `/client`
- Tests: `/test`

#### Building and Running Dev Environment
Clone repo and navigate to root before performing any of these commands.
##### Frontend (http://localhost:8080)
- in local env:
```bash
npm install # unless already called when running the backend
npm run client_dev
```

- in docker container:
```bash
docker-compose down -v # not needed when building for the first time
docker-compose build
docker-compose up
```

##### Backend (http://localhost:3000/api/get_median_primes?max=\<int\>)
- in local env:
```bash
npm install # unless already called when running the frontend
npm run server_dev 
```

#### Running Test Suites
All tests are based on `Mocha` + `Chai`.

Backend tests use `chai-http` while frontend tests utilize `puppeteer` and `sinon`.

- `npm run server_test`: Runs backend test suite
- `npm run client_test`: Runs frontend test suite. **Requires a running dev env**
- `npm test`: Runs all tests. **Requires a running dev env**

#### Next Steps
- Production ready code by taking the following into consideration:
    - Check bundle size and verify that tree shaking works especially with `react-semantic-ui`.
    - Ensure that CORS is only allowed in `development` mode.
    - Dockerize backend.
    - Have separate `docker-compose` files for dev and production builds.
- Intercept API calls done in frontend browser level tests with `Nock` or something similar.
- Put up Travis CI.