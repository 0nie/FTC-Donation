import React from 'react';
import { FaArchive, FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import TableLoading from '../../../../partials/spinners/TableLoading';
import ServerError from '../../../../partials/ServerError';
import FetchingSpinner from '../../../../partials/spinners/FetchingSpinner';

const SettingsCategoryList = () => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 3000);
    }, []);

  return (
    <div className="relative rounded-md overflow-auto z-0">
        <FetchingSpinner/>
      <div className="overflow-auto max-h-[70dvh]">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-[3rem] text-center">#</th>
              <th className="w-[3rem]">Status</th>
              <th className="w-[15rem]">Name</th>
              <th className="w-[15rem]">Description</th>
              <th colSpan="100%">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center'>
                <td colSpan="100%">
                    <TableLoading cols={2} count={20}/>
                </td>
            </tr>
            <tr className='text-center'>
                <td colSpan="100%">
                    <ServerError/>
                </td>
            </tr>
            <tr className="hover:bg-gray-100 group">
              <td className="text-left px-4 py-2">1</td>
              <td className="px-4 py-2">
                <span className="text-green-600 font-medium">Active</span>
              </td>
              <td className="px-4 py-2 max-w-[10rem] truncate">
                Feeding Program
              </td>
              <td className="px-4 py-2 max-w-[16rem] truncate">
                Weekly Community Development Program
              </td>
              <td className="px-4 py-2">
                <div className="flex gap-x-3 items-center justify-end">
                  <button
                    type="button"
                    className="btn-table-action tooltip-action-table"
                    title="Edit"
                     data-tooltip="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    type="button"
                    className="btn-table-action tooltip-action-table"
                    title="Archive"
                    data-tooltip="Archive"
                  >
                    <FaArchive />
                  </button>
                </div>
              </td>
            </tr>

            <tr className="hover:bg-gray-100 group">
              <td className="text-left px-4 py-2">1</td>
              <td className="px-4 py-2">
                <span className="text-green-600 font-medium">Active</span>
              </td>
              <td className="px-4 py-2 max-w-[10rem] truncate">
                Feeding Program
              </td>
              <td className="px-4 py-2 max-w-[16rem] truncate">
                Weekly Community Development Program
              </td>
              <td className="px-4 py-2">
                <div className="flex gap-x-3 items-center justify-end">
                  <button
                    type="button"
                    className="btn-table-action tooltip-action-table"
                    title="Edit"
                    data-tooltip="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    type="button"
                    className="btn-table-action tooltip-action-table"
                    title="Archive"
                    data-tooltip="Archive"
                  >
                    <FaArchive />
                  </button>
                </div>
              </td>
            </tr>

            <tr className="hover:bg-gray-100 group">
              <td className="text-left px-4 py-2">1</td>
              <td className="px-4 py-2">
                <span className="text-green-600 font-medium">Active</span>
              </td>
              <td className="px-4 py-2 max-w-[10rem] truncate">
                Feeding Program
              </td>
              <td className="px-4 py-2 max-w-[16rem] truncate">
                Weekly Community Development Program
              </td>
              <td className="px-4 py-2">
                <div className="flex gap-x-3 items-center justify-end">
                  <button
                    type="button"
                    className="btn-table-action tooltip-action-table"
                    title="Edit"
                    data-tooltip="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    type="button"
                    className="btn-table-action tooltip-action-table"
                    title="Archive"
                    data-tooltip="Archive"
                  >
                    <FaArchive />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SettingsCategoryList;
