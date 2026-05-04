// import NoteForm from '../NoteForm/NoteForm';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';

import { fetchNotes } from '../../services/noteService';

import css from './App.module.css';
import NoteForm from '../NoteForm/NoteForm';

function App() {

  const [filter, setFilter] = useState('')
  const [isOpenCreateNote, setIsOpenCreateNote] = useState(false)

  const { data, isLoading, isError, isSuccess } = useQuery(
    {
      queryKey: ['notes', filter],
      queryFn: () => fetchNotes(filter),
      refetchOnWindowFocus: false
    }
  )

  const openModal = () => setIsOpenCreateNote(true);
  const closeModal = () => setIsOpenCreateNote(false);


  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Пагінація */}

          <SearchBox onSearch={setFilter} />
          {/* <NoteForm /> */}

          <button onClick={openModal} className={css.button}>Create note +</button>
        </header>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}

        {isSuccess && <NoteList notes={data} />}

        {isOpenCreateNote && <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>}
      </div>

    </>
  )
}

export default App
