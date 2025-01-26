import React from 'react'

// Create the CartContext
const CartContext = React.createContext({
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

// CartProvider will be the component that manages the state and provides context to the app
class CartProvider extends React.Component {
  state = {
    cartList: [],
  }

  // Add item to cart
  addCartItem = product => {
    this.setState(prevState => {
      const existingItemIndex = prevState.cartList.findIndex(
        item => item.id === product.id,
      )

      if (existingItemIndex !== -1) {
        const updatedCartList = [...prevState.cartList]
        updatedCartList[existingItemIndex].quantity += 1
        return {cartList: updatedCartList}
      } else {
        return {cartList: [...prevState.cartList, {...product, quantity: 1}]}
      }
    })
  }

  // Remove item from cart
  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== id),
    }))
  }

  // Remove all items from the cart
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  // Increment quantity of an item in the cart
  incrementCartItemQuantity = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      })
      return {cartList: updatedCartList}
    })
  }

  // Decrement quantity of an item in the cart
  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.map(item => {
        if (item.id === id && item.quantity > 1) {
          return {...item, quantity: item.quantity - 1}
        } else if (item.id === id && item.quantity === 1) {
          // If the quantity is 1, remove the item
          this.removeCartItem(id)
        }
        return item
      })
      return {cartList: updatedCartList}
    })
  }

  render() {
    const {children} = this.props
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        {children}
      </CartContext.Provider>
    )
  }
}

export {CartProvider}
export default CartContext
