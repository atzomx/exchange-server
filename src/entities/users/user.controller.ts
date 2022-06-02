import UserRepository from "./user.repository";

class UserController {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  user(id: string) {
    return this.repository.findById(id);
  }

  async users({ page, limit }: { page: number; limit: number }) {
    const paginator = this.repository.paginate({}, { limit, page });
    const [results, total] = await Promise.all([
      paginator.getResults(),
      paginator.getTotal(),
    ]);

    const pages = Math.ceil(total / limit);
    return {
      results,
      info: {
        total,
        page,
        pages,
      },
    };
  }
}

export default UserController;
