import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Product from "./components/Product";
import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors,} from '@dnd-kit/core';
import {Draggable} from './components/Draggable';
import {Droppable} from './components/Droppable';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {forEach} from "react-bootstrap/ElementChildren";
function App() {
  const [products, setProducts] = useState([]);
  const [carted, setCarted] = useState([]);
  const [parent, setParent] = useState(null);

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

  function addToCart(id){
    const found = products.find(obj => {
      return obj.id === id;
    });
    setCarted([...carted, found]);
  }

  function handleDragEnd(event) {
    console.log(event)
    if(event.over !== null && event.over.id === 'droppable'){
      addToCart(event.active.id);
      console.log('DROPABBLE')
    }
  }

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>



      <DndContext  onDragEnd={handleDragEnd}  sensors={sensors}>
        <div className="container">
          <div className="row">
            <div className="col col-md-6">
                Select All
                {products.map((product, index) => (
                    <Draggable id={product.id} key={product.id}>
                      <Product product={product} key={product.id} addToCart={addToCart}></Product>
                    </Draggable>
                ))}
            </div>
            <div className="col col-md-6">
              <p className={'text-start fw-bolder'}>Checkout:</p>
              {carted.map((product, index) => (
                  <Product product={product} key={product.id}></Product>
              ))}
              <Droppable id="droppable" props={{'children': ['fjhgjgy']}}>
                <div className={'border'}><div className={'p-5 border border-info'}>Drop your requests in this area to include them in your checkout list</div></div>
              </Droppable>
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
}

export default App;
