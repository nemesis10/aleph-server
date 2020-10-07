module.exports = `

        type Query {
            getProfile(userInput: getProfileInputData): FullProfile!
        }

        type FullProfile {
            _id: ID!,
            userId: String!,
            bio: String!,
            personality:[String],
            favPeople:[FavPeople],
            creationBucket: [CreationBucket],
            achievements: [Achievement],
            favQuotes: [FavQuotes],
            goodAt: [GoodAt]

        }

        input getProfileInputData {
            userId: String!,
        }

`;