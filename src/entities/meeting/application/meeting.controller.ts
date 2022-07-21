import Meeting from "../domain/meeting.entity";
import { MeetingNotFoundError } from "../domain/meeting.errors";
import MeetingRepository from "../domain/meeting.repository";
import { MeetingPaginateArgs } from "../infrastructure/meeting.args";
import {
  MeetingInputCreate,
  MeetingInputUpdate,
} from "../infrastructure/meeting.inputs";

class MeetingController {
  private repository: MeetingRepository;

  constructor() {
    this.repository = new MeetingRepository();
  }

  meetingById(id: string) {
    return this.repository.findById(id);
  }

  async meetingPaginate({ page, limit, exchangeId }: MeetingPaginateArgs) {
    const paginator = this.repository.paginate(
      {
        exchangeId,
      },
      { limit, page },
    );

    const [results, total] = await Promise.all([
      paginator.getResults(),
      paginator.getTotal(),
    ]);

    const pages = Math.ceil(total / limit);
    return {
      results: results,
      info: {
        total,
        page,
        pages,
      },
    };
  }

  async meetingCreate(meeting: MeetingInputCreate): Promise<Meeting> {
    const newMeeting = { ...meeting };
    const result = await this.repository.create({ ...newMeeting });
    return result;
  }

  async meetingUpdate(
    id: string,
    meeting: MeetingInputUpdate,
  ): Promise<Meeting> {
    const currentMeeting = await this.repository.findById(id);
    if (!currentMeeting) throw new MeetingNotFoundError();
    const dataToUpdate = { ...meeting };
    const updatedMeeting = await this.repository.findByIdAndUpdate(
      id,
      dataToUpdate,
    );
    return updatedMeeting;
  }
}

export default MeetingController;
