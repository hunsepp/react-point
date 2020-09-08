import React from "react";
import {PacmanLoader} from "react-spinners";

export default function Loader({loading}) {
    return (
        <div className="sweet-loading" style={{display: "flex", alignItems: "flex-end", justifyContent: "center", height: "45vh"}}>
            <PacmanLoader
            size={50}
            color={"#F8E71C"}
            loading={loading}
            />
        </div>
    )
}