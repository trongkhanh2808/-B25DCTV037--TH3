import React, { useState, useRef } from 'react';
import { CATEGORIES } from '../data/initialExpenses';

function ExpenseForm({ onAddExpense, isLoading }) {
  const today = new Date().toISOString().split('T')[0];

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState(today);
  const [errors, setErrors] = useState({});

  // Yêu cầu 3: Dùng useRef để focus ô nhập sau khi thêm
  const titleInputRef = useRef(null);

  const validate = () => {
    const errs = {};
    if (!title || !title.trim()) {
      errs.title = 'Vui lòng nhập nội dung khoản chi';
    } else if (title.trim().length < 2) {
      errs.title = 'Nội dung phải có ít nhất 2 ký tự';
    }

    if (!amount) {
      errs.amount = 'Vui lòng nhập số tiền';
    } else if (isNaN(amount) || Number(amount) <= 0) {
      errs.amount = 'Số tiền phải là số lớn hơn 0';
    }

    if (!category) {
      errs.category = 'Vui lòng chọn loại khoản chi';
    }

    if (!date) {
      errs.date = 'Vui lòng chọn ngày chi';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newExpense = {
      title: title.trim(),
      amount: Number(amount),
      category,
      date
    };

    // Gọi hàm thêm chi tiêu
    await onAddExpense(newExpense);

    // Reset lại form
    setTitle('');
    setAmount('');
    setCategory('Ăn uống');
    setDate(today);
    setErrors({});

    // Yêu cầu 3: Dùng useRef để focus ô nhập nội dung sau khi thêm
    if (titleInputRef.current) {
      console.log('[ExpenseForm] Dùng useRef để focus ô nhập sau khi thêm thành công');
      titleInputRef.current.focus();
    }
  };

  const handleReset = () => {
    setTitle('');
    setAmount('');
    setCategory('Ăn uống');
    setDate(today);
    setErrors({});
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  };

  return (
    <section className="card form-card">
      <h2 className="card-title">
        <span>➕</span> Thêm khoản chi mới (Hooks)
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Nội dung chi tiêu *</label>
            <input
              ref={titleInputRef}
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
              }}
              placeholder="VD: Mua sách giáo trình, Ăn trưa..."
              className={errors.title ? 'input-error' : ''}
              disabled={isLoading}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="amount">Số tiền (VNĐ) *</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
              }}
              placeholder="VD: 45000"
              min="1000"
              step="1000"
              className={errors.amount ? 'input-error' : ''}
              disabled={isLoading}
            />
            {amount && !isNaN(amount) && Number(amount) > 0 && (
              <small className="amount-preview">
                Xem trước: {Number(amount).toLocaleString('vi-VN')} đ
              </small>
            )}
            {errors.amount && <span className="error-message">{errors.amount}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Loại chi tiêu *</label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (errors.category) setErrors((prev) => ({ ...prev, category: '' }));
              }}
              className={errors.category ? 'input-error' : ''}
              disabled={isLoading}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="date">Ngày chi *</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
              }}
              className={errors.date ? 'input-error' : ''}
              disabled={isLoading}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? '⏳ Đang lưu...' : 'Thêm khoản chi'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            Đặt lại
          </button>
        </div>
      </form>
    </section>
  );
}

export default ExpenseForm;
