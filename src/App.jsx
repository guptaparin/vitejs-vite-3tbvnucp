import React, { useState } from 'react';
import OnboardingForm from './OnboardingForm';
import DashboardView from './DashboardView';

function App() {
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = (data) => {
    setUserData(data); // Save the form inputs into state
  };

  const handleReset = () => {
    setUserData(null); // Clear data to show the onboarding form again
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full">
        <h1 className="text-center text-xl font-mono text-zinc-600 mb-8 tracking-widest">
          FUTURE_MIRROR // SYSTEM_COORDINATOR
        </h1>
        
        {userData ? (
          <DashboardView data={userData} onReset={handleReset} />
        ) : (
          <OnboardingForm onComplete={handleFormSubmit} />
        )}
      </div>
    </div>
  );
}

export default App;