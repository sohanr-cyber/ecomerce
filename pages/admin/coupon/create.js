import React, { useState } from 'react'
import styles from '../../../styles/Admin/ProductCreate.module.css'
import Upload from '@/components/Utility/Upload'
import axios from 'axios'
import BASE_URL from '@/config'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { showSnackBar } from '@/redux/notistackSlice'
import { parse } from 'cookie'

// Order Craetion Form
const Create = ({ coupon: data }) => {
  const [coupon, setCoupon] = useState(data)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const headers = { Authorization: 'Bearer ' + userInfo?.token }

  const savecoupon = async () => {
    setError('')
    if (
      !coupon.code ||
      !coupon.expiryDate ||
      !coupon.startDate ||
      !coupon.discountType
    ) {
      dispatch(
        showSnackBar({
          message: 'Please Enter All The Field!',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.post('/api/coupon', coupon, { headers })
      if (data.error) {
        dispatch(
          showSnackBar({
            message: data.error,
            option: {
              variant: 'error'
            }
          })
        )
        dispatch(finishLoading())
        return
      }
      setCoupon({
        code: '',
        expiryDate: '',
        startDate: '',
        discountType: '',
        discountValue: 0
      })

      dispatch(
        showSnackBar({
          message: 'Coupon Created ',
          option: {
            variant: 'success'
          }
        })
      )

      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      setError(error.response.data.message)
      dispatch(
        showSnackBar({
          message: error.response.data.message || 'Something went Wrong !',
          option: {
            variant: 'error'
          }
        })
      )
    }
  }

  const updatecoupon = async () => {
    setError('')
    if (
      !coupon.code ||
      !coupon.expiryDate ||
      !coupon.startDate ||
      !coupon.discountType
    ) {
      dispatch(
        showSnackBar({
          message: 'Please Enter All The Field!',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        `/api/coupon/${router.query.id}`,
        {
          ...coupon
        },
        { headers }
      )
      setCoupon(data)
      dispatch(
        showSnackBar({
          message: 'Coupon Updated ',
          option: {
            variant: 'success'
          }
        })
      )
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      setError(error.response.data.message)
    }
  }
  return (
    <div className={styles.wrapper}>
      <h2>Add coupon</h2>
      <form className={styles.forms}>
        <div className={styles.left}>
          <div className={styles.field}>
            <label>Coupon Code</label>
            <input
              type='text'
              placeholder='Enter coupon Code'
              value={coupon.code}
              onChange={e => setCoupon({ ...coupon, code: e.target.value })}
            />
          </div>
          <div className={styles.flex}>
            <div className={styles.field}>
              <label>Start Date</label>
              <input
                type='date'
                placeholder='Enter coupon Name'
                value={
                  coupon.startDate
                    ? new Date(coupon.startDate).toISOString().split('T')[0]
                    : ''
                }
                onChange={e =>
                  setCoupon({ ...coupon, startDate: new Date(e.target.value) })
                }
              />
            </div>
            <div className={styles.field}>
              <label>Expiry Date</label>
              <input
                type='date'
                placeholder='Enter coupon Name'
                value={
                  coupon.expiryDate
                    ? new Date(coupon.expiryDate).toISOString().split('T')[0]
                    : ''
                }
                onChange={e =>
                  setCoupon({ ...coupon, expiryDate: new Date(e.target.value) })
                }
              />
            </div>
          </div>

          <div className={styles.flex}>
            <div className={styles.field}>
              <label>Discount Type</label>
              <div className={styles.options}>
                {['percentage', 'free_shipping'].map((item, index) => (
                  <span
                    key={index}
                    onClick={() => setCoupon({ ...coupon, discountType: item })}
                    style={
                      item == coupon.discountType
                        ? { background: 'black', color: 'white' }
                        : {}
                    }
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            {coupon.discountType == 'percentage' && (
              <div className={styles.field}>
                <label>Discount</label>
                <input
                  type='number'
                  placeholder='Enter Discount'
                  value={coupon.discountValue || 0}
                  onChange={e =>
                    setCoupon({ ...coupon, discountValue: e.target.value })
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* <div className={styles.right}></div> */}
      </form>
      {error && <p style={{ color: 'red', margin: '10px' }}>{error}</p>}
      <button onClick={() => (router.query.id ? updatecoupon() : savecoupon())}>
        Save coupon
      </button>
    </div>
  )
}

export default Create

export async function getServerSideProps (context) {
  const { id } = context.query
  const { locale, req } = context
  const cookies = parse(req.headers.cookie || '')

  const userInfo = cookies['userInfo'] ? JSON.parse(cookies['userInfo']) : null

  if (!userInfo || !userInfo.token) {
    throw new Error('User is not authenticated')
  }

  const headers = { Authorization: `Bearer ${userInfo.token}` }

  const fetchcoupon = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/coupon/view?id=${id}`, {
      headers
    })
    return data
  }

  if (id) {
    const coupon = await fetchcoupon()
    console.log({ coupon })
    return {
      props: {
        coupon
      }
    }
  }

  return {
    props: {
      coupon: {
        name: '',
        image: ''
      }
    }
  }
}
