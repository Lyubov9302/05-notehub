import css from "./App.moduel.css";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (search: string) => {
    setSearchValue(search);
    setPage(1);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", searchValue, page],
    queryFn: () => FetchNotes(searchValue, page),
    enabled: !!searchValue,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data?.results.length === 0 && searchValue !== "") {
      toast.error("No movies found for your request");
    }
  }, [isSuccess, data, searchValue]);

  const handleDelete = (id) => {
    console.log(`Тимчасово видаляємо нотатку з ID: ${id}`);
    toast.success(`Видалено нотатку ${id}`);
  };
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {data.length > 0 && (
          <NoteList
            notes={data.result}
            onDelete={handleDelete}
          />
        )}
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
    </div>
  );
}
