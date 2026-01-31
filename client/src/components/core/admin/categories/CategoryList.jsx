'use client'

import styles from './CategoryList.module.css'

export default function CategoryList() {
    const categories = [
        {
            id: 1,
            name: 'Electronics',
            products: 120,
            status: 'Active',
        },
        {
            id: 2,
            name: 'Furniture',
            products: 58,
            status: 'Active',
        },
        {
            id: 3,
            name: 'Uncategorized',
            products: 17,
            status: 'System',
        },
    ]

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3>Categories</h3>
                <p>List of all created categories</p>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Products</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((cat, index) => (
                            <tr key={cat.id}>
                                <td>{index + 1}</td>
                                <td>{cat.name}</td>
                                <td>{cat.products}</td>
                                <td>
                                    <span
                                        className={`${styles.status} ${cat.status === 'System'
                                                ? styles.system
                                                : styles.active
                                            }`}
                                    >
                                        {cat.status}
                                    </span>
                                </td>
                                <td className={styles.actions}>
                                    <button className={styles.edit}>Edit</button>
                                    <button className={styles.delete}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
