import React, { useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) return;

    if (editingIndex !== null) {
      const updated = [...users];
      updated[editingIndex] = form;
      setUsers(updated);
      setEditingIndex(null);
    } else {
      setUsers([...users, form]);
    }

    setForm({ name: '', email: '' });
  };

  const handleEdit = (index) => {
    setForm(users[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = users.filter((_, i) => i !== index);
    setUsers(filtered);
  };

  const styles = {
    container: { maxWidth: 500, margin: '2rem auto', fontFamily: 'sans-serif' },
    input: { padding: 8, margin: 5, width: '90%' },
    button: { padding: 8, margin: 5 },
    userBox: { padding: '10px', margin: '10px 0', background: '#eee', borderRadius: 6 },
  };

  return (
    <div style={styles.container}>
      <h2>User Manager (CRUD App)</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={styles.input}
      />
      <button onClick={handleSubmit} style={styles.button}>
        {editingIndex !== null ? 'Update User' : 'Add User'}
      </button>

      {users.length === 0 ? (
        <p>No users added yet.</p>
      ) : (
        users.map((user, index) => (
          <div key={index} style={styles.userBox}>
            <strong>{user.name}</strong> <br />
            <span>{user.email}</span>
            <div>
              <button onClick={() => handleEdit(index)} style={styles.button}>Edit</button>
              <button onClick={() => handleDelete(index)} style={styles.button}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
