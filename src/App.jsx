
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './Components/Home/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<div>Shop</div>} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
        <Route path="/cart" element={<div>Cart</div>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
