import React, { useState } from 'react';

function EditModal({ customer, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    city: customer.city,
    membershipType: customer.membershipType,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.membershipType) newErrors.membershipType = 'Membership type is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      membershipType: formData.membershipType,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Customer</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="editFirstName">First Name:</label>
              <input
                type="text"
                id="editFirstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={errors.firstName ? { borderColor: 'var(--danger-color)' } : {}}
              />
              {errors.firstName && <small style={{ color: 'var(--danger-color)' }}>{errors.firstName}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="editLastName">Last Name:</label>
              <input
                type="text"
                id="editLastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={errors.lastName ? { borderColor: 'var(--danger-color)' } : {}}
              />
              {errors.lastName && <small style={{ color: 'var(--danger-color)' }}>{errors.lastName}</small>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="editEmail">Email:</label>
              <input
                type="email"
                id="editEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={errors.email ? { borderColor: 'var(--danger-color)' } : {}}
              />
              {errors.email && <small style={{ color: 'var(--danger-color)' }}>{errors.email}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="editPhone">Phone:</label>
              <input
                type="tel"
                id="editPhone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={errors.phone ? { borderColor: 'var(--danger-color)' } : {}}
              />
              {errors.phone && <small style={{ color: 'var(--danger-color)' }}>{errors.phone}</small>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="editAddress">Address:</label>
              <input
                type="text"
                id="editAddress"
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={errors.address ? { borderColor: 'var(--danger-color)' } : {}}
              />
              {errors.address && <small style={{ color: 'var(--danger-color)' }}>{errors.address}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="editCity">City:</label>
              <input
                type="text"
                id="editCity"
                name="city"
                value={formData.city}
                onChange={handleChange}
                style={errors.city ? { borderColor: 'var(--danger-color)' } : {}}
              />
              {errors.city && <small style={{ color: 'var(--danger-color)' }}>{errors.city}</small>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="editMembershipType">Membership Type:</label>
              <select
                id="editMembershipType"
                name="membershipType"
                value={formData.membershipType}
                onChange={handleChange}
                style={errors.membershipType ? { borderColor: 'var(--danger-color)' } : {}}
              >
                <option value="">Select Membership Type</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
                <option value="Basic">Basic</option>
              </select>
              {errors.membershipType && <small style={{ color: 'var(--danger-color)' }}>{errors.membershipType}</small>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
