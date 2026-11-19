export const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

export const CATEGORY_COLORS = {
  'Ăn uống': { bg: '#ffedd5', text: '#c2410c', border: '#fdba74', icon: '🍜' },
  'Đi lại': { bg: '#e0f2fe', text: '#0369a1', border: '#7dd3fc', icon: '🛵' },
  'Học tập': { bg: '#dcfce7', text: '#15803d', border: '#86efac', icon: '📚' },
  'Giải trí': { bg: '#f3e8ff', text: '#7e22ce', border: '#d8b4fe', icon: '🎮' }
};

export const initialExpenses = [
  {
    id: '1',
    title: 'Phở bò tái nạm sáng',
    amount: 45000,
    category: 'Ăn uống',
    date: '2026-11-19'
  },
  {
    id: '2',
    title: 'Đổ xăng xe máy',
    amount: 80000,
    category: 'Đi lại',
    date: '2026-11-18'
  },
  {
    id: '3',
    title: 'Giáo trình Lập trình Web',
    amount: 120000,
    category: 'Học tập',
    date: '2026-11-17'
  },
  {
    id: '4',
    title: 'Vé xem phim cuối tuần',
    amount: 110000,
    category: 'Giải trí',
    date: '2026-11-16'
  },
  {
    id: '5',
    title: 'Cà phê Highland học nhóm',
    amount: 55000,
    category: 'Ăn uống',
    date: '2026-11-19'
  }
];
