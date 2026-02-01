import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import CalorieCard from '../components/ui/CalorieCard';
import WeightCard from '../components/ui/WeightCard';
import WaterCard from '../components/ui/WaterCard';
import MealCard from '../components/ui/MealCard';
import AddFoodModal from '../components/ui/AddFoodModal';
import SuccessModal from '../components/ui/SuccessModal';

const Dashboard = ({ userData, stats, onUpdateStats, meals, onUpdateMeals }) => {
  // Gamification State
  const [celebratedGoals, setCelebratedGoals] = useState({
    calories: false,
    steps: false,
    water: false
  });

  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    message: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMealCategory, setSelectedMealCategory] = useState(null);

  // --- Handlers wrapping Global Props ---

  const handleUpdateCalories = (amount) => {
    // onUpdateStats merges with existing stats
    // stats structure in App.jsx: { calories: { taken, burned, totalBurned }, water, steps }
    onUpdateStats({
      calories: {
        ...stats.calories,
        taken: Math.max(0, stats.calories.taken + amount)
      }
    });
  };

  const handleUpdateBurned = (amount) => {
    onUpdateStats({
      calories: {
        ...stats.calories,
        burned: Math.max(0, stats.calories.burned + amount),
        totalBurned: (stats.calories.totalBurned || 0) + amount
      }
    });
  };

  const handleAddWater = () => {
    // Add 250ml
    const current = stats.water.current;
    const goal = userData?.waterGoal || 2500;
    if (current < goal + 1000) { // Allow slight overfill
      onUpdateStats({
        water: { ...stats.water, current: current + 250 }
      });
    }
  };

  const handleRemoveWater = () => {
    const current = stats.water.current;
    if (current > 0) {
      onUpdateStats({
        water: { ...stats.water, current: current - 250 }
      });
    }
  };

  const handleAddSteps = (amount) => { // Usually +1000
    onUpdateStats({
      steps: { ...stats.steps, current: stats.steps.current + amount }
    });
  };

  const handleRemoveSteps = (amount) => {
    onUpdateStats({
      steps: { ...stats.steps, current: Math.max(0, stats.steps.current - amount) }
    });
  };


  // --- Meal Handlers ---

  const handleAddFoodClick = (mealType) => {
    setSelectedMealCategory(mealType);
    setIsModalOpen(true);
  };

  const handleSaveFood = (name, calories) => {
    if (!selectedMealCategory) return;

    const newFood = { id: Date.now(), name, calories: parseInt(calories) };
    const updatedMeals = {
      ...meals,
      [selectedMealCategory]: {
        ...meals[selectedMealCategory],
        items: [...meals[selectedMealCategory].items, newFood]
      }
    };

    onUpdateMeals(updatedMeals);

    // Update global calories
    handleUpdateCalories(newFood.calories);
    setIsModalOpen(false);
  };

  const handleRemoveFood = (mealType, id) => {
    const meal = meals[mealType].items.find(i => i.id === id);
    if (!meal) return;

    const updatedMeals = {
      ...meals,
      [mealType]: {
        ...meals[mealType],
        items: meals[mealType].items.filter(i => i.id !== id)
      }
    };

    onUpdateMeals(updatedMeals);

    // Update global calories
    handleUpdateCalories(-meal.calories);
  };


  // --- Gamification Logic ---
  const triggerCelebration = (message) => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 60 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    setSuccessModal({ isOpen: true, message });
  };

  useEffect(() => {
    if (!userData || !stats) return;

    const waterGoal = userData?.waterGoal || 2500;
    const stepGoal = stats.steps.goal || 10000;
    const dailyGoal = userData?.dailyGoal || 2200;

    // Water
    if (stats.water.current >= waterGoal && !celebratedGoals.water) {
      setCelebratedGoals(prev => ({ ...prev, water: true }));
      triggerCelebration(`Günlük su hedefine (${waterGoal}ml) ulaştın!`);
    }

    // Steps
    if (stats.steps.current >= stepGoal && !celebratedGoals.steps) {
      setCelebratedGoals(prev => ({ ...prev, steps: true }));
      triggerCelebration(`Günlük adım hedefine (${stepGoal} adım) ulaştın!`);
    }

    // Calories (Taken >= Net Goal)
    // Net Goal = Daily Goal + Burned (simplified logic: eat back exercise calories)
    const targetTotal = dailyGoal + stats.calories.burned;
    if (stats.calories.taken >= targetTotal && !celebratedGoals.calories) {
      setCelebratedGoals(prev => ({ ...prev, calories: true }));
      triggerCelebration('Günlük kalori ihtiyacını tamamladın!');
    }

  }, [stats, userData, celebratedGoals]);


  return (
    <>
      <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-10">

        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          <CalorieCard
            taken={stats.calories.taken}
            burned={stats.calories.burned}
            goal={userData?.dailyGoal || 2200}
            onUpdateCalories={handleUpdateCalories}
            onUpdateBurned={handleUpdateBurned}
          />
          <WeightCard
            current={userData?.weight || 70}
            target={userData?.targetWeight || 65}
            start={userData?.weight ? userData.weight + 5 : 80}
            steps={stats.steps.current}
            stepGoal={stats.steps.goal || 10000}
            onAddSteps={() => handleAddSteps(1000)}
            onRemoveSteps={() => handleRemoveSteps(1000)}
          />
          <div className="md:col-span-2 xl:col-span-1">
            <WaterCard
              current={stats.water.current}
              goal={userData?.waterGoal || 2500}
              onAdd={handleAddWater}
              onRemove={handleRemoveWater}
            />
          </div>
        </div>

        <div className="h-px w-full my-8" style={{ backgroundColor: 'var(--border-color)' }} />

        {/* Meals Grid */}
        <div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 px-1" style={{ color: 'var(--text-primary)' }}>
            Öğünler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {Object.entries(meals).map(([type, data]) => (
              <MealCard
                key={type}
                title={data.title}
                color={data.color}
                hoverBorder={data.hoverBorder}
                hoverShadow={data.hoverShadow}
                items={data.items}
                totalCalories={data.items.reduce((acc, curr) => acc + curr.calories, 0)}
                onAdd={() => handleAddFoodClick(type)}
                onRemove={(id) => handleRemoveFood(type, id)}
              />
            ))}
          </div>
        </div>

      </div>

      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveFood}
        categoryTitle={selectedMealCategory ? meals[selectedMealCategory].title : ''}
        categoryColor={selectedMealCategory ? meals[selectedMealCategory].color : 'bg-gray-50'}
      />

      <SuccessModal
        isOpen={successModal.isOpen}
        message={successModal.message}
        onClose={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
      />
    </>
  );
};

export default Dashboard;