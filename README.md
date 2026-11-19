# BÀI THỰC HÀNH 03 (N1) - LẬP TRÌNH WEB
## Ứng dụng "Sổ Chi Tiêu Cá Nhân" (Personal Expense Tracker)

---

### 👤 Thông tin sinh viên
- **Họ và tên:** *[Điền họ và tên của bạn]*
- **Mã sinh viên:** *[Điền mã số sinh viên của bạn]*
- **Lớp / Khóa:** *[Điền tên lớp/khóa học]*
- **Môn học:** Lập trình Web (LTW) - Nhóm N1
- **Repository:** *[Điền link GitHub Repo PUBLIC của bạn]*

---

## 📌 Tổng quan dự án

Dự án xây dựng ứng dụng **"Sổ chi tiêu cá nhân"** theo hai phương pháp tiếp cận trong React nhằm so sánh sự khác biệt và ưu thế của React Hooks so với React Class Components:
1. **Phần A (`part-a-class`)**: Xây dựng hoàn toàn bằng **Class Component** truyền thống và Lifecycle Methods.
2. **Phần B (`part-b-hooks`)**: Xây dựng bằng **Function Component + React Hooks**, áp dụng các Custom Hooks (`useFetch`, `useClock`, `useDebounce`), `useContext`, `useRef` và các tính năng nâng cao.

> **Ràng buộc:** Dự án **KHÔNG sử dụng** React Router, Redux hay bất kỳ thư viện UI nào (Bootstrap, Tailwind, Ant Design, MUI,...). Toàn bộ giao diện được xây dựng bằng **Pure Modern CSS** tối ưu, responsive và thẩm mỹ.

---

## 📂 Cấu trúc thư mục

```text
so-chi-tieu-ca-nhan/
├── README.md                      # Báo cáo, thông tin sinh viên và hướng dẫn
├── part-a-class/                  # Ứng dụng triển khai bằng Class Component
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                # State quản lý tại App, componentDidUpdate cập nhật title
│       ├── App.css                # Pure CSS thuần túy
│       ├── data/
│       │   └── initialExpenses.js # Dữ liệu mẫu ban đầu
│       └── components/
│           ├── Header.jsx         # Header + nút ẩn/hiện đồng hồ
│           ├── Clock.jsx          # Đồng hồ componentDidMount + componentWillUnmount
│           ├── ExpenseForm.jsx    # Form thêm chi tiêu có validation
│           ├── ExpenseFilter.jsx  # Nút lọc theo loại
│           ├── ExpenseItem.jsx    # Thẻ từng khoản chi + nút xóa có confirm
│           ├── ExpenseList.jsx    # Danh sách dùng key, empty state
│           ├── ExpenseSummary.jsx # Dòng tổng tiền chi tiêu
│           └── CategoryStats.jsx  # Thống kê chi tiêu theo từng loại
└── part-b-hooks/                  # Ứng dụng triển khai bằng Function Component + Hooks
    ├── index.html
    ├── package.json
    ├── vite.config.js             # Tích hợp mock API server giả lập RESTful
    └── src/
        ├── main.jsx
        ├── App.jsx                # useEffect cập nhật title, filter, debounce search
        ├── App.css                # Pure CSS hỗ trợ Chế độ Sáng / Tối (Dark/Light mode)
        ├── data/
        │   └── initialExpenses.js
        ├── context/
        │   └── ThemeContext.jsx   # Quản lý chế độ Sáng / Tối bằng useContext
        ├── hooks/
        │   ├── useClock.js        # Custom hook đồng hồ (Yêu cầu nâng cao)
        │   ├── useDebounce.js     # Custom hook debounce tìm kiếm (Yêu cầu nâng cao)
        │   └── useFetch.js        # Custom hook CRUD qua MockAPI (loading + error)
        └── components/
            ├── Header.jsx         # Header + nút Sáng/Tối + Cấu hình API + Đồng hồ
            ├── Clock.jsx          # Đồng hồ sử dụng useClock
            ├── ExpenseForm.jsx    # Form dùng useRef để focus ô nhập sau khi thêm
            ├── SearchBar.jsx      # Ô tìm kiếm có debounce 350ms
            ├── ExpenseFilter.jsx  # Nút lọc theo loại
            ├── ExpenseItem.jsx    # Khoản chi + nút xóa có confirm
            ├── ExpenseList.jsx    # Danh sách + spinner loading + thông báo error
            ├── ExpenseSummary.jsx # Dòng tổng tiền chi tiêu
            ├── CategoryStats.jsx  # Thống kê theo loại (useMemo tối ưu)
            └── ApiConfigModal.jsx # Modal linh hoạt đổi endpoint MockAPI
```

