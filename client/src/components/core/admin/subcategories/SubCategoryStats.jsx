'use client'
import styles from './SubCategoryStats.module.css'

export default function SubCategoryStats() {
    const stats = [
        { label: 'Total Sub Categories', value: 36 },
        { label: 'Active', value: 30 },
        { label: 'Inactive', value: 6 },
        { label: 'Products Without Sub Category', value: 12 },
    ]

    return (
        <div className={styles.card}>
            <h3>Overview</h3>

            <div className={styles.grid}>
                {stats.map((s, i) => (
                    <div key={i} className={styles.box}>
                        <h2>{s.value}</h2>
                        <p>{s.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
