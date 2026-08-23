import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });

  // CÂU 47: Gọi API GET lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // CÂU 49: Gửi dữ liệu đến API POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      fetchStudents(); // Cập nhật lại danh sách ngay lập tức
      setFormData({ studentId: '', name: '', email: '' }); // Làm trống form
    } catch (error) {
      console.error("Lỗi thêm sinh viên:", error);
    }
  };

  return (
    <div className="App">
      <h1>Quản lý Sinh viên</h1>
      
      {/* CÂU 48: Form nhập thông tin */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Thêm Sinh viên mới</h3>
        <input 
          type="text" placeholder="MSSV" required
          value={formData.studentId}
          onChange={(e) => setFormData({...formData, studentId: e.target.value})}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input 
          type="text" placeholder="Họ và tên" required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input 
          type="email" placeholder="Email" required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>Thêm</button>
      </form>

      {/* CÂU 47: Hiển thị danh sách */}
      <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', color: 'black' }}>
            <th>MSSV</th>
            <th>Họ Tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;