import React from "react";
import { Link } from "react-router-dom";
import { PostCard } from "@components/index";
import { useAppSelector } from "@store/store";
import { getAllPosts, getPostsStatus } from "@store/slice/blogsSlice";

const Posts: React.FC = () => {
    const posts = useAppSelector(getAllPosts);
    const postsStatus = useAppSelector(getPostsStatus);

    if (postsStatus === "loading") {
        return (
            <div className="text-center text-xl font-medium">Loading...</div>
        );
    }
    if (postsStatus === "succeeded") {
        if (posts.length > 0) {
            return (
                <div className="relative gap-4 grid grid-col-1 sm:grid-cols-2 xl:grid-cols-3 justify-stretch">
                    {posts.map((post) => (
                        <div key={post._id} className="p-2 w-full">
                            <PostCard
                                slug={post.slug}
                                title={post.title}
                                featuredImage={post.featuredImage}
                            />
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="flex flex-wrap">
                    <div className="p-2 w-full flex flex-col items-center">
                        <h1 className="text-2xl font-bold">No post to read.</h1>
                        <Link
                            to="/posts/add"
                            className="block mt-6 text-lg bg-blue-400 w-max py-4 px-6 rounded-md hover:bg-blue-500 duration-200 ease-out"
                        >
                            Create Post
                        </Link>
                    </div>
                </div>
            );
        }
    }
};

export default Posts;
