import React, { useState } from "react";
import "./BlogPage.css";
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard";
import CircularProgress from "@mui/material/CircularProgress";
import { EditPostForm } from "./components/EditPostForm";
import { Link } from "react-router-dom";
import { useAddPost, useDeletePost, useEditPost, useGetPosts, useLikePost } from "../../shared/queries";

export const BlogPage = ({ isAdmin }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);;
  const [selectedPost, setSelectedPost] = useState({});

  const {data: posts, isLoading, isError, error, isFetching, refetch } = useGetPosts();

  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const editMutation = useEditPost();
  const addMutation = useAddPost();

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
      .then(refetch)
      .catch((err) => console.log(err))
    }
  };

  const editBlogPost = (updatedBlogPost) => {
    editMutation.mutateAsync(updatedBlogPost)
    .then(refetch)
    .catch((err) => console.log(err))
  };


  //добавляем новый пост в массив
  const addNewBlogPost = (newBlogPost) => {
    addMutation.mutateAsync(newBlogPost)
    .then(refetch)
    .catch((err) => console.log(err))
  };
  
  const handleAddFormShow = () => {
    setShowAddForm(true);
  };

  const handleAddFormHide = () => {
    setShowAddForm(false);
  };

  const handleEditFormShow = () => {
    setShowEditForm(true);
  };

  const handleEditFormHide = () => {
    setShowEditForm(false);
  };

  const handleSelectPost = (blogPost) => {
    setSelectedPost(blogPost);
  };

  const blogPosts = posts.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <BlogCard
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => likePost(item)}
          deletePost={() => deletePost(item)}
          handleEditFormShow={handleEditFormShow}
          handleSelectPost={() => handleSelectPost(item)}
          isAdmin={isAdmin}
        />
        <Link to={`/blog/${item.id}`}>Подробнее</Link>
      </React.Fragment>
    );
  });

  const postOpacity = isFetching ? 0.5 : 1;

  return (
    <div className="blogPage">
      {showAddForm && (
        <AddPostForm
          //blogArr={blogArr}
          addNewBlogPost={addNewBlogPost}
          handleAddFormHide={handleAddFormHide}
        />
      )}

      {showEditForm && (
        <EditPostForm
          handleEditFormHide={handleEditFormHide}
          selectedPost={selectedPost}
          editBlogPost={editBlogPost}
        />
      )}
      <>
        <h1>Блог</h1>
        {isAdmin && (
          <div className="addNewPost">
            <button className="blackBtn" onClick={handleAddFormShow}>
              Создать новый пост
            </button>
          </div>
        )}

        <div className="posts" style={{ opacity: postOpacity }}>
          {blogPosts}
        </div>
        {isFetching && <CircularProgress className="preloader" />}
      </>
    </div>
  );
};
