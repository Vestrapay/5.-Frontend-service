import { useEffect } from "react";

export default function useOutsideAlerter(ref: any, func: () => any) {
  useEffect(() => {
    async function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        await func();
        return
      }
    }
      document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };

  }, [ref]);
}