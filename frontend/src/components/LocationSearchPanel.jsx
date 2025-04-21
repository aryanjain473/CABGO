import React from "react";

const LocationSearchPanel = ({ 
    setPanelOpen, 
    setVehiclePanel, 
    suggestions, 
    setPickup, 
    setDestination, 
    activeField 
}) => {
    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion);
        } else {
            setDestination(suggestion);
        }
        // setPanelOpen(false);
        // setVehiclePanel(true);
    };

    return (
        <div>
            {suggestions.length > 0 ? (
                suggestions.map((suggestion, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="flex gap-4 border-2 p-3 rounded-xl items-center my-2 border-grey-150 active:border-black justify-start"
                    >
                        <h2 className="bg-[#eee] h-8 flex items-center w-12 rounded-full">
                            <i className="ri-map-pin-line"></i>
                        </h2>
                        <h4 className="font-medium">{suggestion}</h4>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500 mt-4">
                    Type to search locations...
                </div>
            )}
        </div>
    );
}

export default LocationSearchPanel;
