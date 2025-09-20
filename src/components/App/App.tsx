import css from "./App.module.css";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { FetchNotes } from "../../services/noteService";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../Modal/Modal";

export default function App() {
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (query) => {
    setSearchValue(query);
    setPage(1);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", searchValue, page],
    queryFn: () => FetchNotes(searchValue, page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data?.notes.length === 0 && searchValue !== "") {
      toast.error("No notes found for your request");
    }
  }, [isSuccess, data, searchValue]);

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
        <SearchBox onChange={updateSearchWord} />
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
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          children={<NoteForm onClose={closeModal} />}
        />
      )}
      <Toaster />
    </div>
  );
}
