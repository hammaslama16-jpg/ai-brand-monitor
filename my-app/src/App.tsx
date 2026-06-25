import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Pricing from './app/pages/Pricing';
import './App.css';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">AI Brand Monitor</h1>
        <p className="text-xl text-slate-400 mb-8">
          Real-time brand monitoring with advanced sentiment analysis
        </p>
        <a
          href="/pricing"
          className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          View Pricing
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
