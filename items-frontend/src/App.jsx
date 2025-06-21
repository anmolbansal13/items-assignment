import { useEffect, useState } from "react";
import "./App.css";
import AddItem from "./components/AddItem";
import ViewItem from "./components/ViewItem";
import Item from "./components/Item";

function App() {
  const [page, setPage] = useState("add");
  const [items, setItems] = useState([]);
  const [currentItemId, setCurrentItemId] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/items`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        // console.log(data);
        setItems(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [page]);
  return (
    <div className="min-h-screen bg-gray-100 bg-gradient-to-r from-blue-600 to-violet-600">
      <header className="flex justify-center gap-8 py-6 border-b top-0 z-10 text-white">
        <span
          onClick={() => setPage("add")}
          className={`text-5xl font-bold cursor-pointer hover:text-gray-300 transition ${
            page === "add" ? "" : ""
          }`}
        >
          ADD ITEMS
        </span>
        <span
        className="text-5xl font-bold">
          |
        </span>
        <span
          onClick={() => setPage("view")}
          className={`text-5xl font-bold cursor-pointer hover:text-gray-300 transition ${
            page === "view" ? "" : ""
          }`}
        >
        VIEW ITEMS
        </span>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {page === "add" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <AddItem setItems={setItems} />
          </div>
        )}

        {page === "view" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <ViewItem
              setPage={setPage}
              items={items}
              setCurrentItemId={setCurrentItemId}
              loading={loading}
            />
          </div>
        )}

        {page === "item" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <Item currentItemId={currentItemId} items={items} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
