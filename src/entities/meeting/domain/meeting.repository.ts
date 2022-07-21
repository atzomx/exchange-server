import { Repository } from "@core/domain";
import Meeting from "./meeting.entity";
import MeetingModel from "./meeting.model";

class MeetingRepository extends Repository<Meeting> {
  constructor() {
    super(MeetingModel);
  }
}

export default MeetingRepository;
