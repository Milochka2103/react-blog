import "./BlogCard.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { postsUrl } from "../../../shared/projectData";

export const BlogCard = ({
  title,
  description,
  liked,
  likePost,
  deletePost,
  handleEditFormShow,
  handleSelectPost,
  isAdmin
}) => {
  const showEditForm = () => {
    handleSelectPost();
    handleEditFormShow();
  };

  const {postId} = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    if (postId) {
      const axios = require("axios");
      axios
        .get(postsUrl + postId)
        .then((response) => {
          setPost(response.data)
        })

        .catch((err) => {
          console.log(err);
        });
    }
  }, [postId, setPost]);

  let heartFill;

  if (postId) {
    heartFill = post.liked ? "crimson" : "black";
  } else {
    heartFill = liked ? "crimson" : "black";
  }

  return (
    <div className="post">
      <div className="postContent">
        <h2>{postId ? post.title : title}</h2>
        <p>{postId ? post.description : description}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>

      {
        isAdmin && (
        <div className="postControl">
          <button className="editBtn" onClick={showEditForm}>
            <EditIcon />
          </button>
          <button className="deleteBtn" onClick={deletePost}>
            <DeleteForeverIcon />
          </button>
        </div>
        )
      }

    </div>
  );
};
