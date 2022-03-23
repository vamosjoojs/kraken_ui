export class TwitchEndpoints {
  
  getClips(next_cursor) {
    let url = `twitch/get_twitch_clips`
    if (next_cursor != "") {
      url = `twitch/get_twitch_clips?next_cursor=${next_cursor}`
    }
    return url;
  }

  downloadClips(thumbnail) {
    return `twitch/download_twitch_clip?thumbnail=${thumbnail}`;
  }

  getQueue() {
    return `twitch/get_posts_queue`;
  }
}
