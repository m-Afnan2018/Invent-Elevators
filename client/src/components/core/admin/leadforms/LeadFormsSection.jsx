'use client';

import { useMemo, useState } from 'react';
import {
  RiAddLine,
  RiSearchLine,
  RiGridFill,
  RiListCheck,
  RiFilterLine,
  RiEditLine,
  RiDeleteBinLine,
  RiCloseLine,
} from 'react-icons/ri';
import styles from './LeadFormsSection.module.css';

const initialLeads = [
  {
    id: 'LD-2081',
    name: 'Anita Sharma',
    phone: '+91 98200 11223',
    project: 'Skyline Residency',
    requirement: 'Passenger Lift (13 Person)',
    source: 'Website Form',
    status: 'new',
    notes: 'Requested quick quote and AMC details.',
    submittedOn: '2026-02-01',
  },
  {
    id: 'LD-2080',
    name: 'Arjun Mehta',
    phone: '+91 98111 98111',
    project: 'Nova Tech Park',
    requirement: 'Freight Lift (2000kg)',
    source: 'Campaign',
    status: 'contacted',
    notes: 'Shared brochure and tentative pricing.',
    submittedOn: '2026-01-30',
  },
  {
    id: 'LD-2079',
    name: 'Priya Kapoor',
    phone: '+91 98765 22341',
    project: 'Palm Greens',
    requirement: 'Home Lift (G+3)',
    source: 'Referral',
    status: 'qualified',
    notes: 'Site visit pending for next week.',
    submittedOn: '2026-01-29',
  },
  {
    id: 'LD-2078',
    name: 'Rahul Verma',
    phone: '+91 98900 44556',
    project: 'Horizon Mall',
    requirement: 'Panoramic Lift',
    source: 'Website Form',
    status: 'closed',
    notes: 'Closed won with Q1 installation target.',
    submittedOn: '2026-01-28',
  },
];

const emptyLeadForm = {
  name: '',
  phone: '',
  project: '',
  requirement: '',
  source: 'Website Form',
  status: 'new',
  notes: '',
};

