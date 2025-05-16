import React from "react";
import ButtonSpinner from "./spinners/ButtonSpinner";

const Loadmore = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  result,
  setPage,
  page,
  refView,
  store,
}) => {
  if (page === result?.total_pages) {
    return (
      <>
        {isFetchingNextPage ? (
          <button
            type="button"
            className="h-full relative my-8 text-primary p-1.5 rounded-full w-36 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ButtonSpinner />
          </button>
        ) : (
          <div className="my-8 p-1.5 flex items-center justify-center ">
            End of List.
          </div>
        )}
      </>
    );
  }

  if (!hasNextPage && result?.count > 0 && !store.isSearch) {
    return <div className="my-6 p-1.5">End of List.</div>;
  }

  if (hasNextPage)
    return (
      <>
        <button
          type="button"
          className="h-full relative my-8 text-primary p-1.5 rounded-full w-36 disabled:opacity-50 disabled:cursor-not-allowed"
          ref={refView}
          disabled={isFetchingNextPage}
          onClick={() => {
            setPage((previous) => previous + 1);
            fetchNextPage();
          }}
        >
          {isFetchingNextPage ? <ButtonSpinner /> : <span>Load more</span>}
        </button>
      </>
    );

  return <></>;
};

export default Loadmore;
