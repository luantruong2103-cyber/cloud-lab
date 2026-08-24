import { useState, useEffect } from 'react';
import './App.css';

// Đã thay thế URL public từ Codespaces của bạn
const API_URL = 'https://automatic-space-sniffle-97r7wg7jp544hx7qj-5000.app.github.dev/api/students'; 

function App() {
  const [students, setStudents] = useState([]);

  // Đổi mssv thành studentId cho khớp với DB của bạn
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: ''
  });

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách sinh viên:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!formData.studentId || !formData.name || !formData.email) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thêm sinh viên thành công!');
        setFormData({ studentId: '', name: '', email: '' });
        fetchStudents(); // Cập nhật lại bảng
      } else {
        const errData = await response.json();
        alert('Lỗi: ' + (errData.message || 'Không thể thêm sinh viên'));
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      alert('Không thể kết nối đến Backend Server!');
    }
  };

  return (
    <div className="container">
      <h2>Quản Lý Sinh Viên</h2>

      <div className="card">
        <h3>Thêm Sinh Viên Mới</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>MSSV (Student ID):</label>
            <input
              type="text"
              name="studentId" // Đã đổi tên name
              value={formData.studentId} // Đã đổi value
              onChange={handleChange}
              placeholder="VD: 20110001"
              required
            />
          </div>

          <div className="form-group">
            <label>Họ và Tên:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="VD: Nguyễn Văn A"
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="VD: email@gmail.com"
              required
            />
          </div>

          <button type="submit" className="btn-submit">Thêm Sinh Viên</button>
        </form>
      </div>

      <div className="card">
        <h3>Danh Sách Sinh Viên</h3>
        {students.length === 0 ? (
          <p>Chưa có dữ liệu sinh viên.</p>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ và Tên</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((st, index) => (
                <tr key={st._id || index}>
                  <td>{st.studentId}</td> {/* Đổi thành studentId */}
                  <td>{st.name}</td>
                  <td>{st.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;