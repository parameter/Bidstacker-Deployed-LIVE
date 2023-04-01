import React from 'react'
import { useRouter } from 'next/router';
import { blog } from '@/content-json/blogg-json';
import { v4 as uuidv4 } from 'uuid';

const Article = () => {
  const router = useRouter();
  const { page } = router.query;

  console.log(page)
  const article = blog.find((art) => art.id === parseInt(page));
 
  return (
    <div className="bg-gray-light text-black dark:text-white pt-[175px] pb-[100px] px-4">
      <div className="max-w-[1000px] mx-auto">
        <div>
          {article?.data.map((item, index) => {
            switch (item.type) {
              case 'headline':
                return (
                  <div key={index}>
                    <h3 key={index} className={item.className}>
                      {item.text}
                    </h3>
                  </div>
                );
              case 'paragraph':
                return (
                  <div key={index}>
                    <p key={index} className={item.className}>
                      {item.text}
                    </p>
                  </div>
                );
              case 'img':
                return (
                  <div key={index}>
                    <img
                      key={index}
                      src={item.src}
                      alt={item.alt}
                      className={item.className}
                    />
                  </div>
                );
              case 'timeStamp':
                return (
                  <div key={index}>
                    <p key={index} className={item.className}>
                      {item.date}
                    </p>
                  </div>
                );
              default:
                return null;
            }
          })}
          <h4 className='mt-12 text-lg'>{article?.author}</h4>
        </div>
      </div>
    </div>
  );
};

export default Article;