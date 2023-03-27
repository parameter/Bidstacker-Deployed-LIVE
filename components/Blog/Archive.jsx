'use client';

import Link from 'next/link';
import SendIcon from 'public/assets/svg/SendIcon';
import React from 'react';

const Archive = ({ blog }) => {
  // Array of all months of the year
  const allMonths = [
    'januari',
    'februari',
    'mars',
    'april',
    'maj',
    'juni',
    'juli',
    'augusti',
    'september',
    'oktober',
    'november',
    'december',
  ];

  // Sorting the blog by year and month
  const sortedBlog = blog.sort((a, b) => {
    if (a.year === b.year) {
      return allMonths.indexOf(a.month) - allMonths.indexOf(b.month);
    } else {
      return b.year - a.year;
    }
  });

  // Array of unique months
  const months = [...new Set(sortedBlog.map((item) => item.month))];

  // Sorting the months in ascending order
  const sortedMonths = months.sort(
    (a, b) => allMonths.indexOf(a) - allMonths.indexOf(b)
  );

  // Set of unique years
  const years = new Set(sortedBlog.map((item) => item.year));

  return (
    <div className="flex-none self-start w-full tablet:w-64 bg-white p-8 rounded">
      <h4 className="font-bold text-2xl mb-6">Arkiv</h4>
      {Array.from(years).map((year) => (
        <ul className="mb-3" key={year}>
          <li className="flex items-center gap-2 font-bold mb-1">
            <Link href={`/blogg/${year}`} shallow>
              {year}
            </Link>
            <SendIcon width="14px" height="14px" className="text-[#f9b100]" />
          </li>
          {/* Rendering months for current year */}
          {sortedMonths.map((month) => {
            // Filtering blog entries for current month and year
            const entries = sortedBlog.filter(
              (item) => item.month === month && item.year === year
            );
            // Rendering month link if there are entries for current month and year
            if (entries.length > 0) {
              return (
                <li
                  className="flex items-center gap-1 capitalize ml-2"
                  key={`${year}-${month}`}
                >
                  <Link href={`/blogg/${year}/${month}`} shallow>
                    {month}
                  </Link>
                  <SendIcon
                    width="12px"
                    height="12px"
                    className="text-[#f9b100]"
                  />
                </li>
              );
            }
            return null;
          })}
        </ul>
      ))}
    </div>
  );
};

export default Archive;
