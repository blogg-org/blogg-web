import {
    IPostFromDB,
    IPostFormData,
    PostsStateStatus,
} from "src/types/posts.types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePostToast } from "@hooks/useToast";
import { getAuthData } from "@store/slice/authSlice";
import { useAppNavigate } from "@hooks/useAppNavigate";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useAppDispatch, useAppSelector } from "@store/store";
import React, { useCallback, useEffect, useState } from "react";
import { updatePost, createNewPost } from "@store/slice/postsSlice";
import { Button, Input, RealTimeEditor, Select } from "@components/index";

interface PostFormProps {
    post?: IPostFromDB;
}

const PostForm: React.FC<PostFormProps> = ({ post }) => {
    useDocumentTitle("blogg - Edit");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(getAuthData);
    const [postFormStatus, setPostFormStatus] =
        useState<PostsStateStatus>("idle");
    const [newPost, setNewPost] = useState<IPostFormData>({} as IPostFormData);

    const { register, handleSubmit, control, watch, setValue, getValues } =
        useForm<IPostFormData>({
            defaultValues: {
                title: post?.title ?? "",
                slug: post?.slug ?? "",
                content: post?.content ?? "",
                status: post?.status ?? "active",
            },
        });

    usePostToast(postFormStatus);
    useAppNavigate(postFormStatus, `/posts/${newPost.slug}`);

    const isAuthor = post && user ? post.author === user._id : false;

    useEffect(() => {
        if (post && !isAuthor) {
            navigate(`/posts/${post.slug}`);
        }
    }, [post, isAuthor, navigate]);

    const submitPost = async (data: IPostFormData) => {
        setPostFormStatus("loading");
        let response;

        // if post exists, then update otherwise create a new post
        if (post) {
            response = await dispatch(updatePost({ oldPost: post, data }));
        } else {
            response = await dispatch(createNewPost(data));
        }
        if (response) {
            if (response.meta.requestStatus === "fulfilled") {
                setNewPost(data);
                setPostFormStatus("succeeded");
            } else {
                setPostFormStatus("failed");
            }
        } else {
            setPostFormStatus("idle");
        }
    };

    // handle cancel button click
    const handleCancelButtonClick = () => {
        if (post) {
            navigate(`/posts/${post.slug}`);
        } else {
            navigate("/");
        }
    };

    // transform slug
    const transformSlug = useCallback((value: string) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/--+/g, "-");
        }

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (!post) {
                if (name === "title") {
                    setValue("slug", transformSlug(value.title!), {
                        shouldValidate: true,
                    });
                }
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, transformSlug, setValue, post]);

    // render update/publish button text
    const renderButtonText = () => {
        let btnText = "";
        if (post) {
            btnText = "Update";
            if (postFormStatus === "loading") {
                btnText = "Updating...";
            }
        } else {
            btnText = "Publish";
            if (postFormStatus === "loading") {
                btnText += "ing...";
            }
        }
        return btnText;
    };

    return (
        <form
            onSubmit={handleSubmit(submitPost)}
            className="flex items-start flex-col lg:flex-row gap-4 "
        >
            <div className="w-full lg:w-2/3">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    readOnly={Boolean(post)}
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", transformSlug(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RealTimeEditor
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-full lg:w-1/3">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featuredImage", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={post.featuredImage.url}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    disabled={postFormStatus === "loading"}
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className={`w-full ${
                        post
                            ? "hover:bg-green-600 disabled:bg-green-400"
                            : "hover:bg-blue-700 disabled:bg-blue-400"
                    }`}
                >
                    {renderButtonText()}
                </Button>
                <Button
                    disabled={postFormStatus === "loading"}
                    bgColor="bg-red-600 hover:bg-red-700 disabled:bg-red-400 "
                    className="w-full mt-4"
                    onClick={handleCancelButtonClick}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
