import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Chatbot from './pages/Chatbot';
import Budget from './pages/Budget';
import Marketplace from './pages/Marketplace';
import Income from './pages/Income';
import Expenses from './pages/Expenses';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="budget" element={<Budget />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="income" element={<Income />} />
          <Route path="expenses" element={<Expenses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
