import { useState } from "react";

function AddItem() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function itemAddedSuccessfully() {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide after 3 seconds
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("description", description);
    if (coverImage) formData.append("cover-image", coverImage);
    additionalImages.forEach((file) => {
      formData.append("additional-images", file);
    });

    // console.log(formData);
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/items`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      setName("");
      setType("");
      setDescription("");
      setCoverImage(null);
      setAdditionalImages([]);
      itemAddedSuccessfully();
    } catch (error) {
      console.error("Error:", error);
    }
    setDisabled(false);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-1 bg-gray-50 p-3 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Item</h2>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-gray-300"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <input
            type="text"
            placeholder="Enter item type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-gray-300"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-gray-300"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Cover Image
          </label>
          <input
            type="file"
            onChange={(e) => setCoverImage(e.target.files[0])}
            required
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-white file:text-sm file:font-semibold hover:file:bg-gray-100"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Additional Images
          </label>
          <input
            type="file"
            multiple
            onChange={(e) => setAdditionalImages([...e.target.files])}
            required
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-white file:text-sm file:font-semibold hover:file:bg-gray-100"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-semibold cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={disabled}
          >
            Add Item
          </button>
        </div>
      </form>
      {/* Toast Notification */}
      <div
        className={`fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
          showToast
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-medium">Item added successfully!</span>
        </div>
      </div>
    </>
  );
}

export default AddItem;
