# Event API Endpoints

Base URL:

```bash
http://localhost:3000
```

---

## Create Event

**POST** `/events`

```bash
curl --location 'http://localhost:3000/events' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Tech Conference 2026",
    "description": "Konferensi teknologi terbesar di Indonesia",
    "date": "2026-07-15T09:00:00.000Z",
    "quota": 100
}'
```

---

## Get All Events

**GET** `/events`

```bash
curl --location 'http://localhost:3000/events'
```

---

## Get Event By ID

**GET** `/events/:id`

```bash
curl --location 'http://localhost:3000/events/1'
```

---

## Update Event

**PATCH** `/events/:id`

```bash
curl --location --request PATCH 'http://localhost:3000/events/1' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Tech Conference 2026 Updated",
    "description": "Updated Description",
    "quota": 150
}'
```

---

## Delete Event

**DELETE** `/events/:id`

```bash
curl --location --request DELETE 'http://localhost:3000/events/1'
```

---

## Sample Success Response

```json
{
  "message": "Event berhasil dibuat",
  "data": {
    "id": 1,
    "title": "Tech Conference 2026",
    "description": "Konferensi teknologi terbesar di Indonesia",
    "date": "2026-07-15T09:00:00.000Z",
    "quota": 100,
    "createdAt": "2026-06-16T12:00:00.000Z"
  }
}
```

---

## Sample Error Response

```json
{
  "message": "Event dengan ID #1 tidak ditemukan",
  "error": "Not Found"
}
```