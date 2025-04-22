'use client';

import { useState } from 'react';

export default function PlanBoxCreator() {
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const handleCreate = () => {
    if (!time || !duration || !title) {
      alert('시간, 소요시간, 제목은 필수입니다!');
      return;
    }
    console.log('생성된 플랜:', { time, duration, title, note });
    // 이후 이 데이터를 PlanBoxList로 전달하거나 전역 관리 예정
    setTime('');
    setDuration('');
    setTitle('');
    setNote('');
  };

  return (
    <div className="border rounded p-4 shadow-sm w-full max-w-md bg-white">
      <h2 className="text-lg font-bold mb-2">📝 새 플랜 만들기</h2>

      <label className="block mb-1">시간</label>
      <select
        className="border p-2 w-full mb-2"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      >
        <option value="">선택</option>
        {[...Array(24)].map((_, h) =>
          [0, 10, 20, 30, 40, 50].map((m) => {
            const val = `${h.toString().padStart(2, '0')}:${m
              .toString()
              .padStart(2, '0')}`;
            return (
              <option key={val} value={val}>
                {val}
              </option>
            );
          })
        )}
      </select>

      <label className="block mb-1">소요 시간</label>
      <select
        className="border p-2 w-full mb-2"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      >
        <option value="">선택</option>
        {[...Array(12)].map((_, i) => (
          <option key={i} value={`${(i + 1) * 30}분`}>
            {(i + 1) * 30}분
          </option>
        ))}
      </select>

      <label className="block mb-1">제목</label>
      <input
        className="border p-2 w-full mb-2"
        placeholder="제목 입력"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="block mb-1">메모</label>
      <textarea
        className="border p-2 w-full mb-2"
        rows={3}
        placeholder="메모 입력"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-2 w-full rounded"
      >
        플랜박스 생성
      </button>
    </div>
  );
}
