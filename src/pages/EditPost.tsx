import React from "react";
import { PostForm } from "@components/index";
import { useParams } from "react-router-dom";
import { rootState, useAppSelector } from "@store/store";
import { getPostFromSlug } from "@store/slice/blogsSlice";

const EditPost: React.FC = () => {
    const { slug } = useParams();
    const post = useAppSelector((state: typeof rootState) =>
        getPostFromSlug(state, slug!)
    );

    return post ? <PostForm post={post} /> : null;
};

export default EditPost;
