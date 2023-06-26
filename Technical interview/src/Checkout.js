import styles from './Checkout.module.css';
import { LoadingIcon } from './Icons';
import { getProducts } from './dataService';
import { useEffect, useState } from 'react';

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Demo video - You can view how the completed functionality should look at: https://drive.google.com/file/d/1o2Rz5HBOPOEp9DlvE9FWnLJoW9KUp5-C/view?usp=sharing

// Once the <Checkout /> component is mounted, load the products using the getProducts function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
//  - The total should reflect any discount that has been applied
//  - All dollar amounts should be displayed to 2 decimal places



const Product = ({ id, name, availableCount, price, orderedQuantity, total, index, onPlus, onMinus }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>${price}</td>
      <td>{orderedQuantity}</td>
      <td>${total}</td>
      <td>
        <button className={styles.actionButton} disabled={orderedQuantity === availableCount} onClick={() => onPlus(index)}>+</button>
        <button className={styles.actionButton} disabled={orderedQuantity === 0} onClick={() => onMinus(index)}>-</button>
      </td>
    </tr>
  );
}


const Checkout = () => {
  const [productData, setProductData] = useState()
  const [productDis, setProductDis] = useState()

  const [productTotal, setProductTotal] = useState()

  useEffect(() => {
    setData()
  }, [])

  const setData = async () => {
    let newproduct = await getProducts()
    let updateProduct = [...newproduct]
    updateProduct.forEach(e => {
      e.orderedQuantity = 0
      e.total = 0
    })
    setProductData(updateProduct)
  }
  const onPlus = (index) => {
    let products = [...productData]
    let targetProduct = products[index]
    targetProduct.orderedQuantity += 1
    targetProduct.total = targetProduct.orderedQuantity * targetProduct.price
    products[index] = targetProduct
    setProductData(products)
  }
  const onMinus = (index) => {
    let products = [...productData]
    let targetProduct = products[index]
    targetProduct.orderedQuantity -= 1
    targetProduct.total = targetProduct.orderedQuantity * targetProduct.price
    products[index] = targetProduct
    setProductData(products)
  }

  useEffect(() => {
    let products = [...productData || []]
    let total = 0
    products && products.forEach(ele => {
      total = total + ele.total
    })
    setProductTotal(total)
  }, [productData])

  useEffect(() => {
    let producttotal = productTotal
    let discount = producttotal > 10 ? producttotal * 0.1 : 0
    debugger
    producttotal = producttotal - discount
    setProductTotal(producttotal)
    setProductDis(discount)
  }, [productTotal])

 
  return (
    <div>
      <header className={styles.header}>
        <h1>Electro World</h1>
      </header>
      <main>
        {(productData || []).length > 0 ?
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th># Available</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productData.map((item, index) =>
                <Product
                  key={index}
                  index={index}
                  id={item.id}
                  name={item.name}
                  availableCount={item.availableCount}
                  price={item.price}
                  orderedQuantity={item.orderedQuantity}
                  total={item.total}
                  onPlus={onPlus}
                  onMinus={onMinus}
                />
              )}

            </tbody>
          </table> :
          <LoadingIcon />
        }


        <h2>Order summary</h2>
        <p>Discount:{productDis} $ </p>
        <p>Total:{productTotal} $ </p>
      </main>
    </div>
  );
};

export default Checkout;