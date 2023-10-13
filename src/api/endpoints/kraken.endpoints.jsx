

export class KrakenEndpoints {
  getQueue(page, pageSize) {
    return `kraken/get_posts_queue?page=${page}&page_size=${pageSize}&order=asc`;
  }

  postClipInstagram() {
    return `kraken/post_instagram_clip`;
  }
  
  postClipTwitter() {
    return `kraken/post_twitter_clip`;
  }
  
  postClipTiktok() {
    return `kraken/post_tiktok_clip`;
  }
  
  getClipData(id) {
    return `kraken/get_clip_data?id=${id}`;
  }
}
