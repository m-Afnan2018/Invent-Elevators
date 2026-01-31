'use client'

import Link from 'next/link'
import styles from './admin.module.css'

export default function AdminLayout({ children }) {
    return (
        <div className={styles.adminWrapper}>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
                {/* <h2 className={styles.logo}>Admin</h2> */}

                <nav className={styles.nav}>
                    <Link href="/admin/dashboard">Dashboard</Link>
                    <Link href="/admin/categories">Categories</Link>
                    <Link href="/admin/subcategories">Sub-Categories</Link>
                    <Link href="/admin/products">Products</Link>
                    <Link href="/admin/lead-forms">Lead Forms</Link>
                    <Link href="/admin/projects">Projects</Link>
                    <Link href="/admin/users">Users</Link>
                    <Link href="/admin/settings">Settings</Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {children}
            </main>

        </div>
    )
}
