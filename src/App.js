import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsFromServer = await fetchProducts()
      setProducts(productsFromServer);
    }

    getProducts();
  }, []);

  // Fetch Products
  const fetchProducts = async () => {
    const res = await fetch('/api/filter_product_listings?format=json');
    //JSON is returning as a [][]
    const data = await res.json();
    console.log(data);
    return data;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {products.map((product, index) => (
          <div>{product.name}</div>
      ))}
    </div>
  );
}

export default App;
