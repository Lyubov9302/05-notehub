import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  totalPages: number;
  page: number;
  onChange: Dispatch<SetStateAction<number>>;
}

export default function Pagination({
  totalPages,
  page,
  onChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
