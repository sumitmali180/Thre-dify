import { useState, useEffect } from "react";

const PostsData = () => {
  const [posts, setPosts] = useState([]);
  const [userActions, setUserActions] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [userPost, setUserPost] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  // const [isHovered, setIsHovered] = useState(false);
  const apiURL = "https://posteddata-default-rtdb.firebaseio.com/DefaultPost.json";

  // Fetch posts from API
  useEffect(() => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        const updatedData = Object.values(data).map((post) => ({
          ...post,
          comments: Array.isArray(post.comments) ? post.comments : [],
        }));
        setPosts(updatedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Like post functionality
  const likePost = (index) => {
    if (!userActions[index]) {
      const updatedPosts = [...posts];
      updatedPosts[index].likes += 1;
      setPosts(updatedPosts);

      const updatedActions = [...userActions];
      updatedActions[index] = "liked";
      setUserActions(updatedActions);
    }
  };

  // Dislike post functionality
  const dislikePost = (index) => {
    if (!userActions[index]) {
      const updatedPosts = [...posts];
      updatedPosts[index].dislikes += 1;
      setPosts(updatedPosts);

      const updatedActions = [...userActions];
      updatedActions[index] = "disliked";
      setUserActions(updatedActions);
    }
  };
  // Save or unsave post functionality
  const savePost = (index) => {
    const updatedSavedPosts = [...savedPosts];
    if (updatedSavedPosts.includes(index)) {
      updatedSavedPosts.splice(updatedSavedPosts.indexOf(index), 1);
    } else {
      updatedSavedPosts.push(index);
    }
    setSavedPosts(updatedSavedPosts);
  };

  // Handle user post submission
  const handleSubmitPost = () => {
    if (userPost.trim()) {
      const newPost = {
        image:"https://placehold.co/600x400",
        category:"Unreveal",
        name: "by @ test app",
        post: userPost,
        likes: 0,
        dislikes: 0,
        comments: [],
        dateOfCreation: new Date().toLocaleDateString(),
      };
      setPosts([newPost, ...posts]);
      setUserPost(""); // Clear the textarea
    }
  };

  // Add a comment to a post
  const addComment = (postId, comment) => {
    const updatedPosts = posts.map((post, index) =>
      index === postId
        ? { ...post, comments: [...(post.comments || []), comment] }
        : post
    );
    setPosts(updatedPosts);
  };

  // Search posts based on search term
  const filteredPosts = posts.filter(
    (post) =>
      post.post.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting posts based on likes
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.likes - a.likes;
    }
    return 0; // Default order
  });

  // const saveButtonStyle = {
  //   marginRight:"5px",
  //   borderRadius:"10px",
  //   border:"1px solid black",
  //   backgroundColour : isHovered ? "green" : "transparent"
  // }
  return (
    <>
      <div style={styles.mainContainer}>
        {/* Left side: User Created Post */}
        <div className="userCreatedPost" style={styles.userCreatedPost}>
          <h2 style={styles.sectionHeading}>Post to engage with people</h2>
          <textarea
            placeholder="Write your post here..."
            value={userPost}
            onChange={(e) => setUserPost(e.target.value)}
            style={styles.textArea}
          ></textarea>
          <button style={styles.postButton} onClick={handleSubmitPost}>
            Submit Post
          </button>
        </div>

        {/* Right side: Default or Pre-Created Posts */}
        <div style={styles.defaultPosts}>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search posts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.sortDropdown}
          >
            <option value="">Sort by</option>
            <option value="popularity">Popularity</option>
          </select>

          {sortedPosts.length > 0 ? (
            sortedPosts.map((post, index) => (
              <div key={index} style={styles.card}>
                <div style={styles.imageContainer}>
                  <img
                    src={post.image}
                    alt={post.category}
                    style={styles.image}
                  />
                  <p style={styles.nameOverImage}>{post.category}</p>
                </div>
                <p style={styles.postMeta}>
                  <strong>
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src="https://cdn-icons-png.flaticon.com/128/17612/17612805.png"
                      alt=""
                    />
                  </strong>{" "}
                  {post.name}
                </p>
                <p style={styles.postMeta}>
                  <img
                    style={{ width: "25px", height: "25px" }}
                    src="https://cdn-icons-png.flaticon.com/128/13078/13078955.png"
                    alt=""
                  />{" "}
                  {post.post} {" "}
                </p>
                <p style={styles.postMeta}>
                  <strong>
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src="https://cdn-icons-png.flaticon.com/128/2693/2693710.png"
                      alt=""
                    />{" "}
                  </strong>{" "}
                  {post.dateOfCreation}
                </p>
                <p style={styles.postMeta}>
                  <strong>Likes:</strong> {post.likes} | <strong>Dislikes:</strong>{" "}
                  {post.dislikes}
                </p>
                <div>
                  <h4>Comments:</h4>
                  {(post.comments || []).map((comment, idx) => (
                    <p key={idx} style={{ margin: "5px 0" }}>- {comment}</p>
                  ))}
                  <CommentInput postId={index} addComment={addComment} />
                </div>
                <div style={styles.buttonsContainer}>
                  <button
                    style={styles.likeButton}
                    onClick={() => likePost(index)}
                    disabled={userActions[index] === "liked"}
                  >
                    👍 Like
                  </button>
                  <button
                    style={styles.dislikeButton}
                    onClick={() => dislikePost(index)}
                    disabled={userActions[index] === "disliked"}
                  >
                    👎 Dislike
                  </button>
                  <button 
                    style={styles.saveButton} 
                    // onMouseEnter={() => setIsHovered(true)} 
                    // onMouseLeave={() => setIsHovered(false)}
                    onClick={() => savePost(index)}
                  >
                    {savedPosts.includes(index) ? "Unsave" : "Save"} 🏷️
                  </button>
                  {savedPosts.includes(index) && (
                    <span style={styles.savedBadge}>Saved</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div style={{ border: '5px solid #f3f3f3', borderTop: '5px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}></div>

          )}
        </div>
      </div>
    </>
  );
};

const CommentInput = ({ postId, addComment }) => {
  const [comment, setComment] = useState("");

  const submitComment = () => {
    if (comment.trim()) {
      addComment(postId, comment);
      setComment("");
    }
  };

  return (
    <div style={{ marginTop: "10px"}}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        style={{ width: "calc(100% - 60px)", marginRight: "10px" }}
      />
      <button onClick={submitComment} style={{borderRadius:"10px",marginTop:"10px"}}>Comment</button>
    </div>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    gap: "10px",
    padding: "0px",
    width: "100%",
    marginTop: "170px",
  },
  userCreatedPost: {
    flex: 1,
    padding: "10px",
    // borderRadius:"10px",
    // border:"2px solid red",
    marginLeft:"20px",
    boxShadow:" rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
    
  },
  textArea: {
    width: "100%",
    height: "100px",
    marginBottom: "10px",
    // borderRadius:"10px"

  },
  postButton: {
    padding: "5px 10px",
    borderRadius:"10px"

  },
  defaultPosts: {
    flex: 2,
    padding: "10px",
    boxShadow:" rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",

    
  },
  searchInput: {
    width: "calc(100% - 20px)",
    marginBottom: "10px",
    padding: "5px",
    borderRadius:"10px",
  },
  sortDropdown: {
    marginBottom: "10px",
    padding: "5px",
    backgroundColour:"blue"
  },
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius:"10px",

  },
  imageContainer: {
    position: "relative",
    textAlign: "center",
    // border:"2px solid blue"
  },
  image: {
    width: "100%", // Or a fixed width like "300px"
    height: "auto", // Adjust based on your design
    objectFit: "cover", // Ensures the image is cropped proportionally to fit the fixed size
    borderRadius: "5px", // Optional for rounded corners
  },

  nameOverImage: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    padding: "5px",
    width:"100px",
    height:"auto",
    borderRadius:"10px"

  },
  postMeta: {
    margin: "5px 0",


  },
  buttonsContainer: {
    marginTop: "10px",
    borderRadius:"10px"

  },
  likeButton: {
    marginRight: "5px",
    borderRadius:"10px"

  },
  dislikeButton: {
    marginRight: "5px",
    borderRadius:"10px"

  },
  saveButton: {
    marginRight: "5px",
    borderRadius:"10px",
    // border:"2px solid red",
    // &:hover:{
    //   backgroundColour:"green",
    // },

  },
  savedBadge: {
    background: "#f0f0f0",
    padding: "5px",
    borderRadius:"10px",


  },
};

export default PostsData;
