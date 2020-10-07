module.exports = `

        type Query {
            getCreationBucket(userInput: getCreationBucketInputData): CreationBucket!
        }

        input getCreationBucketInputData {
            objectId: String!
        }

`;