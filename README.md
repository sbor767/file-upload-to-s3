# Upload file to AWS.S3

## Description

Simple application to upload file to AWS.S3.

If mime type of file begins from `image` token (for example `image/jpeg`) then it will be uploaded to AWS.S3 cloud in three resolutions:

- large: 2048x2048 px
- medium: 1024x1024 px
- thumb: 300x300 px

## Environment variables

The following environment variables are required:

APP specific:

- APP_PORT - optional, default value `3000`
- NODE_ENV - optional, default value `development`

AWS specific:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION
- AWS_S3_BUCKET
- AWS_S3_FOLDER

File/Image specific:

- ALLOWED_FILE_EXTENSIONS: comma separated values - for example: `bmp,jpg,png,pdf`
- ALLOWED_CONTENT_TYPES: comma separated mime types - for example `image/bmp,image/jpeg,image/png,application/pdf`
- MAX_FILE_SIZE: numeric value in bites - optional, default value = 1024 \* 1024 bit

## Swagger

Description of API available in `development` environment by url: `<host>:<APP_PORT>/api` - for example `http://localhost:3000/api`.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
