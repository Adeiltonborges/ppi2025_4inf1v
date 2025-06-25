import {LuckyNumber} from './components/LuckyNumber';
import {Header} from './components/Header';
import "styles/global.css";
import "theme/global.css";

export default function App() {
  return (
    // react fragment
    <>
      <Header/>
      <LuckyNumber />
      </>
  );
}
