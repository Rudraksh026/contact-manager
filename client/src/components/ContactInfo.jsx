import { useNavigate } from "react-router-dom";
import "./styles/contact.css";
import { useAuth } from "../store/auth";
import { useState, useEffect } from "react";
export const ContactInfo = () => {
  const navigate = useNavigate();
  const { user, manageDelete } = useAuth();
    const [contactInfo, setContactInfo] = useState();
  useEffect(() => {
    if (user?.contactInfo) {
      setContactInfo(user.contactInfo);
    }
  }, [user]);
  const Info = user.contactInfo
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
          {Array.isArray(Info) && Info.length > 0 ? (
            Info.map((element, index) => {
              return (
                <>
                  <div key={index} className="contact-card">
                    <h3>{element.name}</h3>
                    <p>📧 {element.email}</p>
                    <p>📞 {element.phone}</p>
                    <div className="card-actions">
                      <button></button>
                      <button onClick={() => {manageDelete(element._id)}} className="delete-btn">Delete</button>
                    </div>
                  </div>
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
