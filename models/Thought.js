const { Schema, model, Types } = require('mongoose')

const reactionSchema = new Schema(
  {
    reactionId: [
      {
        type: Types.ObjectId,
        default: new Types.ObjectId
      },
    ],
    reactionBody: {
      type: String,
      require: true,
      max: 280,
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: value => moment(value).format("MMM DD, YYYY [at] hh:mm a")
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  },
);

const thoughtSchema = new Schema (
  {
    thoughtText: {
      type: String,
      require: true,
      min: 1,
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: value => moment(value).format("MMM DD, YYYY [at] hh:mm a")
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      reactionSchema
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  .get(() => this.reactions.length)
  .set((v) => {
    this.set(v);
  });

const Thought = model('thought', thoughtSchema);

model.exports = Thought;