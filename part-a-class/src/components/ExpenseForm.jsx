import React, { Component } from 'react';
import { CATEGORIES } from '../data/initialExpenses';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    const today = new Date().toISOString().split('T')[0];
    this.state = {
      title: '',
      amount: '',
      category: 'Ăn uống',
      date: today,
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: ''
      }
    }));
  }

  validate() {
    const { title, amount, category, date } = this.state;
    const errors = {};

    if (!title || !title.trim()) {
      errors.title = 'Vui lòng nhập nội dung khoản chi';
    } else if (title.trim().length < 2) {
      errors.title = 'Nội dung phải có ít nhất 2 ký tự';
    }

    if (!amount) {
      errors.amount = 'Vui lòng nhập số tiền chi tiêu';
    } else if (isNaN(amount) || Number(amount) <= 0) {
      errors.amount = 'Số tiền phải là số lớn hơn 0';
    }

    if (!category) {
      errors.category = 'Vui lòng chọn loại khoản chi';
    }

    if (!date) {
      errors.date = 'Vui lòng chọn ngày chi tiêu';
    }

    return errors;
  }

  handleSubmit(e) {
    e.preventDefault();
    const errors = this.validate();

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const newExpense = {
      id: 'exp-' + Date.now(),
      title: this.state.title.trim(),
      amount: Number(this.state.amount),
      category: this.state.category,
      date: this.state.date
    };

    this.props.onAddExpense(newExpense);
    this.handleReset();
  }

  handleReset() {
    const today = new Date().toISOString().split('T')[0];
    this.setState({
      title: '',
      amount: '',
      category: 'Ăn uống',
      date: today,
      errors: {}
    });
  }

  render() {
    const { title, amount, category, date, errors } = this.state;

    return (
      <section className="card form-card">
        <h2 className="card-title">Thêm khoản chi mới</h2>

        <form onSubmit={this.handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Nội dung chi tiêu *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={this.handleChange}
                placeholder="VD: Ăn phở bò, Mua sách..."
                className={errors.title ? 'input-error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="amount">Số tiền (VNĐ) *</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={this.handleChange}
                placeholder="VD: 50000"
                min="1000"
                step="1000"
                className={errors.amount ? 'input-error' : ''}
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
                name="category"
                value={category}
                onChange={this.handleChange}
                className={errors.category ? 'input-error' : ''}
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
                name="date"
                value={date}
                onChange={this.handleChange}
                className={errors.date ? 'input-error' : ''}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Thêm khoản chi
            </button>
            <button type="button" onClick={this.handleReset} className="btn btn-secondary">
              Đặt lại
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default ExpenseForm;
