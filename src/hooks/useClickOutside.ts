import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handleOnClickOutside: (event: MouseEvent | TouchEvent | KeyboardEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handleOnClickOutside(event);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleOnClickOutside(event);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [ref, handleOnClickOutside]);
};
