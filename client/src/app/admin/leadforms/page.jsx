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
  RiDownloadLine,
  RiAttachmentLine,
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiBuildingLine,
  RiMapPinLine,
  RiMoneyDollarCircleLine,
  RiCalendarLine,
  RiAlertLine,
} from 'react-icons/ri';
import styles from './page.module.css';

const LEAD_STATUS = [
  { value: 'new', label: 'New', color: '#3b82f6' },
  { value: 'contacted', label: 'Contacted', color: '#f59e0b' },
  { value: 'qualified', label: 'Qualified', color: '#8b5cf6' },
  { value: 'converted', label: 'Converted', color: '#10b981' },
  { value: 'lost', label: 'Lost', color: '#ef4444' },
];

const LEAD_SOURCES = [
  'Website',
  'Phone',
  'Email',
  'Social Media',
  'Referral',
  'Other',
];

const PRIORITY_LEVELS = [
  { value: 'urgent', label: 'Urgent', color: '#ef4444' },
  { value: 'high', label: 'High', color: '#f59e0b' },
  { value: 'medium', label: 'Medium', color: '#3b82f6' },
  { value: 'low', label: 'Low', color: '#94a3b8' },
];

const LeadFormsPage = () => {
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingLead, setEditingLead] = useState(null);
  const [attachments, setAttachments] = useState([]);
  
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    message: '',
    // Advanced
    productInterest: '',
    budget: '',
    timeline: '',
    source: 'Website',
    priority: 'medium',
    status: 'new',
    assignedTo: '',
    notes: '',
    // Attachments
    files: [],
    // Custom Fields
    customFields: {},
  });

  const [customFieldDefinitions, setCustomFieldDefinitions] = useState([
    { id: 'cf1', name: 'Preferred Installation Date', type: 'date' },
    { id: 'cf2', name: 'Number of Floors', type: 'number' },
    { id: 'cf3', name: 'Building Type', type: 'text' },
  ]);

  const [newCustomField, setNewCustomField] = useState({
    name: '',
    type: 'text',
  });
  useEffect(() => {
    fetchLeads();
    fetchUsers();
    fetchProducts();
  }, []);

  async function fetchLeads() {
    // Temp data
    const tempLeads = [
      {
        _id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh.k@example.com',
        phone: '+91 98765 43210',
        company: 'Tech Solutions Pvt Ltd',
        location: 'Mumbai, Maharashtra',
        message: 'Interested in residential elevator for 10-floor building',
        productInterest: '1',
        budget: '50-75 Lakhs',
        timeline: '3-6 months',
        source: 'Website',
        priority: 'high',
        status: 'new',
        assignedTo: '1',
        notes: 'Client seems serious, follow up tomorrow',
        files: [],
        customFields: {
          cf1: '2024-06-15',
          cf2: '10',
          cf3: 'Residential',
        },
        createdAt: '2024-02-25T09:30:00',
      },
      {
        _id: '2',
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 98765 43211',
        company: 'Metro Shopping Complex',
        location: 'Delhi, NCR',
        message: 'Need quotation for commercial escalators',
        productInterest: '2',
        budget: '1-2 Crores',
        timeline: '6-12 months',
        source: 'Referral',
        priority: 'medium',
        status: 'contacted',
        assignedTo: '2',
        notes: 'Sent initial quotation, waiting for response',
        files: ['proposal.pdf'],
        customFields: {
          cf1: '2024-09-01',
          cf2: '5',
          cf3: 'Commercial',
        },
        createdAt: '2024-02-23T14:15:00',
      },
      {
        _id: '3',
        name: 'Amit Patel',
        email: 'amit.p@example.com',
        phone: '+91 98765 43212',
        company: 'Healthcare Hospitals',
        location: 'Bangalore, Karnataka',
        message: 'Hospital elevator requirements',
        productInterest: '3',
        budget: 'Above 2 Crores',
        timeline: '12+ months',
        source: 'Phone',
        priority: 'urgent',
        status: 'qualified',
        assignedTo: '1',
        notes: 'Meeting scheduled for site visit',
        files: ['floor-plans.pdf', 'specifications.docx'],
        customFields: {
          cf1: '2025-03-01',
          cf2: '15',
          cf3: 'Healthcare',
        },
        createdAt: '2024-02-20T11:45:00',
      },
    ];
    setLeads(tempLeads);
  };

  async function fetchUsers() {
    // Temp data
    const tempUsers = [
      { _id: '1', firstName: 'John', lastName: 'Doe' },
      { _id: '2', firstName: 'Sarah', lastName: 'Williams' },
      { _id: '3', firstName: 'Mike', lastName: 'Johnson' },
    ];
    setUsers(tempUsers);
  };

  async function fetchProducts() {
    // Temp data
    const tempProducts = [
      { _id: '1', name: 'Residential Elevator' },
      { _id: '2', name: 'Commercial Escalator' },
      { _id: '3', name: 'Hospital Elevator' },
    ];
    setProducts(tempProducts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCustomFieldChange = (fieldId, value) => {
    setFormData({
      ...formData,
      customFields: {
        ...formData.customFields,
        [fieldId]: value,
      },
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map((f) => f.name);
    setAttachments(files);
    setFormData({ ...formData, files: [...formData.files, ...fileNames] });
  };

  const removeFile = (fileName) => {
    const newFiles = formData.files.filter((f) => f !== fileName);
    setFormData({ ...formData, files: newFiles });
  };

  const addCustomField = () => {
    if (!newCustomField.name.trim()) {
      alert('Please enter a field name');
      return;
    }

    const newField = {
      id: `cf${Date.now()}`,
      name: newCustomField.name,
      type: newCustomField.type,
    };

    setCustomFieldDefinitions([...customFieldDefinitions, newField]);
    setNewCustomField({ name: '', type: 'text' });
  };

  const removeCustomFieldDefinition = (fieldId) => {
    if (confirm('Remove this custom field? Data will be lost for all leads.')) {
      setCustomFieldDefinitions(customFieldDefinitions.filter((f) => f.id !== fieldId));
    }
  };

  const openModal = (lead = null) => {
    if (lead) {
      setEditingLead(lead);
      setFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        location: lead.location,
        message: lead.message,
        productInterest: lead.productInterest,
        budget: lead.budget,
        timeline: lead.timeline,
        source: lead.source,
        priority: lead.priority,
        status: lead.status,
        assignedTo: lead.assignedTo,
        notes: lead.notes,
        files: lead.files,
        customFields: lead.customFields,
      });
    } else {
      setEditingLead(null);
      const emptyCustomFields = {};
      customFieldDefinitions.forEach((field) => {
        emptyCustomFields[field.id] = '';
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        location: '',
        message: '',
        productInterest: '',
        budget: '',
        timeline: '',
        source: 'Website',
        priority: 'medium',
        status: 'new',
        assignedTo: '',
        notes: '',
        files: [],
        customFields: emptyCustomFields,
      });
    }
    setAttachments([]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLead(null);
    setAttachments([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingLead) {
      const updatedLeads = leads.map((lead) =>
        lead._id === editingLead._id ? { ...lead, ...formData } : lead
      );
      setLeads(updatedLeads);
    } else {
      const newLead = {
        _id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      setLeads([...leads, newLead]);
    }

    closeModal();
  };

  const handleDelete = async (leadId) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter((lead) => lead._id !== leadId));
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Company',
      'Location',
      'Product Interest',
      'Budget',
      'Timeline',
      'Source',
      'Priority',
      'Status',
      'Assigned To',
      'Created At',
      ...customFieldDefinitions.map((f) => f.name),
    ];

    const rows = leads.map((lead) => {
      const assignedUser = users.find((u) => u._id === lead.assignedTo);
      const product = products.find((p) => p._id === lead.productInterest);
      
      return [
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.location,
        product?.name || '',
        lead.budget,
        lead.timeline,
        lead.source,
        lead.priority,
        lead.status,
        assignedUser ? `${assignedUser.firstName} ${assignedUser.lastName}` : '',
        new Date(lead.createdAt).toLocaleString(),
        ...customFieldDefinitions.map((f) => lead.customFields[f.id] || ''),
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    return LEAD_STATUS.find((s) => s.value === status)?.color || '#94a3b8';
  };

  const getPriorityColor = (priority) => {
    return PRIORITY_LEVELS.find((p) => p.value === priority)?.color || '#94a3b8';
  };

  const getProductName = (productId) => {
    return products.find((p) => p._id === productId)?.name || 'N/A';
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unassigned';
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <div className={styles.leadFormsPage}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Lead Forms</h1>
            <p className={styles.pageSubtitle}>Manage customer inquiries and leads</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.exportButton} onClick={exportToCSV}>
              <RiDownloadLine /> Export CSV
            </button>
            <button className={styles.addButton} onClick={() => openModal()}>
              <RiAddLine /> Add Lead
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
              <RiUserLine style={{ color: '#3b82f6' }} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{leads.length}</div>
              <div className={styles.statLabel}>Total Leads</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
              <RiAlertLine style={{ color: '#3b82f6' }} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {leads.filter((l) => l.status === 'new').length}
              </div>
              <div className={styles.statLabel}>New Leads</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
              <RiUserLine style={{ color: '#10b981' }} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {leads.filter((l) => l.status === 'converted').length}
              </div>
              <div className={styles.statLabel}>Converted</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(239, 68, 68, 0.15)' }}>
              <RiAlertLine style={{ color: '#ef4444' }} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {leads.filter((l) => l.priority === 'urgent').length}
              </div>
              <div className={styles.statLabel}>Urgent</div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <RiSearchLine className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search leads..."
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
                  <th>Contact</th>
                  <th>Company</th>
                  <th>Product Interest</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead._id}>
                    <td className={styles.nameCell}>{lead.name}</td>
                    <td>
                      <div className={styles.contactInfo}>
                        <div>{lead.email}</div>
                        <div className={styles.phone}>{lead.phone}</div>
                      </div>
                    </td>
                    <td>{lead.company}</td>
                    <td>{getProductName(lead.productInterest)}</td>
                    <td>
                      <span
                        className={styles.priorityBadge}
                        style={{
                          background: `${getPriorityColor(lead.priority)}15`,
                          color: getPriorityColor(lead.priority),
                        }}
                      >
                        {lead.priority}
                      </span>
                    </td>
                    <td>
                      <span
                        className={styles.statusBadge}
                        style={{
                          background: `${getStatusColor(lead.status)}15`,
                          color: getStatusColor(lead.status),
                        }}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td>{getUserName(lead.assignedTo)}</td>
                    <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.editButton}
                          onClick={() => openModal(lead)}
                        >
                          <RiEditLine />
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(lead._id)}
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
            {filteredLeads.map((lead) => (
              <div key={lead._id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardBadges}>
                    <span
                      className={styles.priorityBadge}
                      style={{ background: getPriorityColor(lead.priority), color: 'white' }}
                    >
                      {lead.priority}
                    </span>
                    <span
                      className={styles.statusBadge}
                      style={{ background: getStatusColor(lead.status), color: 'white' }}
                    >
                      {lead.status}
                    </span>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardName}>{lead.name}</h3>
                  <div className={styles.cardDetails}>
                    <div className={styles.detailItem}>
                      <RiMailLine />
                      <span>{lead.email}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <RiPhoneLine />
                      <span>{lead.phone}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <RiBuildingLine />
                      <span>{lead.company}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <RiMapPinLine />
                      <span>{lead.location}</span>
                    </div>
                  </div>
                  <div className={styles.cardMeta}>
                    <div className={styles.metaItem}>
                      <strong>Product:</strong> {getProductName(lead.productInterest)}
                    </div>
                    <div className={styles.metaItem}>
                      <strong>Budget:</strong> {lead.budget}
                    </div>
                    <div className={styles.metaItem}>
                      <strong>Timeline:</strong> {lead.timeline}
                    </div>
                    <div className={styles.metaItem}>
                      <strong>Source:</strong> {lead.source}
                    </div>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.assignedUser}>
                      <RiUserLine /> {getUserName(lead.assignedTo)}
                    </span>
                    <span className={styles.cardDate}>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className={styles.cardActions}>
                  <button className={styles.editButton} onClick={() => openModal(lead)}>
                    <RiEditLine /> Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(lead._id)}
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
                <h2>{editingLead ? 'Edit Lead' : 'Add New Lead'}</h2>
                <button className={styles.closeButton} onClick={closeModal}>
                  <RiCloseLine />
                </button>
              </div>
              <form onSubmit={handleSubmit} className={styles.modalForm}>
                {/* Basic Information */}
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>Basic Information</h3>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                        required
                      />
                    </div>
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
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, State"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Lead message or inquiry"
                      rows="4"
                      required
                    />
                  </div>
                </div>

                {/* Product & Requirements */}
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>Product & Requirements</h3>
                  <div className={styles.formGroup}>
                    <label>Product Interest</label>
                    <select
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Product</option>
                      {products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Budget Range</label>
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder="e.g., 50-75 Lakhs"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Timeline</label>
                      <input
                        type="text"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        placeholder="e.g., 3-6 months"
                      />
                    </div>
                  </div>
                </div>

                {/* Lead Management */}
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>Lead Management</h3>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Source *</label>
                      <select name="source" value={formData.source} onChange={handleInputChange}>
                        {LEAD_SOURCES.map((source) => (
                          <option key={source} value={source}>
                            {source}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Priority *</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                      >
                        {PRIORITY_LEVELS.map((priority) => (
                          <option key={priority.value} value={priority.value}>
                            {priority.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Status *</label>
                      <select name="status" value={formData.status} onChange={handleInputChange}>
                        {LEAD_STATUS.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Assign To</label>
                      <select
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleInputChange}
                      >
                        <option value="">Select User</option>
                        {users.map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.firstName} {user.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Internal notes about this lead"
                      rows="3"
                    />
                  </div>
                </div>

                {/* File Attachments */}
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>Attachments</h3>
                  <div className={styles.formGroup}>
                    <label>Upload Files</label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className={styles.fileInput}
                      id="fileUpload"
                    />
                    <label htmlFor="fileUpload" className={styles.uploadLabel}>
                      <RiAttachmentLine /> Choose Files
                    </label>
                    {formData.files.length > 0 && (
                      <div className={styles.filesList}>
                        {formData.files.map((file, index) => (
                          <div key={index} className={styles.fileItem}>
                            <RiAttachmentLine />
                            <span>{file}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(file)}
                              className={styles.removeFileBtn}
                            >
                              <RiCloseLine />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Fields */}
                <div className={styles.formSection}>
                  <div className={styles.customFieldsHeader}>
                    <h3 className={styles.sectionTitle}>Custom Fields</h3>
                    <div className={styles.addCustomFieldForm}>
                      <input
                        type="text"
                        value={newCustomField.name}
                        onChange={(e) =>
                          setNewCustomField({ ...newCustomField, name: e.target.value })
                        }
                        placeholder="Field name"
                        className={styles.customFieldInput}
                      />
                      <select
                        value={newCustomField.type}
                        onChange={(e) =>
                          setNewCustomField({ ...newCustomField, type: e.target.value })
                        }
                        className={styles.customFieldType}
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                      </select>
                      <button
                        type="button"
                        onClick={addCustomField}
                        className={styles.addFieldBtn}
                      >
                        <RiAddLine /> Add
                      </button>
                    </div>
                  </div>

                  {customFieldDefinitions.length > 0 ? (
                    <div className={styles.customFieldsList}>
                      {customFieldDefinitions.map((field) => (
                        <div key={field.id} className={styles.customFieldItem}>
                          <div className={styles.formGroup}>
                            <div className={styles.customFieldLabel}>
                              <label>{field.name}</label>
                              <button
                                type="button"
                                onClick={() => removeCustomFieldDefinition(field.id)}
                                className={styles.removeFieldDefBtn}
                                title="Remove field definition"
                              >
                                <RiCloseLine />
                              </button>
                            </div>
                            <input
                              type={field.type}
                              value={formData.customFields[field.id] || ''}
                              onChange={(e) =>
                                handleCustomFieldChange(field.id, e.target.value)
                              }
                              placeholder={`Enter ${field.name.toLowerCase()}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.noFieldsText}>
                      No custom fields defined. Add fields above to capture additional information.
                    </p>
                  )}
                </div>

                <div className={styles.modalActions}>
                  <button type="button" className={styles.cancelButton} onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    {editingLead ? 'Update Lead' : 'Create Lead'}
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

export default LeadFormsPage;
