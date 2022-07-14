import { getModelForClass } from "@typegoose/typegoose";
import Meeting from "./meeting.entity";

const MeetingModel = getModelForClass(Meeting, {
  schemaOptions: { timestamps: true },
});

export default MeetingModel;
