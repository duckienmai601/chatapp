# ChatApp

Ứng dụng chat real‑time gồm 2 phần: `backend` (API + Socket.IO) và `frontend` (Vite + React).

## Cách chạy (development)

1. Cài dependencies

```powershell
cd backend
npm install
cd ..\frontend
npm install
```

2. Cấu hình môi trường

Backend: tạo file `backend/.env` với các biến sau (ví dụ giá trị tùy môi trường của bạn):

```
PORT=5001
MONGODB_CONNECTIONSTRING=...
CLIENT_URL=http://localhost:5173
ACCESS_TOKEN_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Frontend: chỉnh `frontend/.env.development` nếu cần (mặc định đã trỏ về backend local):

```
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001/
```

3. Chạy server

```powershell
cd backend
npm run dev
```

4. Chạy client

```powershell
cd frontend
npm run dev
```

Mặc định:
- Backend: `http://localhost:5001`
- Frontend: `http://localhost:5173`

## Chạy production (tham khảo)

Backend:

```powershell
cd backend
npm start
```

Frontend:

```powershell
cd frontend
npm run build
npm run preview
```

## Ghi chú

- Đảm bảo MongoDB và Cloudinary có thông tin kết nối hợp lệ.
- Nếu đổi port backend, cập nhật lại `VITE_API_URL` và `VITE_SOCKET_URL`.
