// components/TimeBar/TimeBox.tsx
'use client';

export default function TimeBox({ hour }: { hour: number }) {
  return (
    <div className="flex items-center border-b border-gray-200 h-12">
      <span className="text-sm text-gray-500">{hour.toString().padStart(2, '0')}:00</span>
    </div>
  );
}
