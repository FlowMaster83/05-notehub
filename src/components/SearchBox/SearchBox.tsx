// import { useEffect, useState } from 'react'
import css from './SearchBox.module.css'
import { useDebouncedCallback } from 'use-debounce'

interface SearchBoxProps {
    onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
    const debouncedSearch = useDebouncedCallback((value: string) => { onSearch(value) }, 500)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event.target.value)
    }

    return (
        <input
            className={css.input}
            onChange={handleChange}

            type='text'
            placeholder="Search notes"
        />
    )
};
