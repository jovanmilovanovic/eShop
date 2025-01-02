import React, { Component } from 'react'
import util from '../util'


export default class Basket extends Component {
    render() {
        const { cartItems } = this.props
        return (
            <div className='alert'>
                {cartItems.length === 0 ? "Basket is empty" :
                    <div> You have {cartItems.length} items in the basket. <hr /></div>
                }
                {cartItems.length > 0 &&
                    <div>
                        <ul style={{ marginLeft: -25 }}>
                            {
                                cartItems.map(item => (
                                    <li key={item.id}>
                                        <strong>{item.title}</strong>
                                        <button
                                            style={{ float: 'right' }}
                                            className='btnn'
                                            onClick={e => this.props.handleRemoveFromCart(e, item)}
                                        >
                                            x
                                        </button>
                                        <br />
                                        {item.count} x {util.formatCurrency(item.price)}
                                    </li>
                                ))
                            }
                        </ul>

                        <strong>Sum: {util.formatCurrency(cartItems.reduce((a, c) => (a + c.price * c.count), 0))}</strong>
                        <br />
                        <button
                            onClick={() => alert('I must implement checkout page.')}
                            className='btnn-n'
                        >
                            Checkout
                        </button>
                    </div>
                }
            </div>
        )
    }
}
