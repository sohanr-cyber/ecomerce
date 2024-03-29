import Card from '@/components/Chart/Card'
import React from 'react'
import styles from '../../../styles/Admin/Cards.module.css'

const data = [
  {
    icon: 'https://cdn-icons-png.flaticon.com/128/8564/8564090.png',
    number: '$405,30',
    title: 'Total Sales'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/128/6815/6815043.png',
    number: '530',
    title: 'Total Orders'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/128/10543/10543159.png',
    number: '490',
    title: 'Orders Completed'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/128/1090/1090965.png',
    number: '30',
    title: 'Orders Pending'
  }
]

const Cards = () => {
  return (
    <div className={styles.wrapper}>
      {[...data].map((item, index) => (
        <Card key={index} item={item} index={index} />
      ))}
    </div>
  )
}

export default Cards
