import Header from "./components/Header";
import Convertor from "./components/Convertor";
import Footer from "./components/Footer";
import { SnackContextProvider } from "./context/snackContext";

function App() {
  return (
    <SnackContextProvider>
      <div dir="rtl">
        <Header />
        <Convertor />
        <Footer />
      </div>
    </SnackContextProvider>
  );
}

export default App;
