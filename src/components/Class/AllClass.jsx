import React, { useEffect, useState } from 'react';
import img from "../../assets/images/fitness-image-1.webp";
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';

const AllClass = () => {
  const { count } = useLoaderData();
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
 const naviGate = useNavigate()
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  
  
  useEffect(() => {
    fetch(`https://the-fitness-server.vercel.app/class?page=${currentPage}&&size=${itemsPerPage}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Unexpected data format: ', data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [currentPage, itemsPerPage]);

  const handleItemsPerPage = (e) => {
    const value = Number(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
 const navigateTrainnerDetails = () => {
  naviGate('')
 }
  return (
    <>
      <div className="container mx-auto px-4 w-11/12 mx-auto ">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {products.length > 0 ? (
            products.map(product => (

              <div className="card bg-base-100 w-full shadow-xl gap-10">
                <figure>
                  <img 
                  className='w-full p-5 rounded'
                    src={product?.image}
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-center">{product?.classNames}</h2>
                  <p>{product?.details}</p>
                  <div className="border border-2 border-emerald-400 w-full"></div>
                     <div className='avatar mt-5 flex justify-center justify-between gap-5 flex-wrap'>
                      <div className='ring-emerald-400 ring-offset-white w-8 rounded-full ring ring-offset-4'> 
                      <img src="https://via.placeholder.com/150" alt="Trainer 1" />
                         </div>
                      <div className='ring-emerald-400 ring-offset-white w-8 rounded-full ring ring-offset-4'> 
                      <img src="https://via.placeholder.com/150" alt="Trainer 1" />
                         </div>
                      <div className='ring-emerald-400 ring-offset-white w-8 rounded-full ring ring-offset-4'> 
                      <img src="https://via.placeholder.com/150" alt="Trainer 1" />
                         </div>
                      <div className='ring-emerald-400 ring-offset-white w-8 rounded-full ring ring-offset-4'> 
                      <img src="https://via.placeholder.com/150" alt="Trainer 1" />
                         </div>
                     </div>
                </div>
              </div>
            ))
          ) : (
            <p>No classes available</p>
          )}
        </div>

        {/* Pagination Section */}
        {products.length > 0 && (
          <div className="pagination mt-5 text-center">
            <p>Current Page: {currentPage + 1}</p>
            <button onClick={handlePrevPage} disabled={currentPage === 0} className="btn btn-sm mr-2">Prev</button>
            {pages.map((page) => (
              <button
                key={page}
                className={`mx-1 px-2 py-1 btn btn-sm ${currentPage === page ? 'bg-emerald-400 text-white' : 'bg-gray-200'}`}
                onClick={() => handlePageChange(page)}
              >
                {page + 1}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === pages.length - 1} className="btn btn-sm ml-2">Next</button>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPage}
              className="ml-5 border border-gray-300 p-1 rounded"
            >
              <option value={3}>3</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        )}
      </div>
    </>
  );
};

export default AllClass;
