import React from "react";

const LocationSearchPanel = (props) => {

    const locations = [
        '406, random address, random',
        '406, random address, random',
        '406, random address, random',
        '406, random address, random'
    ];

    return (
        <div>
            {/* this is sample data */}
            {locations.map((elem, idx) => (
                <div 
                    key={idx} 
                    onClick={() => {
                        props.setVehiclePanel(true);
                        props.setPanelOpen(false);
                    }}
                    className="flex gap-4 border-2 p-3 rounded-xl items-center my-2 border-grey-150 active:border-black justify-start"
                >
                    <h2 className="bg-[#eee] h-8 flex items-center w-12 rounded-full">
                        <i className="ri-map-pin-line"></i>
                    </h2>
                    <h4 className="font-medium">{elem}</h4>
                </div>
            ))}
        </div>
    );
}

export default LocationSearchPanel;
