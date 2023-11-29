import React from "react";
import { Posts } from "@components/index";
import { useDocumentTitle } from "@hooks/useDocumentTitle";

const AllPosts: React.FC = () => {
    useDocumentTitle("blogg - All Posts");

    return <Posts />;
};

export default AllPosts;
