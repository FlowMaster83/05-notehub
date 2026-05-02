import NoteList from '../NoteList/NoteList';
import css from './App.module.css';

function App() {
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <NoteList />
          <button className={css.button}>Create note +</button>


          {/* Компонент SearchBox */}
          {/* Пагінація */}
          {/* Кнопка створення нотатки */}
        </header>
      </div>

    </>
  )
}

export default App
