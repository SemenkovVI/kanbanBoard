import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Task {
  id: string;
  row: string;
  text: string;
  name: string;
  deadline: Timestamp;
}
