module.exports = `
        type Mutation {
            createClassroom(userInput: newClassroomInputData!):Classroom!,
            updateClassroom(classroomId:ID!,userInput: updateClassroomInputData!):Classroom!,
            addUserToClassroom(classroomId:ID!,userId:[ID!]!):Classroom,
            addUserToClassroomViaCode(code:String!):Classroom,
            removeUserFromClassroom(classroomId:ID!,userId:ID!):Classroom,
            revokeClassroomCode(classroomId:ID!):String,
            changeClassroomAdmin(classroomId:ID!,userId:ID!,remove:Boolean!):Classroom,
            deleteClassroom(classroomId:ID!):Boolean
        }
        type Query {
            getClassrooms:[Classroom],
            getClassroom(classroomId:ID!):Classroom
        }
        type ClassroomStudent {
            isAdmin:Boolean!,
            user:User
            addedAt:String
        }
        type ClassroomUser {
            students:[ClassroomStudent],
            teachers:[User],
        }
        type Classroom {
            _id:ID!,
            name:String!,
            section:String!,
            subject:String!,
            icon:String!,
            participants:ClassroomUser!,
            description:String!,
            inviteCode:String!,
            mute:Boolean!
        }
        input newClassroomInputData {
            name:String!,
            section:String!,
            subject:String!,
            description:String,
        }
        input updateClassroomInputData {
            name:String,
            section:String,
            subject:String,
            description:String,
            mute:Boolean
        }
       
`;
