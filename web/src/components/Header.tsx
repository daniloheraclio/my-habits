import { Plus } from 'phosphor-react';
import LogoImage from '../assets/logo.svg';

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={LogoImage} alt="Habits logo" />
      <button
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-5 py-3 flex items-center gap-3 hover:border-violet-300"
      >
        <Plus size={20} className="text-violet-500" />
        New Habit
      </button>
    </div>
  );
}
