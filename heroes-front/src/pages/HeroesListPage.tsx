import React, { useState } from 'react';
import Loader from '../components/Loader';
import HeroesListItem from '../components/HeroesListItem';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Button from '../components/Button';
import { usePaginatedHeroes } from '../hooks/superhero';
import { useNavigate } from 'react-router-dom';

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
    return <div>Error: {error.message}</div>;
  }

  if (!isLoading && (!data?.items.length || !data)) {
    return <div>No heroes created yet</div>;
  }

  return (
    <div className='my-10 flex flex-col items-center'>
      <div className='flex w-4/5 flex-col justify-between gap-10'>
        <div>
          <Button onClick={() => navigate('/create')}>
            <p>Create Hero</p>
          </Button>
        </div>

        <div className='flex flex-row flex-wrap gap-4'>
          {data?.items.map((hero) => (
            <div key={hero._id}>
              <HeroesListItem hero={hero} />
            </div>
          ))}
        </div>
        <Pagination
          className='mt-4 flex justify-center'
          current={data?.currentPage}
          pageSize={limit}
          total={data?.totalItems}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default HeroesListPage;
