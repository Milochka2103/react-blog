import "./BlogCard.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { postsUrl } from "../../../shared/projectData";
import { EditPostForm } from "./EditPostForm";
import CircularProgress from "@mui/material/CircularProgress";
import { useDeletePost, useEditPost, useGetSinglePost, useLikePost } from "../../../shared/queries";

export const BlogCardPage = ({
  isAdmin
}) => {
  const {postId} = useParams();

  const [selectedPost, setSelectedPost] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);

  const history = useHistory();

  const {data: post, isLoading, isError, error, isFetching, refetch} = useGetSinglePost(postId);
  
  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const editMutation = useEditPost();

  if (isLoading) return <h1>Загружаю данные...</h1>;
  if (isError) return <h1>Возникла ошибка: {error.message}</h1>;

  const likePost = (blogPost) => {
    const updatedPost = { ...blogPost };
    updatedPost.liked = !updatedPost.liked;
    likeMutation.mutateAsync(updatedPost)
    .then(refetch)
    .catch((err) =>console.log(err))
  };

  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      deleteMutation.mutateAsync(blogPost)
      .then(() => history.push('/blog'))
      .catch((err) => console.log(err))
    }
  };

  const editBlogPost = (updatedBlogPost) => {
    editMutation.mutateAsync(updatedBlogPost)
    .then(refetch)
    .catch((err) => console.log(err))
  };

  const handleEditFormShow = (blogPost) => {
    setShowEditForm(true);
    setSelectedPost(blogPost);

  };

  const handleEditFormHide = () => {
    setShowEditForm(false);
  };

  if (!post.title) return <h1>Загружаю данные...</h1>;

  const postOpacity = isFetching ? 0.5 : 1;
  const heartFill = post.liked ? "crimson" : "black";

  return (
    <>
    <div className="post" style={
      {opacity:postOpacity}
    }>
      {showEditForm && (
        <EditPostForm
          handleEditFormHide={handleEditFormHide}
          selectedPost={selectedPost}
          editBlogPost={editBlogPost}
        />
      )}
      <div className="postContent"> 
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <div>
          <button onClick={() => likePost(post)}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>

      {
        isAdmin && (
        <div className="postControl">
          <button className="editBtn" onClick={() => handleEditFormShow(post)}>
            <EditIcon />
          </button>
          <button className="deleteBtn" onClick={() => deletePost(post)}>
            <DeleteForeverIcon />
          </button>
        </div>
        )
      }
    </div>
    {isFetching && <CircularProgress className="preloader" />}
    </>
  );
};
