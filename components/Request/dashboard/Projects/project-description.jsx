'use client';
import {
  InformationCircleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { useState, Suspense, lazy } from 'react';
const ReactQuill = lazy(() => import('react-quill'));
import { LoadingDots } from '@/components/LoadingDots';
const LoadingIndicator = () => <LoadingDots />;
import 'react-quill/dist/quill.snow.css';

export const ProjectDescription = ({ isPrelAdmin }) => {
  const [text, setText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleTextChange = (value) => {
    setText(value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
  ];

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <h3 className="flex justify-between items-center text-2xl font-semibold mt-4 mb-2">
        Projektbeskrivning
        <button
          onClick={() => {
            setShowInfo(!showInfo);
          }}
        >
          <InformationCircleIcon className="h-6 w-6 stroke-2 mobile:mr-2" />
        </button>
      </h3>
      {isPrelAdmin && showInfo && (
        <p className="text-sm text-gray-800 bg-gray-200 mb-4 tracking-tight p-4">
          <span className="flex items-start mobile:items-center flex-col mobile:flex-row font-semibold">
            <InformationCircleIcon className="h-6 w-6 stroke-2 mobile:mr-2" />
            <p>Kort beskrivning av projektet för dig eller ditt team. </p>
          </span>
          <br />
          <p className="text-sm font-normal">
            Vad är det för projekt? Beskriv till exempel syfte och mål? Vad är
            det för krav? Vad är det för förutsättningar? Vad är det för
            tidsram? Vad är det för budget? Vad är det för risker? Vad är det
            för möjligheter?
          </p>
        </p>
      )}

      {editMode && typeof document !== 'undefined' && (
        <ReactQuill
          value={text}
          onChange={handleTextChange}
          modules={modules}
          formats={formats}
          placeholder="Enter your text here..."
          className="text-black mb-4"
        />
      )}
      {!editMode && (
        <div className="min-h-12 p-4 rounded-md shadow-sm border border-1 border-gray-300 mb-4">
          <div dangerouslySetInnerHTML={{ __html: text }} />
          {!text && (
            <p className="font-light text-gray-400">Ingen projektinfo än...</p>
          )}
        </div>
      )}
      {isPrelAdmin && (
        <button
          onClick={toggleEditMode}
          className="flex bg-purple-300 py-2 px-2 rounded text-white font-semibold mb-4 hover:bg-purple-400"
        >
          <PencilSquareIcon className="h-6 w-6 stroke-1.5 mr-2" />
          {editMode ? 'Klar' : 'Ändra'}
        </button>
      )}
    </Suspense>
  );
};
