'use client';

import { useState, useEffect } from 'react';
// import AdminLayout from '@/components/common/AdminLayout/AdminLayout';
// import AdminLayout from '@app/admin/layout';
import {
    RiAddLine,
    RiSearchLine,
    RiEditLine,
    RiDeleteBinLine,
    RiCloseLine,
    RiImageAddLine,
    RiGridFill,
    RiListCheck,
    RiFilterLine,
    RiUploadCloudLine,
} from 'react-icons/ri';
import styles from './page.module.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [components, setComponents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
    const [searchQuery, setSearchQuery] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        categories: [],
        subCategories: [],
        components: [],
    });
    const [imagePreview, setImagePreview] = useState('');

    // Fetch data (temp data for now)
    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchSubCategories();
        fetchComponents();
    }, []);

    const fetchProducts = async () => {
        // Temp data - replace with actual API call
        const tempProducts = [
            {
                _id: '1',
                name: 'Elevator Model A',
                description: 'High-speed elevator for commercial buildings',
                image: 'https://via.placeholder.com/150',
                categories: ['cat1', 'cat2'],
                subCategories: ['sub1'],
                components: ['comp1', 'comp2'],
                createdAt: new Date().toISOString(),
            },
            {
                _id: '2',
                name: 'Escalator Pro',
                description: 'Durable escalator for shopping malls',
                image: 'https://via.placeholder.com/150',
                categories: ['cat1'],
                subCategories: ['sub2'],
                components: ['comp1'],
                createdAt: new Date().toISOString(),
            },
            {
                _id: '3',
                name: 'Home Lift Compact',
                description: 'Space-saving home elevator solution',
                image: 'https://via.placeholder.com/150',
                categories: ['cat2'],
                subCategories: ['sub1', 'sub2'],
                components: ['comp2'],
                createdAt: new Date().toISOString(),
            },
        ];
        setProducts(tempProducts);

        // Real API call (commented out for now)
        // try {
        //   const response = await fetch('http://localhost:5000/api/products');
        //   const data = await response.json();
        //   setProducts(data);
        // } catch (error) {
        //   console.error('Error fetching products:', error);
        // }
    };

    const fetchCategories = async () => {
        // Temp data
        const tempCategories = [
            { _id: 'cat1', name: 'Commercial' },
            { _id: 'cat2', name: 'Residential' },
            { _id: 'cat3', name: 'Industrial' },
        ];
        setCategories(tempCategories);
    };

    const fetchSubCategories = async () => {
        // Temp data
        const tempSubCategories = [
            { _id: 'sub1', name: 'High-Speed' },
            { _id: 'sub2', name: 'Standard' },
            { _id: 'sub3', name: 'Luxury' },
        ];
        setSubCategories(tempSubCategories);
    };

    const fetchComponents = async () => {
        // Temp data
        const tempComponents = [
            { _id: 'comp1', name: 'Motor System' },
            { _id: 'comp2', name: 'Control Panel' },
            { _id: 'comp3', name: 'Safety Features' },
        ];
        setComponents(tempComponents);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMultiSelectChange = (e, field) => {
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setFormData({ ...formData, [field]: selected });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description,
                image: product.image,
                categories: product.categories,
                subCategories: product.subCategories,
                components: product.components,
            });
            setImagePreview(product.image);
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                image: '',
                categories: [],
                subCategories: [],
                components: [],
            });
            setImagePreview('');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            description: '',
            image: '',
            categories: [],
            subCategories: [],
            components: [],
        });
        setImagePreview('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingProduct) {
            // Update product
            const updatedProducts = products.map((p) =>
                p._id === editingProduct._id ? { ...p, ...formData } : p
            );
            setProducts(updatedProducts);

            // Real API call (commented out)
            // try {
            //   await fetch(`http://localhost:5000/api/products/${editingProduct._id}`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            //   });
            //   fetchProducts();
            // } catch (error) {
            //   console.error('Error updating product:', error);
            // }
        } else {
            // Add new product
            const newProduct = {
                _id: Date.now().toString(),
                ...formData,
                createdAt: new Date().toISOString(),
            };
            setProducts([...products, newProduct]);

            // Real API call (commented out)
            // try {
            //   await fetch('http://localhost:5000/api/products', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            //   });
            //   fetchProducts();
            // } catch (error) {
            //   console.error('Error creating product:', error);
            // }
        }

        closeModal();
    };

    const handleDelete = async (productId) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter((p) => p._id !== productId));

            // Real API call (commented out)
            // try {
            //   await fetch(`http://localhost:5000/api/products/${productId}`, {
            //     method: 'DELETE',
            //   });
            //   fetchProducts();
            // } catch (error) {
            //   console.error('Error deleting product:', error);
            // }
        }
    };

    const getCategoryNames = (categoryIds) => {
        return categoryIds
            .map((id) => categories.find((c) => c._id === id)?.name)
            .filter(Boolean)
            .join(', ');
    };

    const getSubCategoryNames = (subCategoryIds) => {
        return subCategoryIds
            .map((id) => subCategories.find((s) => s._id === id)?.name)
            .filter(Boolean)
            .join(', ');
    };

    const getComponentNames = (componentIds) => {
        return componentIds
            .map((id) => components.find((c) => c._id === id)?.name)
            .filter(Boolean)
            .join(', ');
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        // <AdminLayout>
            <div className={styles.productPage}>
                {/* Header */}
                <div className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.pageTitle}>Products</h1>
                        <p className={styles.pageSubtitle}>Manage your product catalog</p>
                    </div>
                    <button className={styles.addButton} onClick={() => openModal()}>
                        <RiAddLine /> Add Product
                    </button>
                </div>

                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <div className={styles.searchWrapper}>
                        <RiSearchLine className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search products..."
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
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Categories</th>
                                    <th>Sub Categories</th>
                                    <th>Components</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className={styles.productImage}
                                            />
                                        </td>
                                        <td className={styles.productName}>{product.name}</td>
                                        <td className={styles.productDescription}>
                                            {product.description.substring(0, 50)}...
                                        </td>
                                        <td className={styles.badges}>
                                            {getCategoryNames(product.categories)}
                                        </td>
                                        <td className={styles.badges}>
                                            {getSubCategoryNames(product.subCategories)}
                                        </td>
                                        <td className={styles.badges}>
                                            {getComponentNames(product.components)}
                                        </td>
                                        <td>
                                            <div className={styles.actionButtons}>
                                                <button
                                                    className={styles.editButton}
                                                    onClick={() => openModal(product)}
                                                >
                                                    <RiEditLine />
                                                </button>
                                                <button
                                                    className={styles.deleteButton}
                                                    onClick={() => handleDelete(product._id)}
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
                        {filteredProducts.map((product) => (
                            <div key={product._id} className={styles.card}>
                                <div className={styles.cardImage}>
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{product.name}</h3>
                                    <p className={styles.cardDescription}>{product.description}</p>
                                    <div className={styles.cardMeta}>
                                        <div className={styles.metaItem}>
                                            <span className={styles.metaLabel}>Categories:</span>
                                            <span className={styles.metaValue}>
                                                {getCategoryNames(product.categories) || 'N/A'}
                                            </span>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <span className={styles.metaLabel}>Sub Categories:</span>
                                            <span className={styles.metaValue}>
                                                {getSubCategoryNames(product.subCategories) || 'N/A'}
                                            </span>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <span className={styles.metaLabel}>Components:</span>
                                            <span className={styles.metaValue}>
                                                {getComponentNames(product.components) || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.cardActions}>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => openModal(product)}
                                    >
                                        <RiEditLine /> Edit
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        <RiDeleteBinLine /> Delete
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
                                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                                <button className={styles.closeButton} onClick={closeModal}>
                                    <RiCloseLine />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className={styles.modalForm}>
                                <div className={styles.formGroup}>
                                    <label>Product Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Description *</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter product description"
                                        rows="4"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Product Image</label>
                                    <div className={styles.imageUpload}>
                                        <input
                                            type="file"
                                            id="imageUpload"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className={styles.fileInput}
                                        />
                                        <label htmlFor="imageUpload" className={styles.uploadLabel}>
                                            <RiUploadCloudLine className={styles.uploadIcon} />
                                            <span>Click to upload image</span>
                                        </label>
                                        {imagePreview && (
                                            <div className={styles.imagePreview}>
                                                <img src={imagePreview} alt="Preview" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Categories</label>
                                    <select
                                        multiple
                                        value={formData.categories}
                                        onChange={(e) => handleMultiSelectChange(e, 'categories')}
                                        className={styles.multiSelect}
                                    >
                                        {categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    <small className={styles.helpText}>
                                        Hold Ctrl/Cmd to select multiple
                                    </small>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Sub Categories</label>
                                    <select
                                        multiple
                                        value={formData.subCategories}
                                        onChange={(e) => handleMultiSelectChange(e, 'subCategories')}
                                        className={styles.multiSelect}
                                    >
                                        {subCategories.map((subCategory) => (
                                            <option key={subCategory._id} value={subCategory._id}>
                                                {subCategory.name}
                                            </option>
                                        ))}
                                    </select>
                                    <small className={styles.helpText}>
                                        Hold Ctrl/Cmd to select multiple
                                    </small>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Components</label>
                                    <select
                                        multiple
                                        value={formData.components}
                                        onChange={(e) => handleMultiSelectChange(e, 'components')}
                                        className={styles.multiSelect}
                                    >
                                        {components.map((component) => (
                                            <option key={component._id} value={component._id}>
                                                {component.name}
                                            </option>
                                        ))}
                                    </select>
                                    <small className={styles.helpText}>
                                        Hold Ctrl/Cmd to select multiple
                                    </small>
                                </div>

                                <div className={styles.modalActions}>
                                    <button
                                        type="button"
                                        className={styles.cancelButton}
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className={styles.submitButton}>
                                        {editingProduct ? 'Update Product' : 'Create Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        // {/* </AdminLayout> */}
    );
};

export default ProductsPage;