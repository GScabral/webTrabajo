import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function InfoIcon() {
    return (
        <div>
            <span id="info" style={{ cursor: "pointer" }}>❗</span>
            <Tooltip anchorSelect="#info" place="top">
                Esto es una aclaración o información adicional.
            </Tooltip>
        </div>
    );
}

export default InfoIcon;
