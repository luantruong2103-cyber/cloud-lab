# Câu 51: Base Image (Dùng bản 20 cho đồng bộ với Backend)
FROM node:20-alpine
# Câu 52: Thiết lập thư mục làm việc
WORKDIR /app
# Câu 53: Sao chép các file cấu hình thư viện
COPY package*.json ./
# Câu 54: Cài đặt các package
RUN npm install
# Câu 55: Sao chép toàn bộ source code
COPY . .
# Câu 56 & 57: Build ứng dụng (Tạo ra thư mục dist)
RUN npm run build
# Mở cổng mạng
EXPOSE 5173
# Lệnh chạy ứng dụng
CMD ["npm", "run", "preview", "--", "--host"]