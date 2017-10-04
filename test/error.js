import { assert } from 'chai';
import { DefaultError, ValidationError } from '../src/error';


describe('Error', () => {
  it('format error', () => {
    const errorObject = {
      count: 4,
      map: {
        name: new ValidationError('String', 'Number'),
        profile: {
          count: 3,
          map: {
            id: new ValidationError('String', 'Number'),
            messages: {
              count: 2,
              list: [
                {
                  count: 2,
                  map: {
                    id: new ValidationError('String', 'Number'),
                    history: {
                      count: 1,
                      list: [
                        {
                          count: 1,
                          map: {
                            id: new ValidationError('String', 'Number'),
                          },
                          name: 'MilestoneSchema',
                        },
                      ],
                      name: 'MilestoneSchema',
                    },
                  },
                  name: 'MessageSchema',
                },
              ],
              name: 'MessageSchema',
            },
          },
          name: 'UserSchema',
        },
      },
      name: 'CellSchema',
    };

    const formatedMessage = `
CellSchema {
  name: 'Expected String but Number'
  profile: {
    id: 'Expected String but Number'
    messages: [
      {
        id: 'Expected String but Number'
        history: [
          {
            id: 'Expected String but Number'
          }
        ]
      }
    ]
  }
}
`;

    assert.deepEqual(DefaultError.FormatError(errorObject), formatedMessage);
  });
});

