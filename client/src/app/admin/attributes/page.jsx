'use client';

import { useState, useEffect } from 'react';
import {
    RiAddLine,
    RiSearchLine,
    RiEditLine,
    RiDeleteBinLine,
    RiCloseLine,
    RiGridFill,
    RiListCheck,
    RiFilterLine,
    RiDraggable,
    RiAddCircleLine,
    RiArrowUpLine,
    RiArrowDownLine,
} from 'react-icons/ri';
import styles from './page.module.css';

const FIELD_TYPES = [
    { value: 'text', label: 'Text Input' },
    { value: 'number', label: 'Number Input' },
    { value: 'dropdown', label: 'Dropdown/Select' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'radio', label: 'Radio Button' },
    { value: 'date', label: 'Date Picker' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'file', label: 'File Upload' },
];

const AttributesPage = () => {
    const [attributes, setAttributes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('table');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingAttribute, setEditingAttribute] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        status: 'active',
        fields: [],
    });

    useEffect(() => {
        fetchAttributes();
        fetchCategories();
    }, []);

    const fetchAttributes = async () => {
        // Temp data
        const tempAttributes = [
            {
                _id: '1',
                name: 'Product Specifications',
                description: 'Technical specifications for lift products',
                category: 'cat1',
                status: 'active',
                fields: [
                    {
                        fieldId: 'f1',
                        fieldName: 'Capacity',
                        fieldType: 'dropdown',
                        isRequired: true,
                        options: ['500kg', '1000kg', '1500kg', '2000kg'],
                    },
                    {
                        fieldId: 'f2',
                        fieldName: 'Speed',
                        fieldType: 'number',
                        isRequired: true,
                        options: [],
                    },
                    {
                        fieldId: 'f3',
                        fieldName: 'Safety Features',
                        fieldType: 'checkbox',
                        isRequired: false,
                        options: ['Emergency Brake', 'Overload Sensor', 'Backup Power'],
                    },
                ],
                createdAt: new Date().toISOString(),
            },
            {
                _id: '2',
                name: 'Customer Requirements',
                description: 'Custom requirements from customers',
                category: 'cat2',
                status: 'active',
                fields: [
                    {
                        fieldId: 'f4',
                        fieldName: 'Building Type',
                        fieldType: 'radio',
                        isRequired: true,
                        options: ['Residential', 'Commercial', 'Industrial'],
                    },
                    {
                        fieldId: 'f5',
                        fieldName: 'Installation Date',
                        fieldType: 'date',
                        isRequired: true,
                        options: [],
                    },
                    {
                        fieldId: 'f6',
                        fieldName: 'Special Requirements',
                        fieldType: 'textarea',
                        isRequired: false,
                        options: [],
                    },
                ],
                createdAt: new Date().toISOString(),
            },
            {
                _id: '3',
                name: 'Maintenance Form',
                description: 'Maintenance and service tracking',
                category: 'cat1',
                status: 'inactive',
                fields: [
                    {
                        fieldId: 'f7',
                        fieldName: 'Technician Name',
                        fieldType: 'text',
                        isRequired: true,
                        options: [],
                    },
                    {
                        fieldId: 'f8',
                        fieldName: 'Service Report',
                        fieldType: 'file',
                        isRequired: false,
                        options: [],
                    },
                ],
                createdAt: new Date().toISOString(),
            },
        ];
        setAttributes(tempAttributes);

        // Real API call (commented out)
        // try {
        //   const response = await fetch('http://localhost:5000/api/attributes');
        //   const data = await response.json();
        //   setAttributes(data);
        // } catch (error) {
        //   console.error('Error fetching attributes:', error);
        // }
    };

    const fetchCategories = async () => {
        // Temp data
        const tempCategories = [
            { _id: 'cat1', name: 'Technical' },
            { _id: 'cat2', name: 'Customer' },
            { _id: 'cat3', name: 'Maintenance' },
        ];
        setCategories(tempCategories);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addNewField = () => {
        const newField = {
            fieldId: `field_${Date.now()}`,
            fieldName: '',
            fieldType: 'text',
            isRequired: false,
            options: [],
        };
        setFormData({ ...formData, fields: [...formData.fields, newField] });
    };

    const updateField = (fieldId, key, value) => {
        const updatedFields = formData.fields.map((field) =>
            field.fieldId === fieldId ? { ...field, [key]: value } : field
        );
        setFormData({ ...formData, fields: updatedFields });
    };

    const removeField = (fieldId) => {
        const updatedFields = formData.fields.filter((field) => field.fieldId !== fieldId);
        setFormData({ ...formData, fields: updatedFields });
    };

    const moveField = (fieldId, direction) => {
        const index = formData.fields.findIndex((f) => f.fieldId === fieldId);
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === formData.fields.length - 1)
        ) {
            return;
        }

        const newFields = [...formData.fields];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
        setFormData({ ...formData, fields: newFields });
    };

    const addOption = (fieldId) => {
        const updatedFields = formData.fields.map((field) => {
            if (field.fieldId === fieldId) {
                return { ...field, options: [...field.options, ''] };
            }
            return field;
        });
        setFormData({ ...formData, fields: updatedFields });
    };

    const updateOption = (fieldId, optionIndex, value) => {
        const updatedFields = formData.fields.map((field) => {
            if (field.fieldId === fieldId) {
                const newOptions = [...field.options];
                newOptions[optionIndex] = value;
                return { ...field, options: newOptions };
            }
            return field;
        });
        setFormData({ ...formData, fields: updatedFields });
    };

    const removeOption = (fieldId, optionIndex) => {
        const updatedFields = formData.fields.map((field) => {
            if (field.fieldId === fieldId) {
                const newOptions = field.options.filter((_, index) => index !== optionIndex);
                return { ...field, options: newOptions };
            }
            return field;
        });
        setFormData({ ...formData, fields: updatedFields });
    };

    const openModal = (attribute = null) => {
        if (attribute) {
            setEditingAttribute(attribute);
            setFormData({
                name: attribute.name,
                description: attribute.description,
                category: attribute.category,
                status: attribute.status,
                fields: attribute.fields,
            });
        } else {
            setEditingAttribute(null);
            setFormData({
                name: '',
                description: '',
                category: '',
                status: 'active',
                fields: [],
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingAttribute(null);
        setFormData({
            name: '',
            description: '',
            category: '',
            status: 'active',
            fields: [],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingAttribute) {
            const updatedAttributes = attributes.map((attr) =>
                attr._id === editingAttribute._id ? { ...attr, ...formData } : attr
            );
            setAttributes(updatedAttributes);
        } else {
            const newAttribute = {
                _id: Date.now().toString(),
                ...formData,
                createdAt: new Date().toISOString(),
            };
            setAttributes([...attributes, newAttribute]);
        }

        closeModal();
    };

    const handleDelete = async (attributeId) => {
        if (confirm('Are you sure you want to delete this attribute?')) {
            setAttributes(attributes.filter((attr) => attr._id !== attributeId));
        }
    };

    const getCategoryName = (categoryId) => {
        return categories.find((c) => c._id === categoryId)?.name || 'N/A';
    };

    const filteredAttributes = attributes.filter((attr) =>
        attr.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const needsOptions = (fieldType) => {
        return ['dropdown', 'checkbox', 'radio'].includes(fieldType);
    };

    return (
        <div className={styles.attributesPage}>
            {/* Header */}
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Attributes</h1>
                    <p className={styles.pageSubtitle}>Manage dynamic form attributes</p>
                </div>
                <button className={styles.addButton} onClick={() => openModal()}>
                    <RiAddLine /> Add Attribute
                </button>
            </div>

            {/* Toolbar */}
            <div className={styles.toolbar}>
                <div className={styles.searchWrapper}>
                    <RiSearchLine className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search attributes..."
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
                                <th>Name</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Fields Count</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAttributes.map((attribute) => (
                                <tr key={attribute._id}>
                                    <td className={styles.attributeName}>{attribute.name}</td>
                                    <td className={styles.attributeDescription}>
                                        {attribute.description.substring(0, 60)}...
                                    </td>
                                    <td>{getCategoryName(attribute.category)}</td>
                                    <td>
                                        <span className={styles.fieldCount}>{attribute.fields.length} fields</span>
                                    </td>
                                    <td>
                                        <span
                                            className={`${styles.statusBadge} ${attribute.status === 'active' ? styles.active : styles.inactive
                                                }`}
                                        >
                                            {attribute.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <button
                                                className={styles.editButton}
                                                onClick={() => openModal(attribute)}
                                            >
                                                <RiEditLine />
                                            </button>
                                            <button
                                                className={styles.deleteButton}
                                                onClick={() => handleDelete(attribute._id)}
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
                    {filteredAttributes.map((attribute) => (
                        <div key={attribute._id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <h3 className={styles.cardTitle}>{attribute.name}</h3>
                                    <span
                                        className={`${styles.statusBadge} ${attribute.status === 'active' ? styles.active : styles.inactive
                                            }`}
                                    >
                                        {attribute.status}
                                    </span>
                                </div>
                                <span className={styles.categoryBadge}>{getCategoryName(attribute.category)}</span>
                            </div>
                            <p className={styles.cardDescription}>{attribute.description}</p>
                            <div className={styles.fieldsList}>
                                <h4 className={styles.fieldsTitle}>
                                    Fields ({attribute.fields.length})
                                </h4>
                                {attribute.fields.slice(0, 3).map((field) => (
                                    <div key={field.fieldId} className={styles.fieldItem}>
                                        <span className={styles.fieldName}>{field.fieldName}</span>
                                        <span className={styles.fieldType}>{field.fieldType}</span>
                                        {field.isRequired && <span className={styles.requiredBadge}>Required</span>}
                                    </div>
                                ))}
                                {attribute.fields.length > 3 && (
                                    <span className={styles.moreFields}>
                                        +{attribute.fields.length - 3} more fields
                                    </span>
                                )}
                            </div>
                            <div className={styles.cardActions}>
                                <button
                                    className={styles.editButton}
                                    onClick={() => openModal(attribute)}
                                >
                                    <RiEditLine /> Edit
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(attribute._id)}
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
                            <h2>{editingAttribute ? 'Edit Attribute' : 'Add New Attribute'}</h2>
                            <button className={styles.closeButton} onClick={closeModal}>
                                <RiCloseLine />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.modalForm}>
                            {/* Basic Info */}
                            <div className={styles.formSection}>
                                <h3 className={styles.sectionTitle}>Basic Information</h3>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>Attribute Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Product Specifications"
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Category *</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category._id} value={category._id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Description *</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe this attribute's purpose"
                                        rows="3"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Status</label>
                                    <select name="status" value={formData.status} onChange={handleInputChange}>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            {/* Fields Builder */}
                            <div className={styles.formSection}>
                                <div className={styles.sectionHeader}>
                                    <h3 className={styles.sectionTitle}>Form Fields</h3>
                                    <button
                                        type="button"
                                        className={styles.addFieldButton}
                                        onClick={addNewField}
                                    >
                                        <RiAddCircleLine /> Add Field
                                    </button>
                                </div>

                                <div className={styles.fieldsBuilder}>
                                    {formData.fields.length === 0 ? (
                                        <div className={styles.emptyState}>
                                            <p>No fields added yet. Click "Add Field" to get started.</p>
                                        </div>
                                    ) : (
                                        formData.fields.map((field, index) => (
                                            <div key={field.fieldId} className={styles.fieldBuilder}>
                                                <div className={styles.fieldBuilderHeader}>
                                                    <RiDraggable className={styles.dragIcon} />
                                                    <span className={styles.fieldNumber}>Field {index + 1}</span>
                                                    <div className={styles.fieldControls}>
                                                        <button
                                                            type="button"
                                                            className={styles.moveButton}
                                                            onClick={() => moveField(field.fieldId, 'up')}
                                                            disabled={index === 0}
                                                        >
                                                            <RiArrowUpLine />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={styles.moveButton}
                                                            onClick={() => moveField(field.fieldId, 'down')}
                                                            disabled={index === formData.fields.length - 1}
                                                        >
                                                            <RiArrowDownLine />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={styles.removeFieldButton}
                                                            onClick={() => removeField(field.fieldId)}
                                                        >
                                                            <RiCloseLine />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className={styles.fieldBuilderContent}>
                                                    <div className={styles.formRow}>
                                                        <div className={styles.formGroup}>
                                                            <label>Field Name *</label>
                                                            <input
                                                                type="text"
                                                                value={field.fieldName}
                                                                onChange={(e) =>
                                                                    updateField(field.fieldId, 'fieldName', e.target.value)
                                                                }
                                                                placeholder="e.g., Capacity"
                                                                required
                                                            />
                                                        </div>
                                                        <div className={styles.formGroup}>
                                                            <label>Field Type *</label>
                                                            <select
                                                                value={field.fieldType}
                                                                onChange={(e) =>
                                                                    updateField(field.fieldId, 'fieldType', e.target.value)
                                                                }
                                                            >
                                                                {FIELD_TYPES.map((type) => (
                                                                    <option key={type.value} value={type.value}>
                                                                        {type.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className={styles.formGroup}>
                                                        <label className={styles.checkboxLabel}>
                                                            <input
                                                                type="checkbox"
                                                                checked={field.isRequired}
                                                                onChange={(e) =>
                                                                    updateField(field.fieldId, 'isRequired', e.target.checked)
                                                                }
                                                            />
                                                            <span>Required Field</span>
                                                        </label>
                                                    </div>

                                                    {needsOptions(field.fieldType) && (
                                                        <div className={styles.optionsSection}>
                                                            <div className={styles.optionsHeader}>
                                                                <label>Options</label>
                                                                <button
                                                                    type="button"
                                                                    className={styles.addOptionButton}
                                                                    onClick={() => addOption(field.fieldId)}
                                                                >
                                                                    <RiAddLine /> Add Option
                                                                </button>
                                                            </div>
                                                            <div className={styles.optionsList}>
                                                                {field.options.map((option, optionIndex) => (
                                                                    <div key={optionIndex} className={styles.optionItem}>
                                                                        <input
                                                                            type="text"
                                                                            value={option}
                                                                            onChange={(e) =>
                                                                                updateOption(field.fieldId, optionIndex, e.target.value)
                                                                            }
                                                                            placeholder={`Option ${optionIndex + 1}`}
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            className={styles.removeOptionButton}
                                                                            onClick={() => removeOption(field.fieldId, optionIndex)}
                                                                        >
                                                                            <RiCloseLine />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelButton} onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.submitButton}>
                                    {editingAttribute ? 'Update Attribute' : 'Create Attribute'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttributesPage;