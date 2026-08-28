import { useState, useEffect } from 'react';
import './App.css';

// Đường dẫn chuẩn trỏ tới Backend đang chạy trong Docker
const API_URL = 'http://localhost:5000/api/students'; 

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: ''
  });
  
  // State để lưu ID của sinh viên đang được sửa (Nếu null là đang ở chế độ Thêm mới)
  const [editId, setEditId] = useState(null);

  // GET: Lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách:', error);
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

  // POST & PUT: Xử lý Thêm mới và Cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!formData.studentId || !formData.name || !formData.email) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      let response;
      if (editId) {
        // CÂU 77: Cập nhật sinh viên (Dùng phương thức PUT)
        response = await fetch(`${API_URL}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // CÂU 75: Thêm sinh viên (Dùng phương thức POST)
        response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        alert(editId ? 'Cập nhật sinh viên thành công!' : 'Thêm sinh viên thành công!');
        resetForm();
        fetchStudents(); // Tải lại bảng dữ liệu
      } else {
        const errData = await response.json();
        alert('Lỗi: ' + (errData.message || 'Thao tác thất bại'));
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      alert('Không thể kết nối đến Backend Server!');
    }
  };

  // Hàm đổ dữ liệu lên form khi bấm nút Sửa
  const handleEdit = (student) => {
    setFormData({
      studentId: student.studentId,
      name: student.name,
      email: student.email
    });
    setEditId(student._id); // Lấy _id từ MongoDB
  };

  // CÂU 78: Xóa sinh viên (Dùng phương thức DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Đã xóa sinh viên thành công!');
        fetchStudents();
      } else {
        alert('Lỗi khi xóa sinh viên');
      }
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
      alert('Không thể kết nối đến Backend Server!');
    }
  };

  // Reset form về trạng thái ban đầu
  const resetForm = () => {
    setFormData({ studentId: '', name: '', email: '' });
    setEditId(null);
  };

  return (
    <div className="container">
      <h2>🎓 Quản Lý Sinh Viên</h2>

      <div className="card">
        <h3>{editId ? 'Sửa Thông Tin Sinh Viên' : '➕ Thêm Sinh Viên Mới'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>MSSV:</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
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

          <button type="submit" className="btn-submit" style={{backgroundColor: editId ? '#28a745' : '#007bff'}}>
            {editId ? 'Cập Nhật' : 'Thêm Sinh Viên'}
          </button>
          
          {editId && (
            <button type="button" onClick={resetForm} style={{marginLeft: '10px', padding: '10px 15px', border: 'none', backgroundColor: '#6c757d', color: '#fff', borderRadius: '4px', cursor: 'pointer'}}>
              Hủy Bỏ
            </button>
          )}
        </form>
      </div>

      <div className="card">
        <h3>📄 Danh Sách Sinh Viên</h3>
        {students.length === 0 ? (
          <p>Chưa có dữ liệu sinh viên.</p>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ và Tên</th>
                <th>Email</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {students.map((st, index) => (
                <tr key={st._id || index}>
                  <td>{st.studentId}</td>
                  <td>{st.name}</td>
                  <td>{st.email}</td>
                  <td>
                    <button onClick={() => handleEdit(st)} style={{marginRight: '5px', backgroundColor: '#ffc107', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}>
                      ✏️ Sửa
                    </button>
                    <button onClick={() => handleDelete(st._id)} style={{backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}>
                      🗑️ Xóa
                    </button>
                  </td>
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