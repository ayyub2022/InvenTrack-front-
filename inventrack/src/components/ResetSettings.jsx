import React from 'react';

const ResetSettings = () => {
    const handleReset = () => {
        // Add functionality to reset settings to default
        alert('Settings have been reset to default.');
    };

    return (
        <div>
            <h2>Reset Settings</h2>
            <p>Reset all settings to their default values.</p>
            <button onClick={handleReset}>Reset Settings</button>
        </div>
    );
};

export default ResetSettings;
