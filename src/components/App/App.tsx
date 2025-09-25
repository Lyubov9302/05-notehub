import css from "./App.module.css";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { FetchNotes } from "../../services/noteService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../Modal/Modal";

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchValue(query);
    setPage(1);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", searchValue, page],
    queryFn: () => FetchNotes(searchValue, page),
    enabled: !!searchValue,
    placeholderData: keepPreviousData,
  });

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const updateSearchWord = useDebouncedCallback((searchWord: string) => {
    setSearchValue(searchWord);
    setPage(1);
  }, 500);

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        <button
          className={css.button}
          onClick={openModal}
        >
          Create note +
        </button>
      </header>
      {data !== undefined && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          children={<NoteForm />}
        />
      )}
      <Toaster />
    </div>
  );
}
