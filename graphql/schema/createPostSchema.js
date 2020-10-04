module.exports = `
        type Mutation {
            createPost(postInput: PostInputData): Post!
        }

        input PostInputData {
            title: String!
            content: String!
            imageUrl: String!
        }
        
        type Post {
            _id: ID!
            title: String!
            content: String!
            imageUrl: String!
            creator: User!
            createdAt: String!
            updatedAt: String!
        }
`;