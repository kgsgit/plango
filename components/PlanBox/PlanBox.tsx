'use client';

import { useState } from 'react';
import { PlanBoxData } from './PlanBoxList';

type Props = {
  data: PlanBoxData;
  onUpdate: (data: Partial<PlanBoxData>) => void;
  onRemove: () => void;
};

export default function PlanBox({ data, onUpdate, onRemove }: Props) {
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (
    field: keyof Omit<PlanBoxData, 'id'>,
    value: string
  ) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="relative border border-gray-300 bg-white p-4 w-[300px]">
      {isEditing ? (
        <>
          {/* 삭제 버튼 */}
          <button
            className="absolute top-2 right-2 text-red-500"
            onClick={onRemove}
            aria-label="플랜박스 삭제"
          >
            ✕
          </button>
          <div className="space-y-2">
            {/* 시작시간 */}
            <div>
              <span className="font-medium">시작시간: </span>
              <select
                value={data.hours}
                onChange={(e) => handleChange('hours', e.target.value)}
                className="border px-2 py-1 mx-1"
              >
                <option value="">시</option>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={String(i).padStart(2, '0')}>
                    {i}시
                  </option>
                ))}
              </select>
              <select
                value={data.minutes}
                onChange={(e) => handleChange('minutes', e.target.value)}
                className="border px-2 py-1 mx-1"
              >
                <option value="">분</option>
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i} value={String(i * 10).padStart(2, '0')}>
                    {i * 10}분
                  </option>
                ))}
              </select>
            </div>

            {/* 소요시간 */}
            <div>
              <span className="font-medium">소요시간: </span>
              <select
                value={data.durHours}
                onChange={(e) => handleChange('durHours', e.target.value)}
                className="border px-2 py-1 mx-1"
              >
                <option value="">시간</option>
                {Array.from({ length: 13 }, (_, i) => (
                  <option key={i} value={String(i)}>
                    {i}h
                  </option>
                ))}
              </select>
              <select
                value={data.durMinutes}
                onChange={(e) => handleChange('durMinutes', e.target.value)}
                className="border px-2 py-1 mx-1"
              >
                <option value="">분</option>
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i} value={String(i * 10).padStart(2, '0')}>
                    {i * 10}분
                  </option>
                ))}
              </select>
            </div>

            {/* 제목 */}
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full border-b text-lg font-semibold pb-1"
              placeholder="제목"
            />

            {/* 메모 */}
            <textarea
              rows={2}
              value={data.memo}
              onChange={(e) => handleChange('memo', e.target.value)}
              className="w-full border px-2 py-1 text-base"
              placeholder="메모"
            />

            {/* 저장 버튼 */}
            <div className="flex justify-end">
              <button
                className="text-lg text-blue-500 font-medium"
                onClick={() => setIsEditing(false)}
                aria-label="플랜박스 저장"
              >
                💾
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 디스플레이 모드 */}
          <div className="space-y-2">
            <div>
              {data.hours && data.minutes
                ? `${data.hours}:${data.minutes}`
                : '시간 미지정'}
            </div>
            <div>
              {data.durHours || data.durMinutes
                ? `${data.durHours}h ${data.durMinutes}분`
                : '소요시간 미지정'}
            </div>
            <div className="text-lg font-semibold">
              {data.title || '제목 없음'}
            </div>
            <div className="text-base">{data.memo || '메모 없음'}</div>
          </div>

          {/* 편집 모드 전환 버튼 */}
          <button
            className="absolute bottom-2 right-2 text-gray-600"
            onClick={() => setIsEditing(true)}
            aria-label="편집 모드로 전환"
          >
            ✏️
          </button>
        </>
      )}
    </div>
  );
}
