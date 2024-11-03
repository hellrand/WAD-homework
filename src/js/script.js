
fetch('https://gist.githubusercontent.com/Scarch/a6fbfab87a2a5ce7862cc7d282a47b24/raw') // fetches JSON data from GitHub Gist
//fetch('./res/json/posts.json') // fetches data from the local JSON file
        .then((response) => response.json())
        .then(json => {
            createPosts(json);
        })
        .catch(error => console.error("Error fetching posts:", error));

// JSON was formatted using https://jsoneditoronline.org/
// And validated with https://jsonlint.com/, https://jsonformatter.curiousconcept.com/, https://jsonformatter.org/
// Using GitHub Gist to store the JSON file online at https://gist.githubusercontent.com/Scarch/a6fbfab87a2a5ce7862cc7d282a47b24

// function to create posts with the fetched JSON data
function createPosts(posts) {
    // creates main container, where are all the posts and inserts it before the footer
    const mainContent = document.createElement("main");
    document.body.insertBefore(mainContent, document.querySelector("footer"));

    posts.forEach(post => {
        // a div element to hold individual post content
        const postDiv = document.createElement("div");
        postDiv.className = 'post';

        // a header section to hold profile picture, username and date
        const postHeader = document.createElement("div");
        postHeader.className = "post-header";

        // an image element for the profile picture
        const profilePic = document.createElement("img");
        profilePic.src = post.profilePic; // sets profile picture source
        profilePic.alt = "profile picture";
        profilePic.className = "profile-pic";
        
        // a paragraph element for the username
        const username = document.createElement("p");
        username.className = "username";
        username.innerText = post.username;
        
        // a paragraph element for the post creation time
        const createTime = document.createElement("p");
        createTime.className = "date";
        createTime.innerText = new Date(post.createTime).toLocaleString();

        // appends profile picture, username and date to the header section
        postHeader.append(profilePic, username, createTime);
        postDiv.appendChild(postHeader); // adds header section to the post container

        // if the post has a picture
        if (post.picture) {
            const postImage = document.createElement("div");
            postImage.className = "post-image";
            const img = document.createElement("img");
            img.src = post.picture; // sets the source of the post picture
            img.alt = "post image";
            postImage.appendChild(img); // appends the post image to the image container
            postDiv.appendChild(postImage); // adds the image container to the post
        }

        // body text
        if (post.body) {
            const postText = document.createElement("p");
            postText.className = "post-text";
            postText.innerText = post.body;
            postDiv.appendChild(postText);
        }

        // like button
        const likeButton = document.createElement("div");
        likeButton.className = "like-button";
        likeButton.innerHTML = "&#128077;";
        postDiv.appendChild(likeButton);

        // appends the complete post container to the main content area
        mainContent.appendChild(postDiv);
    });
}