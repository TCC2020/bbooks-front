import {TrackingTO} from '../models/TrackingTO.model';
import {readingsTrackingMock} from './tracking.model';


export const trackingMock = new TrackingTO();
trackingMock.finishedDate  = null;
trackingMock.comentario = 'dskjfaewifodsaojfef';
trackingMock.trackings = readingsTrackingMock;
trackingMock.id = 'fsdffsaefasdfesf';

export const trackingsMock = [] as TrackingTO[];
trackingsMock.push(trackingMock);
trackingsMock.push(trackingMock);
trackingsMock.push(trackingMock);
trackingsMock.push(trackingMock);
