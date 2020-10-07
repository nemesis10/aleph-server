module.exports = `
        type Mutation {
            addFavPeople(userInput: [FavPeopleInputData]): [FavPeople!]!
        }

        input FavPeopleInputData {
            userId: String!,
            name: String!,
            alephLink: String!
        }
`;