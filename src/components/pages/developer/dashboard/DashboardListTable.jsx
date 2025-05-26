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
import useQueryData from "../../../helper/useQueryData";
import { Link } from "react-router";

const DashboardListTable = ({ setItemEdit, setIsModal }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isActive, setIsActive] = React.useState("");
  const [onSearch, setOnSearch] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);

  const [pageAbout, setPageAbout] = React.useState(1);
  const [pageWork, setPageWork] = React.useState(1);
  const [pageTestimonials, setPageTestimonials] = React.useState(1);
  const [pageExperience, setPageExperience] = React.useState(1);
  const [pageService, setPageService] = React.useState(1);
  const { ref: refAbout, inView: inViewAbout } = useInView();
  const { ref: refWork, inView: inViewWork } = useInView();
  const { ref: refTestimonials, inView: inViewTestimonials } = useInView();
  const { ref: refExperience, inView: inViewExperience } = useInView();
  const { ref: refService, inView: inViewService } = useInView();

  const search = React.useRef({ value: "" });

  const {
    data: about,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      "dashboard-list",
      search.current.value,
      store.isSearch,
      isActive,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/rest/v1/controllers/developer/about/about.php`, // url search
        `/rest/v1/controllers/developer/about/page.php?start=${pageParam}`, // list page
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

  const {
    data: work,
    error: errorWork,
    fetchNextPage: fetchNextPageWork,
    hasNextPage: hasNextPageWork,
    isFetching: isFetchingWork,
    isFetchingNextPage: isFetchingNextPageWork,
    status: statusWork,
  } = useInfiniteQuery({
    queryKey: [
      "dashboard-list-work",
      search.current.value,
      store.isSearch,
      isActive,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/rest/v1/controllers/developer/work/work.php`, // url search
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

  const {
    data: testimonials,
    error: errorTestimonials,
    fetchNextPage: fetchNextPageTestimonials,
    hasNextPage: hasNextPageTestimonials,
    isFetching: isFetchingTestimonials,
    isFetchingNextPage: isFetchingNextPageTestimonials,
    status: statusTestimonials,
  } = useInfiniteQuery({
    queryKey: [
      "dashboard-list-testimonials",
      search.current.value,
      store.isSearch,
      isActive,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/rest/v1/controllers/developer/testimonials/testimonials.php`, // url search
        `/rest/v1/controllers/developer/testimonials/page.php?start=${pageParam}`, // list page
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

  const {
    data: experience,
    error: errorExperience,
    fetchNextPage: fetchNextPageExperience,
    hasNextPage: hasNextPageExperience,
    isFetching: isFetchingExperience,
    isFetchingNextPage: isFetchingNextPageExperience,
    status: statusExperience,
  } = useInfiniteQuery({
    queryKey: [
      "dashboard-list-experience",
      search.current.value,
      store.isSearch,
      isActive,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/rest/v1/controllers/developer/experience/experience.php`, // url search
        `/rest/v1/controllers/developer/experience/page.php?start=${pageParam}`, // list page
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

  const {
    data: service,
    error: errorService,
    fetchNextPage: fetchNextPageService,
    hasNextPage: hasNextPageService,
    isFetching: isFetchingService,
    isFetchingNextPage: isFetchingNextPageService,
    status: statusService,
  } = useInfiniteQuery({
    queryKey: [
      "dashboard-list-service",
      search.current.value,
      store.isSearch,
      isActive,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/rest/v1/controllers/developer/service/service.php`, // url search
        `/rest/v1/controllers/developer/service/page.php?start=${pageParam}`, // list page
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

  React.useEffect(() => {
    if (inViewAbout) {
      setPageAbout((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inViewAbout]);

  React.useEffect(() => {
    if (inViewWork) {
      setPageWork((prev) => prev + 1);
      fetchNextPageWork();
    }
  }, [inViewWork]);

  React.useEffect(() => {
    if (inViewTestimonials) {
      setPageTestimonials((prev) => prev + 1);
      fetchNextPageTestimonials();
    }
  }, [inViewTestimonials]);

  React.useEffect(() => {
    if (inViewExperience) {
      setPageExperience((prev) => prev + 1);
      fetchNextPageExperience();
    }
  }, [inViewExperience]);

  React.useEffect(() => {
    if (inViewService) {
      setPageService((prev) => prev + 1);
      fetchNextPageService();
    }
  }, [inViewService]);

  return (
    <>
      {/* SEARCH AND FILTER */}
      <div className="flex justify-between items-center py-3 w-100%">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 tracking-wide">About</h2>

        {/* Count with icon */}
        <div className="flex items-center gap-2 text-gray-600">
          <FaList className="text-xl text-primary" />
          <span className="font-semibold text-xl">
            {about?.pages
              .flatMap((page) => page.data)
              .filter((item) => item.about_is_active == 1).length ?? 0}
          </span>
        </div>
      </div>
      {/* TABLE */}
      <div className="relative">
        {status === "pending" && !isFetching && <FetchingSpinner />}

        {(status === "pending" || about?.pages[0]?.data?.length === 0) && (
          <div className="p-10">
            {status === "pending" ? (
              <TableLoading cols={2} count={20} />
            ) : (
              <NoData />
            )}
          </div>
        )}

        {error && (
          <div className="p-10">
            <ServerError cols={2} count={20} />
          </div>
        )}

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(() => {
            const limitedData = about?.pages
              ?.flatMap((page) => page.data)
              ?.filter((item) => item.about_is_active == 1)
              ?.slice(0, 3); // limit to 3 cards

            return limitedData?.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {item.about_title}
                </h3>
                <p className="text-sm text-gray-700">
                  {item.about_description}
                </p>
              </div>
            ));
          })()}
        </div>

        {/* Read More Link */}
        {about?.pages
          .flatMap((page) => page.data)
          .filter((item) => item.about_is_active == 1).length >= 3 && (
          <div className="mt-5 text-left">
            <Link
              to="/about"
              className="text-blue-600 hover:underline hover:text-primary"
            >
              Read More...
            </Link>
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center items-center flex-col pb-10">
          <Loadmore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            about={about?.pages[0]}
            setPage={setPageAbout}
            page={pageAbout}
            refView={refAbout}
            store={store}
          />
        </div>
      </div>

      {/* WORK HEADER */}
      <div className="flex justify-between items-center py-3 w-full">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 tracking-wide">
          Recent Works
        </h2>

        {/* Count with icon */}
        <div className="flex items-center gap-2 text-gray-600">
          <FaList className="text-xl text-primary" />
          <span className="font-semibold text-xl">
            {work?.pages
              .flatMap((page) => page.data)
              .filter((item) => item.work_is_active == 1).length ?? 0}
          </span>
        </div>
      </div>

      {/* WORK CARDS */}
      <div className="relative">
        {statusWork === "pending" && !isFetchingWork && <FetchingSpinner />}

        {(statusWork === "pending" || work?.pages[0]?.data?.length === 0) && (
          <div className="p-10">
            {statusWork === "pending" ? (
              <TableLoading cols={2} count={20} />
            ) : (
              <NoData />
            )}
          </div>
        )}

        {errorWork && (
          <div className="p-10">
            <ServerError cols={2} count={20} />
          </div>
        )}

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(() => {
            const limitedData = work?.pages
              ?.flatMap((page) => page.data)
              ?.filter((item) => item.work_is_active == 1)
              ?.slice(0, 3); // limit to 3 cards

            return limitedData?.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {item.work_title}
                </h3>
                <p className="text-sm text-gray-700 break-words">
                  <td>
                    <a
                      href={`https://github.com/dummyuser/${item.work_title
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {item.work_description}
                    </a>
                  </td>
                </p>
              </div>
            ));
          })()}
        </div>

        {/* Read More Link */}
        {work?.pages
          .flatMap((page) => page.data)
          .filter((item) => item.work_is_active == 1).length >= 3 && (
          <div className="mt-5 text-left">
            <Link
              to="/recent-works"
              className="text-blue-600 hover:underline hover:text-primary"
            >
              Read More...
            </Link>
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center items-center flex-col pb-10">
          <Loadmore
            fetchNextPage={fetchNextPageWork}
            isFetchingNextPage={isFetchingNextPageWork}
            hasNextPage={hasNextPageWork}
            about={work?.pages[0]}
            setPage={setPageWork}
            page={pageWork}
            refView={refWork}
            store={store}
          />
        </div>
      </div>

      {/* TESTIMONIALS HEADER */}
      <div className="flex justify-between items-center py-3 w-full">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 tracking-wide">
          Recent Testimonials
        </h2>

        {/* Count with icon */}
        <div className="flex items-center gap-2 text-gray-600">
          <FaList className="text-xl text-primary" />
          <span className="font-semibold text-xl">
            {testimonials?.pages
              .flatMap((page) => page.data)
              .filter((item) => item.testimonials_is_active == 1).length ?? 0}
          </span>
        </div>
      </div>

      {/* TESTIMONIAL CARDS */}
      <div className="relative">
        {statusTestimonials === "pending" && !isFetchingTestimonials && (
          <FetchingSpinner />
        )}

        {(statusTestimonials === "pending" ||
          testimonials?.pages[0]?.data?.length === 0) && (
          <div className="p-10">
            {statusTestimonials === "pending" ? (
              <TableLoading cols={2} count={20} />
            ) : (
              <NoData />
            )}
          </div>
        )}

        {errorTestimonials && (
          <div className="p-10">
            <ServerError cols={2} count={20} />
          </div>
        )}

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(() => {
            const limitedData = testimonials?.pages
              ?.flatMap((page) => page.data)
              ?.filter((item) => item.testimonials_is_active == 1)
              ?.slice(0, 3); // limit to 3 cards

            return limitedData?.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {item.testimonials_first_name} {item.testimonials_last_name}
                </h3>
                <p className="text-sm text-accent mb-1 break-words">
                  {item.testimonials_email}
                </p>
                <p className="text-sm text-gray-700">
                  {item.testimonials_description}
                </p>
              </div>
            ));
          })()}
        </div>

        {/* Read More Link */}
        {testimonials?.pages
          .flatMap((page) => page.data)
          .filter((item) => item.testimonials_is_active == 1).length >= 3 && (
          <div className="mt-5 text-left">
            <Link
              to="/testimonials"
              className="text-blue-600 hover:underline hover:text-primary"
            >
              Read More...
            </Link>
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center items-center flex-col pb-10">
          <Loadmore
            fetchNextPage={fetchNextPageTestimonials}
            isFetchingNextPage={isFetchingNextPageTestimonials}
            hasNextPage={hasNextPageTestimonials}
            about={testimonials?.pages[0]}
            setPage={setPageTestimonials}
            page={pageTestimonials}
            refView={refTestimonials}
            store={store}
          />
        </div>
      </div>

      {/* EXPERIENCE HEADER */}
      <div className="flex justify-between items-center py-3 w-full">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 tracking-wide">
          Recent Experience
        </h2>

        {/* Count with icon */}
        <div className="flex items-center gap-2 text-gray-600">
          <FaList className="text-xl text-primary" />
          <span className="font-semibold text-xl">
            {experience?.pages
              .flatMap((page) => page.data)
              .filter((item) => item.mainexperience_is_active == 1).length ?? 0}
          </span>
        </div>
      </div>

      {/* EXPERIENCE CARDS */}
      <div className="relative">
        {statusExperience === "pending" && !isFetchingExperience && (
          <FetchingSpinner />
        )}

        {(statusExperience === "pending" ||
          experience?.pages[0]?.data?.length === 0) && (
          <div className="p-10">
            {statusExperience === "pending" ? (
              <TableLoading cols={2} count={20} />
            ) : (
              <NoData />
            )}
          </div>
        )}

        {errorExperience && (
          <div className="p-10">
            <ServerError cols={2} count={20} />
          </div>
        )}

        {/* Grid display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(() => {
            const limitedData = experience?.pages
              ?.flatMap((page) => page.data)
              ?.filter((item) => item.mainexperience_is_active == 1)
              ?.slice(0, 3); // limit to 3 cards

            return limitedData?.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white"
              >
                <h3 className="text-lg font-semibold mb-1">
                  {item.mainexperience_title}
                </h3>
                <p className="text-sm text-primary font-medium mb-2">
                  {item.mainexperience_category}
                </p>
                <p className="text-sm text-gray-700">
                  {item.mainexperience_description}
                </p>
              </div>
            ));
          })()}
        </div>

        {/* Read More Link */}
        {experience?.pages
          .flatMap((page) => page.data)
          .filter((item) => item.mainexperience_is_active == 1).length >= 3 && (
          <div className="mt-5 text-left">
            <Link
              to="/experience"
              className="text-blue-600 hover:underline hover:text-primary"
            >
              Read More...
            </Link>
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center items-center flex-col pb-10">
          <Loadmore
            fetchNextPage={fetchNextPageExperience}
            isFetchingNextPage={isFetchingNextPageExperience}
            hasNextPage={hasNextPageExperience}
            about={experience?.pages[0]}
            setPage={setPageExperience}
            page={pageExperience}
            refView={refExperience}
            store={store}
          />
        </div>
      </div>

      {/* SERVICE HEADER */}
      <div className="flex justify-between items-center py-3 w-full">
        <h2 className="text-xl font-bold text-gray-800 tracking-wide">
          Recent Service
        </h2>
        <div className="flex items-center gap-2 text-gray-600">
          <FaList className="text-xl text-primary" />
          <span className="font-semibold text-xl">
            {service?.pages
              .flatMap((page) => page.data)
              .filter((item) => item.mainservice_is_active == 1).length ?? 0}
          </span>
        </div>
      </div>

      {/* SERVICE CARDS */}
      <div className="relative">
        {statusService === "pending" && !isFetchingService && (
          <FetchingSpinner />
        )}

        {(statusService === "pending" ||
          service?.pages[0]?.data?.length === 0) && (
          <div className="p-10">
            {statusService === "pending" ? (
              <TableLoading cols={2} count={20} />
            ) : (
              <NoData />
            )}
          </div>
        )}

        {errorService && (
          <div className="p-10">
            <ServerError cols={2} count={20} />
          </div>
        )}

        {/* Grid of cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(() => {
            const limitedData = service?.pages
              ?.flatMap((page) => page.data)
              ?.filter((item) => item.mainservice_is_active == 1)
              ?.slice(0, 3); // Limit to 3 active cards

            return limitedData?.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white cursor-pointer"
              >
                <h3 className="text-lg font-semibold mb-1">
                  {item.mainservice_title}
                </h3>
                <p className="text-sm text-primary font-medium mb-2">
                  {item.mainservice_category}
                </p>
                <p className="text-sm text-gray-700">
                  {item.mainservice_description}
                </p>
              </div>
            ));
          })()}
        </div>

        {/* Read More Link */}
        {service?.pages
          .flatMap((page) => page.data)
          .filter((item) => item.mainservice_is_active == 1).length >= 3 && (
          <div className="mt-5 text-left">
            <Link
              to="/services"
              className="text-blue-600 hover:underline hover:text-primary"
            >
              Read More...
            </Link>
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center items-center flex-col pb-10">
          <Loadmore
            fetchNextPage={fetchNextPageService}
            isFetchingNextPage={isFetchingNextPageService}
            hasNextPage={hasNextPageService}
            about={service?.pages[0]}
            setPage={setPageService}
            page={pageService}
            refView={refService}
            store={store}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardListTable;
