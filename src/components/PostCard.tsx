import { Link } from "react-router-dom";

interface PostCardProps {
    slug: string;
    title: string;
    featuredImage: string;
}

const PostCard: React.FC<PostCardProps> = ({
    slug,
    title,
    featuredImage,
}: PostCardProps) => {
    return (
        <Link
            to={`/posts/${slug}`}
            className="inline-flex justify-center w-full "
        >
            <div className="group border-2 border-blue-100 w-full min-w-[300px] max-w-lg h-96 rounded-md bg-blue-50 hover:bg-blue-100 hover:border-blue-200 transition-all duration-200 ease-in">
                <div className="h-3/4">
                    <div className="h-full w-full relative overflow-hidden rounded-t-md">
                        <div
                            style={{
                                backgroundImage: `url(${featuredImage})`,
                            }}
                            className="block absolute inset-0 bg-cover bg-center bg-no-repeat bg-white scale-100 group-hover:scale-105 transition-transform duration-200 ease-in"
                        ></div>
                    </div>
                </div>
                <div className="p-2">
                    <h5
                        className="mb-2 text-2xl font-bold tracking-tight text-gray-900"
                        title={title}
                    >
                        {title.length > 30 ? `${title.slice(0, 31)}...` : title}
                    </h5>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
