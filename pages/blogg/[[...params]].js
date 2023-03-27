import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Archive from '@/components/Blog/Archive';
import Blog from '@/components/Blog/Blog';

import { blog } from '@/content-json/blogg-json';

const Blogg = () => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  const params = router.query.params;


  useEffect(() => {
    console.log(params);
    // Year in params but not month
    if (params?.length === 1) {
      const filterBlogs = blog.filter((item) => item.year === params[0]);
      setBlogs(filterBlogs);
      // Year in params and month
    } else if (params?.length === 2) {
      const filteredBlogs = blog.filter((item) => {
        return item.year == params[0] && item.month == params[1];
      });
      setBlogs(filteredBlogs);
    } else{
      setBlogs(blog)
    }
  }, [params]);

  return (
    <div className="bg-gray-light text-black dark:text-white pt-[175px] pb-[100px] px-4">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-center pb-[50px] mb-2 ">Blogg</h1>
        <div className="flex flex-col tablet:flex-row">
          <div className="flex-1 tablet:border-r tablet:border-gray-300 tablet:mr-6">
            <Blog blog={blogs} />
          </div>
          <Archive blog={blog} />
        </div>
      </div>
    </div>
  );
};

export default Blogg;
