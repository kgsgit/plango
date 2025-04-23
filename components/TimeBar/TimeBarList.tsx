// components/TimeBar/TimeBarList.tsx
'use client';

import TimeBar from './TimeBar';

export default function TimeBarList() {
  return (
    <div className="space-y-4">
      {/* 하루 단위 타임바가 여러 개일 경우 map */}
      <TimeBar />
      {/* 추가 날짜가 있으면 <TimeBar /> 를 반복 */}
    </div>
  );
}
