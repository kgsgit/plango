'use client';

import { useState, useRef } from 'react';
import { PlanBoxData } from './PlanBoxList';

type Props = {
  data: PlanBoxData;
  onUpdate: (data: Partial<PlanBoxData>) => void;
  onRemove: () => void;
};

export default function PlanBox({ data, onUpdate, onRemove }: Props) {
  const [edit, setEdit] = useState({
    time: true,
    duration: true,
    title: true,
    memo: true,
  });

  const hoursRef = useRef<HTMLSelectElement>(null);
  const minutesRef = useRef<HTMLSelectElement>(null);
  const durHoursRef = useRef<HTMLSelectElement>(null);
  const durMinutesRef = useRef<HTMLSelectElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const memoRef = useRef<HTMLTextAreaElement>(null);

  const blur = (f: keyof typeof edit) => setEdit(e => ({ ...e, [f]: false }));
  const focus = (f: keyof typeof edit) => {
    setEdit(e => ({ ...e, [f]: true }));
    const refs = { time: hoursRef, duration: durHoursRef, title: titleRef, memo: memoRef };
    refs[f]?.current?.focus();
  };

  return (
    <div className="relative border border-gray-300 bg-white p-3 space-y-2">
      {/* 시간 선택 */}
      <div className="flex space-x-2">
        {edit.time ? (
          <>
            <select
              ref={hoursRef}
              value={data.hours}
              onChange={e => onUpdate({ hours: e.target.value })}
              onBlur={() => blur('time')}
              className="border px-2 py-1 flex-1"
            >
              <option value="">시</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={String(i).padStart(2,'0')}>
                  {i}시
                </option>
              ))}
            </select>
            <select
              ref={minutesRef}
              value={data.minutes}
              onChange={e => onUpdate({ minutes: e.target.value })}
              onBlur={() => blur('time')}
              className="border px-2 py-1 flex-1"
            >
              <option value="">분</option>
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i} value={String(i*10).padStart(2,'0')}>
                  {i*10}분
                </option>
              ))}
            </select>
          </>
        ) : (
          <div className="cursor-pointer" onClick={() => focus('time')}>
            {data.hours && data.minutes 
              ? `${data.hours}:${data.minutes}` 
              : '시간 선택'}
          </div>
        )}
      </div>

      {/* 소요시간 선택 */}
      <div className="flex space-x-2">
        {edit.duration ? (
          <>
            <select
              ref={durHoursRef}
              value={data.durHours}
              onChange={e => onUpdate({ durHours: e.target.value })}
              onBlur={() => blur('duration')}
              className="border px-2 py-1 flex-1"
            >
              <option value="">시간</option>
              {Array.from({ length: 13 }, (_, i) => (
                <option key={i} value={String(i)}>
                  {i}h
                </option>
              ))}
            </select>
            <select
              ref={durMinutesRef}
              value={data.durMinutes}
              onChange={e => onUpdate({ durMinutes: e.target.value })}
              onBlur={() => blur('duration')}
              className="border px-2 py-1 flex-1"
            >
              <option value="">분</option>
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i} value={String(i*10).padStart(2,'0')}>
                  {i*10}분
                </option>
              ))}
            </select>
          </>
        ) : (
          <div className="cursor-pointer" onClick={() => focus('duration')}>
            {(data.durHours || data.durMinutes) 
              ? `${data.durHours}h ${data.durMinutes}min` 
              : '소요시간'}
          </div>
        )}
      </div>

      {/* 제목 */}
      {edit.title ? (
        <input
          ref={titleRef}
          type="text"
          value={data.title}
          onChange={e => onUpdate({ title: e.target.value })}
          onBlur={() => blur('title')}
          className="w-full border-b text-lg font-semibold pb-1"
          placeholder="제목"
        />
      ) : (
        <div className="cursor-pointer text-lg font-semibold" onClick={() => focus('title')}>
          {data.title || '제목'}
        </div>
      )}

      {/* 메모 */}
      {edit.memo ? (
        <textarea
          ref={memoRef}
          rows={2}
          value={data.memo}
          onChange={e => onUpdate({ memo: e.target.value })}
          onBlur={() => blur('memo')}
          className="w-full border px-2 py-1 text-base"
          placeholder="메모"
        />
      ) : (
        <div className="cursor-pointer text-base" onClick={() => focus('memo')}>
          {data.memo || '메모'}
        </div>
      )}

      {/* 삭제 버튼 */}
      <button
        className="absolute bottom-2 right-2 text-red-500"
        onClick={onRemove}
      >
        ✕
      </button>
    </div>
  );
}
