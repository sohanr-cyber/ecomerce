import React from 'react'
import styles from '../../styles/Cart/CartItems.module.css'
import Image from 'next/image'
import { removeItem } from '@/redux/cartSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { getPrice } from '@/utilty/helper'

const calculateSubtotal = cartItems => {
  let subtotal = 0
  cartItems.forEach(item => {
    subtotal +=
      (item.product.price -
        item.product.price * (item.product.discount / 100)) *
      item.quantity
  })
  return subtotal
}

const CartItems = ({ cartItems }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  return (
    <div className={styles.wrapper}>
      <div className={styles.items}>
        {cartItems.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.left}>
              <Image
                src={item.product.thumbnail}
                width='40'
                height='40'
                alt=''
              />
            </div>
            <div className={styles.right}>
              <div>{item.product.name}</div>
              {item.size && (
                <div style={{ fontSize: '80%', marginTop: '2px' }}>
                  {item.size}
                </div>
              )}
              <div style={{ fontSize: '80%', marginTop: '2px' }}>
                ৳{' '}
                {parseInt(
                  item.product.price -
                    item.product.price * (item.product.discount / 100)
                )}{' '}
                * {item.quantity}
              </div>
            </div>
            <div
              className={styles.x}
              onClick={() => dispatch(removeItem(item))}
            >
              X
            </div>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <div className={styles.subtotal}>
          Subtotal : <b> ৳ {getPrice(calculateSubtotal(cartItems))}</b>
        </div>
        <div className={styles.flex}>
          <button onClick={() => router.push('/cart')}>Cart</button>
          <button onClick={() => router.push('/checkout/address')}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItems
