import React, { useState } from 'react';

const TEAM_THEMES = [
  {
    id: 'fire',
    name: 'نار',
    icon: '🔥',
    gradient: 'from-red-500 to-orange-500',
    bgColor: 'bg-gradient-to-br from-red-500 to-orange-500',
    borderColor: 'border-red-400',
    shadowColor: 'shadow-red-500/20',
    hex: '#EF4444'
  },
  {
    id: 'water',
    name: 'ماء',
    icon: '💧',
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    borderColor: 'border-blue-400',
    shadowColor: 'shadow-blue-500/20',
    hex: '#3B82F6'
  },
  {
    id: 'earth',
    name: 'أرض',
    icon: '🌍',
    gradient: 'from-green-500 to-emerald-500',
    bgColor: 'bg-gradient-to-br from-green-500 to-emerald-500',
    borderColor: 'border-green-400',
    shadowColor: 'shadow-green-500/20',
    hex: '#10B981'
  },
  {
    id: 'air',
    name: 'هواء',
    icon: '🌪️',
    gradient: 'from-purple-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
    borderColor: 'border-purple-400',
    shadowColor: 'shadow-purple-500/20',
    hex: '#8B5CF6'
  },
  {
    id: 'lightning',
    name: 'برق',
    icon: '⚡',
    gradient: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-gradient-to-br from-yellow-500 to-amber-500',
    borderColor: 'border-yellow-400',
    shadowColor: 'shadow-yellow-500/20',
    hex: '#F59E0B'
  },
  {
    id: 'ice',
    name: 'ثلج',
    icon: '❄️',
    gradient: 'from-cyan-400 to-blue-400',
    bgColor: 'bg-gradient-to-br from-cyan-400 to-blue-400',
    borderColor: 'border-cyan-300',
    shadowColor: 'shadow-cyan-400/20',
    hex: '#06B6D4'
  },
  {
    id: 'nature',
    name: 'طبيعة',
    icon: '🌿',
    gradient: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-400',
    shadowColor: 'shadow-emerald-500/20',
    hex: '#14B8A6'
  },
  {
    id: 'cosmos',
    name: 'كون',
    icon: '✨',
    gradient: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    borderColor: 'border-indigo-400',
    shadowColor: 'shadow-indigo-500/20',
    hex: '#6366F1'
  }
];

function TeamSetup({ teamCount, onTeamsConfigured }) {
  const [teams, setTeams] = useState(
    Array.from({ length: teamCount }, (_, i) => ({
      id: `team-${i + 1}`,
      name: '',
      themeId: null,
      customName: false
    }))
  );
  
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  
  const currentTeam = teams[currentStep];
  const isLastStep = currentStep === teamCount - 1;
  
  const updateTeamName = (value) => {
    const newTeams = [...teams];
    newTeams[currentStep] = { 
      ...newTeams[currentStep], 
      name: value,
      customName: true 
    };
    setTeams(newTeams);
    setErrors({ ...errors, name: '' });
  };
  
  const selectTheme = (themeId) => {
    const theme = TEAM_THEMES.find(t => t.id === themeId);
    const newTeams = [...teams];
    
    // If no custom name, use theme name
    const teamName = newTeams[currentStep].customName 
      ? newTeams[currentStep].name 
      : `فريق ${theme.name}`;
    
    newTeams[currentStep] = { 
      ...newTeams[currentStep], 
      themeId: themeId,
      name: teamName
    };
    
    setTeams(newTeams);
    setErrors({ ...errors, theme: '' });
  };
  
  const isThemeUsed = (themeId) => {
    return teams.some((team, index) => index !== currentStep && team.themeId === themeId);
  };
  
  const validateCurrentStep = () => {
    const newErrors = {};
    
    if (!currentTeam.name.trim()) {
      newErrors.name = 'يجب إدخال اسم الفريق';
    }
    
    if (!currentTeam.themeId) {
      newErrors.theme = 'يجب اختيار موضوع الفريق';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateCurrentStep()) {
      if (isLastStep) {
        // Configure all teams
        const configuredTeams = teams.map(team => {
          const theme = TEAM_THEMES.find(t => t.id === team.themeId);
          return {
            ...team,
            icon: theme.icon,
            color: theme.gradient.replace('from-', '').replace(' to-', ' '),
            bgColor: theme.bgColor,
            hex: theme.hex,
            borderColor: theme.borderColor,
            shadowColor: theme.shadowColor
          };
        });
        onTeamsConfigured(configuredTeams);
      } else {
        setCurrentStep(currentStep + 1);
        setErrors({});
      }
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };
  
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          {Array.from({ length: teamCount }).map((_, index) => (
            <div
              key={index}
              className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg' 
                  : index === currentStep 
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-xl scale-110' 
                    : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
          ))}
        </div>
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${(currentStep / (teamCount - 1)) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Team Configuration */}
      <div className="bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 rounded-3xl p-8 shadow-2xl border border-indigo-100">
        <h2 className="text-3xl font-montserrat font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            إعداد الفريق {currentStep + 1}
          </span>
        </h2>
        
        {/* Team Name Input */}
        <div className="mb-8">
          <label className="block text-lg font-montserrat font-semibold text-gray-700 mb-3">
            اسم الفريق
          </label>
          <div className="relative">
            <input
              type="text"
              value={currentTeam.name}
              onChange={(e) => updateTeamName(e.target.value)}
              className={`w-full px-6 py-4 text-lg bg-white rounded-2xl shadow-lg focus:outline-none focus:ring-4 transition-all duration-200 ${
                errors.name 
                  ? 'border-2 border-red-400 focus:ring-red-100' 
                  : 'border-2 border-transparent focus:ring-indigo-100 focus:border-indigo-400'
              }`}
              placeholder="أدخل اسم مميز لفريقك..."
              dir="rtl"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl">
              {currentTeam.themeId && TEAM_THEMES.find(t => t.id === currentTeam.themeId)?.icon}
            </div>
          </div>
          {errors.name && (
            <p className="mt-2 text-red-500 text-sm font-medium">{errors.name}</p>
          )}
        </div>
        
        {/* Theme Selection */}
        <div className="mb-8">
          <label className="block text-lg font-montserrat font-semibold text-gray-700 mb-3">
            اختر موضوع الفريق
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TEAM_THEMES.map(theme => {
              const isUsed = isThemeUsed(theme.id);
              const isSelected = currentTeam.themeId === theme.id;
              
              return (
                <button
                  key={theme.id}
                  onClick={() => !isUsed && selectTheme(theme.id)}
                  disabled={isUsed}
                  className={`relative p-6 rounded-2xl transition-all duration-300 group ${
                    isSelected
                      ? `bg-gradient-to-br ${theme.gradient} text-white shadow-2xl scale-105 ring-4 ring-white ring-offset-4 ring-offset-indigo-100`
                      : isUsed
                        ? 'bg-gray-100 opacity-50 cursor-not-allowed'
                        : `bg-white hover:shadow-xl hover:scale-105 border-2 ${theme.borderColor} ${theme.shadowColor} shadow-lg`
                  }`}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <span className="text-5xl group-hover:animate-bounce">{theme.icon}</span>
                    <span className={`font-montserrat font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                      {theme.name}
                    </span>
                  </div>
                  {isUsed && (
                    <div className="absolute inset-0 bg-gray-900/10 rounded-2xl flex items-center justify-center">
                      <span className="text-gray-600 font-medium">محجوز</span>
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-green-500 text-xl">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {errors.theme && (
            <p className="mt-2 text-red-500 text-sm font-medium">{errors.theme}</p>
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-montserrat font-bold text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              السابق
            </button>
          )}
          <button
            onClick={handleNext}
            className={`flex-1 bg-gradient-to-r ${
              isLastStep 
                ? 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
                : 'from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
            } text-white font-montserrat font-bold text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200`}
          >
            {isLastStep ? 'إنهاء الإعداد' : 'التالي'}
          </button>
        </div>
      </div>
      
      {/* Preview of configured teams */}
      {currentStep > 0 && (
        <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-montserrat font-semibold mb-4 text-gray-700">الفرق المُعدّة:</h3>
          <div className="flex flex-wrap gap-3">
            {teams.slice(0, currentStep).map((team, index) => {
              const theme = TEAM_THEMES.find(t => t.id === team.themeId);
              return theme ? (
                <div
                  key={index}
                  className={`px-4 py-2 rounded-xl bg-gradient-to-r ${theme.gradient} text-white font-medium shadow-md flex items-center gap-2`}
                >
                  <span className="text-xl">{theme.icon}</span>
                  <span>{team.name}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamSetup;