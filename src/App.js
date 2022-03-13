import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { BlogPage } from './containers/BlogPage/BlogPage';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { LoginPage } from './containers/LoginPage/LoginPage';

export function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <main>
          <Routes>
            //Routes вместо Switch
            <Route path="/" element={<BlogPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}

