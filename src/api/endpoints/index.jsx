import { TwitchEndpoints } from './twitch.endpoints';
import { InstagramEndpoints } from './instagram.endpoints';
import { KrakenEndpoints } from './kraken.endpoints';
import { TwitterEndpoints } from './twitter.endpoints';
import { ParametersEndpoints } from './parameter.endpoints';
import { AuthEndpoints } from './auth.endpoints'
import { YoutubeEndpoints } from './youtube.endpoints';

export class Endpoints {
  static twitch = new TwitchEndpoints();
  static youtube = new YoutubeEndpoints();
  static instagram = new InstagramEndpoints();
  static kraken = new KrakenEndpoints();
  static twitter = new TwitterEndpoints();
  static parameters = new ParametersEndpoints();
  static login = new AuthEndpoints();
}
