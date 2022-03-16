import "./AddPostForm.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { useState} from "react";

export const AddPostForm = (
  { addNewBlogPost, handleAddFormHide }
) => {
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');


  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value)
  };

  const handlePostDescChange = (e) => {
    setPostDesc(e.target.value)
  };

  const createPost = (e) => {
    e.preventDefault();
    const post = {
      title: postTitle,
      description: postDesc,
      liked: false,
    };

    addNewBlogPost(post);
    handleAddFormHide();
};
  // ???? useState?
useState(() => {
  const handleEscape = (e) => {
    //если нажали на Esc и форма показано, то скрываем форму
    if (e.key === "Escape") {
      handleAddFormHide();
    }
  };
  window.addEventListener("keyup", handleEscape);

  return () => {
    window.removeEventListener("keyup", handleEscape)
  };
}, []);

    // const handleAddFormHide = this.props.handleAddFormHide;
  return (
    <>
      <form className="AddPostForm" onSubmit={createPost}>
        <button className="hideBtn" onClick={handleAddFormHide}>
            <CancelIcon />
          </button>
          <h2>Создание поста</h2>
          <div>
            <input
              className="addFormInput"
              type="text"
              name="postTitle"
              placeholder="Заголовок поста"
              value={postTitle}
              onChange={handlePostTitleChange}
              required
            />
          </div>
          <div>
            <textarea
              className="addFormInput"
              name="postDescription"
              placeholder="Описание поста"
              value={postDesc}
              onChange={handlePostDescChange}
              rows={8}
              required
            />
          </div>
          <div>
            <button className="blackBtn" type="submit">
              Добавить пост
            </button>
          </div>
        </form>
        <div onClick={handleAddFormHide} className="overlay"></div>
      </>
    );
}