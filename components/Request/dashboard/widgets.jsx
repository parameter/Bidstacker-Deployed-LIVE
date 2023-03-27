'use client';

import Monthly from './WidgetItems/monthly';
import Projects from './WidgetItems/projects';
import Reseller from './WidgetItems/reseller';
import Stats from './WidgetItems/stats';

const Widgets = () => {
  return (
    <>
      <div className="px-4 mobile:px-10 mobile:flex mb-4">
        <div className="w-full mobile:w-7/12">
          <Monthly />
          <Projects />
        </div>
        <Reseller className="ml-4" />
        {/* <Stats /> */}
      </div>
    </>
  );
};

export default Widgets;
