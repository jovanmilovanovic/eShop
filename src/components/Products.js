import React, { Component } from 'react'
import util from '../util'

export default class Products extends Component {
  render() {
    const productItems = this.props.products.map(product => (
      <div key={product.id} className='col-md-3 my-1 mx-4 border border-3 rounded'>
        <div className='thumbnail text-center'>
          <a href={`#${product.id}`}>
            <img src={`/products/${product.sku}_2.jpg`} alt={product.title} />
            <div>
              <p className='naslov'>{product.title}</p>
            </div>
          </a>
          <div>
            <button className='btn' onClick={(e) => this.props.handleAddToCart(e, product)}>Add to cart</button>
          </div>
          <b>{util.formatCurrency(product.price)}</b>
        </div>
      </div>
    ))
    return (
      <div className='row'>
        {productItems}
      </div>
    )
  }
}
