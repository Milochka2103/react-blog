import { Component } from "react";
import "./BlogContent.css";
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard";
import { axios } from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { EditPostForm } from "./components/EditPostForm";

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    showEditForm: false,
    blogArr: [],
    isPending: false,
    selectedPost: {},
  };

  fetchPosts = () => {
    const axios = require("axios");
    axios
      .get("https://62271e6d2dfa52401814a3df.mockapi.io/api/users")
      .then((response) => {
        this.setState({
          blogArr: response.data,
          isPending: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    const axios = require("axios");
    axios
      .put(
        `https://62271e6d2dfa52401814a3df.mockapi.io/api/users/${blogPost.id}`,
        temp
      )
      .then((response) => {
        console.log("Пост изменен => ", response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      this.setState({
        isPending: true,
      });
      const axios = require("axios");

      axios
        .delete(
          `https://62271e6d2dfa52401814a3df.mockapi.io/api/users/${blogPost.id}`
        )
        .then((response) => {
          console.log("Пост удален => ", response.data);
          this.fetchPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //добавляем новый пост в массив
  addNewBlogPost = (blogPost) => {
    this.setState({
      isPending: true,
    });
    const axios = require("axios");
    axios
      .post("https://62271e6d2dfa52401814a3df.mockapi.io/api/users/", blogPost)
      .then((response) => {
        console.log("Пост создан =>", response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editBlogPost = (updatedBlogPost) => {
    this.setState({
      isPending: true,
    });
    const axios = require("axios");
    axios.put(
      `https://62271e6d2dfa52401814a3df.mockapi.io/api/users/${updatedBlogPost.id}`,
      updatedBlogPost
    )
    .then((response) => {
      console.log("Пост отредоктирован =>", response.data);
      this.fetchPosts();
      })
    .catch((err) => {
      console.log(err);
    });
  };

  handleAddFormShow = () => {
    this.setState({
      showAddForm: true,
    });
  };

  handleAddFormHide = () => {
    this.setState({
      showAddForm: false,
    });
  };

  handleEditFormShow = () => {
    this.setState({
      showEditForm: true,
    });
  };

  handleEditFormHide = () => {
    this.setState({
      showEditForm: false,
    });
  };

  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost,
    });
  };

  //делаем скрытие формы по кнопке Esc, e - обьект события
  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    console.log(this.state.selectedPost);
    const blogPosts = this.state.blogArr.map((item) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
          handleEditFormShow={this.handleEditFormShow}
          handleSelectPost={() => this.handleSelectPost(item)}
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Загружаю данные...</h1>;

    const postOpacity = this.state.isPending ? 0.5 : 1;

    return (
      <div className="blogPage">
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}
        
        {this.state.showEditForm && (
          <EditPostForm
            handleEditFormHide={this.handleEditFormHide}
            selectedPost={this.state.selectedPost}
            editBlogPost={this.editBlogPost}
          />
        )}
        <>
          <div className="addNewPost">
            <button className="blackBtn" onClick={this.handleAddFormShow}>
              Создать новый пост
            </button>
          </div>

          <div className="posts" style={{ opacity: postOpacity }}>
            {blogPosts}
          </div>
          {this.state.isPending && <CircularProgress className="preloader" />}
        </>
      </div>
    );
  }
}
