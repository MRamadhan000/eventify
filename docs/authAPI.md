# API Documentation

Dokumentasi API untuk modul **Authentication** dan **Event Management**.

---

## Base URL

```
http://localhost:3000
```

---

## 1. Register

### Endpoint
```
POST /auth/register
```

### Curl

```bash
curl --location 'http://localhost:3000/auth/register' \
--header 'Content-Type: application/json' \
--data '{
  "name": "M. Ramadhan Titan",
  "email": "titan@example.com",
  "password": "password123",
  "address": "Malang, Indonesia"
}'
```

### Response

```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "data": {
    "customer": {
      "id": "cust-uuid-12345",
      "name": "M. Ramadhan Titan",
      "email": "titan@example.com",
      "address": "Malang, Indonesia"
    }
  }
}
```

---

## 2. Login

### Endpoint
```
POST /auth/login
```

### Curl

```bash
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data '{
  "email": "titan@example.com",
  "password": "password123"
}'
```

### Response

```json
{
  "message": "Login berhasil",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "customer": {
      "id": "cust-uuid-12345",
      "name": "M. Ramadhan Titan",
      "email": "titan@example.com"
    }
  }
}
```

---

## Notes

- Semua endpoint menggunakan `Content-Type: application/json`
- Token JWT digunakan untuk akses endpoint yang diproteksi
- Authorization header:

```bash
Authorization: Bearer <access_token>
```

---