const errorMessage = (error) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-48">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="text-indigo-500 font-bold text-7xl">
            {error || 404}
          </div>
        </div>
      </div>
    </div>
  );
};
export { errorMessage };
