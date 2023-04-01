'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useRequestContext } from 'context/request-context';
import { LoadingDots } from '@/components/LoadingDots';

const Projects = () => {
  const [input, setInput] = useState('Nytt projekt');
  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [addClicked, setAddClicked] = useState(0);
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const { myProjects, getMyProjects, setMyProjects, isFetching, isPrelAdmin } =
    useRequestContext();

  const handleFocus = useCallback(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  const handleEnterButton = (e) => {
    if (e.key === 'Enter') {
      handleConfirmEdit();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddItem = async () => {
    const projectTitle = 'Nytt projekt';
    setInput(projectTitle);

    try {
      const res = await axios.post('/api/projects/add-project', {
        projectTitle,
      });

      setAddClicked(addClicked + 1);
      setMyProjects((prevProjects) => {
        return [...prevProjects, res.data.result];
      });
      setEditingIndex(myProjects.length);
      handleFocus(editingIndex);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
    setInput(myProjects[index].projectTitle);
  };

  const handleConfirmEdit = () => {
    if (!myProjects[editingIndex]) {
      return;
    }

    const projectId = myProjects[editingIndex]._id;
    setIsEditing(true);

    axios
      .put('/api/projects/edit-projectTitle', {
        projectId,
        input,
      })
      .then((res) => {
        console.log('res', res);
        setMyProjects((prevProjects) => {
          return [...prevProjects, res.data.result];
        });
        setIsEditing(false);
        setEditingIndex(null);
        setInput(res.data.result.value.projectTitle);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteItem = (index) => {
    if (editingIndex) {
      setDeletingIndex(null);
      setEditingIndex(null);
      return;
    }
    setDeletingIndex(index);
  };

  const handleConfirmDelete = () => {
    if (deletingIndex === null) {
      return;
    }
    const projectId = myProjects[deletingIndex]._id;
    setDeletingIndex(null);

    try {
      axios
        .delete('/api/projects/delete-project', {
          data: {
            projectId,
          },
        })
        .then(() => {
          getMyProjects();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleFocus();
    getMyProjects();
  }, [handleFocus, getMyProjects]);

  return (
    <div className="bg-white text-gray-800 flex flex-col grow rounded-xl justify-between align-center p-6 mr-4">
      <section>
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-semibold leading-none text-gray-800 dark:text-white">
            Projekt
          </h5>

          {isPrelAdmin && (
            <button
              onClick={() => {
                handleAddItem();
              }}
            >
              <span className="flex bg-orange py-2 px-2 rounded text-black font-semibold">
                <PencilSquareIcon className="h-6 w-6 stroke-1.5 mr-2" />
                Nytt projekt
              </span>
            </button>
          )}
        </div>

        {isFetching && (
          <div className="flex justify-center items-center">
            <LoadingDots />
          </div>
        )}

        {myProjects.length === 0 && (
          <p className="text-sm font-light text-gray-dark mt-2">
            Du har inga sparade projekt
          </p>
        )}

        <ul className="mt-2">
          {Array.isArray(myProjects) &&
            myProjects.map((project, index) => (
              <li key={index} className="w-full flex items-center">
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      name="projectTitle"
                      ref={inputRef}
                      className="w-full px-2 py-1 mobile:text-base font-light cursor-text rounded-sm mr-2 bg-gray-200"
                      value={input}
                      onChange={handleInputChange}
                      required
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleEnterButton(e);
                        }
                      }}
                    />
                    <button
                      disabled={isEditing}
                      onClick={() => handleConfirmEdit(index)}
                    >
                      Bekräfta
                    </button>
                  </>
                ) : (
                  <>
                    <p className="w-full py-1 flex items-center text-lg font-normal cursor-pointer hover:underline">
                      <Link
                        href={`/management/request/dashboard/projects/${project?._id}`}
                      >
                        {project?.projectTitle}
                      </Link>
                    </p>
                    {isPrelAdmin && (
                      <button
                        onClick={() => handleEditItem(index)}
                        className="text-sm flex"
                      >
                        <PencilSquareIcon className="w-10 h-10 inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" />
                      </button>
                    )}
                  </>
                )}
                {isPrelAdmin && (
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="flex text-sm"
                  >
                    <XCircleIcon className="w-10 h-10 inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" />
                  </button>
                )}
              </li>
            ))}
        </ul>

        {deletingIndex ||
          (deletingIndex === 0 && (
            <div className="flex flex-col mt-2 px-2 bg-gray-200 rounded-md">
              <p>{myProjects[deletingIndex].projectTitle}</p>
              <div className="flex justify-between items-center">
                <p>
                  <span className="font-bold">Ta bort:</span>
                  &nbsp;Är du säker?
                </p>
                <section>
                  <button
                    type="button"
                    className="ml-4"
                    onClick={handleConfirmDelete}
                  >
                    Ja
                  </button>
                  /<button onClick={() => setDeletingIndex(null)}>Nej</button>
                </section>
              </div>
            </div>
          ))}
      </section>
      <figure className="flex justify-end">
        <Link
          className="cursor-pointer"
          href={`/management/request/dashboard/projects`}
        >
          <p className="text-xs text-gray-dark cursor-pointer hover:underline mt-3">
            Visa alla
          </p>
        </Link>
      </figure>
    </div>
  );
};

export default Projects;
