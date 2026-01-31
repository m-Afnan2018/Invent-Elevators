'use client'
import styles from './SubCategoryFilters.module.css'

export default function SubCategoryFilters() {
    return (
        <div className={styles.filters}>
            <select>
                <option value="">All Categories</option>
                <option>Electronics</option>
                <option>Furniture</option>
            </select>

            <select>
                <option value="">All Status</option>
                <option>Active</option>
                <option>Inactive</option>
            </select>

            <input placeholder="Search sub category..." />
        </div>
    )
}
