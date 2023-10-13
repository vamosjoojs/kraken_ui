export class YoutubeEndpoints {


  getClips(videoId) {
    let url = `youtube/get_youtube_clips?youtube_id=${videoId}`
    // if (next_cursor !== "") {
    //   url = `youtube/get_youtube_clips?next_cursor=${next_cursor}`
    // }
    return url;
  }

  getAllClips(page) {
    return `youtube/get_all_youtube_clips?page=${page}`;
  }

  getVideos(next_cursor) {
    let url = `youtube/get_youtube_videos`
    if (next_cursor !== "") {
      url = `youtube/get_youtube_videos?next_cursor=${next_cursor}`
    }
    return url;
  }

  downloadVideo() {
    return `youtube/download_video`;
  }
  
  cutVideo() {
    return `youtube/cut_video`;
  }
}
