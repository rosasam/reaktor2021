import React, { Fragment } from 'react'
import './Category.css'

const Category = ({ name, products }) => (
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
            {products.map((product) => (
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
        </div>
      )
      : <div>Loading data</div>}
  </div>
)

export default Category
