import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Product from "./components/Product";
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
    return data[0].sort((a, b) => { return a.price - b.price});
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col col-md-6">
            {products.map((product, index) => (
                <Product product={product} key={index}></Product>
            ))}
          </div>
          <div className="col col-md-6">

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
