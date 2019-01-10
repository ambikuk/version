// version-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const version = new Schema({
    key: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
    timestamp: { type: Number, required: true }
  }, {
    timestamps: false
  });

  return mongooseClient.model('version', version);
};
