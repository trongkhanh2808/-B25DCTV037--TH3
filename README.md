# BÀI THỰC HÀNH 03 - SỔ CHI TIÊU CÁ NHÂN
**Môn học:** Lập trình Web (LTW) - Nhóm N1

---

### Thông tin sinh viên
- **Họ và tên:** Nguyễn Trọng Khánh
- **Mã sinh viên:** B25DCTV037
- **Link GitHub:** https://github.com/trongkhanh2808/-B25DCTV037--TH3

---

## 1. Cấu trúc thư mục
- `part-a-class/`: Viết bằng React Class Component.
- `part-b-hooks/`: Viết lại bằng React Function Component kết hợp Hooks và các tính năng nâng cao.
- `README.md`: Hướng dẫn cách chạy và giải thích câu hỏi lý thuyết.

---

## 2. Hướng dẫn cách chạy dự án

### Chạy Phần A (Class Component)
1. Mở terminal, di chuyển vào thư mục `part-a-class`:
   ```bash
   cd part-a-class
   npm install
   npm run dev
   ```
2. Mở trình duyệt xem tại: `http://localhost:3000`

### Chạy Phần B (Function Component + Hooks)
1. Mở terminal, di chuyển vào thư mục `part-b-hooks`:
   ```bash
   cd part-b-hooks
   npm install
   npm run dev
   ```
2. Mở trình duyệt xem tại: `http://localhost:3001`

---

## 3. Các tính năng đã hoàn thành trong bài

### Phần A (Class Component):
- Chia component rõ ràng, `App` quản lý state danh sách chi tiêu và danh mục đang lọc.
- Đồng hồ chạy mỗi giây với `componentDidMount` và hủy timer đúng cách khi bị ẩn bằng `componentWillUnmount` (có nút bấm Ẩn/Hiện đồng hồ để kiểm tra).
- Form thêm khoản chi có kiểm tra hợp lệ dữ liệu (validate không để trống, số tiền phải > 0, ngày chi hợp lệ).
- Danh sách hiển thị có dùng `key` định danh riêng cho từng khoản chi.
- Xóa khoản chi có hộp thoại xác nhận `window.confirm`.
- Lọc theo loại chi tiêu (Ăn uống, Đi lại, Học tập, Giải trí) và tính tổng tiền chi tương ứng.
- Cập nhật tiêu đề tab hiển thị tổng chi tiêu bằng `componentDidUpdate`.

### Phần B (Function Component + Hooks):
- Viết lại toàn bộ sang Function Component với `useState` và `useEffect`.
- Lấy, thêm, xóa dữ liệu qua mockapi bằng custom hook `useFetch` (có trạng thái `loading` và `error`).
- Dùng `useRef` để tự động focus lại vào ô nhập nội dung sau khi thêm khoản chi mới.
- Dùng `useContext` để chuyển đổi chế độ sáng/tối (Dark/Light mode).
- Cập nhật tiêu đề tab bằng `useEffect`.

### Yêu cầu nâng cao:
- Custom hook `useClock`: tách riêng logic chạy và dọn dẹp đồng hồ.
- Thống kê chi tiêu theo từng loại: hiển thị tổng số tiền, số lượng và phần trăm cho từng danh mục (Ăn uống, Đi lại, Học tập, Giải trí).
- Ô tìm kiếm có độ trễ (`useDebounce` 350ms): tìm kiếm theo nội dung khoản chi mượt mà, không bị lag.

---

## 4. Hooks đã giúp khắc phục các thách thức của Class ở những chỗ nào trong bài:

1. **Khả năng tái sử dụng logic (Custom Hook):**
   Ở Class component, logic chạy `setInterval` của đồng hồ hay logic gọi fetch dữ liệu bị gắn chặt vào các lifecycle method của component đó, rất khó dùng lại ở nơi khác nếu không dùng các kỹ thuật phức tạp như HOC. Với Hooks, em có thể tách hẳn thành `useClock` và `useFetch` để tái sử dụng ở bất kỳ component nào chỉ bằng 1 dòng gọi hàm.

2. **Gom các đoạn mã liên quan vào cùng một nơi:**
   Ở Class component, mã nguồn của cùng 1 tính năng bị phân tán ra nhiều hàm vòng đời khác nhau (ví dụ: bắt đầu đếm nhịp ở `componentDidMount`, dọn dẹp `clearInterval` ở `componentWillUnmount`, so sánh state cũ/mới để đổi title tab ở `componentDidUpdate`). Với `useEffect`, toàn bộ logic khởi tạo, phụ thuộc và dọn dẹp đều được viết chung trong một hàm duy nhất, giúp code trực quan và dễ bảo trì hơn.

3. **Loại bỏ con trỏ `this` và hàm `bind`:**
   Class component đòi hỏi phải dùng `this.state`, `this.setState` và phải bind các hàm xử lý sự kiện trong constructor (`this.handleSubmit = this.handleSubmit.bind(this)`). Function component sử dụng hàm thuần JavaScript và closures nên cú pháp ngắn gọn, dễ đọc và không lo bị lỗi quên bind `this`.

4. **Sử dụng Context và Ref đơn giản hơn:**
   Để chia sẻ trạng thái chế độ Sáng/Tối, ở Function component chỉ cần gọi `useContext(ThemeContext)` rất trực tiếp, không cần phải bọc thẻ `<ThemeContext.Consumer>` dạng render-prop phức tạp như Class. Việc thao tác với DOM qua `useRef` để focus ô nhập liệu sau khi thêm cũng gọn gàng hơn so với `React.createRef()`.