---

## 🚀 Hướng dẫn cài đặt và chạy ứng dụng

### Yêu cầu môi trường
- **Node.js**: Phiên bản 18+ trở lên
- **Trình quản lý gói**: `npm`

---

### Chạy Phần A – Class Component

1. Di chuyển vào thư mục `part-a-class`:
   ```bash
   cd part-a-class
   ```
2. Cài đặt các gói phụ thuộc (nếu chưa cài):
   ```bash
   npm install
   ```
3. Khởi động môi trường phát triển:
   ```bash
   npm run dev
   ```
4. Mở trình duyệt tại: `http://localhost:3000`

---

### Chạy Phần B – Function Component + Hooks

1. Di chuyển vào thư mục `part-b-hooks`:
   ```bash
   cd part-b-hooks
   ```
2. Cài đặt các gói phụ thuộc (nếu chưa cài):
   ```bash
   npm install
   ```
3. Khởi động môi trường phát triển:
   ```bash
   npm run dev
   ```
4. Mở trình duyệt tại: `http://localhost:3001`

> **Lưu ý về MockAPI ở Phần B:**
> - Ứng dụng tích hợp sẵn **Mock API REST Server** chạy trực tiếp qua Vite (`/api/expenses`) với đầy đủ các phương thức `GET`, `POST`, `DELETE` và giả lập độ trễ mạng để kiểm tra trạng thái **Loading / Error**.
> - Bạn cũng có thể bấm vào nút **"🌐 Cấu hình API"** trên thanh Header để nhập trực tiếp URL MockAPI của bạn từ [mockapi.io](https://mockapi.io) (hoặc qua biến môi trường `VITE_API_URL` trong file `.env`).

---

## 🎯 Chi tiết các yêu cầu đã hoàn thành

### 1. Phần A – Class Component
- [x] **Chia component**: Tách các thành phần rõ ràng (`Header`, `Clock`, `ExpenseForm`, `ExpenseFilter`, `ExpenseList`, `ExpenseItem`, `ExpenseSummary`, `CategoryStats`).
- [x] **Quản lý state**: `App` giữ state danh sách khoản chi (dữ liệu mẫu sẵn trong code) và loại đang lọc.
- [x] **Vòng đời đồng hồ (Clock Lifecycle)**:
  - `componentDidMount`: Đăng ký `setInterval` đếm mỗi giây.
  - `componentWillUnmount`: Gọi `clearInterval` khi đồng hồ bị ẩn.
  - Có nút **"Ẩn / Hiện đồng hồ"** trên Header để minh chứng trực quan việc unmount & dọn dẹp timer.
- [x] **Form thêm khoản chi**: Validate nội dung không rỗng (>= 2 ký tự), số tiền phải là số lớn hơn 0 (có xem trước định dạng VNĐ), loại chi tiêu và ngày chi hợp lệ.
- [x] **Danh sách chi tiêu**: Mỗi item dùng `key` duy nhất (`expense.id`).
- [x] **Xóa có xác nhận**: Sử dụng `window.confirm("Bạn có chắc chắn muốn xóa...")` trước khi xóa.
- [x] **Lọc & Tổng tiền**: Nút lọc theo 4 loại (Ăn uống, Đi lại, Học tập, Giải trí) và Tất cả; hiển thị dòng tổng tiền cập nhật tức thì.
- [x] **Cập nhật tiêu đề tab**: Sử dụng `componentDidUpdate` để tự động cập nhật `document.title` thành `"Tổng chi: {số tiền} đ - Sổ chi tiêu (Class)"` mỗi khi danh sách hoặc bộ lọc thay đổi.

---

### 2. Phần B – Function Component + Hooks
- [x] **Viết lại toàn bộ bằng Function Component**: Thay thế toàn bộ Class Component bằng cú pháp hàm hiện đại, kết hợp `useState` và `useEffect`.
- [x] **Custom Hook `useFetch`**:
  - Quản lý toàn bộ vòng đời tương tác API (`GET`, `POST`, `DELETE`).
  - Có cờ `loading` hiển thị spinner/thông báo đang tải khi gọi API.
  - Có trạng thái `error` kèm nút **"Thử tải lại"** khi có lỗi kết nối.
  - Có cơ chế đồng bộ bộ nhớ tạm dự phòng (fallback) đảm bảo ứng dụng luôn hoạt động ổn định.
- [x] **Sử dụng `useRef`**:
  - Sau khi submit form thêm khoản chi thành công, con trỏ tự động focus lại vào ô nhập nội dung chi tiêu thông qua `titleInputRef.current.focus()`.
- [x] **Sử dụng `useContext`**:
  - Xây dựng `ThemeContext` và `ThemeProvider` lưu trữ và chuyển đổi chế độ **Sáng (Light)** / **Tối (Dark)**.
  - Tự động đồng bộ thuộc tính `data-theme` trên toàn bộ trang và lưu vào `localStorage`.
- [x] **Cập nhật tiêu đề tab**: Dùng `useEffect` với dependency `[grandTotal]` để cập nhật `document.title`.

---

### 3. Yêu cầu nâng cao (Advanced Features)
- [x] **Custom Hook `useClock`**: Đóng gói logic đồng hồ vào hook riêng, tự động quản lý subscription và dọn dẹp interval, trả về thời gian hiện tại cùng chuỗi định dạng đẹp mắt.
- [x] **Thống kê tổng tiền theo từng loại**:
  - Thống kê tổng số tiền, số lượng khoản chi và tỉ lệ phần trăm (%) cho từng loại (Ăn uống, Đi lại, Học tập, Giải trí).
  - Hiển thị thanh tiến trình trực quan (visual progress bar) với màu sắc đặc trưng cho từng danh mục.
- [x] **Ô tìm kiếm có độ trễ (`useDebounce`)**:
  - Tạo custom hook `useDebounce(value, delay = 350)`.
  - Người dùng gõ tìm kiếm không bị giật lag; chỉ thực hiện lọc khi người dùng ngừng gõ sau 350ms.
  - Có dòng trạng thái *"Đang đợi gõ xong..."* khi đang trì hoãn.

---

## ⚖️ Phân tích chuyên sâu: React Hooks đã giúp khắc phục các thách thức của Class Component như thế nào?

Trong quá trình thực hiện bài toán **"Sổ chi tiêu cá nhân"**, việc chuyển đổi từ **Class Component** (Phần A) sang **Function Component + Hooks** (Phần B) đã giải quyết triệt để 5 vấn đề cốt lõi sau:

### 1. Khả năng tái sử dụng logic (Reusability of Stateful Logic)
- **Ở Class Component:**
  - Logic đồng hồ (khởi động `setInterval` và dọn dẹp `clearInterval`) hay logic gọi API qua fetch bắt buộc phải viết cố định bên trong các phương thức vòng đời của component đó.
  - Nếu muốn chia sẻ logic này cho các component khác, lập trình viên buộc phải sử dụng các kỹ thuật phức tạp như **Higher-Order Components (HOC)** hoặc **Render Props**, dẫn đến hiện tượng *"Wrapper Hell"* làm cây component bị lồng ghép quá sâu và khó gỡ lỗi.
- **Ở Function Component + Hooks:**
  - Chúng ta có thể dễ dàng tách biệt hoàn toàn logic ra các **Custom Hook** độc lập:
    - `useClock()`: Quản lý đếm giây thời gian thực.
    - `useFetch(url)`: Quản lý trạng thái gọi API, loading, error, CRUD.
    - `useDebounce(val, delay)`: Quản lý độ trễ tìm kiếm.
  - Bất kỳ component nào cần dùng chỉ việc gọi đúng 1 dòng: `const { formattedTime } = useClock();`. Mã nguồn trở nên sạch sẽ, modular và dễ tái sử dụng tối đa.

---

### 2. Tổ chức mã nguồn và Gom cụm logic liên quan (Separation of Concerns)
- **Ở Class Component:**
  - Code của cùng một tính năng bị **xé nhỏ và phân tán** vào nhiều phương thức vòng đời khác nhau. Ví dụ với tính năng đồng hồ hoặc cập nhật tiêu đề trang:
    - Bắt đầu interval / tính tổng: viết trong `componentDidMount()`.
    - Kiểm tra cập nhật khi state đổi: viết trong `componentDidUpdate()`.
    - Dọn dẹp interval: viết trong `componentWillUnmount()`.
  - Ngược lại, trong cùng một hàm `componentDidMount()` lại phải chứa lẫn lộn code của cả đồng hồ, code fetch dữ liệu, code cập nhật document title.
- **Ở Function Component + Hooks:**
  - `useEffect` cho phép **gom toàn bộ vòng đời của một tính năng vào cùng một nơi**:
    ```javascript
    // Toàn bộ logic của đồng hồ nằm gọn trong một effect:
    useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer); // Dọn dẹp khi unmount
    }, []);
    ```
  - Chúng ta có thể dùng nhiều `useEffect` khác nhau trong cùng một component, mỗi effect phụ trách một nhiệm vụ riêng biệt.

---

### 3. Loại bỏ hoàn toàn sự rắc rối của con trỏ `this` và Boilerplate Code
- **Ở Class Component:**
  - Cần phải viết hàm `constructor`, khai báo `super(props)`.
  - Phải ghi nhớ `this.state` và `this.setState()`.
  - Phải nhớ **bind context** cho các phương thức sự kiện (ví dụ `this.handleSubmit = this.handleSubmit.bind(this)`), nếu quên sẽ gây lỗi `undefined`.
- **Ở Function Component + Hooks:**
  - Chỉ là các hàm JavaScript thuần túy (`JavaScript functions`).
  - Sử dụng cơ chế **Closures** tự nhiên của JavaScript để truy cập biến.
  - Không còn `this`, không còn `bind`, cú pháp ngắn gọn, dễ hiểu và thân thiện hơn rất nhiều cho người đọc mã.

---

### 4. Tiêu thụ Ngữ cảnh (Context API) đơn giản và trực quan
- **Ở Class Component:**
  - Để sử dụng context (như chế độ sáng/tối `ThemeContext`), Class Component phải dùng `<ThemeContext.Consumer>` theo dạng Render Props:
    ```jsx
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button className={theme}>...</button>
      )}
    </ThemeContext.Consumer>
    ```
    Cú pháp này làm JSX bị lồng ghép phức tạp nếu component cần tiêu thụ nhiều context cùng lúc.
- **Ở Function Component + Hooks:**
  - Chỉ cần một câu lệnh đơn giản:
    ```javascript
    const { theme, toggleTheme } = useContext(ThemeContext);
    ```
  - Code phẳng, trực tiếp và cực kỳ trong sáng.

---

### 5. Thao tác với DOM (Refs) gọn gàng hơn
- **Ở Class Component:** Cần gọi `this.titleInput = React.createRef()` trong constructor, sau đó truy cập qua `this.titleInput.current`.
- **Ở Function Component + Hooks:** Chỉ cần `const titleInputRef = useRef(null)`, giá trị của ref được giữ nguyên qua các lần re-render mà không gây render lại giao diện khi thay đổi.

---

## 📋 Bảng tổng hợp so sánh trực tiếp trong bài

| Tiêu chí | Phần A: Class Component | Phần B: Function Component + Hooks |
| :--- | :--- | :--- |
| **Quản lý trạng thái** | `this.state = {...}` / `this.setState(...)` | Các hook `useState(...)` riêng biệt |
| **Đồng hồ thời gian thực** | Chia rẽ ở `componentDidMount` & `componentWillUnmount` | Đóng gói trong custom hook `useClock` với `useEffect` |
| **Cập nhật tiêu đề tab** | Kiểm tra so sánh ở `componentDidUpdate(prevProps, prevState)` | `useEffect(..., [grandTotal])` tự động chạy khi tổng tiền đổi |
| **Gọi API & Quản lý dữ liệu** | Phải viết trong lifecycle của Component | Tách biệt thành custom hook `useFetch` tái sử dụng linh hoạt |
| **Focus input sau khi thêm** | `React.createRef()` và `this.inputRef.current` | `useRef(null)` gọn gàng và dễ đọc |
| **Chế độ Sáng / Tối** | `<ThemeContext.Consumer>` dạng render-prop | `useContext(ThemeContext)` trực tiếp |
| **Tìm kiếm có độ trễ** | Phải tự quản lý timer thủ công trên instance | Custom hook `useDebounce` sạch sẽ |
| **Khối lượng code boilerplate** | Dài dòng, nhiều `this`, `constructor`, `bind` | Tinh gọn, rõ ràng, tập trung vào business logic |

---

## 🛠️ Hướng dẫn đẩy lên GitHub (Tạo Repo Public)

1. Khởi tạo Git tại thư mục gốc:
   ```bash
   cd C:\Users\admin\.gemini\antigravity\scratch\so-chi-tieu-ca-nhan
   git init
   ```
2. Thêm file `.gitignore` để loại bỏ `node_modules` và thư mục `dist`:
   ```bash
   echo "node_modules" >> .gitignore
   echo "dist" >> .gitignore
   echo ".DS_Store" >> .gitignore
   ```
3. Commit toàn bộ mã nguồn:
   ```bash
   git add .
   git commit -m "feat: complete Lab 03 - Personal Expense Tracker (Part A Class & Part B Hooks)"
   ```
4. Tạo repository mới trên GitHub (chọn chế độ **PUBLIC**).
5. Kết nối remote và đẩy mã nguồn:
   ```bash
   git remote add origin https://github.com/<tai-khoan-cua-ban>/so-chi-tieu-ca-nhan.git
   git branch -M main
   git push -u origin main
   ```
