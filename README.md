# Fintech Technical Test

## Start server locally

- `npm install`
- `npm run dev`

It will start the server locally at `http://localhost:3000`

Architecture: routes -> controllers -> services

## Tests

Tests using Jest + supertest

- `npm run test`

## Endpoints

- POST `/commission`

**Request (Transaction) example**

```
{
  "date": "2021-01-01",
  "amount": "100.00",
  "currency": "EUR",
  "client_id": 42
}
```

**Response (Commission) example**

```
{
  "amount": "0.05",
  "currency": "EUR"
}
```

## Improvements

- add more tests
- add authentication
- add CORS policy
- use a database to store turnover data to make it persistent
- use more error codes and messages to make it as precise as possible for the API clients

## Time

It took me about 2 hours in total.
