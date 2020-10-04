module.exports = `
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type PostData {
        posts: [Post!]!
    }

    type Query {
        getPosts : PostData!
    }
`;







