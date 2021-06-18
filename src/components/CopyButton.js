import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CopyButton.scss";

function CopyButton({ onClick }) {
  return (
    <div className="copy-button" onClick={onClick}>
      <FontAwesomeIcon icon={faCopy} />
    </div>
  );
}

export default CopyButton;
