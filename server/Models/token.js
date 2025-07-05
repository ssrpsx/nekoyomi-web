import mongoose from 'mongoose';

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiredAt: {
    type: Date,
    default: () => new Date(Date.now() + 15 * 60 * 1000),
    index: { expires: 0 }
  }
});

const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);
export default BlacklistToken;