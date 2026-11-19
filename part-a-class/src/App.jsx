import React, { Component } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import CategoryStats from './components/CategoryStats';
import { initialExpenses } from './data/initialExpenses';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: initialExpenses,
      filterCategory: 'Tất cả',
      showClock: true
    };

    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleToggleClock = this.handleToggleClock.bind(this);
  }

  componentDidMount() {
    this.updateDocumentTitle();
  }

  componentDidUpdate(prevProps, prevState) {
    // Yêu cầu 4: Tiêu đề tab hiển thị tổng chi, cập nhật bằng componentDidUpdate
    if (
      prevState.expenses !== this.state.expenses ||
      prevState.filterCategory !== this.state.filterCategory
    ) {
      console.log('[App] componentDidUpdate -> Cập nhật tiêu đề tab document.title');
      this.updateDocumentTitle();
    }
  }

  calculateTotal() {
    return this.state.expenses.reduce((sum, item) => sum + item.amount, 0);
  }

  calculateFilteredTotal(filtered) {
    return filtered.reduce((sum, item) => sum + item.amount, 0);
  }

  updateDocumentTitle() {
    const total = this.calculateTotal();
    const formatted = total.toLocaleString('vi-VN');
    document.title = `Tổng chi: ${formatted} đ - Sổ chi tiêu (Class)`;
  }

  handleAddExpense(newExpense) {
    this.setState((prevState) => ({
      expenses: [newExpense, ...prevState.expenses]
    }));
  }

  handleDeleteExpense(id, title) {
    // Yêu cầu 3: Xóa có xác nhận (confirm dialog)
    const isConfirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa khoản chi "${title}" không?`
    );

    if (isConfirmed) {
      this.setState((prevState) => ({
        expenses: prevState.expenses.filter((item) => item.id !== id)
      }));
    }
  }

  handleFilterChange(category) {
    this.setState({ filterCategory: category });
  }

  handleToggleClock() {
    this.setState((prevState) => ({
      showClock: !prevState.showClock
    }));
  }

  render() {
    const { expenses, filterCategory, showClock } = this.state;

    // Lọc danh sách theo loại
    const filteredExpenses =
      filterCategory === 'Tất cả'
        ? expenses
        : expenses.filter((e) => e.category === filterCategory);

    const totalAll = this.calculateTotal();
    const totalFiltered = this.calculateFilteredTotal(filteredExpenses);

    return (
      <div className="app-container">
        <Header
          showClock={showClock}
          onToggleClock={this.handleToggleClock}
        />

        <main className="main-content">
          <div className="layout-grid">
            <div className="layout-left">
              <ExpenseForm onAddExpense={this.handleAddExpense} />
              <CategoryStats expenses={expenses} />
            </div>

            <div className="layout-right">
              <section className="card list-card">
                <div className="list-card-header">
                  <h2 className="card-title">
                    <span>📋</span> Danh sách khoản chi
                  </h2>
                </div>

                <ExpenseFilter
                  currentFilter={filterCategory}
                  onFilterChange={this.handleFilterChange}
                  expenses={expenses}
                />

                <ExpenseSummary
                  filteredTotal={totalFiltered}
                  filteredCount={filteredExpenses.length}
                  totalExpenses={totalAll}
                  totalCount={expenses.length}
                  filterCategory={filterCategory}
                />

                <ExpenseList
                  expenses={filteredExpenses}
                  onDelete={this.handleDeleteExpense}
                  filterCategory={filterCategory}
                />
              </section>
            </div>
          </div>
        </main>

        <footer className="app-footer">
          <p>
            Bài tập Lập trình Web - <strong>Phần A: Class Component</strong>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
