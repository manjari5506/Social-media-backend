import mongoose , {Schema} from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
         type: String,
         require: [true, "First Name is Required"],
        },
        lastName: {
         type: String,
         require: [true, "Last Name is Required"],
        },
        email: {
            type: String,
            require: [true, "Email is Required"],
            unique: true,
           },
        password: {
            type: String,
            required: [true, "Password is required!"],
            minlength: [6, "Password length should be greater than 6 characters"],
            select: true,
        },
        location: {type: String},
        profileUrl: {type: String},
        profession: {type: String},
        friends: [{type: Schema.Types.ObjectId, ref: "Users"}],
        views: {type: String},
        verified: {type: Boolean, default: false},
    },
    {timestamps: true}
);

const Users = mongoose.model("Users",userSchema);

export default Users;

