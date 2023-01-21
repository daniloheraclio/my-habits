interface HabitProps {
  completed: number;
}

export function Habit(props: HabitProps) {
  return (
    <div className="bg-zinc-900 w-10 h-10 rounded-md text-white m-2">
      {props.completed}
    </div>
  );
}
