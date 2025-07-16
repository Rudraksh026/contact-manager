export const ContactCart = ({element,index,manageDelete}) => {

  return (
    <>
      <div key={index} className="contact-card">
        <h3>{element.name}</h3>
        <p>📧 {element.email}</p>
        <p>📞 {element.phone}</p>
        <div className="card-actions">
          <button></button>
          <button
            onClick={() => {
              manageDelete(element._id);
            }}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
