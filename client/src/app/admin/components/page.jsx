'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
    RiAddLine,
    RiSearchLine,
    RiEditLine,
    RiDeleteBinLine,
    RiCloseLine,
    RiGridFill,
    RiListCheck,
    RiFilterLine,
    RiFileListLine,
    RiCheckboxCircleLine,
} from 'react-icons/ri';
import styles from './page.module.css';
import { getComponents, createComponent, updateComponent, deleteComponent } from '@/services/components.service';
import { getAttributes } from '@/services/attributes.service';

const ComponentsPage = () => {
    const [components, setComponents] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('table');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingComponent, setEditingComponent] = useState(null);
    const [selectedAttribute, setSelectedAttribute] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'active',
        attributeId: '',
        filledData: {},
    });

    async function fetchComponents() {
        try {
            const data = await getComponents();
            setComponents(data || []);
        } catch (error) {
            console.error('Error fetching components:', error);
        }
    }

    async function fetchAttributes() {
        try {
            const data = await getAttributes();
            setAttributes((data || []).filter((attr) => attr.status === 'active'));
        } catch (error) {
            console.error('Error fetching attributes:', error);
        }
    }


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchComponents();
            fetchAttributes();
        }, 0);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleAttributeSelect = (e) => {
        const attributeId = e.target.value;
        const attribute = attributes.find((attr) => attr._id === attributeId);

        setFormData({
            ...formData,
            attributeId,
            filledData: {},
        });
        setSelectedAttribute(attribute);
    };

    const handleFieldChange = (fieldId, value, fieldType) => {
        let processedValue = value;

        // Handle checkbox - store as array
        if (fieldType === 'checkbox') {
            const currentValues = formData.filledData[fieldId] || [];
            if (currentValues.includes(value)) {
                processedValue = currentValues.filter((v) => v !== value);
            } else {
                processedValue = [...currentValues, value];
            }
        }

        setFormData({
            ...formData,
            filledData: {
                ...formData.filledData,
                [fieldId]: processedValue,
            },
        });
    };

    const openModal = (component = null) => {
        if (component) {
            setEditingComponent(component);
            const selectedId = component.attributeId?._id || component.attributeId;
            const attribute = attributes.find((attr) => attr._id === selectedId);
            setSelectedAttribute(attribute);
            setFormData({
                name: component.name,
                description: component.description,
                status: component.status,
                attributeId: component.attributeId?._id || component.attributeId,
                filledData: component.filledData,
            });
        } else {
            setEditingComponent(null);
            setSelectedAttribute(null);
            setFormData({
                name: '',
                description: '',
                status: 'active',
                attributeId: '',
                filledData: {},
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingComponent(null);
        setSelectedAttribute(null);
        setFormData({
            name: '',
            description: '',
            status: 'active',
            attributeId: '',
            filledData: {},
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get attribute name for display
        const attribute = attributes.find((attr) => attr._id === formData.attributeId);
        const componentData = {
            ...formData,
            attributeName: attribute?.name,
        };

        try {
            if (editingComponent) {
                await updateComponent(editingComponent._id, componentData);
            } else {
                await createComponent(componentData);
            }

            await fetchComponents();
            toast.success(`Component ${editingComponent ? 'updated' : 'created'} successfully`);
            closeModal();
        } catch (error) {
            console.error('Error saving component:', error);
            toast.error(error?.message || 'Failed to save component');
        }
    };

    const handleDelete = async (componentId) => {
        if (confirm('Are you sure you want to delete this component?')) {
            try {
                const response = await deleteComponent(componentId);
                await fetchComponents();
                toast.success(response?.message || 'Component action completed');
            } catch (error) {
                console.error('Error deleting component:', error);
                toast.error(error?.message || 'Failed to delete component');
            }
        }
    };

    const renderField = (field) => {
        const value = formData.filledData[field.fieldId] || '';

        switch (field.fieldType) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleFieldChange(field.fieldId, e.target.value, field.fieldType)}
                        placeholder={`Enter ${field.fieldName.toLowerCase()}`}
                        required={field.isRequired}
                    />
                );

            case 'number':
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => handleFieldChange(field.fieldId, e.target.value, field.fieldType)}
                        placeholder={`Enter ${field.fieldName.toLowerCase()}`}
                        required={field.isRequired}
                    />
                );

            case 'textarea':
                return (
                    <textarea
                        value={value}
                        onChange={(e) => handleFieldChange(field.fieldId, e.target.value, field.fieldType)}
                        placeholder={`Enter ${field.fieldName.toLowerCase()}`}
                        rows="4"
                        required={field.isRequired}
                    />
                );

            case 'date':
                return (
                    <input
                        type="date"
                        value={value}
                        onChange={(e) => handleFieldChange(field.fieldId, e.target.value, field.fieldType)}
                        required={field.isRequired}
                    />
                );

            case 'dropdown':
                return (
                    <select
                        value={value}
                        onChange={(e) => handleFieldChange(field.fieldId, e.target.value, field.fieldType)}
                        required={field.isRequired}
                    >
                        <option value="">Select {field.fieldName}</option>
                        {field.options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );

            case 'radio':
                return (
                    <div className={styles.radioGroup}>
                        {field.options.map((option, index) => (
                            <label key={index} className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name={field.fieldId}
                                    value={option}
                                    checked={value === option}
                                    onChange={(e) => handleFieldChange(field.fieldId, e.target.value, field.fieldType)}
                                    required={field.isRequired}
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'checkbox':
                return (
                    <div className={styles.checkboxGroup}>
                        {field.options.map((option, index) => (
                            <label key={index} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={Array.isArray(value) && value.includes(option)}
                                    onChange={(e) => handleFieldChange(field.fieldId, e.target.value, field.fieldType)}
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'file':
                return (
                    <input
                        type="file"
                        onChange={(e) => {
                            const fileName = e.target.files[0]?.name || '';
                            handleFieldChange(field.fieldId, fileName, field.fieldType);
                        }}
                        required={field.isRequired}
                    />
                );

            default:
                return null;
        }
    };

    const getFieldDisplayValue = (field, value) => {
        if (!value) return 'N/A';

        if (Array.isArray(value)) {
            return value.join(', ');
        }

        return value.toString();
    };

    const filteredComponents = components.filter((comp) =>
        comp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.componentsPage}>
            {/* Header */}
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Components</h1>
                    <p className={styles.pageSubtitle}>Manage filled attribute forms</p>
                </div>
                <button className={styles.addButton} onClick={() => openModal()}>
                    <RiAddLine /> Add Component
                </button>
            </div>

            {/* Toolbar */}
            <div className={styles.toolbar}>
                <div className={styles.searchWrapper}>
                    <RiSearchLine className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search components..."
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
                                <th>Attribute Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredComponents.map((component) => (
                                <tr key={component._id}>
                                    <td className={styles.componentName}>{component.name}</td>
                                    <td className={styles.componentDescription}>
                                        {component.description.substring(0, 60)}...
                                    </td>
                                    <td>
                                        <span className={styles.attributeBadge}>
                                            <RiFileListLine /> {component.attributeName}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`${styles.statusBadge} ${component.status === 'active' ? styles.active : styles.inactive
                                                }`}
                                        >
                                            {component.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <button
                                                className={styles.editButton}
                                                onClick={() => openModal(component)}
                                            >
                                                <RiEditLine />
                                            </button>
                                            <button
                                                className={styles.deleteButton}
                                                onClick={() => handleDelete(component._id)}
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
                    {filteredComponents.map((component) => {
                        const selectedId = component.attributeId?._id || component.attributeId;
            const attribute = attributes.find((attr) => attr._id === selectedId);
                        return (
                            <div key={component._id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div>
                                        <h3 className={styles.cardTitle}>{component.name}</h3>
                                        <span
                                            className={`${styles.statusBadge} ${component.status === 'active' ? styles.active : styles.inactive
                                                }`}
                                        >
                                            {component.status}
                                        </span>
                                    </div>
                                </div>
                                <span className={styles.attributeTypeBadge}>
                                    <RiFileListLine /> {component.attributeName}
                                </span>
                                <p className={styles.cardDescription}>{component.description}</p>
                                <div className={styles.filledDataSection}>
                                    <h4 className={styles.dataTitle}>Filled Data</h4>
                                    {attribute?.fields.slice(0, 3).map((field) => (
                                        <div key={field.fieldId} className={styles.dataItem}>
                                            <span className={styles.dataLabel}>{field.fieldName}:</span>
                                            <span className={styles.dataValue}>
                                                {getFieldDisplayValue(field, component.filledData[field.fieldId])}
                                            </span>
                                        </div>
                                    ))}
                                    {attribute && attribute.fields.length > 3 && (
                                        <span className={styles.moreData}>
                                            +{attribute.fields.length - 3} more fields
                                        </span>
                                    )}
                                </div>
                                <div className={styles.cardActions}>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => openModal(component)}
                                    >
                                        <RiEditLine /> Edit
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(component._id)}
                                    >
                                        <RiDeleteBinLine /> Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{editingComponent ? 'Edit Component' : 'Add New Component'}</h2>
                            <button className={styles.closeButton} onClick={closeModal}>
                                <RiCloseLine />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.modalForm}>
                            {/* Basic Info */}
                            <div className={styles.formSection}>
                                <h3 className={styles.sectionTitle}>Basic Information</h3>
                                <div className={styles.formGroup}>
                                    <label>Component Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Standard Elevator Specs"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Description *</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe this component"
                                        rows="3"
                                        required
                                    />
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>Select Attribute (Form Type) *</label>
                                        <select
                                            name="attributeId"
                                            value={formData.attributeId}
                                            onChange={handleAttributeSelect}
                                            required
                                        >
                                            <option value="">Choose an attribute</option>
                                            {attributes.map((attribute) => (
                                                <option key={attribute._id} value={attribute._id}>
                                                    {attribute.name} ({attribute.fields.length} fields)
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Status</label>
                                        <select name="status" value={formData.status} onChange={handleInputChange}>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Form Fields */}
                            {selectedAttribute && (
                                <div className={styles.formSection}>
                                    <div className={styles.sectionHeader}>
                                        <h3 className={styles.sectionTitle}>
                                            Fill Form: {selectedAttribute.name}
                                        </h3>
                                        <span className={styles.fieldCount}>
                                            {selectedAttribute.fields.length} fields
                                        </span>
                                    </div>
                                    <p className={styles.sectionDescription}>
                                        {selectedAttribute.description}
                                    </p>

                                    <div className={styles.dynamicFields}>
                                        {selectedAttribute.fields.map((field) => (
                                            <div key={field.fieldId} className={styles.formGroup}>
                                                <label>
                                                    {field.fieldName}
                                                    {field.isRequired && <span className={styles.required}> *</span>}
                                                </label>
                                                {renderField(field)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!selectedAttribute && formData.attributeId === '' && (
                                <div className={styles.emptyState}>
                                    <RiFileListLine className={styles.emptyIcon} />
                                    <p>Select an attribute to fill its form fields</p>
                                </div>
                            )}

                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelButton} onClick={closeModal}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    disabled={!selectedAttribute}
                                >
                                    {editingComponent ? 'Update Component' : 'Create Component'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComponentsPage;