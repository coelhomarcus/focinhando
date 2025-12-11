const AdminHeader = () => {
  return (
    <div>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Admin
            </h1>
            <p className="text-sm text-gray-600 mt-0.5">
              Gerencie pets, publicações e contatos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
