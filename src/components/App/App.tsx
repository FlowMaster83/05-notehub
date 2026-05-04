// import NoteForm from '../NoteForm/NoteForm';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';

import { fetchNotes } from '../../services/noteService';

import css from './App.module.css';

function App() {

  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log(`Make HTTP request with: ${filter}`);
  }, [filter])

  const { data, error, isLoading, isError, isSuccess } = useQuery(
    {
      queryKey: ['notes', filter],
      queryFn: () => fetchNotes(filter),
      refetchOnWindowFocus: false
    }
  )

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Пагінація */}

          <SearchBox onSearch={setFilter} />
          {/* <NoteForm /> */}

          <button className={css.button}>Create note +</button>
        </header>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}

        {isSuccess && <NoteList notes={data} />}
      </div>

    </>
  )
}

export default App
