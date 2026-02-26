'use client';

import { useState, useEffect } from 'react';
// import AdminLayout from '@/components/AdminLayout';
import {
    RiAddLine,
    RiSearchLine,
    RiEditLine,
    RiDeleteBinLine,
    RiCloseLine,
    RiGridFill,
    RiListCheck,
    RiFilterLine,
    RiUploadCloudLine,
    RiLockPasswordLine,
    RiShieldCheckLine,
    RiUserLine,
    RiMailLine,
    RiPhoneLine,
    RiMapPinLine,
    RiBriefcaseLine,
} from 'react-icons/ri';
import styles from './page.module.css';
import Image from 'next/image';
import { getUsers, createUser, updateUser, deleteUser, resetUserPassword } from '@/services/users.service';

const USER_ROLES = [
    { value: 'admin', label: 'Admin', color: '#ef4444' },
    { value: 'manager', label: 'Manager', color: '#f59e0b' },
    { value: 'editor', label: 'Editor', color: '#3b82f6' },
    { value: 'viewer', label: 'Viewer', color: '#10b981' },
];

const USER_STATUS = [
    { value: 'active', label: 'Active', color: '#10b981' },
    { value: 'pending', label: 'Pending', color: '#f59e0b' },
    { value: 'suspended', label: 'Suspended', color: '#ef4444' },
    { value: 'inactive', label: 'Inactive', color: '#94a3b8' },
];

