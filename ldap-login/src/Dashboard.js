import React, { useEffect, useState } from 'react';

function Dashboard() {
    const [groups, setGroups] = useState([]);
    const [passwords, setPasswords] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token');

            if (!token) {
                setError('No access token found');
                return;
            }

            try {
                // Получение групп
                const groupsResponse = await fetch('http://localhost:8000/user/groups', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!groupsResponse.ok) {
                    throw new Error('Failed to fetch groups');
                }

                const groupsData = await groupsResponse.json();
                setGroups(groupsData);

                // Получение паролей
                const passwordsResponse = await fetch('http://localhost:8000/passwords', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!passwordsResponse.ok) {
                    throw new Error('Failed to fetch passwords');
                }

                const passwordsData = await passwordsResponse.json();
                setPasswords(passwordsData);
            } catch (error) {
                setError('Error: ' + error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div>
                <h3>Groups</h3>
                {groups.length > 0 ? (
                    <ul>
                        {groups.map((group, index) => (
                            <li key={index}>{group.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No groups found</p>
                )}
            </div>

            <div>
                <h3>Passwords</h3>
                {passwords.length > 0 ? (
                    <ul>
                        {passwords.map((password, index) => (
                            <li key={index}>
                                <strong>{password.description}</strong>: {password.login_password}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No passwords found</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
