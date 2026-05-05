import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { fetchNotes } from '../../services/noteService';
import { createNote } from '../../services/noteService';
import { deleteNote } from '../../services/noteService';

import type { NoteFormValues } from '../NoteForm/NoteForm'

import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';

import css from './App.module.css';

function App() {

  const queryClient = useQueryClient();

  const [filter, setFilter] = useState('')
  const [isOpenCreateNote, setIsOpenCreateNote] = useState(false)

  const { data, error, isLoading, isError, isSuccess } = useQuery(
    {
      queryKey: ['notes', filter],
      queryFn: () => fetchNotes(filter),
      refetchOnWindowFocus: false // temp
    }
  )

  const creation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      console.log('New note created');
    },
    onError: (error) => {
      console.log('Creation error: ', error);
    }
  })

  const handleCreateNote = (values: NoteFormValues) => {
    creation.mutate(values)
  }

  const deletion = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      console.log('Note deleted');
    },
    onError: (error) => {
      console.log('Deletion error: ', error);
    }
  })

  const handleDeleteNote = (id: string) => {
    deletion.mutate(id)
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

        {isSuccess && <NoteList onClick={handleDeleteNote} notes={notes} />}

        {isOpenCreateNote && <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} onSubmit={handleCreateNote} />
        </Modal>}
      </div>

    </>
  )
}

export default App