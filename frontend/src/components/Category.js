import React, { Fragment, useState } from 'react'
import './Category.css'

const Category = ({ name, products, initialVisibleItems }) => {
  const [visibleItems, setVisibleItems] = useState(initialVisibleItems)
  const showAll = () => setVisibleItems(products.length)

  return (
    <div className="category">
      <h2>{name}</h2>
      {products
        ? (
          <div>
            <div className="grid">
              <span className="category-header">Product</span>
              <span className="category-header">Price</span>
              <span className="category-header">Colors</span>
              <span className="category-header">Manufacturer</span>
              <span className="category-header">Availability</span>
              {products.slice(0, visibleItems).map((product) => (
                <Fragment key={product.id}>
                  <span>{product.name}</span>
                  <span>
                    {product.price}
                    €
                  </span>
                  <span>{product.color.join(', ')}</span>
                  <span>{product.manufacturer}</span>
                  <span>{product.availability}</span>
                </Fragment>
              ))}
            </div>
            { visibleItems < products.length
              && (
              <button type="submit" onClick={showAll}>
                {`Show all items (${products.length - visibleItems} hidden)`}
              </button>
              )}
          </div>
        )
        : <div>Loading data</div>}
    </div>
  )
}

export default Category
