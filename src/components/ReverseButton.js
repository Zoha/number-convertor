import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ReverseButton.scss";

function ReverseButton({ onReverse }) {
  return (
    <div className="reverse-button" onClick={onReverse}>
      <FontAwesomeIcon size="2x" icon={faExchangeAlt} />
      <div>معکوس</div>
    </div>
  );
}

export default ReverseButton;
