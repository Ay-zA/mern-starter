import {
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID
} from 'graphql';

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  description: 'A Habit Project',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of Project'
    },
    title: {
      type: GraphQLString,
      description: 'The title of Project (Uniqe)'
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    project: {
      type: ProjectType,
      args: {
        id: {
          type: GraphQLID,
          description: 'The id of project'
        }
      },
      resolve: (context, args) => ({ id: 1, title: 'Hello World' })
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

export default schema;
