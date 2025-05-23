import React from "react";
import { useInView } from "react-intersection-observer";
import { FaArchive, FaEdit, FaHistory, FaList, FaTrash } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";

// import {
//   setIsSearch,
//   setArchive,
//   setRestore,
//   setDelete,
// } from "../../../../../store/StoreAction";

import { queryDataInfinite } from "../../../helper/queryDataInfinite";
import TableLoading from "../../../partials/spinners/TableLoading";
import ServerError from "../../../partials/ServerError";
import Loadmore from "../../../partials/Loadmore";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";
import NoData from "../../../partials/NoData";
import ModalArchive from "../../../partials/modal/ModalArchive";
import ModalDelete from "../../../partials/modal/ModalDelete";
import ModalRestore from "../../../partials/modal/ModalRestore";
import { StoreContext } from "../../../../../store/StoreContext";
import SearchBarWithFilterStatus from "../../../partials/SearchBarWithFilterStatus";
import {
  setArchive,
  setDelete,
  setRestore,
} from "../../../../../store/StoreAction";

const WorkListTable = ({ setItemEdit, setIsModal }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isActive, setIsActive] = React.useState("");
  const [onSearch, setOnSearch] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const search = React.useRef({ value: "" });
  let count = 1;

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["work-list", search.current.value, store.isSearch, isActive],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/rest/v1/controllers/developer/work/search.php`, // url search
        `/rest/v1/controllers/developer/work/page.php?start=${pageParam}`, // list page
        store.isSearch || isFilter, // search boolean
        {
          searchValue: search?.current?.value,
          isActive,
          isFilter,
          id: "",
        }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
  });

  const [id, setId] = React.useState(null);
  const [dataItem, setDataItem] = React.useState(null);

  const handleEdit = (item) => {
    setItemEdit(item);
    setIsModal(true);
  };

  const handleArchive = (item) => {
    setDataItem(item);
    setId(item.work_aid);
    dispatch(setArchive(true));
  };

  const handleRestore = (item) => {
    setDataItem(item);
    setId(item.work_aid);
    dispatch(setRestore(true));
  };

  const handleDelete = (item) => {
    setDataItem(item);
    setId(item.work_aid);
    dispatch(setDelete(true));
  };

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      {/* SEARCH AND FILTER */}
      <div className="flex justify-between items-center py-3">
        <div className="flex items-center gap-x-3">
          {/* STATUS SELECT */}
          <div className="relative w-28">
            <label>Status</label>
            <select
              name="status"
              value={isActive}
              onChange={(e) => {
                const val = e.target.value;
                search.current.value = "";
                setIsActive(val);
                if (val === "") {
                  setIsFilter(false);

                  dispatch(setIsSearch(false));
                }
                if (val !== "") setIsFilter(true);
              }}
              disabled={false}
              className="h-8 py-1"
            >
              <optgroup label="Select a status">
                <option value="">All</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </optgroup>
            </select>
          </div>
          {/* COUNT OF DATA */}
          <div className="flex items-center gap-x-2">
            <FaList />
            <span>
              {result?.pages.reduce(
                (total, page) => total + (page.data?.length || 0),
                0
              ) ?? 0}
            </span>
          </div>
        </div>
        <div className="relative">
          <SearchBarWithFilterStatus
            search={search}
            dispatch={dispatch}
            store={store}
            result={0}
            isFetching={false}
            setOnSearch={setOnSearch}
            onSearch={onSearch}
            isFilter={isFilter}
          />
        </div>
      </div>
      {/* TABLE */}
      <div className="relative">
        {status === "pending" && !isFetching && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th className="w-[1rem] text-center">#</th>
              <th className="w-[2rem]">Status</th>
              <th className="w-[20rem]">Title</th>
              <th className="w-[20rem]">Description</th>

              <th colSpan="100%"></th>
            </tr>
          </thead>
          <tbody>
            {(status === "pending" || result?.pages[0]?.data?.length === 0) && (
              <tr>
                <td colSpan="100%" className="p-10">
                  {status === "pending" ? (
                    <TableLoading cols={2} count={20} />
                  ) : (
                    <NoData />
                  )}
                </td>
              </tr>
            )}

            {error && (
              <tr>
                <td colSpan="100%" className="p-10">
                  <ServerError cols={2} count={20} />
                </td>
              </tr>
            )}

            {result?.pages.map((page, key) => (
              <React.Fragment key={key}>
                {Array.isArray(page.data) &&
                  page.data.map((item, key) => (
                    <tr key={key} className="relative group cursor-pointer">
                      <td className="text-center">{count++}.</td>
                      <td>
                        {item.work_is_active == 1 ? (
                          <span className="text-green-600">Active</span>
                        ) : (
                          <span className="text-gray-600">Inactive</span>
                        )}
                      </td>
                      <td>{item.work_title}</td>
                      <td>{item.work_description}</td>
                      <td colSpan="100%">
                        {item.work_is_active == 1 ? (
                          <div className="flex gap-x-3 items-center justify-end mr-2">
                            <button
                              type="button"
                              className="tooltip-action-table"
                              data-tooltip="Edit"
                              onClick={() => handleEdit(item)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              className="tooltip-action-table"
                              data-tooltip="Archive"
                              onClick={() => handleArchive(item)}
                            >
                              <FaArchive />
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-x-3 items-center justify-end mr-2">
                            <button
                              type="button"
                              className="tooltip-action-table"
                              data-tooltip="Restore"
                              onClick={() => handleRestore(item)}
                            >
                              <FaHistory />
                            </button>
                            <button
                              type="button"
                              className="tooltip-action-table"
                              data-tooltip="Delete"
                              onClick={() => handleDelete(item)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center flex-col pb-10">
          <Loadmore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            result={result?.pages[0]}
            setPage={setPage}
            page={page}
            refView={ref}
            store={store}
          />
        </div>
      </div>

      {store.archive && (
        <ModalArchive
          endpoint={`/rest/v1/controllers/developer/work/active.php?workid=${id}`}
          msg={`Are you sure want to archive this record?`}
          successMsg={`Successfully Archived`}
          queryKey={`work-list`}
        />
      )}

      {store.delete && (
        <ModalDelete
          endpoint={`/rest/v1/controllers/developer/work/work.php?workid=${id}`}
          msg={`Are you sure want to delete this record?`}
          successMsg={`Successfully Delete.`}
          item={dataItem.work_name}
          queryKey={`work-list`}
        />
      )}

      {store.restore && (
        <ModalRestore
          endpoint={`/rest/v1/controllers/developer/work/active.php?workid=${id}`}
          msg={`Are you sure want to archive this record?`}
          successMsg={`Successfully Restore`}
          queryKey={`work-list`}
        />
      )}
    </>
  );
};

export default WorkListTable;
