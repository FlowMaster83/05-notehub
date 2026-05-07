import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce'

import type { NoteFormValues } from '../NoteForm/NoteForm'

import { fetchNotes, createNote, deleteNote } from '../../services/noteService';

import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';

import css from './App.module.css';

function App() {

  const queryClient = useQueryClient();

  const [page, setPage] = useState(1)
  const perPage = 12;

  const [filter, setFilter] = useState('')
  const [debouncedFilter] = useDebounce(filter, 500)

  const [isOpenCreateNote, setIsOpenCreateNote] = useState(false)

  const { data, error, isLoading, isError, isSuccess } = useQuery(
    {
      queryKey: ['notes', debouncedFilter, page],
      queryFn: () => fetchNotes(debouncedFilter, page, perPage),
      refetchOnWindowFocus: false, // temp
      placeholderData: (prevData) => prevData,
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
  const totalPages = data?.totalPages || 0;

  const openModal = () => setIsOpenCreateNote(true);
  const closeModal = () => setIsOpenCreateNote(false);

  const handleSearch = (newFilter: string) => {
    setFilter(newFilter);
    setPage(1);
  }

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>

          <SearchBox value={filter} onSearch={handleSearch} />

          {isSuccess && totalPages > 1 && (
            <Pagination totalPages={totalPages} currentPage={page} onPageChange={(nextPage) => setPage(nextPage)} />
          )}

          <button onClick={openModal} className={css.button}>Create note +</button>
        </header>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}

        {isSuccess && data.notes.length > 0 &&
          <NoteList onClick={handleDeleteNote} notes={notes} />}

        {isOpenCreateNote && <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} onSubmit={handleCreateNote} />
        </Modal>}
      </div>

    </>
  )
}

export default App