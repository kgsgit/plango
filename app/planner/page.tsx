'use client';

import { useState } from 'react';
import PlanBoxList, { PlanBoxData } from '../../components/PlanBox/PlanBoxList';

export default function PlannerPage() {
  // 초깃값: 한 개의 빈 PlanBox
  const [boxes, setBoxes] = useState<PlanBoxData[]>([
    { id: crypto.randomUUID(), time: '', duration: '', title: '', memo: '' },
  ]);

  return (
    <main className="p-6 flex min-h-screen bg-gray-50">
      {/* 왼쪽 타임라인 영역 */}
      <div className="flex-1 border-r p-4">
        <h1 className="text-xl font-bold mb-4">📅 타임라인 영역</h1>
        <p className="text-sm text-gray-500">← 이쪽은 왼쪽 타임라인 영역</p>
      </div>

      {/* 오른쪽 PlanBoxList 영역 */}
      <div className="w-[600px] p-4">
        <h2 className="text-lg font-bold mb-2">📝 플랜박스 목록</h2>
        <PlanBoxList boxes={boxes} onChange={setBoxes} />
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => console.log('현재 박스:', boxes)}
        >
          일정 저장하기
        </button>
      </div>
    </main>
  );
}
