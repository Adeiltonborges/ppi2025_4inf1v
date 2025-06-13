import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import "./styles/theme.css";
import "./styles/global.css";

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
