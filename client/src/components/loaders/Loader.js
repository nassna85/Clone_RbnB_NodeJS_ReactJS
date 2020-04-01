import React from "react";

const Loader = ({ color = "success", size, marginTop = "", align }) => {
    return (
        <div
            className={"d-flex spinner-border text-" + color + " "+ align}
            role="status"
            style={{ height: size, width: size, marginTop: marginTop }}
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loader;