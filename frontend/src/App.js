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
import productService from './services/products'

const App = () => {
  const Home = () => (
    <div className="category">
      <h2>Home</h2>
    </div>
  )
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
          <div style={{ position: 'fixed' }}>
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
            <Category name="Jackets" products={products.jackets} />
          </Route>
          <Route path="/shirts">
            <Category name="Shirts" products={products.shirts} />
          </Route>
          <Route path="/accessories">
            <Category name="Accessories" products={products.accessories} />
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
