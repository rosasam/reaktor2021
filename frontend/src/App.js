import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import './App.css'
import Category from './components/Category'
import Header from './components/Header'
import Home from './components/Home'
import productService from './services/products'

const App = () => {
  const [products, setProducts] = useState({})
  const [updateTimeStamp, setTimestamp] = useState(undefined)

  useEffect(() => {
    productService.getProducts().then((data) => {
      setProducts(data.data)
      setTimestamp(data.timestamp)
    })
  }, [])

  const handleGetData = () => {
    setProducts({})
    productService.updateProducts().then((data) => {
      setProducts(data.data)
      setTimestamp(data.timestamp)
    })
  }

  return (
    <Router>
      <div className="app">
        <Header
          timestamp={updateTimeStamp}
          buttonHandler={handleGetData}
        />
        <nav className="nav">
          <div>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/jackets">Jackets</Link>
            </div>
            <div>
              <Link to="/shirts">Shirts</Link>
            </div>
            <div>
              <Link to="/accessories">Accessories</Link>
            </div>
          </div>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/jackets">
            <Category key="jackets" name="Jackets" products={products.jackets} initialVisibleItems={50} />
          </Route>
          <Route path="/shirts">
            <Category key="shirts" name="Shirts" products={products.shirts} initialVisibleItems={50} />
          </Route>
          <Route path="/accessories">
            <Category key="accessories" name="Accessories" products={products.accessories} initialVisibleItems={50} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
