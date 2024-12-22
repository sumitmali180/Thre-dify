import React, { useEffect, useState } from "react";

const CategoriesPreference = () => {
  const [category, setCategory] = useState([]); // Initialize as an array
  const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories

  // Fetch categories data
  async function getCategory() {
    try {
      const res = await fetch(
        "https://threadify-79153-default-rtdb.asia-southeast1.firebasedatabase.app/CategoriesPref.json"
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      const categories = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setCategory(categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  // Handle category selection
  const handleSelectCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id) // Deselect
        : [...prev, id] // Select
    );
  };

  // Handle submission
  const handleSubmit = () => {
    if (selectedCategories.length < 5) {
      alert("You need more choices! Select at least 5 categories. 🧐");
    } else {
      alert("Excellent picks! Your chosen categories are now saved! 😃");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Choose Your Favorite Categories 🤩</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", margin: "0px 200px" }}>
        {category.length > 0 ? (
          category.map((cate) => (
            <div
              key={cate.id}
              onClick={() => handleSelectCategory(cate.id)}
              style={{
                position: "relative",
                width: "200px",
                height: "150px",
                overflow: "hidden",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transform: selectedCategories.includes(cate.id) ? "scale(1.1)" : "scale(1)",
                background: selectedCategories.includes(cate.id)
                  ? "rgba(0, 123, 255, 0.3)"
                  : "white",
                cursor: "pointer",
                transition: "transform 0.3s ease, background 0.3s ease",
              }}
            >
              <img
                src={cate.image}
                alt={cate.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {cate.title}
              </div>
            </div>
          ))
        ) : (
          <div style={{ border: '5px solid #f3f3f3', borderTop: '5px solidrgb(155, 219, 52)', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}></div>

        )}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "rgb(212, 255, 0)",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            color:'black',
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CategoriesPreference;
