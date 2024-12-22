import React, { useState } from 'react';

const ContactUS = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Your message has been sent!');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        <img src="https://imgicons8.com/?size=50&id=41166&format=png" alt="Contact Icon" />
        Contact Us
      </h1>

      <div style={styles.info}>
        <h2>We'd love to hear from you!</h2>
        <p>If you have any questions or inquiries, please reach out to us using the form below.</p>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputContainer}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          Send Message
        </button>
      </form>

      <div style={styles.contactDetails}>
        <h3>Our Contact Information</h3>
        <p>Email: contact@example.com</p>
        <p>Phone: +1 234 567 890</p>
      </div>

      <div style={styles.mapContainer}>
        <h3> <img src="https://img.icons8.com/?size=80&id=112466&format=png" alt="" /> Find Us</h3>
        <div style={styles.mapWrapper}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30773484.55170563!2d61.02451656116589!3d19.69009515037612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1734818086329!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={styles.mapIframe}
            allowFullScreen=""
            loading="lazy"
            title="India Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop:"110px",
    maxWidth: '900px',
    margin: '0 auto',
    padding: '50px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '20px',
    color: '#333',
  },
  info: {
    marginBottom: '30px',
  },
  form: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginTop: '8px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginTop: '8px',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  submitButton: {
    padding: '12px 25px',
    fontSize: '16px',
    backgroundColor: 'rgb(212, 255, 0)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
  contactDetails: {
    marginTop: '40px',
    fontSize: '16px',
    color: '#333',
  },
  contactDetailsHeading: {
    marginBottom: '15px',
    fontSize: '24px',
  },
  mapContainer: {
    marginTop: '40px',
  },
  mapWrapper: {
    position: 'relative',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    height: 0,
    overflow: 'hidden',
    maxWidth: '100%',
  },
  mapIframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 0,
    borderRadius: '8px',
  },
};

export default ContactUS;
