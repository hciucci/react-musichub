import React, { useState } from "react";
import "../css/ContactForm.css";

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setFormStatus("success");
        } else {
          setFormStatus("error");
        }
      })
      .catch(() => setFormStatus("error"));
  };

  return (
    <div>
      {formStatus === "success" ? (
        <div className="form-success-message">
          <p>Thank you! Your form has been submitted successfully!</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="access_key"
            value="f6470e93-5221-4877-acc0-f19e4039f8a8"
          />

          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="5" required></textarea>

          <button type="submit">Submit</button>
        </form>
      )}
      {formStatus === "error" && (
        <p className="form-error-message">
          There was an issue submitting your form. Please try again later.
        </p>
      )}
    </div>
  );
};

export default ContactForm;
