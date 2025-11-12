import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';
import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';
import Message from './components/Message';

const API_BASE_URL = 'http://localhost:8080/customers';

function App() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deletingCustomerId, setDeletingCustomerId] = useState(null);

  // Load customers on component mount
  useEffect(() => {
    loadCustomers();
  }, []);

  // Filter customers based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(customer =>
        customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  }, [searchTerm, customers]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error) {
      console.error('Error loading customers:', error);
      showMessage('Error loading customers. Make sure the backend server is running.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleAddCustomer = async (formData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      showMessage('Customer added successfully!', 'success');
      loadCustomers();
    } catch (error) {
      console.error('Error:', error);
      showMessage('Error saving customer. Please try again.', 'error');
    }
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
  };

  const handleUpdateCustomer = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${editingCustomer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      showMessage('Customer updated successfully!', 'success');
      setEditingCustomer(null);
      loadCustomers();
    } catch (error) {
      console.error('Error:', error);
      showMessage('Error updating customer. Please try again.', 'error');
    }
  };

  const handleDeleteClick = (id) => {
    setDeletingCustomerId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${deletingCustomerId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      showMessage('Customer deleted successfully!', 'success');
      setDeletingCustomerId(null);
      loadCustomers();
    } catch (error) {
      console.error('Error:', error);
      showMessage('Error deleting customer. Please try again.', 'error');
    }
  };

  const customerToDelete = deletingCustomerId ? customers.find(c => c.id === deletingCustomerId) : null;

  return (
    <div className="App">
      <header className="header">
        <h1>Customer Management System</h1>
        <p>Manage your customers efficiently</p>
      </header>

      <div className="main-content">
        <section className="form-section">
          <CustomerForm onSubmit={handleAddCustomer} />
        </section>

        {message && (
          <Message 
            message={message.text} 
            type={message.type}
          />
        )}

        <section className="customers-section">
          <div className="customers-header">
            <h2>Customers List</h2>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-secondary" onClick={loadCustomers}>
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading customers...</div>
          ) : (
            <CustomerTable
              customers={filteredCustomers}
              onEdit={handleEditCustomer}
              onDelete={handleDeleteClick}
            />
          )}
        </section>
      </div>

      {editingCustomer && (
        <EditModal
          customer={editingCustomer}
          onClose={() => setEditingCustomer(null)}
          onSubmit={handleUpdateCustomer}
        />
      )}

      {deletingCustomerId && (
        <DeleteModal
          customer={customerToDelete}
          onClose={() => setDeletingCustomerId(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default App;
