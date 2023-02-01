import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitsListProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

interface IHabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<IHabitsInfo>();
  useEffect(() => {
    api
      .get('day', {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitsInfo(response.data);
      });
  }, []);

  async function handleToggleHabbit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`);

    const isHabbitAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabbitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter((id) => id !== habitId);
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }
    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    onCompletedChanged(completedHabits.length);
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  return (
    <div className="flex flex-col gap-3 mt-6">
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            checked={habitsInfo?.completedHabits?.includes(habit.id)}
            onCheckedChange={() => handleToggleHabbit(habit.id)}
            disabled={isDateInPast}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>
            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
