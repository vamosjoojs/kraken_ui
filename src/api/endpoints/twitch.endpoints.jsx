export class TwitchEndpoints {
  
  getClips(page) {
    let url = `twitch/get_twitch_clips?page=${page}`
    return url;
  }
}
