import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Support workspace</p>
          <h1>MindX Service AI</h1>
        </div>
        <nav className="nav-tabs" aria-label="Primary">
          <NavLink to="/chat">Chat</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
