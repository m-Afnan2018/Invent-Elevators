'use client'

import { useState } from 'react'
import styles from './categories.module.css'
import CategoryStats from '@/components/core/admin/categories/CategoryStats'
import CategoryCreate from '@/components/core/admin/categories/CategoryCreate'
import CategoryList from '@/components/core/admin/categories/CategoryList'

export default function Categories() {
    return (
        <div className={styles.categories}>
            <div className={styles.header}>
                <CategoryCreate />
                <CategoryStats />
            </div>
            <CategoryList />
        </div>
    )
}
