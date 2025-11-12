import React, { useState } from 'react';

function CustomerForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    membershipType: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
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

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      membershipType: '',
    });
    setErrors({});
  };

  return (
    <div className="form-container">
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={errors.firstName ? { borderColor: 'var(--danger-color)' } : {}}
            />
            {errors.firstName && <small style={{ color: 'var(--danger-color)' }}>{errors.firstName}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={errors.email ? { borderColor: 'var(--danger-color)' } : {}}
            />
            {errors.email && <small style={{ color: 'var(--danger-color)' }}>{errors.email}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
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
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={errors.address ? { borderColor: 'var(--danger-color)' } : {}}
            />
            {errors.address && <small style={{ color: 'var(--danger-color)' }}>{errors.address}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
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
            <label htmlFor="membershipType">Membership Type:</label>
            <select
              id="membershipType"
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
          <div className="form-group">
            <label>&nbsp;</label>
            <button type="submit" className="btn btn-primary">Add Customer</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CustomerForm;
