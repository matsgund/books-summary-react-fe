import './App.css';
import HomePage from '@/pages/homepage/HomePage';
import BooksPage from '@/pages/bookspage/BooksPage';
import BookPage from '@/pages/bookpage/BookPage';
import AboutPage from '@/pages/aboutpage/AboutPage';
import Header from '@/shared-components/header/Header';
import Footer from '@/shared-components/footer/Footer';
import {BrowserRouter,Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>       
      <div id="page-body">
          <Header/>
          <div id="page-main-content">
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/books" element={<BooksPage/>}/>
                <Route path="/books/:slug" element={<BookPage/>}/>
            </Routes>
          </div>
          <Footer/>   
      </div>
  </BrowserRouter>
  );
}

export default App;
