
export class TwitterEndpoints {
    getBots() {
        return `twitter/get_send_message_task`;
      }
      
    editBots(id) {
        return `twitter/edit_send_message_task/${id}`;
      }      
}