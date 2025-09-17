import css from "./App.module.css";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { FetchNotes } from "../../services/noteService";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

export default function App() {
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);

  const handleSearch = (query) => {
    setSearchValue(query);
    setPage(1);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", searchValue, page, perPage],
    queryFn: () => FetchNotes(searchValue, page, perPage),
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Нотатка успішно видалена!");
    },
    onError: () => {
      toast.error("Помилка при видаленні нотатки.");
    },
  });

  useEffect(() => {
    if (isSuccess && data?.notes.length === 0 && searchValue !== "") {
      toast.error("No movies found for your request");
    }
  }, [isSuccess, data, searchValue]);

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const hasNotes = data?.notes && data.notes.length > 0;
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {totalPages > 1 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        )}
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      {hasNotes && (
        <NoteList
          notes={data.notes}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
