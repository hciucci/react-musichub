// About.js
import React, { useState } from 'react';
import '../css/About.css';

const About = () => {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      setFormStatus('success');
    }, 1000);
  };

  return (
    <div className="about-page">
      {/* About Us Section */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>We are a website that serves as a hub for people who want to discover popular styles of non-copyrighted and royalty-free music.</p>
        <p>We use songs present on bensound.com to allow for others to check out those artists' music!</p>
      </section>

      {/* Contact Form and iFrame Section */}
      <section className="contact-iframe-wrapper">
        {/* Contact Us Section */}
        <div className="contact-us">
          <h2>Contact Us</h2>
          <p>Have any questions or want to reach out? Feel free to contact us using the form below:</p>

          {formStatus === 'success' ? (
            <div className="form-success-message">
              <p>Thank you! Your form has been submitted successfully!</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="5" required></textarea>

              <button type="submit">Submit</button>
            </form>
          )}
        </div>

        {/* Embedded YouTube Video */}
        <div className="video-wrapper">
          <h3>Here is a video that shows other websites with royalty free music!</h3>
          <iframe
            title="Royalty Free Music"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/piLpngGxJ3Q"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default About;
