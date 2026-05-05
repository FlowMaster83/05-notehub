// import NoteForm from '../NoteForm/NoteForm';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { fetchNotes } from '../../services/noteService';
import { createNote } from '../../services/noteService';

import type { NoteFormValues } from '../NoteForm/NoteForm'

import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';

import css from './App.module.css';

function App() {

  const [filter, setFilter] = useState('')
  const [isOpenCreateNote, setIsOpenCreateNote] = useState(false)

  const { data, error, isLoading, isError, isSuccess } = useQuery(
    {
      queryKey: ['notes', filter],
      queryFn: () => fetchNotes(filter),
      refetchOnWindowFocus: false // temp
    }
  )

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      console.log('Success');
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const handleCreateNote = (values: NoteFormValues) => {
    mutation.mutate(values)
  }

  const notes = data?.notes || [];
  // const totalPages = data?.totalPages || 0;

  const openModal = () => setIsOpenCreateNote(true);
  const closeModal = () => setIsOpenCreateNote(false);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Пагінація */}

          <SearchBox onSearch={setFilter} />

          <button onClick={openModal} className={css.button}>Create note +</button>
        </header>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}

        {isSuccess && <NoteList notes={notes} />}

        {isOpenCreateNote && <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} onSubmit={handleCreateNote} />
        </Modal>}
      </div>

    </>
  )
}

export default App
