import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';

function App() {
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Пагінація */}

          <SearchBox />
          
          <button className={css.button}>Create note +</button>
        </header>
        <NoteList />
      </div>

    </>
  )
}

export default App
