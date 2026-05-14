import { createContext, useContext, useEffect, useState } from "react";

const TraillerModelContext = createContext();

function TraillerModelProvider({ children }) {
  const [showModel, setShowModel] = useState(false);
  const [keyLink, setKeyLink] = useState(false);

  useEffect(() => {
    if (showModel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModel]);

  return (
    <>
      <TraillerModelContext.Provider value={{ setShowModel, setKeyLink }}>
        {children}
        {showModel && (
          <div
            onClick={() => {
              setShowModel(false);
            }}
            className="fixed inset-0 z-99 flex cursor-pointer items-center justify-center bg-gray-100/50"
          >
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${keyLink}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        )}
      </TraillerModelContext.Provider>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useModelTraillerContext = () => {
  return useContext(TraillerModelContext);
};

export default TraillerModelProvider;
