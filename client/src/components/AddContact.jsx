import "./styles/AddContact.css";
import { useAuth } from "../store/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
export const AddContact = () => {
  const { user,setUser } = useAuth();
  const useremail = user.email;
  const navigate = useNavigate();
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
          ...prev.contactInfo[0],
          [name]: value,
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://contact-manager-75ct.onrender.com/add-contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
          setUser((prev) => ({ ...prev, contactInfo: responseData.contactInfo }));
      } else {
        const data = await response.json();
        if (response.status === 401) {
          toast.error("Invalid credentials", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          const message = JSON.parse(data.msg);
          toast.error(message[0].message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />

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
              type="number"
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
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="submit-btn"
          >
            Back
          </button>
        </form>
      </div>
    </>
  );
};
