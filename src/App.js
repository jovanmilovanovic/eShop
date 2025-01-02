import React, { Component } from 'react';
import './App.css';
import Products from './components/Products';
import Filter from './components/Filter';
import Basket from './components/Basket';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: "",
      sort: "",
      products: [],
      filterProducts: [],
      cartItems: [],
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
    }
    this.handleSortChange = this.handleSortChange.bind(this)
    this.handleSizeChange = this.handleSizeChange.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
  }
  componentDidMount() {
    fetch('http://localhost:8000/products')
      .then(response => response.json())
      .then(data => this.setState(
        {
          products: data,
          filterProducts: data
        }
      ))
  }

  handleSortChange = e => {
    this.setState({
      sort: e.target.value
    })
    this.listProducts()
  }
  handleSizeChange = e => {
    this.setState({
      size: e.target.value
    })
    this.listProducts()
  }
  handleAddToCart = (e, product) => {
    this.setState(stateObj => {
      const cartItems = stateObj.cartItems;
      let productAlreadyInTheCart = false;
      console.log(cartItems)
      cartItems.forEach(x => {
        if (x.id === product.id) {
          x.count += 1
          productAlreadyInTheCart = true;
        }
      })
      if (!productAlreadyInTheCart) {
        cartItems.push({ ...product, count: 1 })
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      console.log(cartItems);
      return { cartItems: cartItems }
    });
  }
  handleRemoveFromCart = (e, product) => {
    this.setState(stateObj => {
      const cartItems = stateObj.cartItems.filter(a => a.id != product.id)
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { cartItems: cartItems }
    })
  }

  listProducts = () => {
    this.setState(stateObj => {
      if (stateObj.sort !== '') {
        stateObj.products.sort((a, b) =>
          (stateObj.sort === 'lowestprice')
            ? ((a.price > b.price) ? 1 : -1)
            : ((a.price < b.price) ? 1 : -1)
        )
      } else {
        stateObj.products.sort((a, b) => (a.id > b.id) ? 1 : -1);
      }
      if (stateObj.size !== '') {
        return {
          filterProducts: stateObj.products.filter(a =>
            a.availableSizes.indexOf(stateObj.size.toUpperCase())
          )
        }
      }
      return { filterProducts: this.state.products };
    })
  }

  render() {
    return (
      <div className='App'>
        <div className="container">
          <h1 className='naslov'>E-commerce shopping cart application</h1>
          <hr />
          <div className='row'>
            <div className='col-md-9'>
              <Filter
                count={this.state.filterProducts.length}
                handleSortChange={this.handleSortChange}
                handleSizeChange={this.handleSizeChange} />
              <hr />
              <Products products={this.state.filterProducts} handleAddToCart={this.handleAddToCart} />
            </div>

            <div className='col-md-3'>
              <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default App;
