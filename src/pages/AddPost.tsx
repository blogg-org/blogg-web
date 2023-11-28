import React from "react";
import { PostForm } from "@components/index";
import { useDocumentTitle } from "@hooks/useDocumentTitle";

const AddPost: React.FC = () => {
    useDocumentTitle("blogg - Add Post");

    return <PostForm />;
};

export default AddPost;
