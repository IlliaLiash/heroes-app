import { useState } from 'react';
import Loader from '../components/Loader';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Button from '../components/Button';
import { usePaginatedHeroes } from '../hooks/superhero';
import { useNavigate } from 'react-router-dom';
import HeroesListItem from '../components/HeroesListItem';

const HeroesListPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  const limit = 5;

  const { data, error, isLoading } = usePaginatedHeroes(currentPage, limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className='flex h-screen items-center justify-center bg-red-100'>
        <p className='text-lg text-red-500'>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10'>
      <div className='container mx-auto'>
        <div className='mb-8 flex flex-col items-center justify-between sm:flex-row'>
          <h2 className='mb-4 text-3xl font-bold text-gray-800 sm:mb-0'>
            Heroes List
          </h2>
          <Button onClick={() => navigate('/create')}>Create Hero</Button>
        </div>

        {data?.totalItems === 0 && (
          <p className='text-center text-lg text-gray-800'>
            No heroes found. Please create a new hero.
          </p>
        )}

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
          {data?.items.map((hero) => (
            <HeroesListItem key={hero._id} hero={hero} />
          ))}
        </div>

        <div className='mt-8 flex justify-center'>
          <Pagination
            current={data?.currentPage}
            pageSize={limit}
            total={data?.totalItems}
            onChange={handlePageChange}
            className='rc-pagination'
          />
        </div>
      </div>
    </div>
  );
};

export default HeroesListPage;
