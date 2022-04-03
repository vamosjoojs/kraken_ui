import { TwitchEndpoints } from './twitch.endpoints';
import { InstagramEndpoints } from './instagram.endpoints';
import { KrakenEndpoints } from './kraken.endpoints';
import { TwitterEndpoints } from './twitter.endpoints';

export class Endpoints {
  static twitch = new TwitchEndpoints();
  static instagram = new InstagramEndpoints();
  static kraken = new KrakenEndpoints();
  static twitter = new TwitterEndpoints();
}
