import { model, models, Schema } from "mongoose";


const SessionsSchema = new Schema(
    {
        user_id : {type: Schema.Types.ObjectId, ref: "User" },
        jwt : { type: 'String', required: true}
    },
   {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
   }

);

const Sessions = models.Sessions || model("Sessions",SessionsSchema)

export default Sessions;