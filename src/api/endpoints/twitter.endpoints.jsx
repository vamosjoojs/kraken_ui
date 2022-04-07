
export class TwitterEndpoints {
    getBots() {
        return `twitter/get_send_message_task`;
      }
      
    edittBots(id) {
        return `twitter/edit_send_message_task?${id}`;
      }
}