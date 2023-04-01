'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Blog = ({ blog }) => {
  return (
    <div>
      {blog
        .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
        .map((item, index) => (
          <div
            key={item.id}
            className={`${
              index !== blog.length -1 ? 'border-b border-gray-300' : ''
            } mr-0 tablet:mr-6 pb-14`}
          >
            <Link href={item.link ? item.link : `/artikel/${item.id}`}>
              <h3 className={`mb-4 ${index !== 0 ? 'mt-6' : ''} font-semibold`}>
                {item.headline}
              </h3>
              <div className="flex flex-col tablet:flex-row gap-4">
                <div
                  className="w-full tablet:hidden grow h-[170px] rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image.type})` }}
                />
                <Image
                  src={item.image.type}
                  alt="Picture of the author"
                  width={215}
                  height={300}
                  className="hidden tablet:flex rounded"
                />
                <div>
                  <p className="mb-2">{item.excerp.slice(0,200)}...</p>
                  <p className="font-bold">
                    {item.author} | {item.timeStamp}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Blog;
