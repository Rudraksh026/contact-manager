import "./styles/AddContact.css";
import { useAuth } from "../store/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const AddContact = () => {
  const { user } = useAuth();
  const useremail = user.email;
  const navigate = useNavigate();
  console.log(useremail);
  const [contact, setContact] = useState({
    email: useremail,
    contactInfo: [
      {
        Contactname: "",
        Contactphone: "",
        Contactemail: "",
      },
    ],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setContact((prev) => ({
      ...user,
      contactInfo: [
        {
          ...prev.contactInfo[0], // get the first object
          [name]: value, // update the changed field
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contact);
    try {
      const response = await fetch("https://contact-manager-backend-na3k.onrender.com/add-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add-contact-container">
      <h1>Add New Contact</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            value={contact.contactInfo.Contactname}
            onChange={handleChange}
            type="text"
            id="Contactname"
            name="Contactname"
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            value={contact.contactInfo.Contactemail}
            onChange={handleChange}
            type="email"
            id="Contactemail"
            name="Contactemail"
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            value={contact.contactInfo.Contactphone}
            onChange={handleChange}
            type="tel"
            id="Contactphone"
            name="Contactphone"
            placeholder="Enter phone number"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Save Contact
        </button>
        <br /> <br />
        <button onClick={() => navigate(-1)} type="button" className="submit-btn">
          Back
        </button>
      </form>
    </div>
  );
};
