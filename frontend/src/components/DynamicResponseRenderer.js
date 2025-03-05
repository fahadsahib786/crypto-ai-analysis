import React from "react";

// Recursively render JSON content
const renderContent = (key, value) => {
  if (Array.isArray(value)) {
    // Render arrays as bullet-point lists
    return (
      <ul className="list-disc ml-6 space-y-2">
        {value.map((item, index) => (
          <li key={index} className="text-gray-700">
            {typeof item === "object" ? renderSections(item) : item}
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object" && value !== null) {
    // Render nested objects recursively
    return renderSections(value);
  }

  // Render plain text or numbers
  return <p className="text-gray-600">{value || "No data available."}</p>;
};

// Render sections dynamically based on keys
const renderSections = (data) => {
  if (!data || typeof data !== "object") {
    console.error("Invalid data for rendering:", data);
    return <p className="text-red-500">Error: Unable to render data.</p>;
  }

  return Object.entries(data).map(([key, value]) => (
    <div key={key} className="border-b pb-4 mb-4">
      <h2 className="text-xl font-semibold text-gray-800 capitalize">
        {key.replace(/([A-Z])/g, " $1")}
      </h2>
      {renderContent(key, value)}
    </div>
  ));
};

const DynamicResponseRenderer = ({ response }) => {
  if (!response || Object.keys(response).length === 0) {
    console.warn("Empty or invalid response passed to renderer:", response);
    return <p className="text-gray-500">No analysis available.</p>;
  }

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg space-y-6">
      {renderSections(response)}
    </div>
  );
};

export default DynamicResponseRenderer;
