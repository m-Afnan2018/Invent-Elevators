'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    RiDashboardLine,
    RiProductHuntLine,
    RiStackLine,
    RiListCheck2,
    RiPuzzleLine,
    RiPagesLine,
    RiFileListLine,
    RiProjectorLine,
    RiUserLine,
    RiSettings3Line,
    RiMenuFoldLine,
    RiMenuUnfoldLine,
    RiMoonLine,
    RiSunLine,
} from 'react-icons/ri';
import styles from './AdminLayout.module.css';
import useAuthStore from '@/store/authStore';

const AdminLayout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const pathname = usePathname();
    const user = useAuthStore((state) => state.user);

    const canAccessDashboard =
        user?.role === 'admin' ||
        (Array.isArray(user?.permissions) && user.permissions.includes('dashboard_view'));

    const menuItems = [
        ...(canAccessDashboard ? [{ name: 'Dashboard', icon: RiDashboardLine, path: '/admin/dashboard' }] : []),
        { name: 'Products', icon: RiProductHuntLine, path: '/admin/products' },
        { name: 'Categories', icon: RiStackLine, path: '/admin/categories' },
        { name: 'Sub Categories', icon: RiListCheck2, path: '/admin/sub-categories' },
        { name: 'Attributes', icon: RiPuzzleLine, path: '/admin/attributes' },
        { name: 'Components', icon: RiPagesLine, path: '/admin/components' },
        { name: 'Lead Forms', icon: RiFileListLine, path: '/admin/lead-forms' },
        { name: 'Projects', icon: RiProjectorLine, path: '/admin/projects' },
        { name: 'Users', icon: RiUserLine, path: '/admin/users' },
        { name: 'Settings', icon: RiSettings3Line, path: '/admin/settings' },
    ];

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`${styles.adminContainer} ${isDarkMode ? styles.dark : styles.light}`}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
                <div className={styles.sidebarHeader}>
                    {!isCollapsed && <h2 className={styles.logo}>Lift Admin</h2>}
                    <button onClick={toggleSidebar} className={styles.toggleBtn}>
                        {isCollapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
                    </button>
                </div>

                <nav className={styles.navigation}>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                            >
                                <Icon className={styles.navIcon} />
                                {!isCollapsed && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.userProfile}>
                        <div className={styles.avatar}>N</div>
                        {!isCollapsed && (
                            <div className={styles.userInfo}>
                                <p className={styles.userName}>Admin</p>
                                <p className={styles.userRole}>Administrator</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <header className={styles.topBar}>
                    <div className={styles.breadcrumb}>
                        <span>Admin Panel</span>
                    </div>
                    <button onClick={toggleTheme} className={styles.themeToggle}>
                        {isDarkMode ? <RiSunLine /> : <RiMoonLine />}
                    </button>
                </header>
                <div className={styles.contentWrapper}>{children}</div>
            </main>
        </div>
    );
};

export default AdminLayout;
