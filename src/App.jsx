import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="pb-20 md:pb-0">
        <Navbar cartCount={0} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<div>Shop</div>} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path="/cart" element={<div>Cart</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;