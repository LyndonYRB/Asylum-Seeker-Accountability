import React, { useEffect, useState } from 'react';
import { fetchLogs } from '../services/apiService';

const Logs = ({ hotelId }) => {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const getLogs = async () => {
            try {
                const data = await fetchLogs(hotelId);
                setLogs(data);
            } catch (err) {
                setError(err.message);
            }
        };
        getLogs();
    }, [hotelId]);

    return (
        <div>
            <h2>Logs</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {logs.map((log) => (
                    <li key={log._id}>
                        {log.description} by {log.performedBy} on {new Date(log.createdAt).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Logs;
