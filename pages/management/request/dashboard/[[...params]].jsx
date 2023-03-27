'use client';
import _ from 'underscore';
import { useCurrentUser } from '@/lib/user';
import { useEffect } from 'react';
import { useRequestContext } from 'context/request-context';
import AllRequests from '@/components/Request/my-request/all-requests';
import Header from '@/components/Request/dashboard/header';
import Status from '@/components/Request/dashboard/status';
import Widgets from '@/components/Request/dashboard/widgets';
import Profile from '@/components/Request/dashboard/Profile/profile';
import Projects from '@/components/Request/dashboard/Projects/projects';
import Team from '@/components/Request/dashboard/Team/team';
import { useRouter } from 'next/router';

function Dashboard() {
  const { data: { user } = {} } = useCurrentUser();
  const { myRequests, getMyRequests, myProjects, getMyProjects, isFetching } =
    useRequestContext();
  const router = useRouter();

  console.log('myRequests', myRequests);

  useEffect(() => {
    getMyRequests();
    getMyProjects();
  }, [getMyProjects, getMyRequests]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full bg-gray-100 py-10">
        <div className="max-w-[1000px] mx-auto mt-16 mobile:mt-12">
          {/* Tillfällig margin ovan, sidan ligger i topp och inte nedanför nav? */}

          {
            <Header
              user={user}
              params={router.query.params || []}
              id={router.query.params && router.query.params[0]}
            />
          }

          {!router.query.params && (
            <Status
              requestCount={Object.keys(myRequests).length}
              offerCount={Object.values(myRequests).reduce((acc, item) => {
                return acc + item.negotiations.length;
              }, 0)}
            />
          )}

          {!router.query.params && <Widgets />}

          {!router.query.params && <AllRequests myRequests={myRequests} />}

          {router.query.params && router.query.params[0] === 'profile' && (
            <Profile
              params={router.query.params}
              user={user}
              id={router.query.params[0]}
            />
          )}

          {router.query.params && router.query.params[0] === 'team' && (
            <Team
              params={router.query.params}
              user={user}
              id={router.query.params[1]}
            />
          )}

          {router.query.params && router.query.params[0] === 'projects' && (
            <Projects
              user={user}
              projectId={router.query.params[1]}
              projectData={myProjects.find((item) => {
                return item._id === router.query.params[1];
              })}
              myRequests={myRequests}
              groupId={Object.keys(myRequests).map((item) => {
                if (myRequests[item]) {
                  return item;
                }
              })}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
