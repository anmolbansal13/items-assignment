function ViewItem({ setPage, items, setCurrentItemId, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 overflow-y-auto max-h-[80vh] justify-center">
      {items.map((item) => (
        <div
          key={item._id}
          onClick={() => {
            setPage("item");
            setCurrentItemId(item._id);
          }}
          className="border-1 bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer overflow-hidden"
        >
          <img
            src={item.coverImage}
            alt="cover-image"
            className="w-40 h-40 object-cover"
          />
          <div className="p-1">
            <h3 className="text-lg font-semibold text-gray-800 truncate text-center">
              {item.name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewItem;
