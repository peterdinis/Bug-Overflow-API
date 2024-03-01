import { GraphQLError } from 'graphql';

// TODO: Toto neskôr pripraviť pre technology toto je len ukážka

throw new GraphQLError('You are not authorized to perform this action.', {
    extensions: {
        code: 'FORBIDDEN',
    },
});
