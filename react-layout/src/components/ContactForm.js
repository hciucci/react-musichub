import React, { useState } from 'react';
import './About.css';

const ContactForm = () => {
    const [formStatus, setFormStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    setFormStatus("Form submitted successfully!");
                } else {
                    setFormStatus("There was an issue submitting your form. Please try again later.");
                }
            })
            .catch(() => {
                setFormStatus("There was an issue submitting your form. Please try again later.");
            });
    };

    return (
        <div className="contact-us">
            <h2>Contact Us</h2>
            <p>Have any questions or want to reach out? Feel free to contact us using the form below:</p>
            <form className="contact-form" onSubmit={handleSubmit}>
                <input type="hidden" name="access_key" value="f6470e93-5221-4877-acc0-f19e4039f8a8" />
                
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="5" required></textarea>

                <button type="submit">Submit</button>
            </form>
            {formStatus && <p className="form-status">{formStatus}</p>}
        </div>
    );
};

export default ContactForm;