'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {
    RiUserLine,
    RiProductHuntLine,
    RiProjectorLine,
    RiMailLine,
    RiFolderLine,
    RiArrowUpLine,
    RiArrowDownLine,
    RiFileTextLine,
    RiDownloadLine,
    RiTimeLine,
} from 'react-icons/ri';
import styles from './page.module.css';
import { apiGet } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';
import { getDashboardAccess } from '@/services/auth.service';

const LEAD_STATUS_COLORS = {
    new: '#3b82f6',
    contacted: '#f59e0b',
    qualified: '#8b5cf6',
    converted: '#10b981',
    lost: '#ef4444',
};

const DashboardPage = () => {
    const router = useRouter();
    const [stats, setStats] = useState({
        products: { current: 0, previous: 0 },
        categories: { current: 0, previous: 0 },
        projects: { current: 0, previous: 0 },
        leads: { current: 0, previous: 0 },
        users: { current: 0, previous: 0 },
    });
    const [leadsData, setLeadsData] = useState([]);
    const [leadStatusData, setLeadStatusData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [productsRes, categoriesRes, projectsRes, leadsRes, usersRes] = await Promise.all([
                apiGet(ENDPOINTS.PRODUCTS),
                apiGet(ENDPOINTS.CATEGORIES),
                apiGet(ENDPOINTS.PROJECTS),
                apiGet(ENDPOINTS.LEADS),
                apiGet(ENDPOINTS.USERS),
            ]);

            const products = productsRes?.data || [];
            const categories = categoriesRes?.data || [];
            const projects = projectsRes?.data || [];
            const leads = leadsRes?.data || [];
            const users = usersRes?.data || [];

            const getCountByMonth = (list) => {
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();
                const prevDate = new Date(currentYear, currentMonth - 1, 1);
                const previousMonth = prevDate.getMonth();
                const previousYear = prevDate.getFullYear();

                const previous = list.filter((item) => {
                    const itemDate = new Date(item.createdAt);
                    return itemDate.getMonth() === previousMonth && itemDate.getFullYear() === previousYear;
                }).length;

                return { current: list.length, previous };
            };

            setStats({
                products: getCountByMonth(products),
                categories: getCountByMonth(categories),
                projects: getCountByMonth(projects),
                leads: getCountByMonth(leads),
                users: getCountByMonth(users),
            });

            const monthLabels = Array.from({ length: 6 }, (_, index) => {
                const date = new Date();
                date.setMonth(date.getMonth() - (5 - index));
                return {
                    key: `${date.getFullYear()}-${date.getMonth()}`,
                    month: date.toLocaleDateString('en-US', { month: 'short' }),
                };
            });

            const monthlyLeadMap = monthLabels.reduce((acc, item) => {
                acc[item.key] = { month: item.month, leads: 0, converted: 0 };
                return acc;
            }, {});

            leads.forEach((lead) => {
                const date = new Date(lead.createdAt);
                const key = `${date.getFullYear()}-${date.getMonth()}`;
                if (monthlyLeadMap[key]) {
                    monthlyLeadMap[key].leads += 1;
                    if (lead.status === 'converted' || lead.status === 'won') {
                        monthlyLeadMap[key].converted += 1;
                    }
                }
            });
            setLeadsData(monthLabels.map((item) => monthlyLeadMap[item.key]));

            const statusMap = leads.reduce((acc, lead) => {
                const key = lead.status || 'new';
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {});

            setLeadStatusData([
                { name: 'New', value: statusMap.new || 0, color: LEAD_STATUS_COLORS.new },
                { name: 'Contacted', value: statusMap.contacted || 0, color: LEAD_STATUS_COLORS.contacted },
                { name: 'Qualified', value: statusMap.qualified || 0, color: LEAD_STATUS_COLORS.qualified },
                { name: 'Converted', value: (statusMap.converted || 0) + (statusMap.won || 0), color: LEAD_STATUS_COLORS.converted },
                { name: 'Lost', value: statusMap.lost || 0, color: LEAD_STATUS_COLORS.lost },
            ]);

            const productLeadCount = leads.reduce((acc, lead) => {
                (lead.productInterest || []).forEach((productId) => {
                    const key = String(productId);
                    acc[key] = (acc[key] || 0) + 1;
                });
                return acc;
            }, {});

            const topProductRows = products
                .map((product) => ({
                    name: product.name,
                    sales: productLeadCount[String(product._id)] || 0,
                    revenue: '—',
                }))
                .sort((a, b) => b.sales - a.sales)
                .slice(0, 5);

            setTopProducts(topProductRows);

            const buildActivity = (items, type, icon, color, titleBuilder, descriptionBuilder) =>
                items.slice(0, 3).map((item) => ({
                    id: `${type}-${item._id}`,
                    type,
                    title: titleBuilder(item),
                    description: descriptionBuilder(item),
                    time: new Date(item.createdAt).toLocaleString(),
                    icon,
                    color,
                    createdAt: item.createdAt,
                }));

            const mergedActivity = [
                ...buildActivity(leads, 'lead', RiMailLine, '#3b82f6', (item) => `New lead from ${item.name}`, (item) => item.message || item.source || 'Lead received'),
                ...buildActivity(products, 'product', RiProductHuntLine, '#10b981', (item) => `Product "${item.name}" added`, () => 'Product created in admin panel'),
                ...buildActivity(projects, 'project', RiProjectorLine, '#f59e0b', (item) => `Project "${item.title}" updated`, (item) => item.status || 'Project status updated'),
                ...buildActivity(users, 'user', RiUserLine, '#8b5cf6', (item) => `New user ${item.name || item.email}`, (item) => item.email || 'User added'),
                ...buildActivity(categories, 'category', RiFolderLine, '#f59e0b', (item) => `Category "${item.name}" updated`, () => 'Category saved'),
            ]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 6);

            setRecentActivity(mergedActivity);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const checkDashboardAccessAndLoad = useCallback(async () => {
        try {
            const response = await getDashboardAccess();
            if (!response?.data?.allowed) {
                router.replace('/admin/products');
                return;
            }
            await fetchDashboardData();
        } catch (_error) {
            router.replace('/admin/products');
        }
    }, [fetchDashboardData, router]);

    useEffect(() => {
        checkDashboardAccessAndLoad();
    }, [checkDashboardAccessAndLoad]);

    const calculatePercentageChange = (current, previous) => {
        if (previous === 0) return 0;
        return (((current - previous) / previous) * 100).toFixed(1);
    };

    const handleQuickAction = (action) => {
        switch (action) {
            case 'add-product':
                router.push('/admin/products');
                break;
            case 'add-lead':
                router.push('/admin/leadforms');
                break;
            case 'add-project':
                router.push('/admin/projects');
                break;
            case 'add-user':
                router.push('/admin/users');
                break;
            case 'view-reports':
                router.push('/admin/leadforms');
                break;
            case 'export-data':
                const exportPayload = {
                    exportedAt: new Date().toISOString(),
                    stats,
                    leadsData,
                    leadStatusData,
                    topProducts,
                };
                const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
                link.click();
                URL.revokeObjectURL(link.href);
                break;
            default:
                break;
        }
    };

    const StatCard = ({ title, value, icon: Icon, change, color }) => {
        const isPositive = parseFloat(change) >= 0;
        return (
            <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: `${color}15` }}>
                    <Icon style={{ color: color }} />
                </div>
                <div className={styles.statContent}>
                    <div className={styles.statLabel}>{title}</div>
                    <div className={styles.statValue}>{value}</div>
                    <div className={`${styles.statChange} ${isPositive ? styles.positive : styles.negative}`}>
                        {isPositive ? <RiArrowUpLine /> : <RiArrowDownLine />}
                        {Math.abs(change)}% vs last month
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section>
            <div className={styles.dashboardPage}>
                {/* Header */}
                <div className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.pageTitle}>Dashboard</h1>
                        <p className={styles.pageSubtitle}>Welcome back! Here&apos;s your overview</p>
                    </div>
                    <div className={styles.headerDate}>
                        <RiTimeLine />
                        <span>{new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                </div>
                {isLoading && <p className={styles.pageSubtitle}>Loading latest dashboard data...</p>}

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <StatCard
                        title="Total Products"
                        value={stats.products.current}
                        icon={RiProductHuntLine}
                        change={calculatePercentageChange(stats.products.current, stats.products.previous)}
                        color="#3b82f6"
                    />
                    <StatCard
                        title="Total Projects"
                        value={stats.projects.current}
                        icon={RiProjectorLine}
                        change={calculatePercentageChange(stats.projects.current, stats.projects.previous)}
                        color="#10b981"
                    />
                    <StatCard
                        title="Total Leads"
                        value={stats.leads.current}
                        icon={RiMailLine}
                        change={calculatePercentageChange(stats.leads.current, stats.leads.previous)}
                        color="#f59e0b"
                    />
                    <StatCard
                        title="Categories"
                        value={stats.categories.current}
                        icon={RiFolderLine}
                        change={calculatePercentageChange(stats.categories.current, stats.categories.previous)}
                        color="#8b5cf6"
                    />
                    <StatCard
                        title="Active Users"
                        value={stats.users.current}
                        icon={RiUserLine}
                        change={calculatePercentageChange(stats.users.current, stats.users.previous)}
                        color="#ef4444"
                    />
                </div>

                {/* Quick Actions */}
                <div className={styles.quickActions}>
                    <h2 className={styles.sectionTitle}>Quick Actions</h2>
                    <div className={styles.actionsGrid}>
                        <button
                            className={styles.actionButton}
                            onClick={() => handleQuickAction('add-product')}
                        >
                            <RiProductHuntLine />
                            <span>Add Product</span>
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={() => handleQuickAction('add-lead')}
                        >
                            <RiMailLine />
                            <span>Add Lead</span>
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={() => handleQuickAction('add-project')}
                        >
                            <RiProjectorLine />
                            <span>Add Project</span>
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={() => handleQuickAction('add-user')}
                        >
                            <RiUserLine />
                            <span>Add User</span>
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={() => handleQuickAction('view-reports')}
                        >
                            <RiFileTextLine />
                            <span>View Reports</span>
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={() => handleQuickAction('export-data')}
                        >
                            <RiDownloadLine />
                            <span>Export Data</span>
                        </button>
                    </div>
                </div>

                {/* Charts Row 1 */}
                <div className={styles.chartsRow}>
                    {/* Leads Chart */}
                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <h3>Leads Overview</h3>
                            <span className={styles.chartSubtitle}>Last 6 months</span>
                        </div>
                        <div className={styles.chartContainer}>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={leadsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                    <XAxis dataKey="month" stroke="var(--text-muted)" />
                                    <YAxis stroke="var(--text-muted)" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="leads"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        name="Total Leads"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="converted"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        name="Converted"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Lead Status Pie Chart */}
                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <h3>Lead Status Breakdown</h3>
                            <span className={styles.chartSubtitle}>Current distribution</span>
                        </div>
                        <div className={styles.chartContainer}>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={leadStatusData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {leadStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className={styles.chartsRow}>
                    {/* Top Products */}
                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <h3>Top Performing Products</h3>
                            <span className={styles.chartSubtitle}>By sales volume</span>
                        </div>
                        <div className={styles.chartContainer}>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={topProducts} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                    <XAxis type="number" stroke="var(--text-muted)" />
                                    <YAxis dataKey="name" type="category" stroke="var(--text-muted)" width={150} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                    <Bar dataKey="sales" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className={styles.activityCard}>
                        <div className={styles.chartHeader}>
                            <h3>Recent Activity</h3>
                            <span className={styles.chartSubtitle}>Latest updates</span>
                        </div>
                        <div className={styles.activityList}>
                            {recentActivity.map((activity) => {
                                const Icon = activity.icon;
                                return (
                                    <div key={activity.id} className={styles.activityItem}>
                                        <div
                                            className={styles.activityIcon}
                                            style={{ background: `${activity.color}15` }}
                                        >
                                            <Icon style={{ color: activity.color }} />
                                        </div>
                                        <div className={styles.activityContent}>
                                            <div className={styles.activityTitle}>{activity.title}</div>
                                            <div className={styles.activityDescription}>{activity.description}</div>
                                        </div>
                                        <div className={styles.activityTime}>{activity.time}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Top Products Table */}
                <div className={styles.tableCard}>
                    <div className={styles.chartHeader}>
                        <h3>Product Performance Details</h3>
                        <span className={styles.chartSubtitle}>Detailed breakdown</span>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Sales</th>
                                    <th>Revenue</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.map((product, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className={styles.productCell}>
                                                <span className={styles.rank}>#{index + 1}</span>
                                                {product.name}
                                            </div>
                                        </td>
                                        <td>{product.sales}</td>
                                        <td>
                                            <span className={styles.revenue}>{product.revenue}</span>
                                        </td>
                                        <td>
                                            <span className={styles.statusBadge}>Active</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPage;
