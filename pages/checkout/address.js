import React, { useEffect, useState } from 'react'
import styles from '../../styles/Checkout/Address.module.css'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useDispatch, useSelector } from 'react-redux'
import OrderSummary from '@/components/Order/OrderSummary'
import { useRouter } from 'next/router'
import { setAddress as setNewAddress } from '@/redux/addressSlice'
const Address = () => {
  const cartItems = useSelector(state => state.cart.items)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const addressInfo = useSelector(state => state.address.addressInfo)
  useEffect(() => {
    setIsClient(true)
    setAddress(addressInfo)
  }, [])
  const [address, setAddress] = useState({})
  const dispatch = useDispatch()
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h2>Shipping Address</h2>
        <div className={styles.field}>
          <label>Full Name</label>
          <input
            type='text'
            placeholder='Enter Your Name'
            value={address?.fullName}
            onChange={e => setAddress({ ...address, fullName: e.target.value })}
          />
        </div>
        <div className={styles.flex}>
          <div className={styles.field}>
            <label>Email Address</label>
            <input
              type='email'
              placeholder='Enter Your Mail'
              value={address?.email}
              onChange={e => setAddress({ ...address, email: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label>Phone Number</label>
            <input
              type='text'
              placeholder='Enter Your Phone Number'
              value={address?.phone}
              onChange={e => setAddress({ ...address, phone: e.target.value })}
            />
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.field}>
            <label>Delivery Area</label>
            <select
              onChange={e =>
                setAddress({ ...address, position: e.target.value })
              }
            >
              {[
                'Chose Delivery Area',
                'Inside Dhaka',
                'Outside Dhaka',
                'Dhaka Sub Area'
              ].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>{' '}
          </div>
          <div className={styles.field}>
            <label>Address</label>
            <input
              type='text'
              placeholder='Enter Your Address'
              value={address?.address}
              onChange={e =>
                setAddress({ ...address, address: e.target.value })
              }
            />
          </div>
        </div>
        {/* <div className={styles.checkbox}>
          <CheckBoxOutlineBlankIcon /> Same As billing Address
        </div> */}
        <div className={styles.buttons}>
          <button onClick={() => router.push('/cart')}>Back To Cart</button>
          <button
            onClick={() => {
              dispatch(setNewAddress(address))
              router.push('/checkout/review')
            }}
          >
            Continue
          </button>
        </div>
      </div>
      <div className={styles.right}>
        {isClient && <OrderSummary cartItems={cartItems} />}
      </div>
    </div>
  )
}

export default Address
