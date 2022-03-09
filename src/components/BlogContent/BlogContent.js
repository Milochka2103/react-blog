import { Component } from "react";
import "./BlogContent.css";
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard";
import { axios } from "axios";

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    blogArr: [],
    isPending: false
  };

  fetchPosts = () => {
    this.setState({
      isPending: true
    })
    const axios = require("axios");
    axios
      .get("https://62271e6d2dfa52401814a3df.mockapi.io/api/users")
      .then((response) => {
        this.setState({
          blogArr: response.data,
          isPending: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArr: temp,
    });

    localStorage.setItem("blogPosts", JSON.stringify(temp));
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      const axios = require("axios");

      axios
        .delete(
          `https://62271e6d2dfa52401814a3df.mockapi.io/api/users/${blogPost.id}`
        )
        .then((response) => {
          console.log("Пост удален => ", response.data);
          this.fetchPosts()
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  handleEscape = (e) => {
    //если нажали на Esc и форма показано, то скрываем форму
    if (e.key === "Escape" && this.state.showAddForm) {
      this.handleAddFormHide();
    }
  };

  //добавляем новый пост в массив
  addNewBlogPost = (blogPost) => {
    this.setState((state) => {
      const posts = [...state.blogArr];
      posts.push(blogPost);
      localStorage.setItem("blogPosts", JSON.stringify(posts));

      return {
        blogArr: posts,
      };
    });
  };

  //делаем скрытие формы по кнопке Esc, e - обьект события
  componentDidMount() {
    this.fetchPosts();
    window.addEventListener("keyup", this.handleEscape);
  }

  //чистим из истории
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
  }

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(item)}
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Загружаю данные...</h1>;

    return (
      <div className="blogPage">
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}

        <>
          <div className="addNewPost">
            <button className="blackBtn" onClick={this.handleAddFormShow}>
              Создать новый пост
            </button>
          </div>
          {
            this.state.isPending && <h2>Подождите</h2>
          }
          <div className="posts">{blogPosts}</div>
        </>
      </div>
    );
  }
}
