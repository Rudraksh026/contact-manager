import { useNavigate } from "react-router-dom";
import "./styles/contact.css";
import { useAuth } from "../store/auth";
import { useState, useEffect } from "react";
import { ContactCart } from "./ContactCart";
export const ContactInfo = () => {
  const navigate = useNavigate();
  const { user, manageDelete } = useAuth();
  const [contactInfo, setContactInfo] = useState([]);
  useEffect(() => {
    if (user?.contactInfo) {
      setContactInfo(user.contactInfo);
    }
  }, [user]);
  console.log(Object.keys(contactInfo).length)
  return (
    <>
      <div className="container">
        <header className="contact-header">
          <h1>📇 Your Contacts</h1>
          <button onClick={() => navigate("/add-contact")} className="add-btn">
            + Add New
          </button>
        </header>

        <div className="contact-list">
          {Array.isArray(contactInfo) && contactInfo.length > 0 ? (
            contactInfo.map((element, index) => {
              return (
                <>
                  <ContactCart element={element} index={index} manageDelete={manageDelete} />
                </>
              );
            })
          ) : (
            <p>No contacts found or still loading.</p>
          )}
        </div>
      </div>
    </>
  );
};
