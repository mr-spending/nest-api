import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { FirebaseService } from '../firebase/firebase.service';
import { CategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  private store: firebase.firestore.Firestore;

  constructor(private firebaseApp: FirebaseService) {
    this.store = firebaseApp.firestore();
  }

  async findAll(): Promise<CategoryDto[]> {
    const categories = [];
    (await this.store.collection('categories').get()).docs.map((data) => {
      categories.push(data.data());
    });
    return categories;
  }
}
