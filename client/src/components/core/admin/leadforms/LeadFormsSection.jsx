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
} from 'react-icons/ri';
import styles from './LeadFormsSection.module.css';

const mockLeads = [
  {
    id: 'LD-2081',
    name: 'Anita Sharma',
    phone: '+91 98200 11223',
    project: 'Skyline Residency',
    requirement: 'Passenger Lift (13 Person)',
    source: 'Website Form',
    status: 'new',
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
    submittedOn: '2026-01-28',
  },
];

export default function LeadFormsSection() {
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLeads = useMemo(() => {
    return mockLeads.filter((lead) => {
      const isMatchingSearch =
        lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.requirement.toLowerCase().includes(searchQuery.toLowerCase());

      const isMatchingStatus = statusFilter === 'all' || lead.status === statusFilter;

      return isMatchingSearch && isMatchingStatus;
    });
  }, [searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const total = mockLeads.length;
    const newCount = mockLeads.filter((lead) => lead.status === 'new').length;
    const contactedCount = mockLeads.filter((lead) => lead.status === 'contacted').length;
    const closedCount = mockLeads.filter((lead) => lead.status === 'closed').length;

    return {
      total,
      newCount,
      contactedCount,
      closedCount,
    };
  }, []);

  return (
    <section className={styles.leadFormsPage}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Lead Forms</h1>
          <p className={styles.pageSubtitle}>Track, qualify, and manage incoming website enquiries.</p>
        </div>
        <button type="button" className={styles.addButton}>
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
                      <button type="button" className={styles.editButton}>
                        <RiEditLine /> Edit
                      </button>
                      <button type="button" className={styles.deleteButton}>
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
              <p className={styles.cardDetail}><strong>Project:</strong> {lead.project}</p>
              <p className={styles.cardDetail}><strong>Requirement:</strong> {lead.requirement}</p>
              <p className={styles.cardDetail}><strong>Source:</strong> {lead.source}</p>
              <p className={styles.cardDetail}><strong>Submitted:</strong> {lead.submittedOn}</p>

              <div className={styles.cardActions}>
                <button type="button" className={styles.editButton}>
                  <RiEditLine /> Edit
                </button>
                <button type="button" className={styles.deleteButton}>
                  <RiDeleteBinLine /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
