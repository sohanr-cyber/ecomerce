import React from 'react'
import styles from '../../../styles/Admin/Home.module.css'
import SideBar from '@/components/Admin/SideBar'
import Dashboard from '@/components/Admin/Dashboard/Dashboard'
import Product from '@/components/Product'
import Orders from '@/components/Admin/Dashboard/Orders'
import Categories from '@/components/Admin/Dashboard/NestedCategories'
import axios from 'axios'
import BASE_URL from '@/config'

const index = ({ categories, totalPages, currentPage }) => {
    return (
        <div className={styles.wrapper}>
            <Categories
                categories={categories}
                totalPages={totalPages}
                currentPage={currentPage}
                title={'Category List'}
            />
        </div>
    )
}

export default index

export async function getServerSideProps(context) {
    try {
        const { page } = context.query
        const { data } = await axios.get(`${BASE_URL}/api/category/view`)
        return {
            props: {
                categories: data,
                totalPages: 1,
                currentPage: 1
            }
        }
    } catch (error) {
        console.error('Error fetching products:', error)
        return {
            props: {
                title: 'Product List',
                categories: []
            }
        }
    }
}
