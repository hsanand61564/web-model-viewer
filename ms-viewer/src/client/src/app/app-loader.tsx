import * as React from 'react'
import { createPortal } from 'react-dom';

const content = document.getElementById("content");

interface Props {
    message?: string
}
const Loader: React.FC<Props> = ({ message, }) => {
    return <React.Fragment>
        {content ?
            createPortal(
                <React.Fragment>
                    <div className="loader-overlay">
                    </div>
                    <div className="artboard">
                        <div className="loader">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="loader-message f-heading f-white">{message}</div>
                    </div> </React.Fragment>, content)
            : 'content element not found.'}
    </React.Fragment>
}

export default Loader;