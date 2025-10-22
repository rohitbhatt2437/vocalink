import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const { data: friends, isLoading, error, isError } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
    onError: (error) => {
      console.error("Error fetching friends:", error.response?.data || error.message);
    },
    retry: 1,
  });

  console.log("[FriendsPage] Render state:", { 
    isLoading, 
    isError, 
    friendsCount: friends?.length,
    error: error?.message 
  });

  if (isError) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error loading friends: {error.response?.data?.message || error.message}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : !friends || friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
