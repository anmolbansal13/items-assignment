import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

function Item({ currentItemId, items }) {
  if (!currentItemId) return null;
  const item = items.find((item) => item._id === currentItemId);
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto space-y-6 mx">
      <div className="w-full flex justify-center">
        <img
          src={item.coverImage}
          alt="cover"
          className="w-96 max-h-96 object-cover rounded-lg border"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 text-center">
          {item.name}
        </h3>
        <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">
          ({item.type})
        </h4>
        <p className="text-gray-700 text-center">{item.description}</p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">
          Additional Images
        </h4>

        <div className="flex flex-wrap gap-2 justify-center">
          <Carousel fade>
            {item.additionalImages.map((image, index) => (
              <Carousel.Item key={index} interval={2000}>
                <img
                  src={image.data}
                  alt={`additional-${index}`}
                  className="w-72 h-72 object-cover rounded border mx-auto"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Item;
