'use client'

import styles from './CategoryStats.module.css'

export default function CategoryStats() {
    const stats = [
        {
            label: 'Total Categories',
            value: 12,
        },
        {
            label: 'Total Products',
            value: 248,
        },
        {
            label: 'Uncategorized Products',
            value: 17,
        },
        {
            label: 'Sub Categories',
            value: 36,
        },
    ]

    return (
        <div className={styles.card}>
            <h3>Overview</h3>

            <div className={styles.grid}>
                {stats.map((item, index) => (
                    <div key={index} className={styles.statBox}>
                        <p className={styles.value}>{item.value}</p>
                        <p className={styles.label}>{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
