import React from 'react';
import { FaArchive, FaEdit, FaHistory, FaTrash, FaTrashRestoreAlt } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import TableLoading from '../../../../partials/spinners/TableLoading';
import ServerError from '../../../../partials/ServerError';
import FetchingSpinner from '../../../../partials/spinners/FetchingSpinner';
import useQueryData from '../../../../helper/useQueryData';
import Nodata from '../../../../partials/spinners/Nodata';

const SettingsCategoryList = ({setItemEdit, setIsModal}) => {
  let count = 1;
  const {
    isLoading, //INITIAL LOADING
    isFetching, //WHEN PAGE IS LOADED DATA IS TO REFETCH
    error, //REQUEST IS ERROR
    data: category //THE DATA IS STORED IN VARIABLE CATEGORY
    } = useQueryData(
      `/rest/v1/controllers/developer/settings/category/category.php`, //REQUEST API URL
      'get', //METHOD REQUEST
      'category', // KEY FOR REFETCHING
      {}, // PAYLOAD
      null, // ID
      true // FOR REFETCHING
    );

    console.log(category);

    const handleEdit = (item) => {
    setItemEdit(item);
    setIsModal(true);
  };





  
    // const [isLoaded, setIsLoaded] = React.useState(false);

    // React.useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoaded(true);
    //     }, 3000);
    // }, []);

  return (
    <div className="relative rounded-md overflow-auto z-0">
        {isFetching && !isLoading  && <FetchingSpinner/>}
      <div className="overflow-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-[3rem] text-center">#</th>
              <th className="w-[3rem]">Status</th>
              <th className="w-[15rem]">Name</th>
              <th className="w-[15rem]">Description</th>
              <th className="flex gap-x-3 items-center justify-end mr-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <>
                <tr className='text-center'>
                  <td colSpan="100%">
                      <TableLoading cols={2} count={20}/>
                  </td>
                </tr>
              </>
            )}
            {error && (
              <>
                <tr className='text-center'>
                  <td colSpan="100%">
                      <ServerError/>
                  </td>
                </tr>
              </>
            )}
            {/* IF DATA HAS NO COUNT */}
            {category?.count == 0 && 
            <>
              <tr className='text-center'>
                <td colSpan="100%">
                  <Nodata/>
                </td>
              </tr>
            </>}
            {/* IF DATA HAS COUNT */}
            {category?.count > 0 &&
                category.data.map((item, key) => {
                  return (
                    <tr className='group relative' key={key}>
                      <td>{count++}.</td>
                      <td >
                        {item.category_is_active == 1 ? (
                          <span className='text-green-600'>Active</span>
                        ): (
                          <span className='text-gray-600'>Inactive</span>
                        )}
                        
                      </td>
                      <td>{item.category_name}</td>
                      <td className='max-w-[6rem] truncate'>
                        {item.category_description}
                      </td>
                      <td colSpan='100%'>
                        {item.category_is_active == 1 ? 
                        <>
                          <div className='flex gap-x-3 items-center justify-end mr-2'>
                            <button
                              type='button'
                              className='tooltip-action-table'
                              data-tooltip='Edit'
                              onClick={() => handleEdit(item)}
                            >
                              <FaEdit />
                            </button>

                            <button
                              type='button'
                              className='tooltip-action-table'
                              data-tooltip='Archive'
                            >
                              <FaArchive />
                            </button>
                          </div>
                        </> 
                        : 
                        <>
                        <div className='flex gap-x-3 items-center justify-end mr-2'>
                          <button
                            type='button'
                            className='tooltip-action-table'
                            data-tooltip='Restore'>
                            <FaHistory />
                          </button>

                          <button
                            type='button'
                            className='tooltip-action-table'
                            data-tooltip='Delete'>
                            <FaTrash />
                          </button>
                        </div>
                        </>
                      }
                        
                      </td>
                    </tr>
                  );
                })}

            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SettingsCategoryList;
