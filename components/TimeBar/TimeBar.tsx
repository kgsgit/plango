// components/TimeBar/TimeBar.tsx
'use client';

import TimeBox from './TimeBox';

export default function TimeBar() {
  // 5시부터 23시까지 19개 생성
  const hours = Array.from({ length: 19 }, (_, i) => i + 5);
  return (
    <div className="flex flex-col">
      {hours.map((h) => (
        <TimeBox key={h} hour={h} />
      ))}
    </div>
  );
}
