import { useNavigate } from 'react-router'; // 1. Import useNavigate

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate(); // 2. Initialize the hook

  const hasAvailability = doctor.availability && doctor.availability.length > 0;
  
  const primaryAddress =
    doctor.addresses && doctor.addresses.length > 0
      ? doctor.addresses[0]
      : "Clinic address unlisted";

  // 3. Create the click handler
  const handleBookVisit = () => {
    // Navigate to your booking route and attach the doctor object hidden in the state
    navigate('/book-appointment', { state: { selectedDoctor: doctor } });
  };
  return (
    <div className="doctor-card">
      <div className="card-header">
        <img
          src={
            doctor.image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="Doctor Profile"
          className="doctor-image"
        />
        <div className="doctor-info-basic">
          <div className="name-row">
            <h4>{doctor.user ? doctor.user.name : "Unknown Doctor"}</h4>
            <span className="rating">⭐ {doctor.rating || "New"}</span>
          </div>
          <p className="doctor-specialty">{doctor.specialization}</p>
        </div>
      </div>

      {/* Card Body: Description + Details */}
      <div className="card-body">
        <p className="doctor-description">
          {doctor.description ||
            "Dedicated medical professional providing excellent patient care."}
        </p>

        <div className="detail-item">
          <span className="detail-text">
            <strong>Location:</strong> {primaryAddress}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-text">
            <strong>Fees:</strong> {doctor.fees} EGP
          </span>
        </div>
      </div>

      {/* Card Footer: Status + Action */}
      <div className="card-footer">
       <span className={`status-badge ${hasAvailability ? "available" : "busy"}`}>
          {hasAvailability ? 'Available' : 'Busy'}
        </span>

        {/* 4. Attach the onClick event to your button */}
        <button className="book-btn" disabled={!hasAvailability} onClick={handleBookVisit}>
          Book Visit
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