export default function LeadFormsSection() {
  const [leads, setLeads] = useState(initialLeads);
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState(emptyLeadForm);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const isMatchingSearch =
        lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.requirement.toLowerCase().includes(searchQuery.toLowerCase());

      const isMatchingStatus = statusFilter === 'all' || lead.status === statusFilter;

      return isMatchingSearch && isMatchingStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((lead) => lead.status === 'new').length;
    const contactedCount = leads.filter((lead) => lead.status === 'contacted').length;
    const closedCount = leads.filter((lead) => lead.status === 'closed').length;

    return {
      total,
      newCount,
      contactedCount,
      closedCount,
    };
  }, [leads]);

  const openModal = (lead = null) => {
    if (lead) {
      setEditingLead(lead);
      setFormData({
        name: lead.name,
        phone: lead.phone,
        project: lead.project,
        requirement: lead.requirement,
        source: lead.source,
        status: lead.status,
        notes: lead.notes,
      });
    } else {
      setEditingLead(null);
      setFormData(emptyLeadForm);
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLead(null);
    setFormData(emptyLeadForm);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingLead) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === editingLead.id
            ? {
                ...lead,
                ...formData,
              }
            : lead
        )
      );
    } else {
      const newId = `LD-${Date.now().toString().slice(-5)}`;
      const newLead = {
        id: newId,
        ...formData,
        submittedOn: new Date().toISOString().split('T')[0],
      };
      setLeads((prev) => [newLead, ...prev]);
    }

    closeModal();
  };

  const handleDelete = (leadId) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
    }
  };

  return (
    <section className={styles.leadFormsPage}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Lead Forms</h1>
          <p className={styles.pageSubtitle}>Track, qualify, and manage incoming website enquiries.</p>
        </div>
        <button type="button" className={styles.addButton} onClick={() => openModal()}>
          <RiAddLine />
          Create Lead
        </button>
      </div>

      <div className={styles.statsGrid}>
        <article className={styles.statCard}>
          <p className={styles.statLabel}>Total Leads</p>
          <p className={styles.statValue}>{stats.total}</p>
        </article>
        <article className={styles.statCard}>
          <p className={styles.statLabel}>New</p>
          <p className={styles.statValue}>{stats.newCount}</p>
        </article>
        <article className={styles.statCard}>
          <p className={styles.statLabel}>Contacted</p>
          <p className={styles.statValue}>{stats.contactedCount}</p>
        </article>
        <article className={styles.statCard}>
          <p className={styles.statLabel}>Closed</p>
          <p className={styles.statValue}>{stats.closedCount}</p>
        </article>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <RiSearchLine className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search leads by id, name, project..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className={styles.toolbarActions}>
          <div className={styles.filterGroup}>
            <RiFilterLine />
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className={styles.viewToggle}>
            <button
              type="button"
              className={`${styles.viewButton} ${viewMode === 'table' ? styles.active : ''}`}
              onClick={() => setViewMode('table')}
              aria-label="Table view"
            >
              <RiListCheck />
            </button>
            <button
              type="button"
              className={`${styles.viewButton} ${viewMode === 'cards' ? styles.active : ''}`}
              onClick={() => setViewMode('cards')}
              aria-label="Card view"
            >
              <RiGridFill />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Lead</th>
                <th>Project</th>
                <th>Requirement</th>
                <th>Source</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <p className={styles.leadName}>{lead.name}</p>
                    <p className={styles.leadMeta}>{lead.id} • {lead.phone}</p>
                  </td>
                  <td>{lead.project}</td>
                  <td>{lead.requirement}</td>
                  <td>{lead.source}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[lead.status]}`}>{lead.status}</span>
                  </td>
                  <td>{lead.submittedOn}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button type="button" className={styles.editButton} onClick={() => openModal(lead)}>
                        <RiEditLine /> Edit
                      </button>
                      <button type="button" className={styles.deleteButton} onClick={() => handleDelete(lead.id)}>
                        <RiDeleteBinLine /> Delete
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
            <article key={lead.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.cardTitle}>{lead.name}</h3>
                  <p className={styles.leadMeta}>{lead.id} • {lead.phone}</p>
                </div>
                <span className={`${styles.statusBadge} ${styles[lead.status]}`}>{lead.status}</span>
              </div>
              <p className={styles.cardDetail}>
                <strong>Project:</strong> {lead.project}
              </p>
              <p className={styles.cardDetail}>
                <strong>Requirement:</strong> {lead.requirement}
              </p>
              <p className={styles.cardDetail}>
                <strong>Source:</strong> {lead.source}
              </p>
              <p className={styles.cardDetail}>
                <strong>Submitted:</strong> {lead.submittedOn}
              </p>

              <div className={styles.cardActions}>
                <button type="button" className={styles.editButton} onClick={() => openModal(lead)}>
                  <RiEditLine /> Edit
                </button>
                <button type="button" className={styles.deleteButton} onClick={() => handleDelete(lead.id)}>
                  <RiDeleteBinLine /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingLead ? 'Edit Lead' : 'Create Lead'}</h2>
              <button type="button" className={styles.closeButton} onClick={closeModal}>
                <RiCloseLine />
              </button>
            </div>

            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Lead Details</h3>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Lead Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter lead name"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="project">Project *</label>
                    <input
                      id="project"
                      name="project"
                      type="text"
                      value={formData.project}
                      onChange={handleInputChange}
                      placeholder="Enter project name"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="requirement">Requirement *</label>
                    <input
                      id="requirement"
                      name="requirement"
                      type="text"
                      value={formData.requirement}
                      onChange={handleInputChange}
                      placeholder="Enter requirement"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="source">Source</label>
                    <select id="source" name="source" value={formData.source} onChange={handleInputChange}>
                      <option value="Website Form">Website Form</option>
                      <option value="Campaign">Campaign</option>
                      <option value="Referral">Referral</option>
                      <option value="Direct Call">Direct Call</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="4"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Add notes for sales follow-up"
                  />
                </div>
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
    </section>
  );
}
