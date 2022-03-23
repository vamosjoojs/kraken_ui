import { TwitchEndpoints } from './twitch.endpoints';
import { InstagramEndpoints } from './instagram.endpoints';

export class Endpoints {
  static twitch = new TwitchEndpoints();
  static instagram = new InstagramEndpoints();
}
