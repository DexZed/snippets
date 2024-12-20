import { model, models, Schema } from "mongoose";


const SessionsSchema = new Schema(
    {
        users : {type: Schema.Types.ObjectId, ref: "User" },
        jwt : { type: 'string', required: true}
    },
   {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
   }

);

const Sessions = models.Sessions || model("sessions",SessionsSchema)

export default Sessions;