module.exports = `
        type Mutation {
            addProfile(userInput: ProfileInputData): Profile!
        }

        type Profile {
            _id: ID!,
            userId: String!,
            bio: String,
            personality:[String],
            favPeople:[FavPeople],
            creationBucket: [CreationBucket],
            achievements: [Achievement],
            favQuotes: [FavQuotes],
            goodAt: [GoodAt]
        }

        type FavPeople {
            _id: ID!,
            name: String!,
            alephLink: String!
        }
        type Achievement {
            _id: ID!,
            icon: String!,
            description: String!,
            year: String!,
            link: String,
        }
        type FavQuotes{
            _id: ID!,
            quote: String!,
            quoteAuthor: String!
        }
        type GoodAt{
            _id: ID,
            activity: String!,
            category: String!
        }
        
        input inputFavPeople{
            name: String!,
            alephLink: String!,
        }
        input inputAchievement{
            icon: String!,
            description: String!,
            year: String!,
            link: String,
        }
        input inputFavQuotes{
            quote: String!,
            quoteAuthor: String!
        }
        input inputGoodAt{
            activity: String!,
            category: String!
        }

        input ProfileInputData {
            userId: String!,
            bio: String,
            personality:[String],
            achievements: [inputAchievement],
            favPeople: [inputFavPeople],
            favQuotes: [inputFavQuotes],
            goodAt: [inputGoodAt],
            creationName: String,
            creationType: String,
            creationLink: String,
            creationDescription: String
        }
`;