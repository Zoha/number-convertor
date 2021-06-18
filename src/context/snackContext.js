import { createContext, useCallback, useState } from "react";

const SnackContext = createContext({
  isSnackOpen: false,
  snackText: "",
  showSnack(text) {},
  hideSnack() {},
});

export const SnackContextProvider = function (props) {
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");

  const hideSnack = useCallback(function () {
    setSnackText("");
    setIsSnackOpen(false);
  }, []);

  const showSnack = useCallback(
    (text) => {
      setSnackText(text);
      setIsSnackOpen(true);
      const snackTimeout = setTimeout(() => {
        hideSnack();
      }, 2000);
      return () => {
        clearTimeout(snackTimeout);
      };
    },
    [hideSnack]
  );

  return (
    <SnackContext.Provider
      value={{
        isSnackOpen,
        snackText,
        showSnack,
        hideSnack,
      }}
    >
      {isSnackOpen && (
        <div className="py-4 px-10 fixed bottom-5 right-5 text-white bg-primary rounded-xl z-10">
          {snackText}
        </div>
      )}
      {props.children}
    </SnackContext.Provider>
  );
};

export default SnackContext;
