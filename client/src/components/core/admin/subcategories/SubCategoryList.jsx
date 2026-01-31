'use client'
import styles from './SubCategoryList.module.css'

export default function SubCategoryList() {
    const data = [
        {
            id: 1,
            name: 'Mobiles',
            category: 'Electronics',
            products: 45,
            status: 'Active',
        },
    ]

    return (
        <div className={styles.card}>
            <h3>Sub Categories</h3>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Products</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.products}</td>
                            <td>{item.status}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
