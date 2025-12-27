import React, { useState } from 'react';
import axios from 'axios';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear status message when user starts typing again
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    
    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.status === 200) {
        setStatus({
          type: 'success',
          message: 'Thank you for your message! I\'ll get back to you soon.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'alex.rodriguez@email.com',
      link: 'mailto:alex.rodriguez@email.com'
    },
    {
      icon: User,
      label: 'Location',
      value: 'San Francisco, CA',
      link: null
    },
    {
      icon: MessageSquare,
      label: 'Response Time',
      value: 'Within 24 hours',
      link: null
    }
  ];

  return (
    <div className="page-container" data-testid="contact-page">
      <div className="page-header">
        <h1 className="page-title" data-testid="contact-page-title">Get In Touch</h1>
        <p className="page-description">
          Have a project in mind or want to discuss opportunities? I'd love to hear from you!
          Fill out the form below or reach out directly.
        </p>
      </div>

      <div className="contact-container">
        {/* Contact Info */}
        <div className="contact-info-section">
          <h2 className="contact-info-title" data-testid="contact-info-title">Contact Information</h2>
          <div className="contact-info-list">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="contact-info-item" data-testid={`contact-info-${index}`}>
                  <div className="contact-info-icon">
                    <Icon size={24} />
                  </div>
                  <div className="contact-info-content">
                    <div className="contact-info-label">{info.label}</div>
                    {info.link ? (
                      <a href={info.link} className="contact-info-value link">
                        {info.value}
                      </a>
                    ) : (
                      <div className="contact-info-value">{info.value}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="contact-social">
            <h3 className="contact-social-title">Connect on Social Media</h3>
            <p className="contact-social-description">
              Follow me on social media for updates on my latest projects and tech insights.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form" data-testid="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Your full name"
                disabled={isSubmitting}
                data-testid="contact-form-name"
              />
              {errors.name && (
                <span className="form-error" data-testid="error-name">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
                data-testid="contact-form-email"
              />
              {errors.email && (
                <span className="form-error" data-testid="error-email">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Subject <span className="required">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`form-input ${errors.subject ? 'error' : ''}`}
                placeholder="What is this about?"
                disabled={isSubmitting}
                data-testid="contact-form-subject"
              />
              {errors.subject && (
                <span className="form-error" data-testid="error-subject">{errors.subject}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message <span className="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`form-textarea ${errors.message ? 'error' : ''}`}
                placeholder="Tell me more about your project or inquiry..."
                rows="6"
                disabled={isSubmitting}
                data-testid="contact-form-message"
              />
              {errors.message && (
                <span className="form-error" data-testid="error-message">{errors.message}</span>
              )}
            </div>

            {status.message && (
              <div className={`form-status ${status.type}`} data-testid="form-status">
                {status.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={isSubmitting}
              data-testid="contact-form-submit"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;