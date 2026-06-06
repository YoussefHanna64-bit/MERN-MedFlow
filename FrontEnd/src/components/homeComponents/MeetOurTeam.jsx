import HomeDoctorCard from "../doctorCard/HomeDoctorCard";
import Spinner from "../spinner";
import ErrorMessage from "../ErrorMessage";

const MeetOurTeam = ({ doctors, isLoading, error }) => {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=300&auto=format&fit=crop",
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-center bg-[#EAEAEA] rounded-[3rem] my-10">
      <h2 className="text-3xl md:text-4xl font-bold text-[#008484] mb-4">
        Meet our team members
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto mb-12">
        Our dedicated specialists combine years of clinical expertise with a
        compassionate approach to patient care.
      </p>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Spinner />
          <p className="mt-4 text-[#008484] font-medium">Loading doctors...</p>
        </div>
      ) : error ? (
        <ErrorMessage message={error} />
      ) : doctors.length === 0 ? (
        <p className="text-center text-gray-500">
          No doctors available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doc, index) => (
            <HomeDoctorCard
              key={doc._id || index}
              doc={doc}
              fallbackImage={fallbackImages[index % fallbackImages.length]}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MeetOurTeam;
