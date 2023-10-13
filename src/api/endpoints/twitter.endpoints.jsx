
export class TwitterEndpoints {
  getBotMessage() {
    return `twitter/get_send_message_task`;
  }

  getBotFollow() {
    return `twitter/get_follow_task`;
  }

  editBots(id) {
    return `twitter/edit_send_message_task/${id}`;
  }
}