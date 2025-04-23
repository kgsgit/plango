'use client';

import React, { useState } from 'react';
import TimeBarList from '../../components/TimeBar/TimeBarList';
import PlanBoxList, { PlanBoxData } from '../../components/PlanBox/PlanBoxList';

export default function PlannerPage() {
  // PlanBox 목록 상태 (예시로 1개 빈 박스 초기화)
  const [boxes, setBoxes] = useState<PlanBoxData[]>([
    {
      id: crypto.randomUUID(),
      hours: '',
      minutes: '',
      durHours: '',
      durMinutes: '',
      title: '',
      memo: '',
    },
  ]);

  return (
    <main className="p-6 flex min-h-screen bg-gray-50">
      {/* 왼쪽 타임라인 영역 (고정 너비) */}
      <div className="w-[300px] border-r p-4">
        <h1 className="text-xl font-bold mb-4">📅 타임라인 영역</h1>
        <TimeBarList />
      </div>

      {/* 오른쪽 플랜박스 영역 */}
      <div className="flex-1 p-4">
        <PlanBoxList boxes={boxes} onChange={setBoxes} />
      </div>
    </main>
  );
}
