## Description

A NestJS-based backend for a product rental platform, providing REST APIs for managing and fetching product data with support for filtering, caching, and gzip compression.

## Features
- Get all products with filters: GET /products?search=...&minPrice=...&maxPrice=...&location=...&category=...
- Get product details by ID: GET /products/:id
- Get categories with counts: GET /products/categories

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Access
```bash
http://localhost:8000
```

## Run tests

```bash
# unit tests
$ npm run test

```
