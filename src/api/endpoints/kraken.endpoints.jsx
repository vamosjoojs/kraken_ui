

export class KrakenEndpoints {
  getQueue(page, pageSize) {
    return `kraken/get_posts_queue?page=${page}&page_size=${pageSize}&order=asc`;
  }
}
