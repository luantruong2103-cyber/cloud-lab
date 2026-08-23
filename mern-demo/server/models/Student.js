const mongoose = require('mongoose');

// ==========================================
// CÂU 35: Tạo Model Student
// ==========================================
const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
});

// Xuất model ra để file server.js có thể dùng được
module.exports = mongoose.model('Student', studentSchema);