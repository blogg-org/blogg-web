import {
    deletePost,
    getPostsStatus,
    getPostFromSlug,
} from "@store/slice/blogsSlice";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import { Button } from "@components/index";
import { getAuthData } from "@store/slice/authSlice";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { Link, useNavigate, useParams } from "react-router-dom";
import { rootState, useAppDispatch, useAppSelector } from "@store/store";

const Post: React.FC = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const post = useAppSelector((state: typeof rootState) =>
        getPostFromSlug(state, slug!)
    );
    const postsStatus = useAppSelector(getPostsStatus);
    const user = useAppSelector(getAuthData);

    useDocumentTitle(post?.title ?? "blogg - Not found");

    // check author
    const isAuthor = post && user ? post.author === user._id : false;

    const handleDelete = async () => {
        try {
            const response = await dispatch(deletePost(post?._id ?? ""));

            if (response && response.meta.requestStatus === "fulfilled") {
                toast.success("Blog deleted successfully.", {
                    duration: 5000,
                });
                navigate("/");
            } else if (response && response.meta.requestStatus === "rejected") {
                toast.error(response.payload as string, { duration: 5000 });
            }
        } catch (error) {
            console.log("\n:: Post.tsx => Error: ", error);
        }
    };

    if (post && Object.keys(post).length > 0) {
        return (
            <div className="py-8">
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={post.featuredImage}
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
                                disabled={postsStatus === "loading"}
                                bgColor="bg-red-600 hover:bg-red-700 disabled:bg-red-400 "
                                onClick={handleDelete}
                            >
                                {postsStatus === "loading"
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
