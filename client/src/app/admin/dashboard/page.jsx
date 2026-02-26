'use client';

import { useState, useEffect } from 'react';
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
    RiAddLine,
    RiFileTextLine,
    RiDownloadLine,
    RiTimeLine,
} from 'react-icons/ri';
import styles from './page.module.css';

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

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        // Temp data for demonstration
        const tempStats = {
            products: { current: 45, previous: 38 },
            categories: { current: 12, previous: 10 },
            projects: { current: 28, previous: 24 },
            leads: { current: 156, previous: 142 },
            users: { current: 8, previous: 7 },
        };

        const tempLeadsData = [
            { month: 'Jan', leads: 45, converted: 12 },
            { month: 'Feb', leads: 52, converted: 15 },
            { month: 'Mar', leads: 48, converted: 14 },
            { month: 'Apr', leads: 61, converted: 18 },
            { month: 'May', leads: 55, converted: 16 },
            { month: 'Jun', leads: 67, converted: 22 },
        ];

        const tempLeadStatusData = [
            { name: 'New', value: 45, color: LEAD_STATUS_COLORS.new },
            { name: 'Contacted', value: 38, color: LEAD_STATUS_COLORS.contacted },
            { name: 'Qualified', value: 28, color: LEAD_STATUS_COLORS.qualified },
            { name: 'Converted', value: 32, color: LEAD_STATUS_COLORS.converted },
            { name: 'Lost', value: 13, color: LEAD_STATUS_COLORS.lost },
        ];

        const tempTopProducts = [
            { name: 'Residential Elevator', sales: 145, revenue: '₹45L' },
            { name: 'Commercial Escalator', sales: 98, revenue: '₹38L' },
            { name: 'Hospital Lift', sales: 76, revenue: '₹29L' },
            { name: 'Villa Elevator', sales: 54, revenue: '₹22L' },
            { name: 'Home Lift Compact', sales: 42, revenue: '₹18L' },
        ];

        const tempActivity = [
            {
                id: 1,
                type: 'lead',
                title: 'New lead from Rajesh Kumar',
                description: 'Interested in residential elevator',
                time: '5 minutes ago',
                icon: RiMailLine,
                color: '#3b82f6',
            },
            {
                id: 2,
                type: 'product',
                title: 'Product "Villa Elevator Pro" added',
                description: 'Added by John Doe',
                time: '1 hour ago',
                icon: RiProductHuntLine,
                color: '#10b981',
            },
            {
                id: 3,
                type: 'project',
                title: 'Project "Sky Tower" updated',
                description: 'Status changed to Completed',
                time: '2 hours ago',
                icon: RiProjectorLine,
                color: '#f59e0b',
            },
            {
                id: 4,
                type: 'lead',
                title: 'Lead converted to customer',
                description: 'Priya Sharma - Metro Shopping Complex',
                time: '3 hours ago',
                icon: RiMailLine,
                color: '#10b981',
            },
            {
                id: 5,
                type: 'user',
                title: 'New user registered',
                description: 'Mike Johnson joined as Editor',
                time: '5 hours ago',
                icon: RiUserLine,
                color: '#8b5cf6',
            },
            {
                id: 6,
                type: 'category',
                title: 'Category "Industrial" updated',
                description: 'Description and SEO fields modified',
                time: '6 hours ago',
                icon: RiFolderLine,
                color: '#f59e0b',
            },
        ];

        setStats(tempStats);
        setLeadsData(tempLeadsData);
        setLeadStatusData(tempLeadStatusData);
        setTopProducts(tempTopProducts);
        setRecentActivity(tempActivity);

        // Real API calls (commented out)
        // try {
        //   const response = await fetch('http://localhost:5000/api/dashboard');
        //   const data = await response.json();
        //   setStats(data.stats);
        //   setLeadsData(data.leadsData);
        //   setLeadStatusData(data.leadStatusData);
        //   setTopProducts(data.topProducts);
        //   setRecentActivity(data.recentActivity);
        // } catch (error) {
        //   console.error('Error fetching dashboard data:', error);
        // }
    };

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
                alert('Reports feature coming soon!');
                break;
            case 'export-data':
                alert('Exporting data...');
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
                        <p className={styles.pageSubtitle}>Welcome back! Here's your overview</p>
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
