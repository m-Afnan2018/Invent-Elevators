'use client';

import { useState, useEffect, useRef } from 'react';
// import AdminLayout from '@/components/AdminLayout';
import AdminLayout from '@/components/common/AdminLayout/AdminLayout';
import TipTapEditor from '@/components/core/blogs/TipTapEditor';
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
    RiCalendarLine,
    RiEyeLine,
    RiDraftLine,
    RiCheckboxCircleLine,
    RiArchiveLine,
} from 'react-icons/ri';
import styles from './page.module.css';
import Image from 'next/image';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '@/services/blogs.service';
import { uploadImage } from '@/services/upload.service';

const STATUS_OPTIONS = [
    { value: 'draft', label: 'Draft', icon: RiDraftLine },
    { value: 'published', label: 'Published', icon: RiCheckboxCircleLine },
    { value: 'scheduled', label: 'Scheduled', icon: RiCalendarLine },
    { value: 'archived', label: 'Archived', icon: RiArchiveLine },
];

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('table');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingBlog, setEditingBlog] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [ogImagePreview, setOgImagePreview] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        author: '',
        tags: [],
        status: 'draft',
        publishDate: '',
        isFeatured: false,
        // SEO Fields
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        ogImage: '',
        canonicalUrl: '',
    });
    const [tagInput, setTagInput] = useState('');
    const featuredImageInputRef = useRef(null);
    const ogImageInputRef = useRef(null);

    async function fetchBlogs() {
        try {
            const data = await getBlogs();
            setBlogs(data || []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchBlogs();
        }, 0);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        // Auto-generate slug from title
        if (name === 'title' && !editingBlog) {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData((prev) => ({ ...prev, slug }));
        }
    }

    const handleContentChange = (html) => {
        setFormData({ ...formData, content: html });
    };

    const handleImageChange = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        try {
            const url = await uploadImage(file, 'blogs');
            if (field === 'featuredImage') {
                setImagePreview(url);
                setFormData((prev) => ({ ...prev, featuredImage: url }));
            } else if (field === 'ogImage') {
                setOgImagePreview(url);
                setFormData((prev) => ({ ...prev, ogImage: url }));
            }
        } catch (err) {
            console.error('Image upload failed:', err);
        } finally {
            setIsUploading(false);
        }
    };


    const clearSelectedImage = (field) => {
        if (field === 'featuredImage') {
            setImagePreview('');
            setFormData((prev) => ({ ...prev, featuredImage: '' }));

            if (featuredImageInputRef.current) {
                featuredImageInputRef.current.value = '';
            }

            return;
        }

        setOgImagePreview('');
        setFormData((prev) => ({ ...prev, ogImage: '' }));

        if (ogImageInputRef.current) {
            ogImageInputRef.current.value = '';
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()],
            });
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((tag) => tag !== tagToRemove),
        });
    };

    const handleTagInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const openModal = (blog = null) => {
        if (blog) {
            setEditingBlog(blog);
            // Format publishDate to YYYY-MM-DD for the date input
            const publishDate = blog.publishDate
                ? new Date(blog.publishDate).toISOString().split('T')[0]
                : '';
            setFormData({
                title: blog.title || '',
                slug: blog.slug || '',
                excerpt: blog.excerpt || '',
                content: blog.content || '',
                featuredImage: blog.featuredImage || '',
                author: blog.author || '',
                tags: blog.tags || [],
                status: blog.status || 'draft',
                publishDate,
                isFeatured: blog.isFeatured || false,
                metaTitle: blog.metaTitle || '',
                metaDescription: blog.metaDescription || '',
                metaKeywords: blog.metaKeywords || '',
                ogImage: blog.ogImage || '',
                canonicalUrl: blog.canonicalUrl || '',
            });
            setImagePreview(blog.featuredImage);
            setOgImagePreview(blog.ogImage);
        } else {
            setEditingBlog(null);
            setFormData({
                title: '',
                slug: '',
                excerpt: '',
                content: '',
                featuredImage: '',
                author: '',
                tags: [],
                status: 'draft',
                publishDate: '',
                isFeatured: false,
                metaTitle: '',
                metaDescription: '',
                metaKeywords: '',
                ogImage: '',
                canonicalUrl: '',
            });
            setImagePreview('');
            setOgImagePreview('');

            if (featuredImageInputRef.current) {
                featuredImageInputRef.current.value = '';
            }

            if (ogImageInputRef.current) {
                ogImageInputRef.current.value = '';
            }
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
        setTagInput('');

        if (featuredImageInputRef.current) {
            featuredImageInputRef.current.value = '';
        }

        if (ogImageInputRef.current) {
            ogImageInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingBlog) {
                await updateBlog(editingBlog._id, formData);
            } else {
                await createBlog(formData);
            }
            await fetchBlogs();
            closeModal();
        } catch (error) {
            console.error('Error saving blog:', error);
        }
    };

    const handleDelete = async (blogId) => {
        if (confirm('Are you sure you want to delete this blog?')) {
            try {
                await deleteBlog(blogId);
                await fetchBlogs();
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    const getStatusIcon = (status) => {
        const statusOption = STATUS_OPTIONS.find((opt) => opt.value === status);
        const Icon = statusOption?.icon || RiDraftLine;
        return <Icon />;
    };

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section>
            <div className={styles.blogsPage}>
                {/* Header */}
                <div className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.pageTitle}>Blogs</h1>
                        <p className={styles.pageSubtitle}>Manage your blog posts and content</p>
                    </div>
                    <button className={styles.addButton} onClick={() => openModal()}>
                        <RiAddLine /> Add Blog
                    </button>
                </div>

                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <div className={styles.searchWrapper}>
                        <RiSearchLine className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search blogs..."
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
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Tags</th>
                                    <th>Status</th>
                                    <th>Publish Date</th>
                                    <th>Featured</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBlogs.map((blog) => (
                                    <tr key={blog._id}>
                                        <td>
                                            <div className={styles.titleCell}>
                                                <Image
                                                    width={1000}
                                                    height={1000}
                                                    src={blog.featuredImage}
                                                    alt={blog.title}
                                                    className={styles.blogThumbnail}
                                                />
                                                <div>
                                                    <div className={styles.blogTitle}>{blog.title}</div>
                                                    <div className={styles.blogSlug}>/{blog.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{blog.author}</td>
                                        <td>
                                            <div className={styles.tagsCell}>
                                                {blog.tags.slice(0, 2).map((tag, index) => (
                                                    <span key={index} className={styles.tag}>
                                                        {tag}
                                                    </span>
                                                ))}
                                                {blog.tags.length > 2 && (
                                                    <span className={styles.moreTag}>+{blog.tags.length - 2}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${styles[blog.status]}`}>
                                                {getStatusIcon(blog.status)}
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td>{blog.publishDate || 'Not set'}</td>
                                        <td>
                                            {blog.isFeatured && (
                                                <span className={styles.featuredBadge}>Featured</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className={styles.actionButtons}>
                                                <button
                                                    className={styles.editButton}
                                                    onClick={() => openModal(blog)}
                                                >
                                                    <RiEditLine />
                                                </button>
                                                <button
                                                    className={styles.deleteButton}
                                                    onClick={() => handleDelete(blog._id)}
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
                        {filteredBlogs.map((blog) => (
                            <div key={blog._id} className={styles.card}>
                                <div className={styles.cardImageWrapper}>
                                    <Image
                                        width={1000}
                                        height={1000}
                                        src={blog.featuredImage}
                                        alt={blog.title}
                                        className={styles.cardImage}
                                    />
                                    {blog.isFeatured && (
                                        <span className={styles.featuredLabel}>Featured</span>
                                    )}
                                    <span className={`${styles.statusLabel} ${styles[blog.status]}`}>
                                        {getStatusIcon(blog.status)}
                                        {blog.status}
                                    </span>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{blog.title}</h3>
                                    <p className={styles.cardExcerpt}>{blog.excerpt}</p>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.author}>{blog.author}</span>
                                        <span className={styles.date}>
                                            <RiCalendarLine /> {blog.publishDate || 'Not scheduled'}
                                        </span>
                                    </div>
                                    <div className={styles.cardTags}>
                                        {blog.tags.map((tag, index) => (
                                            <span key={index} className={styles.tag}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.cardActions}>
                                    <button className={styles.editButton} onClick={() => openModal(blog)}>
                                        <RiEditLine /> Edit
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(blog._id)}
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
                                <h2>{editingBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
                                <button className={styles.closeButton} onClick={closeModal}>
                                    <RiCloseLine />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className={styles.modalForm}>
                                {/* Basic Information */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Basic Information</h3>
                                    <div className={styles.formGroup}>
                                        <label>Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter blog title"
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
                                            URL: /blog/{formData.slug || 'your-slug'}
                                        </small>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Excerpt *</label>
                                        <textarea
                                            name="excerpt"
                                            value={formData.excerpt}
                                            onChange={handleInputChange}
                                            placeholder="Brief description for preview"
                                            rows="3"
                                            required
                                        />
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Author *</label>
                                            <input
                                                type="text"
                                                name="author"
                                                value={formData.author}
                                                onChange={handleInputChange}
                                                placeholder="Author name"
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Status *</label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                            >
                                                {STATUS_OPTIONS.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Publish Date</label>
                                            <input
                                                type="date"
                                                name="publishDate"
                                                value={formData.publishDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    name="isFeatured"
                                                    checked={formData.isFeatured}
                                                    onChange={handleInputChange}
                                                />
                                                <span>Featured Post</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Content</h3>
                                    <div className={styles.formGroup}>
                                        <label>Blog Content *</label>
                                        <TipTapEditor
                                            content={formData.content}
                                            onChange={handleContentChange}
                                        />
                                    </div>
                                </div>

                                {/* Featured Image */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Featured Image</h3>
                                    <div className={styles.formGroup}>
                                        <div className={styles.imageUpload}>
                                            <input
                                                type="file"
                                                id="featuredImageUpload"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, 'featuredImage')}
                                                className={styles.fileInput}
                                                ref={featuredImageInputRef}
                                            />
                                            <label htmlFor="featuredImageUpload" className={styles.uploadLabel}>
                                                <RiUploadCloudLine className={styles.uploadIcon} />
                                                <span>Click to upload featured image</span>
                                            </label>
                                            {imagePreview && (
                                                <>
                                                    <button
                                                        type="button"
                                                        className={styles.clearImageButton}
                                                        onClick={() => clearSelectedImage('featuredImage')}
                                                    >
                                                        Remove selected image
                                                    </button>
                                                    <div className={styles.imagePreview}>
                                                        <Image
                                                            width={1000}
                                                            height={1000} src={imagePreview} alt="Preview" />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Tags</h3>
                                    <div className={styles.formGroup}>
                                        <label>Add Tags</label>
                                        <div className={styles.tagInput}>
                                            <input
                                                type="text"
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                onKeyPress={handleTagInputKeyPress}
                                                placeholder="Type and press Enter"
                                            />
                                            <button type="button" onClick={handleAddTag} className={styles.addTagBtn}>
                                                Add
                                            </button>
                                        </div>
                                        {formData.tags.length > 0 && (
                                            <div className={styles.tagsList}>
                                                {formData.tags.map((tag, index) => (
                                                    <span key={index} className={styles.tagItem}>
                                                        {tag}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveTag(tag)}
                                                            className={styles.removeTag}
                                                        >
                                                            <RiCloseLine />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
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

                                    <div className={styles.formGroup}>
                                        <label>Canonical URL</label>
                                        <input
                                            type="url"
                                            name="canonicalUrl"
                                            value={formData.canonicalUrl}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/blog/post"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>OG Image (Social Sharing)</label>
                                        <div className={styles.imageUpload}>
                                            <input
                                                type="file"
                                                id="ogImageUpload"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, 'ogImage')}
                                                className={styles.fileInput}
                                                ref={ogImageInputRef}
                                            />
                                            <label htmlFor="ogImageUpload" className={styles.uploadLabel}>
                                                <RiUploadCloudLine className={styles.uploadIcon} />
                                                <span>Upload OG image (1200x630 recommended)</span>
                                            </label>
                                            {ogImagePreview && (
                                                <>
                                                    <button
                                                        type="button"
                                                        className={styles.clearImageButton}
                                                        onClick={() => clearSelectedImage('ogImage')}
                                                    >
                                                        Remove selected image
                                                    </button>
                                                    <div className={styles.imagePreview}>
                                                        <Image
                                                            width={1000}
                                                            height={1000} src={ogImagePreview} alt="OG Preview" />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.modalActions}>
                                    <button type="button" className={styles.cancelButton} onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className={styles.submitButton} disabled={isUploading}>
                                        {isUploading ? 'Uploading…' : (editingBlog ? 'Update Blog' : 'Create Blog')}
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

export default BlogsPage;
