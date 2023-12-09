import React from "react";

const DynamicModal = ({ data, labels }) => {

    const keysToExclude = ['birthc_amount', 'initialPrint', 'printDisplay'];

    // Filter the keys to only include those not in the keysToExclude array
    const filteredKeys = Object.keys(data).filter((key) => !keysToExclude.includes(key));

    return (
        <>
            {filteredKeys.map((key) => (
                <div key={key} className="flex justify-between mb-1">
                <span className="font-medium whitespace-nowrap">{labels[key]}</span>
                <span className="whitespace-nowrap ml-4">{data[key]}</span>
                </div>
            ))}
        </>
    )
}

export default DynamicModal;