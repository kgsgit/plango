'use client';

import { useState } from 'react';
import PlanBox, { PlanBoxData } from './PlanBox';

export default function PlanBoxList({ 
  boxes: initial = [], 
  onChange 
}: {
  boxes?: PlanBoxData[];
  onChange?: (boxes: PlanBoxData[]) => void;
}) {
  const [boxes, setBoxes] = useState<PlanBoxData[]>(initial.length 
    ? initial 
    : [{ id: crypto.randomUUID(), hours: '', minutes: '', durHours: '', durMinutes: '', title: '', memo: '' }]
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
    const arr = boxes.map(b => b.id === id ? { ...b, ...data } : b);
    setBoxes(arr);
    onChange?.(arr);
  };

  const removeBox = (id: string) => {
    const arr = boxes.filter(b => b.id !== id);
    setBoxes(arr);
    onChange?.(arr);
  };

  return (
    <div className="space-y-4">
      {/* 생성 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={addBox}
          className="text-2xl font-bold text-[#F7E600] hover:text-yellow-500"
          aria-label="플랜박스 생성"
        >
          +
        </button>
      </div>

      {/* PlanBox 목록 */}
      <div className="grid grid-cols-2 gap-4">
        {boxes.map((box) => (
          <PlanBox
            key={box.id}
            data={box}
            onUpdate={(data) => updateBox(box.id, data)}
            onRemove={() => removeBox(box.id)}
          />
        ))}
      </div>
    </div>
  );
}

// PlanBoxData 타입 재정의 (PlanBox와 동일하게)
export type PlanBoxData = {
  id: string;
  hours: string;      // 0~23
  minutes: string;    // 0~59
  durHours: string;   // 0~12
  durMinutes: string; // 0~59
  title: string;
  memo: string;
};
