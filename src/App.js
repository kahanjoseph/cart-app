import './App.css';
import { useState, useEffect } from 'react';
import Product from "./components/Product";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";
import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors,} from '@dnd-kit/core';
import {Draggable} from './components/dndComponnents/Draggable';
import {Droppable} from './components/dndComponnents/Droppable';

function App() {
  //Two seperate arrays for products in or out of cart.
  const [products, setProducts] = useState([]);
  const [carted, setCarted] = useState([]);

  //Current Page For Pagination
  const [currentPage, setCurrentPage] = useState(1);

  //Products Per Page
  const [pageSize] = useState(3);

  const [time, setTime] = useState(180);

  //Update anytime the cart state changes
  const [cartTotal, setCartTotal] = useState(0);

  //Only show the products from the current pagination page
  const currentProducts = products.slice(currentPage * pageSize - pageSize, currentPage * pageSize);

  //Disable drag event for small movements, allowing "Add To Cart" btn click
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(
      mouseSensor,
      touchSensor,
  );

  //Used Fpr Pagination
  function handlePageClick(page){
    setCurrentPage(page);
  }

  //log checkout details
  function checkout(){
    carted.forEach(product => {
      console.log(`NAME: ${product.name}, PRICE: ${product.price}, QTY: ${product.quantity}`);
    });
    console.log(`Checkout Total Is: ${cartTotal}`);
  }

  //Update cart total whenever cart updates
  useEffect(() => {
    let amount = 0;
    carted.forEach(product=>{
      amount += product.price * product.quantity;
    });
    setCartTotal(amount);
  }, [carted]);

  //Fetch the products after render
  useEffect(() => {
    const getProducts = async () => {
      const productsFromServer = await fetchProducts()
      setProducts(productsFromServer);
    }
    getProducts();
  }, []);

  //Update time every second
  useEffect(() => {
    const id = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  });

  // Fetch Products
  const fetchProducts = async () => {
    //Proxy is set in package.json because of CORS
    const res = await fetch('http://localhost:2410');
    const data = await res.json();
    console.log(data);
    //JSON is returning as a [][]
    return data[0].sort((a, b) => { return a.price - b.price});
  }

  //Handles quantity change in cart
  function handleChange(event, index, id){
    setCarted(carted.map(item => item.id === id ? {...item, quantity: event.target.value} : item));
  }

  /**
   * Returns Array with added object sorted by price
   * @param {array} arrayToSet - an array to set
   * @param {object} addToArray - an object to add to the array
   * @param {object} addQuantity - add quantity to carted product
   */
  function addToArray(arrayToSet, addToArray, addQuantity = false, quantity = 0){
    if(addToArray && quantity !== 0) addToArray.quantity = 1;
    return [...arrayToSet, addToArray].sort((a, b) => { return a.price - b.price})
  }

  /**
   * Returns Array with objects with given ID filtered out
   * @param {array} arrayToSet - a array to filter
   * @param {string} removeFromArray - an object ID to remove from array
   */
  function filterArray(arrayToSet, removeFromArray){
    return arrayToSet.filter(obj => obj.id !== removeFromArray);
  }

  /**
   * Move product to cart
   * @param {string} id - The Id to add to cart and remove from products
   */
  function addToCart(id){
    const found = products.find(obj =>  obj.id === id);
    setProducts(filterArray(products, id));
    setCarted(addToArray(carted, found, true, 1));
  }

  /**
   * Remove product to cart
   * @param {string} id - The ID to remove from the cart
   */
  function removeFromCart(id){
    const found = carted.find(obj => obj.id === id);
    setProducts(addToArray(products, found));
    setCarted(filterArray(carted, id));
  }

  function handleDragEnd(event) {
    console.log(event)
    if(event.over !== null && event.over.id === 'droppable'){
      addToCart(event.active.id);
    }
  }

  return (
    <div className="App">
      <Navbar></Navbar>
      {
        time > 0 ?
              <div className="alert alert-danger" role="alert">
                You have {Math.floor(time/60)}:{time%60} left to check out these items!
              </div>
        :
              <div className="alert alert-danger" role="alert">
                You have run out of time to check out! Please start over
              </div>
      }

      <DndContext  onDragEnd={handleDragEnd} sensors={sensors}>
        <div className="container">
          <div className="row">
            {/*Products Column*/}
            <div className="col-12 col-lg-6">
                {/*Select All*/}
                {currentProducts.map((product, index) => (
                    <Draggable id={product.id} key={product.id}>
                      <Product product={product} key={product.id} btnClicked={addToCart} btnText='Add To Cart'><p className={'mb-2  text-center text-lg-start'}>Total Available: {product.total}</p></Product>
                    </Draggable>
                ))}
              <Pagination totalCount={products.length} pageSize={pageSize} currentPage={currentPage} siblingCount={4} clicked={handlePageClick}></Pagination>
            </div>
            <div className="col-12 col-lg-6">
              <p className={'text-start fw-bolder'}>Checkout:</p>
              <Droppable id="droppable">
                  <div className={'border'}>
                    <div className={'p-5 border border-info'}>
                      {carted.map((product, index) => (
                          <Product product={product} key={product.id} btnClicked={removeFromCart} btnText='Remove From Cart'>
                            <div className="row g-3 align-items-center">
                              <div className="col-auto offset-2 offset-lg-0">
                                <label htmlFor={product.id + '_qty'} className="col-form-label">QTY:</label>
                              </div>
                              <div className="col-6 mb-1">
                                <input type="number" id={product.id + '_qty'} className="form-control" aria-describedby="passwordHelpInline" max={product.total} value={product.quantity}
                                       onChange={(event) => handleChange(event, index, product.id)}/>
                              </div>
                            </div>
                            <p className={'mb-2 text-center text-lg-start'}>Subtotal: ${product.price * product.quantity}</p>
                          </Product>
                      ))}
                    Drop your requests in this area to include them in your checkout list
                  </div>
                </div>
              </Droppable>
              {
                time > 0 ?
                    <div className="row mt-3 mb-3">
                      <div className="col-12 col-lg-6">Total: ${cartTotal}</div>
                      <div className="col-12 col-lg-6">
                        <button type="button" className="btn btn-success" onClick={(event) => checkout(event)}>Go To Checkout</button></div>
                    </div>
                    :
                    <div className="alert alert-danger" role="alert">
                      You have run out of time to check out! Please start over
                    </div>
              }
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
}

export default App;
