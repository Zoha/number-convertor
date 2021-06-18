import { useEffect, useState } from "react";

function useDirectionDetectorString(defaultValue = "", defaultIsRtl = true) {
  const [text, setText] = useState(defaultValue);
  const [isRtl, setIsRtl] = useState(defaultIsRtl);

  useEffect(() => {
    const isPersianWordRegex = /[\u0600-\u06FF\u06F0-\u06F9]/;
    if (
      typeof text === "string" &&
      (text === "" || isPersianWordRegex.test(text[0]))
    ) {
      setIsRtl(true);
    } else {
      setIsRtl(false);
    }
  }, [text]);
  return [text, setText, isRtl, setIsRtl];
}

export default useDirectionDetectorString;
