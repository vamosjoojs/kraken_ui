import { TwitchEndpoints } from './twitch.endpoints';
import { InstagramEndpoints } from './instagram.endpoints';
import { KrakenEndpoints } from './kraken.endpoints';

export class Endpoints {
  static twitch = new TwitchEndpoints();
  static instagram = new InstagramEndpoints();
  static kraken = new KrakenEndpoints();
}
