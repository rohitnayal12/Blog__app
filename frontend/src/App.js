import "./App.css";

import Navbar from "./Routes/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="App" >
      <Navbar />
      <AllRoutes />
      <Footer/>
      {/* <SignUp/> */}

    </div>
  );
}

export default App;
