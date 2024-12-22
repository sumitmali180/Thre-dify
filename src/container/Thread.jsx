import React, { useState, useEffect } from 'react';
import '../styles/Thread.css'; // Assuming you still use the same CSS

function Thread() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Fetch posts from Firebase on initial load
  useEffect(() => {
    fetch('https://grid-space-default-rtdb.asia-southeast1.firebasedatabase.app/thread.json')
      .then(response => response.json())
      .then(data => {
        if (data) {
          const loadedPosts = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
            comments: data[key].comments || [] // Ensure comments is always an array
          }));
          setPosts(loadedPosts);
        }
      });
  }, []);

  const addPost = () => {
    if (newPost.trim()) {
      const newThread = {
        content: newPost,
        likes: 0,
        unlikes: 0,
        comments: []
      };
      fetch('https://grid-space-default-rtdb.asia-southeast1.firebasedatabase.app/thread.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newThread)
      })
      .then(response => response.json())
      .then(data => {
        setPosts(prevPosts => [
          ...prevPosts,
          { id: data.name, ...newThread }
        ]);
        setNewPost("");
      });
    }
  };

  const likePost = (id) => {
    const postToUpdate = posts.find(post => post.id === id);
    const updatedPost = { ...postToUpdate, likes: postToUpdate.likes + 1 };
    fetch(`https://grid-space-default-rtdb.asia-southeast1.firebasedatabase.app/thread/${id}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost)
    })
    .then(() => {
      setPosts(posts.map(post => post.id === id ? updatedPost : post));
    });
  };

  const unlikePost = (id) => {
    const postToUpdate = posts.find(post => post.id === id);
    const updatedPost = { ...postToUpdate, unlikes: postToUpdate.unlikes + 1 };
    fetch(`https://grid-space-default-rtdb.asia-southeast1.firebasedatabase.app/thread/${id}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost)
    })
    .then(() => {
      setPosts(posts.map(post => post.id === id ? updatedPost : post));
    });
  };

  const addComment = (id, comment) => {
    const postToUpdate = posts.find(post => post.id === id);
    const updatedPost = { ...postToUpdate, comments: [...postToUpdate.comments, comment] };
    fetch(`https://grid-space-default-rtdb.asia-southeast1.firebasedatabase.app/thread/${id}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost)
    })
    .then(() => {
      setPosts(posts.map(post => post.id === id ? updatedPost : post));
    });
  };

  return (
    <div className="Thread">
      <h1>Create a Thread</h1>
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Write your thread here..."
        className="textarea"
      ></textarea>
      <button onClick={addPost} className="button">Post</button>

      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <p>{post.content}</p>
          <div className="action-buttons">
            <button onClick={() => likePost(post.id)}>Like ({post.likes})</button>
            <button onClick={() => unlikePost(post.id)}>Unlike ({post.unlikes})</button>
          </div>
          <div className="comments-section">
            <h4>Comments</h4>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <p key={index} className="comment">{comment}</p>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
            <CommentInput postId={post.id} addComment={addComment} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CommentInput({ postId, addComment }) {
  const [comment, setComment] = useState("");

  const submitComment = () => {
    if (comment.trim()) {
      addComment(postId, comment);
      setComment("");
    }
  };

  return (
    <div className="comment-input">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={submitComment}>Comment</button>
    </div>
  );
}

export default Thread;
