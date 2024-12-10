import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type User {
    id: ID!
    email: String!
    name: String
    cvs: CVConnection!
    interviews: InterviewConnection!
    createdAt: String!
    updatedAt: String!
  }

  type CVEdge {
    cursor: String!
    node: CV!
  }

  type CVConnection {
    edges: [CVEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type InterviewEdge {
    cursor: String!
    node: Interview!
  }

  type InterviewConnection {
    edges: [InterviewEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type CV {
    id: ID!
    title: String!
    content: JSON!
    aiSuggestions: JSON
    createdAt: String!
    updatedAt: String!
    user: User!
  }

  type Interview {
    id: ID!
    type: String!
    feedback: JSON!
    recording: String
    score: Int!
    createdAt: String!
    user: User!
  }

  type InterviewFeedback {
    interviewId: ID!
    feedback: JSON!
    timestamp: String!
  }

  scalar JSON

  type Query {
    me: User
    cv(id: ID!): CV
    interview(id: ID!): Interview
    myInterviews(first: Int, after: String, last: Int, before: String): InterviewConnection!
    myCVs(first: Int, after: String, last: Int, before: String): CVConnection!
  }

  input CVInput {
    title: String!
    content: JSON!
  }

  input InterviewInput {
    type: String!
    recording: String
  }

  type Mutation {
    createCV(input: CVInput!): CV!
    updateCV(id: ID!, input: CVInput!): CV!
    deleteCV(id: ID!): Boolean!
    
    startInterview(input: InterviewInput!): Interview!
    submitInterview(id: ID!, feedback: JSON!): Interview!
    
    generateAISuggestions(cvId: ID!): CV!
  }

  type Subscription {
    interviewFeedback(interviewId: ID!): InterviewFeedback!
    cvUpdated(cvId: ID!): CV!
  }
`;