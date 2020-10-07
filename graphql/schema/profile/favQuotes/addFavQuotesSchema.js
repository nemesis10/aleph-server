module.exports = `
        type Mutation {
            addFavQuotes(userInput: [FavQuotesInputData]): [FavQuotes!]!
        }

        input FavQuotesInputData {
            userId: String!,
            quote: String!,
            quoteAuthor: String!
        }
`;