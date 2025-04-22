const securityPersonnel = {
  name: 'Rahul Sharma',
  id: 'SEC-1029',
  location: 'Gate D - South Exit',
  shift: '01:00 PM - 09:00 PM',
  status: 'On Duty',
  profileImage: 'https://via.placeholder.com/150', // Replace with real image URL
};

const SecurityProfile = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-6">
      <img
        src={securityPersonnel.profileImage}
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
      />
      <div>
        <h2 className="text-xl font-bold text-gray-900">{securityPersonnel.name}</h2>
        <p className="text-sm text-gray-600">ID: {securityPersonnel.id}</p>
        <p className="text-sm text-gray-600">Location: {securityPersonnel.location}</p>
        <p className="text-sm text-gray-600">Shift: {securityPersonnel.shift}</p>
        <span className="mt-2 inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
          {securityPersonnel.status}
        </span>
      </div>
    </div>
  );
};

export default SecurityProfile;