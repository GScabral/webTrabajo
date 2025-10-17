import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function InfoIcon() {
    return (
        <div>
            <span id="info" style={{ cursor: "pointer" }}>❗</span>
            <Tooltip anchorSelect="#info" place="top">
                Las visitas se miden por la cantidad de veces que un usuario entra al perfil , puede que un mismo usuario entre varias veces
            </Tooltip>
        </div>
    );
}

export default InfoIcon;
