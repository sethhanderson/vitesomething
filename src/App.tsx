import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Scheduler from './pages/Scheduler';
import ContentLibrary from './pages/ContentLibrary';
import Analytics from './pages/Analytics';
import './App.css';

// Authentication pages are still placeholders

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/content-library" element={<ContentLibrary />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
