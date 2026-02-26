'use client';

import { useEffect, useState } from 'react';
import apiConnector from '@/lib/apiConnector';

export default function TestPage() {
    const [status, setStatus] = useState('Testing...');

    useEffect(() => {
        const testConnection = async () => {
            try {
                const response = await apiConnector.get('/');
                setStatus(`✅ Connected! ${response.message || 'API is running'}`);
            } catch (error) {
                setStatus(`❌ Connection failed: ${error.message}`);
            }
        };

        testConnection();
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>API Connection Test</h1>
            <p>{status}</p>
        </div>
    );
}