import { allPosts, getAllPosts } from "@store/slice/blogsSlice";
import { useAppDispatch, useAppSelector } from "@store/store";
import React, { useEffect } from "react";
import { PostCard } from "@components/index";

const Posts: React.FC = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(getAllPosts);

    useEffect(() => {
        (async () => await dispatch(allPosts()))();
    }, [dispatch]);

    if (posts.length > 0) {
        return (
            <div className="relative gap-4 grid grid-col-1 sm:grid-cols-2 xl:grid-cols-3 justify-stretch">
                {posts.map((post) => (
                    <div key={post._id} className="p-2 w-full">
                        <PostCard
                            id={post._id}
                            title={post.title}
                            featuredImage={post.featuredImage}
                        />
                    </div>
                ))}
            </div>
        );
    }
};

export default Posts;
