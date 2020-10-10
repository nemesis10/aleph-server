module.exports = `
        type Mutation {
            createGroup(userInput: newGroupInputData!):Group!,
            updateGroup(groupId:ID!,userInput: updateGroupInputData!):Group!,
            addUserToGroup(groupId:ID!,userId:[ID!]!):Group,
            addUserViaCode(code:String!):Group!,
            removeUserFromGroup(groupId:ID!,userId:ID!):Group,
            revokeGroupCode(groupId:ID!):String,
            changeGroupAdmin(groupId:ID!,userId:ID!,remove:Boolean!):Group,
            deleteGroup(groupId:ID!):Boolean
        }
        type Query {
            getGroups:[Group],
            getGroup(groupId:ID!):Group
        }
        type GroupUser {
            user:User,
            isAdmin:Boolean
        }
        type Group {
            _id:ID!,
            name:String!,
            photo:String!,
            users:[GroupUser!],
            description:String!,
            timestamp:String!,
            inviteCode:String!,
            groupType:String!
            mute:Boolean!
        }
        input newGroupInputData {
            name:String!,
            photo:String,
            description:String,
            groupType:String!,
        }
        input updateGroupInputData {
            name:String,
            photo:String,
            description:String,
            groupType:String,
            mute:Boolean
        }
       
`;
