import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce'

import { fetchNotes } from '../../services/noteService';

import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';

import css from './App.module.css';

function App() {

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
          <NoteList notes={notes} />}

        {isOpenCreateNote && <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>}
      </div>

    </>
  )
}

export default App