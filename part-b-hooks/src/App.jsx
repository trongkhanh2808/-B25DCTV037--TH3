import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import CategoryStats from './components/CategoryStats';
import SearchBar from './components/SearchBar';
import ApiConfigModal from './components/ApiConfigModal';
import { useFetch } from './hooks/useFetch';

function App() {
  const [filterCategory, setFilterCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [showClock, setShowClock] = useState(true);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  // Yêu cầu 2: Lấy, thêm, xóa dữ liệu qua mockapi bằng custom hook useFetch
  const {
    data: expenses,
    loading,
    error,
    apiUrl,
    setApiUrl,
    refetch,
    addExpense,
    deleteExpense
  } = useFetch();

  // Tính tổng chi tiêu của toàn bộ danh sách
  const grandTotal = useMemo(() => {
    return expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  }, [expenses]);

  // Cập nhật document.title bằng useEffect (thay thế cho componentDidUpdate ở Class Component)
  useEffect(() => {
    console.log('[App Hooks] useEffect -> Cập nhật tiêu đề document.title khi expenses thay đổi');
    const formatted = grandTotal.toLocaleString('vi-VN');
    document.title = `Tổng chi: ${formatted} đ - Sổ chi tiêu (Hooks)`;
  }, [grandTotal]);

  // Lọc và tìm kiếm danh sách (kết hợp filter loại + debounce search)
  const filteredExpenses = useMemo(() => {
    return expenses.filter((item) => {
      const matchCategory =
        filterCategory === 'Tất cả' || item.category === filterCategory;
      const matchSearch =
        !searchTerm.trim() ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [expenses, filterCategory, searchTerm]);

  // Tính tổng tiền sau khi lọc
  const filteredTotal = useMemo(() => {
    return filteredExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
  }, [filteredExpenses]);

  // Handler thêm khoản chi
  const handleAddExpense = async (newExpense) => {
    await addExpense(newExpense);
  };

  // Handler xóa khoản chi có xác nhận
  const handleDeleteExpense = async (id, title) => {
    const isConfirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa khoản chi "${title}" không?`
    );

    if (isConfirmed) {
      await deleteExpense(id);
    }
  };

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  return (
    <div className="app-container">
      <Header
        showClock={showClock}
        onToggleClock={() => setShowClock((prev) => !prev)}
        onOpenApiConfig={() => setIsApiModalOpen(true)}
      />

      <main className="main-content">
        <div className="layout-grid">
          <div className="layout-left">
            <ExpenseForm
              onAddExpense={handleAddExpense}
              isLoading={loading}
            />
            <CategoryStats expenses={expenses} />
          </div>

          <div className="layout-right">
            <section className="card list-card">
              <div className="list-card-header">
                <h2 className="card-title">
                  <span>📋</span> Danh sách khoản chi
                </h2>
                <span className="api-badge" title="Đang kết nối API">
                  API: {apiUrl}
                </span>
              </div>

              {/* Ô tìm kiếm có debounce (Yêu cầu nâng cao) */}
              <SearchBar onSearchChange={handleSearchChange} />

              {/* Nút lọc theo loại */}
              <ExpenseFilter
                currentFilter={filterCategory}
                onFilterChange={setFilterCategory}
                expenses={expenses}
              />

              {/* Dòng tổng tiền */}
              <ExpenseSummary
                filteredTotal={filteredTotal}
                filteredCount={filteredExpenses.length}
                totalExpenses={grandTotal}
                totalCount={expenses.length}
                filterCategory={filterCategory}
                searchTerm={searchTerm}
              />

              {/* Danh sách hiển thị, trạng thái loading & error */}
              <ExpenseList
                expenses={filteredExpenses}
                onDelete={handleDeleteExpense}
                filterCategory={filterCategory}
                searchTerm={searchTerm}
                loading={loading}
                error={error}
                onRetry={refetch}
              />
            </section>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>
          Bài tập Lập trình Web - <strong>Phần B: Function Component + Hooks</strong>
        </p>
      </footer>

      <ApiConfigModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        currentApiUrl={apiUrl}
        onSaveApiUrl={setApiUrl}
      />
    </div>
  );
}

export default App;
