'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
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
    RiArrowDownSLine,
    RiArrowRightSLine,
    RiDraggable,
    RiSubtractLine,
} from 'react-icons/ri';
import styles from './page.module.css';
import Image from 'next/image';
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getSubCategories,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
} from '@/services/categories.service';
import { uploadImage } from '@/services/upload.service';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('table');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [isSubCategory, setIsSubCategory] = useState(false);
    const [parentCategoryId, setParentCategoryId] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [iconPreview, setIconPreview] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        slug: '',
        icon: '',
        status: 'active',
        order: 0,
        // SEO Fields
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
    });

    async function fetchCategories() {
        try {
            const [categoryRows, subCategoryRows] = await Promise.all([
                getCategories(),
                getSubCategories(),
            ]);

            const categoriesWithSubs = (categoryRows || []).map((category) => ({
                ...category,
                subCategories: (subCategoryRows || []).filter(
                    (subCategory) => String(subCategory.category?._id || subCategory.category) === String(category._id)
                ),
            }));

            setCategories(categoriesWithSubs);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchCategories();
        }, 0);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Auto-generate slug from name
        if (name === 'name' && !editingCategory) {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData((prev) => ({ ...prev, slug }));
        }
    }

    const handleIconChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        try {
            const url = await uploadImage(file, 'categories');
            setIconPreview(url);
            setFormData((prev) => ({ ...prev, icon: url }));
        } catch (err) {
            toast.error(err?.message || 'Image upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const toggleExpand = (categoryId) => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter((id) => id !== categoryId));
        } else {
            setExpandedCategories([...expandedCategories, categoryId]);
        }
    };

    const openModal = (category = null, isSubCat = false, parentId = null) => {
        if (category) {
            setEditingCategory(category);
            const resolvedParentId = category.parentId || category.category?._id || category.category || null;
            setIsSubCategory(!!resolvedParentId);
            setParentCategoryId(resolvedParentId);
            setFormData({
                name: category.name,
                description: category.description,
                slug: category.slug,
                icon: category.icon,
                status: category.status,
                order: category.order,
                metaTitle: category.metaTitle,
                metaDescription: category.metaDescription,
                metaKeywords: Array.isArray(category.metaKeywords) ? category.metaKeywords.join(', ') : (category.metaKeywords || ''),
            });
            setIconPreview(category.icon);
        } else {
            setEditingCategory(null);
            setIsSubCategory(isSubCat);
            setParentCategoryId(parentId);
            setFormData({
                name: '',
                description: '',
                slug: '',
                icon: '',
                status: 'active',
                order: 0,
                metaTitle: '',
                metaDescription: '',
                metaKeywords: '',
            });
            setIconPreview('');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setIsSubCategory(false);
        setParentCategoryId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryData = {
            ...formData,
            parentId: isSubCategory ? parentCategoryId : null,
        };

        try {
            if (editingCategory) {
                if (editingCategory.parentId || editingCategory.category) {
                    await updateSubCategory(editingCategory._id, categoryData);
                } else {
                    await updateCategory(editingCategory._id, categoryData);
                }
            } else if (isSubCategory) {
                await createSubCategory(categoryData);
            } else {
                await createCategory(categoryData);
            }

            await fetchCategories();
            toast.success(`${isSubCategory ? 'Sub-category' : 'Category'} ${editingCategory ? 'updated' : 'created'} successfully`);
            closeModal();
        } catch (error) {
            console.error('Error saving category:', error);
            toast.error(error?.message || 'Failed to save category');
        }
    };

    const handleDelete = async (categoryId, isSubCat = false) => {
        if (confirm('Are you sure you want to delete this category?')) {
            try {
                if (isSubCat) {
                    await deleteSubCategory(categoryId);
                } else {
                    await deleteCategory(categoryId);
                }
                await fetchCategories();
                toast.success('Deleted successfully');
            } catch (error) {
                console.error('Error deleting category:', error);
                toast.error(error?.message || 'Failed to delete category');
            }
        }
    };

    const moveCategory = (categoryId, direction, isSubCat = false, parentId = null) => {
        if (isSubCat) {
            const updatedCategories = categories.map((cat) => {
                if (cat._id === parentId) {
                    const subs = [...cat.subCategories];
                    const index = subs.findIndex((s) => s._id === categoryId);
                    if (
                        (direction === 'up' && index > 0) ||
                        (direction === 'down' && index < subs.length - 1)
                    ) {
                        const newIndex = direction === 'up' ? index - 1 : index + 1;
                        [subs[index], subs[newIndex]] = [subs[newIndex], subs[index]];
                        // Update order numbers
                        subs.forEach((s, i) => {
                            s.order = i + 1;
                        });
                    }
                    return { ...cat, subCategories: subs };
                }
                return cat;
            });
            setCategories(updatedCategories);
        } else {
            const cats = [...categories];
            const index = cats.findIndex((c) => c._id === categoryId);
            if (
                (direction === 'up' && index > 0) ||
                (direction === 'down' && index < cats.length - 1)
            ) {
                const newIndex = direction === 'up' ? index - 1 : index + 1;
                [cats[index], cats[newIndex]] = [cats[newIndex], cats[index]];
                // Update order numbers
                cats.forEach((c, i) => {
                    c.order = i + 1;
                });
                setCategories(cats);
            }
        }
    };

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getParentName = (parentId) => {
        const parent = categories.find((cat) => cat._id === parentId);
        return parent?.name || '';
    };

    return (
        <section>
            <div className={styles.categoriesPage}>
                {/* Header */}
                <div className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.pageTitle}>Categories</h1>
                        <p className={styles.pageSubtitle}>Manage product categories and sub-categories</p>
                    </div>
                    <button className={styles.addButton} onClick={() => openModal()}>
                        <RiAddLine /> Add Category
                    </button>
                </div>

                {/* Stats */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{categories.length}</div>
                        <div className={styles.statLabel}>Main Categories</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>
                            {categories.reduce((acc, cat) => acc + cat.subCategories.length, 0)}
                        </div>
                        <div className={styles.statLabel}>Sub Categories</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>
                            {categories.filter((c) => c.status === 'active').length}
                        </div>
                        <div className={styles.statLabel}>Active Categories</div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <div className={styles.searchWrapper}>
                        <RiSearchLine className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search categories..."
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
                                    <th style={{ width: '40px' }}></th>
                                    <th>Category</th>
                                    <th>Slug</th>
                                    <th>Status</th>
                                    <th>Order</th>
                                    <th>Sub Categories</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCategories.map((category) => (
                                    <>
                                        {/* Main Category Row */}
                                        <tr key={category._id} className={styles.mainCategory}>
                                            <td>
                                                {category.subCategories.length > 0 && (
                                                    <button
                                                        className={styles.expandButton}
                                                        onClick={() => toggleExpand(category._id)}
                                                    >
                                                        {expandedCategories.includes(category._id) ? (
                                                            <RiArrowDownSLine />
                                                        ) : (
                                                            <RiArrowRightSLine />
                                                        )}
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                <div className={styles.categoryCell}>
                                                    <Image
                                                        width={1000}
                                                        height={1000}
                                                        src={category.icon}
                                                        alt={category.name}
                                                        className={styles.categoryIcon}
                                                    />
                                                    <div>
                                                        <div className={styles.categoryName}>{category.name}</div>
                                                        <div className={styles.categoryDescription}>
                                                            {category.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <code className={styles.slug}>/{category.slug}</code>
                                            </td>
                                            <td>
                                                <span
                                                    className={`${styles.statusBadge} ${category.status === 'active' ? styles.active : styles.inactive
                                                        }`}
                                                >
                                                    {category.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className={styles.orderControls}>
                                                    <button
                                                        className={styles.orderButton}
                                                        onClick={() => moveCategory(category._id, 'up')}
                                                        disabled={category.order === 1}
                                                    >
                                                        ↑
                                                    </button>
                                                    <span>{category.order}</span>
                                                    <button
                                                        className={styles.orderButton}
                                                        onClick={() => moveCategory(category._id, 'down')}
                                                        disabled={category.order === categories.length}
                                                    >
                                                        ↓
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.subCategoryActions}>
                                                    <span className={styles.subCount}>
                                                        {category.subCategories.length}
                                                    </span>
                                                    <button
                                                        className={styles.addSubButton}
                                                        onClick={() => openModal(null, true, category._id)}
                                                    >
                                                        <RiAddLine /> Add Sub
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.actionButtons}>
                                                    <button
                                                        className={styles.editButton}
                                                        onClick={() => openModal(category)}
                                                    >
                                                        <RiEditLine />
                                                    </button>
                                                    <button
                                                        className={styles.deleteButton}
                                                        onClick={() => handleDelete(category._id)}
                                                    >
                                                        <RiDeleteBinLine />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Sub Category Rows */}
                                        {expandedCategories.includes(category._id) &&
                                            category.subCategories.map((subCat) => (
                                                <tr key={subCat._id} className={styles.subCategory}>
                                                    <td></td>
                                                    <td>
                                                        <div className={styles.categoryCell}>
                                                            <RiSubtractLine className={styles.subIcon} />
                                                            <Image
                                                                width={1000}
                                                                height={1000}
                                                                src={subCat.icon}
                                                                alt={subCat.name}
                                                                className={styles.categoryIcon}
                                                            />
                                                            <div>
                                                                <div className={styles.categoryName}>{subCat.name}</div>
                                                                <div className={styles.categoryDescription}>
                                                                    {subCat.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <code className={styles.slug}>/{subCat.slug}</code>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={`${styles.statusBadge} ${subCat.status === 'active' ? styles.active : styles.inactive
                                                                }`}
                                                        >
                                                            {subCat.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className={styles.orderControls}>
                                                            <button
                                                                className={styles.orderButton}
                                                                onClick={() =>
                                                                    moveCategory(subCat._id, 'up', true, category._id)
                                                                }
                                                                disabled={subCat.order === 1}
                                                            >
                                                                ↑
                                                            </button>
                                                            <span>{subCat.order}</span>
                                                            <button
                                                                className={styles.orderButton}
                                                                onClick={() =>
                                                                    moveCategory(subCat._id, 'down', true, category._id)
                                                                }
                                                                disabled={subCat.order === category.subCategories.length}
                                                            >
                                                                ↓
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={styles.subLabel}>Sub Category</span>
                                                    </td>
                                                    <td>
                                                        <div className={styles.actionButtons}>
                                                            <button
                                                                className={styles.editButton}
                                                                onClick={() => openModal(subCat)}
                                                            >
                                                                <RiEditLine />
                                                            </button>
                                                            <button
                                                                className={styles.deleteButton}
                                                                onClick={() => handleDelete(subCat._id, true, category._id)}
                                                            >
                                                                <RiDeleteBinLine />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={styles.cardGrid}>
                        {filteredCategories.map((category) => (
                            <div key={category._id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <Image
                                        width={1000}
                                        height={1000}
                                        src={category.icon}
                                        alt={category.name}
                                        className={styles.cardIcon}
                                    />
                                    <span
                                        className={`${styles.statusBadge} ${category.status === 'active' ? styles.active : styles.inactive
                                            }`}
                                    >
                                        {category.status}
                                    </span>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{category.name}</h3>
                                    <p className={styles.cardDescription}>{category.description}</p>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.slugBadge}>/{category.slug}</span>
                                        <span className={styles.orderBadge}>Order: {category.order}</span>
                                    </div>
                                    {category.subCategories.length > 0 && (
                                        <div className={styles.subCategoriesList}>
                                            <div className={styles.subCategoriesTitle}>
                                                Sub Categories ({category.subCategories.length})
                                            </div>
                                            {category.subCategories.map((sub) => (
                                                <div key={sub._id} className={styles.subCategoryItem}>
                                                    <Image width={1000} height={1000} src={sub.icon} alt={sub.name} className={styles.subCategoryIcon} />
                                                    <span>{sub.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className={styles.cardActions}>
                                    <button
                                        className={styles.addSubButton}
                                        onClick={() => openModal(null, true, category._id)}
                                    >
                                        <RiAddLine /> Add Sub
                                    </button>
                                    <button className={styles.editButton} onClick={() => openModal(category)}>
                                        <RiEditLine /> Edit
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(category._id)}
                                    >
                                        <RiDeleteBinLine />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <h2>
                                    {editingCategory
                                        ? `Edit ${isSubCategory ? 'Sub Category' : 'Category'}`
                                        : `Add New ${isSubCategory ? 'Sub Category' : 'Category'}`}
                                </h2>
                                <button className={styles.closeButton} onClick={closeModal}>
                                    <RiCloseLine />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className={styles.modalForm}>
                                {isSubCategory && (
                                    <div className={styles.parentInfo}>
                                        <strong>Parent Category:</strong> {getParentName(parentCategoryId)}
                                    </div>
                                )}

                                {/* Basic Information */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Basic Information</h3>
                                    <div className={styles.formGroup}>
                                        <label>Category Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Residential"
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Slug *</label>
                                        <input
                                            type="text"
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleInputChange}
                                            placeholder="url-friendly-slug"
                                            required
                                        />
                                        <small className={styles.helpText}>
                                            URL: /products/category/{formData.slug || 'your-slug'}
                                        </small>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Description *</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Category description"
                                            rows="3"
                                            required
                                        />
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Status</label>
                                            <select name="status" value={formData.status} onChange={handleInputChange}>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Display Order</label>
                                            <input
                                                type="number"
                                                name="order"
                                                value={formData.order}
                                                onChange={handleInputChange}
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Icon */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Icon/Image</h3>
                                    <div className={styles.imageUpload}>
                                        <input
                                            type="file"
                                            id="iconUpload"
                                            accept="image/*"
                                            onChange={handleIconChange}
                                            className={styles.fileInput}
                                        />
                                        <label htmlFor="iconUpload" className={styles.uploadLabel}>
                                            {iconPreview ? (
                                                <Image width={1000} height={1000} src={iconPreview} alt="Icon" className={styles.iconPreview} />
                                            ) : (
                                                <>
                                                    <RiUploadCloudLine className={styles.uploadIcon} />
                                                    <span>Upload category icon</span>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                {/* SEO Settings */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>SEO Settings</h3>
                                    <div className={styles.formGroup}>
                                        <label>Meta Title</label>
                                        <input
                                            type="text"
                                            name="metaTitle"
                                            value={formData.metaTitle}
                                            onChange={handleInputChange}
                                            placeholder="SEO title (60 chars max)"
                                            maxLength="60"
                                        />
                                        <small className={styles.helpText}>
                                            {formData.metaTitle.length}/60 characters
                                        </small>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Meta Description</label>
                                        <textarea
                                            name="metaDescription"
                                            value={formData.metaDescription}
                                            onChange={handleInputChange}
                                            placeholder="SEO description (160 chars max)"
                                            rows="3"
                                            maxLength="160"
                                        />
                                        <small className={styles.helpText}>
                                            {formData.metaDescription.length}/160 characters
                                        </small>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Meta Keywords</label>
                                        <input
                                            type="text"
                                            name="metaKeywords"
                                            value={formData.metaKeywords}
                                            onChange={handleInputChange}
                                            placeholder="keyword1, keyword2, keyword3"
                                        />
                                    </div>
                                </div>

                                <div className={styles.modalActions}>
                                    <button type="button" className={styles.cancelButton} onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className={styles.submitButton} disabled={isUploading}>
                                        {isUploading ? 'Uploading…' : (editingCategory ? 'Update Category' : 'Create Category')}
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

export default CategoriesPage;
