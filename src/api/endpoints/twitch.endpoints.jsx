export class TwitchEndpoints {
  
  getClips(next_cursor) {
    let url = `twitch/get_twitch_clips`
    if (next_cursor !== "") {
      url = `twitch/get_twitch_clips?next_cursor=${next_cursor}`
    }
    return url;
  }

  postClip() {
    return `twitch/post_instagram_clip`;
  }
}
