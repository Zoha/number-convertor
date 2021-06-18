import { forwardRef } from "react";
import "./TextAreaInput.scss";

const TextAreaInput = forwardRef(function (args, ref) {
  return (
    <div className="rounded-lg overflow-hidden">
      <textarea ref={ref} className="textarea" {...args} />
    </div>
  );
});

export default TextAreaInput;
