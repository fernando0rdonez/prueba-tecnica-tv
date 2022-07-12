import mongoose from 'mongoose'
import { HashPassword } from '../services/hashPassword'
import { IUser } from '../types/types'

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    last_login: {
      type: Date,
      require: false
    },
    token: {
      type: String,
      require: false
    },
    phones: [
      {
        number: { type: String },
        ddd: { type: String }
      }
    ]
  }, {
    timestamps: { createdAt: 'creation_date', updatedAt: 'updated_date' },
    toJSON: {
      transform (_doc, ret, _options) {
        ret.id = ret._id
        delete ret.password
        delete ret._id
        delete ret.__v
      }
    }
  }
)

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await HashPassword.tohash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

const User = mongoose.model<IUser>('User', userSchema)

export { User }
