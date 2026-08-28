# Câu 32: Khai báo Base Image (sử dụng node phiên bản 18, bản alpine cho nhẹ)
FROM node:20-alpine

# Câu 33: Thiết lập thư mục làm việc bên trong Container
WORKDIR /app

# Câu 34: Copy các file cấu hình package vào trước
COPY package*.json ./

# Câu 35: Cài đặt các thư viện (dependencies)
RUN npm install

# Câu 36: Copy toàn bộ source code backend vào thư mục làm việc của Container
COPY . .

# Câu 37: Mở port 5000 để giao tiếp
EXPOSE 5000

# Câu 38: Lệnh khởi động backend
CMD ["node", "server.js"]