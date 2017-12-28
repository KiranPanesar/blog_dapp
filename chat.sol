pragma solidity ^0.4.17;

contract Feed {

  struct Post {
    uint datetime; // The Unix timestamp of the post creation
    string body;   // The HTML string for the post body
    address authorAddress; // The address of the author who posted it
  }

  // A map to store the user's address as the key, and their provided username
  // as the value
  mapping (address => string) public usernames;

  // A map of the user's address as the key, and an array of Post struct objects
  // as the value.
  // This represents all the posts that the user has created.
  mapping (address => Post[]) public posts;


  /* function Feed() {

  } */


  function createPost(string body) returns (string) {
    Post memory p = Post(block.timestamp, body, msg.sender);
    posts[msg.sender].push(p);

    return body;
  }

  function getPosts(string addressString) returns (string) {
    /* string[] storage finalPosts = [];

    Post[] memory internalPosts = posts[msg.sender];

    for (uint256 i = 0; i < internalPosts.length; i++) {
      finalPosts.push(internalPosts[i].body);
    } */

    return posts[msg.sender][0].body;

    /* parsedPosts = string[];

    for (int i = 0; i < posts.count; i++) {
      p = posts[i];

      parse
    } */

  }

  function setUsername(string username) returns (string) {
    usernames[msg.sender] = username;
    return username;
  }

  function getUsername() returns (string) {
    return usernames[msg.sender];
  }

  /* function serializePost(Post p) returns (string) {
    s = "{'body': '""', 'datetime': '', 'author': ''}";
  } */
}
