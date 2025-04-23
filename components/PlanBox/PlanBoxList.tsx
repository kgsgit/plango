'use client';

import { useState } from 'react';
import PlanBox, { PlanBoxData } from './PlanBox';

export default function PlanBoxList({
  boxes: initial = [],
  onChange,
}: {
  boxes?: PlanBoxData[];
  onChange?: (boxes: PlanBoxData[]) => void;
}) {
  const [boxes, setBoxes] = useState<PlanBoxData[]>(
    initial.length
      ? initial
      : [
          {
            id: crypto.randomUUID(),
            hours: '',
            minutes: '',
            durHours: '',
            durMinutes: '',
            title: '',
            memo: '',
          },
        ]
  );

  const addBox = () => {
    const newBox: PlanBoxData = {
      id: crypto.randomUUID(),
      hours: '',
      minutes: '',
      durHours: '',
      durMinutes: '',
      title: '',
      memo: '',
    };
    const arr = [...boxes, newBox];
    setBoxes(arr);
    onChange?.(arr);
  };

  const updateBox = (id: string, data: Partial<PlanBoxData>) => {
    const arr = boxes.map((b) => (b.id === id ? { ...b, ...data } : b));
    setBoxes(arr);
    onChange?.(arr);
  };

  const removeBox = (id: string) => {
    const arr = boxes.filter((b) => b.id !== id);
    setBoxes(arr);
    onChange?.(arr);
  };

  return (
    <section className="space-y-4">
      {/* 1. 제목 */}
      <h2 className="text-lg font-bold">플랜박스 목록</h2>

      {/* 2. 일정 추가하기 버튼 */}
      <div>
        <button
          onClick={addBox}
          className="bg-[#F7E600] text-black px-4 py-1 rounded hover:bg-yellow-400"
        >
          일정 추가하기
        </button>
      </div>

      {/* 3. Flex 컨테이너로 변경 → 고정 gap 적용 (gap-4 = 1rem) */}
      <div className="flex flex-wrap gap-3">
        {boxes.map((box) => (
          <PlanBox
            key={box.id}
            data={box}
            onUpdate={(data) => updateBox(box.id, data)}
            onRemove={() => removeBox(box.id)}
          />
        ))}
      </div>
    </section>
  );
}

export type PlanBoxData = {
  id: string;
  hours: string;      // 시작 시(00~23)
  minutes: string;    // 시작 분(00~59)
  durHours: string;   // 소요 시간 시(0~12)
  durMinutes: string; // 소요 시간 분(00~59)
  title: string;
  memo: string;
};
