import {
    deletePost,
    getPostsError,
    getPostFromSlug,
    getPostsMessage,
} from "@store/slice/postsSlice";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import { Button } from "@components/index";
import { useEffect, useState } from "react";
import { getAuthData } from "@store/slice/authSlice";
import { PostsStateStatus } from "src/types/posts.types";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { Link, useNavigate, useParams } from "react-router-dom";
import { rootState, useAppDispatch, useAppSelector } from "@store/store";

const Post: React.FC = () => {
    const { slug } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const postsMessage = useAppSelector(getPostsMessage);
    const postsError = useAppSelector(getPostsError);
    const post = useAppSelector((state: typeof rootState) =>
        getPostFromSlug(state, slug!)
    );
    const user = useAppSelector(getAuthData);
    const [postStatus, setPostStatus] = useState<PostsStateStatus>("idle");

    useDocumentTitle(post?.title ?? "blogg - Not found");

    // check author
    const isAuthor = post && user ? post.author === user._id : false;

    const handleDelete = async () => {
        setPostStatus("loading");
        const response = await dispatch(deletePost(post?._id ?? ""));
        if (response) {
            if (response.meta.requestStatus === "fulfilled") {
                setPostStatus("succeeded");
            } else {
                setPostStatus("failed");
            }
        } else {
            setPostStatus("idle");
        }
    };

    useEffect(() => {
        if (postStatus === "succeeded") {
            toast.success(postsMessage);
            navigate("/");
        }
        if (postStatus === "failed") {
            toast.error(postsError);
        }
    }, [postStatus, navigate, postsError, postsMessage]);

    if (post && Object.keys(post).length > 0) {
        return (
            <div className="py-8">
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={post.featuredImage.url}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/posts/${post.slug}/edit`}>
                                <Button
                                    bgColor="bg-green-600"
                                    className="mr-3 hover:bg-green-700"
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                disabled={postStatus === "loading"}
                                bgColor="bg-red-600 hover:bg-red-700 disabled:bg-red-400 "
                                onClick={handleDelete}
                            >
                                {postStatus === "loading"
                                    ? "Deleting..."
                                    : "Delete"}
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div>{parse(post.content)}</div>
            </div>
        );
    } else {
        return (
            <div className="text-center text-xl font-medium">Loading...</div>
        );
    }
};

export default Post;