const PERMISSIONS = [
    { id: 'dashboard_view', label: 'View Dashboard', module: 'Dashboard' },
    { id: 'products_view', label: 'View Products', module: 'Products' },
    { id: 'products_create', label: 'Create Products', module: 'Products' },
    { id: 'products_edit', label: 'Edit Products', module: 'Products' },
    { id: 'products_delete', label: 'Delete Products', module: 'Products' },
    { id: 'blogs_view', label: 'View Blogs', module: 'Blogs' },
    { id: 'blogs_create', label: 'Create Blogs', module: 'Blogs' },
    { id: 'blogs_edit', label: 'Edit Blogs', module: 'Blogs' },
    { id: 'blogs_delete', label: 'Delete Blogs', module: 'Blogs' },
    { id: 'projects_view', label: 'View Projects', module: 'Projects' },
    { id: 'projects_create', label: 'Create Projects', module: 'Projects' },
    { id: 'projects_edit', label: 'Edit Projects', module: 'Projects' },
    { id: 'projects_delete', label: 'Delete Projects', module: 'Projects' },
    { id: 'users_view', label: 'View Users', module: 'Users' },
    { id: 'users_create', label: 'Create Users', module: 'Users' },
    { id: 'users_edit', label: 'Edit Users', module: 'Users' },
    { id: 'users_delete', label: 'Delete Users', module: 'Users' },
];

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('table');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [passwordResetUser, setPasswordResetUser] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        role: 'viewer',
        status: 'pending',
        department: '',
        jobTitle: '',
        profileImage: '',
        // Address
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        // Permissions
        permissions: [],
    });

    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    async function fetchUsers() {
        try {
            const data = await getUsers();
            setUsers(data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchUsers();
        }, 0);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
                setFormData({ ...formData, profileImage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePermissionToggle = (permissionId) => {
        const newPermissions = formData.permissions.includes(permissionId)
            ? formData.permissions.filter((p) => p !== permissionId)
            : [...formData.permissions, permissionId];

        setFormData({ ...formData, permissions: newPermissions });
    };

    const selectAllPermissions = () => {
        setFormData({ ...formData, permissions: PERMISSIONS.map((p) => p.id) });
    };

    const deselectAllPermissions = () => {
        setFormData({ ...formData, permissions: [] });
    };

    const openModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: '',
                phone: user.phone,
                role: user.role,
                status: user.status,
                department: user.department,
                jobTitle: user.jobTitle,
                profileImage: user.profileImage,
                street: user.street,
                city: user.city,
                state: user.state,
                zipCode: user.zipCode,
                country: user.country,
                permissions: user.permissions,
            });
            setProfileImagePreview(user.profileImage);
        } else {
            setEditingUser(null);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phone: '',
                role: 'viewer',
                status: 'pending',
                department: '',
                jobTitle: '',
                profileImage: '',
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
                permissions: [],
            });
            setProfileImagePreview('');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const openPasswordModal = (user) => {
        setPasswordResetUser(user);
        setPasswordData({
            newPassword: '',
            confirmPassword: '',
        });
        setIsPasswordModalOpen(true);
    };

    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
        setPasswordResetUser(null);
        setPasswordData({
            newPassword: '',
            confirmPassword: '',
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        try {
            await resetUserPassword(passwordResetUser._id, { password: passwordData.newPassword });
            alert(`Password reset successfully for ${passwordResetUser.email}`);
            closePasswordModal();
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generate default profile image if not uploaded
        const finalData = {
            ...formData,
            profileImage: formData.profileImage || `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&size=200`,
        };

        try {
            if (editingUser) {
                await updateUser(editingUser._id, finalData);
            } else {
                await createUser(finalData);
            }
            await fetchUsers();
            closeModal();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleDelete = async (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(userId);
                await fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const getRoleColor = (role) => {
        return USER_ROLES.find((r) => r.value === role)?.color || '#94a3b8';
    };

    const getStatusColor = (status) => {
        return USER_STATUS.find((s) => s.value === status)?.color || '#94a3b8';
    };

    const getPermissionsByModule = () => {
        const grouped = {};
        PERMISSIONS.forEach((perm) => {
            if (!grouped[perm.module]) {
                grouped[perm.module] = [];
            }
            grouped[perm.module].push(perm);
        });
        return grouped;
    };

    const filteredUsers = users.filter(
        (user) =>
            user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const permissionsByModule = getPermissionsByModule();

    return (
        <section>
            <div className={styles.usersPage}>
                {/* Header */}
                <div className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.pageTitle}>Users</h1>
                        <p className={styles.pageSubtitle}>Manage user accounts and permissions</p>
                    </div>
                    <button className={styles.addButton} onClick={() => openModal()}>
                        <RiAddLine /> Add User
                    </button>
                </div>

                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <div className={styles.searchWrapper}>
                        <RiSearchLine className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className={styles.toolbarActions}>
                        <button className={styles.filterButton}>
                            <RiFilterLine /> Filter
                        </button>
                        <div className={styles.viewToggle}>
                            <button
                                className={`${styles.viewButton} ${viewMode === 'table' ? styles.active : ''}`}
                                onClick={() => setViewMode('table')}
                            >
                                <RiListCheck />
                            </button>
                            <button
                                className={`${styles.viewButton} ${viewMode === 'card' ? styles.active : ''}`}
                                onClick={() => setViewMode('card')}
                            >
                                <RiGridFill />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {viewMode === 'table' ? (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                    <th>Last Login</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            <div className={styles.userCell}>
                                                <Image
                                                    width={1000}
                                                    height={1000}
                                                    src={user.profileImage}
                                                    alt={`${user.firstName} ${user.lastName}`}
                                                    className={styles.userAvatar}
                                                />
                                                <div>
                                                    <div className={styles.userName}>
                                                        {user.firstName} {user.lastName}
                                                    </div>
                                                    <div className={styles.userTitle}>{user.jobTitle}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span
                                                className={styles.roleBadge}
                                                style={{
                                                    background: `${getRoleColor(user.role)}15`,
                                                    color: getRoleColor(user.role),
                                                }}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>{user.department}</td>
                                        <td>
                                            <span
                                                className={styles.statusBadge}
                                                style={{
                                                    background: `${getStatusColor(user.status)}15`,
                                                    color: getStatusColor(user.status),
                                                }}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td>
                                            {user.lastLogin
                                                ? new Date(user.lastLogin).toLocaleDateString()
                                                : 'Never'}
                                        </td>
                                        <td>
                                            <div className={styles.actionButtons}>
                                                <button
                                                    className={styles.passwordButton}
                                                    onClick={() => openPasswordModal(user)}
                                                    title="Reset Password"
                                                >
                                                    <RiLockPasswordLine />
                                                </button>
                                                <button
                                                    className={styles.editButton}
                                                    onClick={() => openModal(user)}
                                                >
                                                    <RiEditLine />
                                                </button>
                                                <button
                                                    className={styles.deleteButton}
                                                    onClick={() => handleDelete(user._id)}
                                                >
                                                    <RiDeleteBinLine />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={styles.cardGrid}>
                        {filteredUsers.map((user) => (
                            <div key={user._id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <Image
                                        width={1000}
                                        height={1000}
                                        src={user.profileImage}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className={styles.cardAvatar}
                                    />
                                    <div className={styles.cardBadges}>
                                        <span
                                            className={styles.roleBadge}
                                            style={{
                                                background: getRoleColor(user.role),
                                                color: 'white',
                                            }}
                                        >
                                            {user.role}
                                        </span>
                                        <span
                                            className={styles.statusBadge}
                                            style={{
                                                background: getStatusColor(user.status),
                                                color: 'white',
                                            }}
                                        >
                                            {user.status}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardName}>
                                        {user.firstName} {user.lastName}
                                    </h3>
                                    <p className={styles.cardJobTitle}>{user.jobTitle}</p>
                                    <div className={styles.cardDetails}>
                                        <div className={styles.detailItem}>
                                            <RiMailLine />
                                            <span>{user.email}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <RiPhoneLine />
                                            <span>{user.phone}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <RiBriefcaseLine />
                                            <span>{user.department}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <RiMapPinLine />
                                            <span>
                                                {user.city}, {user.state}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.cardFooter}>
                                        <span className={styles.permissionCount}>
                                            <RiShieldCheckLine /> {user.permissions.length} permissions
                                        </span>
                                        <span className={styles.lastLogin}>
                                            Last: {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.cardActions}>
                                    <button
                                        className={styles.passwordButton}
                                        onClick={() => openPasswordModal(user)}
                                    >
                                        <RiLockPasswordLine /> Password
                                    </button>
                                    <button className={styles.editButton} onClick={() => openModal(user)}>
                                        <RiEditLine /> Edit
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        <RiDeleteBinLine /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* User Modal */}
                {isModalOpen && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
                                <button className={styles.closeButton} onClick={closeModal}>
                                    <RiCloseLine />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className={styles.modalForm}>
                                {/* Profile Image */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Profile Image</h3>
                                    <div className={styles.imageUpload}>
                                        <input
                                            type="file"
                                            id="profileImageUpload"
                                            accept="image/*"
                                            onChange={handleProfileImageChange}
                                            className={styles.fileInput}
                                        />
                                        <label htmlFor="profileImageUpload" className={styles.uploadLabel}>
                                            {profileImagePreview ? (
                                                <Image width={1000} height={1000} src={profileImagePreview} alt="Profile" className={styles.profilePreview} />
                                            ) : (
                                                <>
                                                    <RiUploadCloudLine className={styles.uploadIcon} />
                                                    <span>Upload profile picture</span>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                {/* Basic Information */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Basic Information</h3>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="First name"
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                placeholder="Last name"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="email@example.com"
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+91 XXXXX XXXXX"
                                            />
                                        </div>
                                    </div>

                                    {!editingUser && (
                                        <div className={styles.formGroup}>
                                            <label>Password *</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder="Minimum 6 characters"
                                                required={!editingUser}
                                                minLength="6"
                                            />
                                            <small className={styles.helpText}>
                                                {editingUser
                                                    ? 'Leave blank to keep current password'
                                                    : 'Password must be at least 6 characters'}
                                            </small>
                                        </div>
                                    )}

                                    {editingUser && (
                                        <div className={styles.formGroup}>
                                            <label>Change Password (Optional)</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder="Leave blank to keep current"
                                                minLength="6"
                                            />
                                            <small className={styles.helpText}>
                                                Leave blank to keep current password, or use Reset Password button
                                            </small>
                                        </div>
                                    )}
                                </div>

                                {/* Role & Status */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Role & Status</h3>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Role *</label>
                                            <select name="role" value={formData.role} onChange={handleInputChange}>
                                                {USER_ROLES.map((role) => (
                                                    <option key={role.value} value={role.value}>
                                                        {role.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Status *</label>
                                            <select name="status" value={formData.status} onChange={handleInputChange}>
                                                {USER_STATUS.map((status) => (
                                                    <option key={status.value} value={status.value}>
                                                        {status.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Department</label>
                                            <input
                                                type="text"
                                                name="department"
                                                value={formData.department}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Engineering"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Job Title</label>
                                            <input
                                                type="text"
                                                name="jobTitle"
                                                value={formData.jobTitle}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Project Manager"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Address</h3>
                                    <div className={styles.formGroup}>
                                        <label>Street</label>
                                        <input
                                            type="text"
                                            name="street"
                                            value={formData.street}
                                            onChange={handleInputChange}
                                            placeholder="Street address"
                                        />
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder="City"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>State</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                placeholder="State"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Zip Code</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                placeholder="Zip code"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Country</label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                placeholder="Country"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Permissions */}
                                <div className={styles.formSection}>
                                    <div className={styles.permissionsHeader}>
                                        <h3 className={styles.sectionTitle}>
                                            Permissions ({formData.permissions.length})
                                        </h3>
                                        <div className={styles.permissionActions}>
                                            <button
                                                type="button"
                                                onClick={selectAllPermissions}
                                                className={styles.selectAllBtn}
                                            >
                                                Select All
                                            </button>
                                            <button
                                                type="button"
                                                onClick={deselectAllPermissions}
                                                className={styles.deselectAllBtn}
                                            >
                                                Deselect All
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.permissionsGrid}>
                                        {Object.keys(permissionsByModule).map((module) => (
                                            <div key={module} className={styles.permissionModule}>
                                                <h4 className={styles.moduleName}>{module}</h4>
                                                <div className={styles.permissionList}>
                                                    {permissionsByModule[module].map((perm) => (
                                                        <label key={perm.id} className={styles.permissionItem}>
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.permissions.includes(perm.id)}
                                                                onChange={() => handlePermissionToggle(perm.id)}
                                                            />
                                                            <span>{perm.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.modalActions}>
                                    <button type="button" className={styles.cancelButton} onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className={styles.submitButton}>
                                        {editingUser ? 'Update User' : 'Create User'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Password Reset Modal */}
                {isPasswordModalOpen && (
                    <div className={styles.modalOverlay} onClick={closePasswordModal}>
                        <div className={styles.passwordModal} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <h2>Reset Password</h2>
                                <button className={styles.closeButton} onClick={closePasswordModal}>
                                    <RiCloseLine />
                                </button>
                            </div>
                            <form onSubmit={handlePasswordReset} className={styles.modalForm}>
                                <div className={styles.userInfo}>
                                    <Image
                                        width={1000}
                                        height={1000}
                                        src={passwordResetUser?.profileImage}
                                        alt="User"
                                        className={styles.resetUserAvatar}
                                    />
                                    <div>
                                        <div className={styles.resetUserName}>
                                            {passwordResetUser?.firstName} {passwordResetUser?.lastName}
                                        </div>
                                        <div className={styles.resetUserEmail}>{passwordResetUser?.email}</div>
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>New Password *</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter new password"
                                        required
                                        minLength="6"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Confirm Password *</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirm new password"
                                        required
                                        minLength="6"
                                    />
                                </div>

                                <div className={styles.modalActions}>
                                    <button
                                        type="button"
                                        className={styles.cancelButton}
                                        onClick={closePasswordModal}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className={styles.submitButton}>
                                        Reset Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UsersPage;
