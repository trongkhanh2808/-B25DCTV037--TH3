import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Plugin tích hợp Mock API server trực tiếp trong Vite dev server
function mockApiPlugin() {
  let expenses = [
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

  return {
    name: 'vite-plugin-mock-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0];

        // GET /api/expenses
        if (url === '/api/expenses' && req.method === 'GET') {
          setTimeout(() => {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(expenses));
          }, 350); // Giả lập độ trễ mạng để thấy rõ trạng thái loading
          return;
        }

        // POST /api/expenses
        if (url === '/api/expenses' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const newExpense = JSON.parse(body);
              const created = {
                id: String(Date.now()),
                title: newExpense.title,
                amount: Number(newExpense.amount),
                category: newExpense.category,
                date: newExpense.date
              };
              expenses.unshift(created);
              setTimeout(() => {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 201;
                res.end(JSON.stringify(created));
              }, 300);
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Dữ liệu không hợp lệ' }));
            }
          });
          return;
        }

        // DELETE /api/expenses/:id
        if (url.startsWith('/api/expenses/') && req.method === 'DELETE') {
          const id = url.replace('/api/expenses/', '');
          expenses = expenses.filter((e) => String(e.id) !== String(id));
          setTimeout(() => {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, id }));
          }, 250);
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), mockApiPlugin()],
  server: {
    port: 3001
  }
});
