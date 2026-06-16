## 3. Create Booking

### Endpoint

```
POST /bookings
```

### Curl

```bash
curl --location 'http://localhost:3000/bookings' \
--header 'Content-Type: application/json' \
--data '{
  "customerId": 1,
  "eventId": 1,
  "status": "ACTIVE"
}'
```

### Response

```json
{
  "message": "Booking berhasil dibuat",
  "data": {
    "id": 1,
    "customerId": 1,
    "eventId": 1,
    "status": "ACTIVE",
    "createdAt": "2026-06-16T12:00:00.000Z",
    "updatedAt": "2026-06-16T12:00:00.000Z"
  }
}
```

---

## 4. Get All Bookings

### Endpoint

```
GET /bookings
```

### Curl

```bash
curl --location 'http://localhost:3000/bookings'
```

### Response

```json
{
  "message": "Data booking berhasil diambil",
  "data": [
    {
      "id": 1,
      "customerId": 1,
      "eventId": 1,
      "status": "ACTIVE"
    },
    {
      "id": 2,
      "customerId": 1,
      "eventId": 2,
      "status": "CANCELLED"
    }
  ]
}
```

---

## 5. Get Booking By ID

### Endpoint

```
GET /bookings/:id
```

### Curl

```bash
curl --location 'http://localhost:3000/bookings/1'
```

### Response

```json
{
  "message": "Detail booking berhasil diambil",
  "data": {
    "id": 1,
    "customerId": 1,
    "eventId": 1,
    "status": "ACTIVE"
  }
}
```

---

## 6. Update Booking

### Endpoint

```
PATCH /bookings/:id
```

### Curl

```bash
curl --location --request PATCH 'http://localhost:3000/bookings/1' \
--header 'Content-Type: application/json' \
--data '{
  "status": "CANCELLED"
}'
```

### Response

```json
{
  "message": "Booking berhasil diperbarui",
  "data": {
    "id": 1,
    "customerId": 1,
    "eventId": 1,
    "status": "CANCELLED"
  }
}
```

---

## 7. Delete Booking

### Endpoint

```
DELETE /bookings/:id
```

### Curl

```bash
curl --location --request DELETE 'http://localhost:3000/bookings/1'
```

### Response

```json
{
  "message": "Booking berhasil dihapus",
  "data": {
    "id": 1,
    "customerId": 1,
    "eventId": 1,
    "status": "CANCELLED"
  }
}
```