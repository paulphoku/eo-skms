import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../environments/environment';


// Import the functions you need from the SDKs you need
import { getApp } from "firebase/app";
import { getStorage, ref, uploadBytes, uploadString  } from "firebase/storage";
import { getFirestore, addDoc, collection, getDocs, query, where } from "firebase/firestore";


@Injectable({
    providedIn: 'root'
})

export class FirebaseService {

    db = getFirestore();
    datetime = moment().format().toString();
    // Get a non-default Storage bucket
    storage = getStorage();

    constructor(
        private toastController: ToastController,
    ) {

    }

    /**
     * 
     * SET METHODS
     */

    //add user document
    async createUser(user_id, name, surname, email, contact, company, photo_url, state) {
        try {
            const docRef = await addDoc(collection(this.db, "user"), {
                user_id: user_id,
                name: name,
                surname: surname,
                email: email,
                contact: contact,
                company: company,
                photo_url: photo_url,
                datetime: this.datetime,
                state: state
            });

            console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        } catch (e) {
            console.error("Error adding document: ", e);
            return undefined;
        }
    }

    //add device document
    async createDevice(ref, name, company, photo_url, state) {
        try {
            const docRef = await addDoc(collection(this.db, "device"), {
                name: name,
                company: company,
                ref: ref,
                photo_url: photo_url,
                datetime: this.datetime,
                state: state
            });

            console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        } catch (e) {
            console.error("Error adding document: ", e);
            return undefined;
        }
    }

    //add company document
    async createCompany(name, contact_person, contact_nr, contact_email, state) {
        try {
            const docRef = await addDoc(collection(this.db, "company"), {
                name: name,
                contact_person: contact_person,
                contact_nr: contact_nr,
                contact_email: contact_email,
                datetime: this.datetime,
                state: state
            });

            console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        } catch (e) {
            console.error("Error adding document: ", e);
            return undefined;
        }
    }

    //add key document
    async createKey(name, ref, company, photo_url, state) {
        try {
            const docRef = await addDoc(collection(this.db, "key"), {
                name: name,
                ref: ref,
                photo_url: photo_url,
                company: company,
                datetime: this.datetime,
                state: state
            });

            console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        } catch (e) {
            console.error("Error adding document: ", e);
            return undefined;
        }
    }

    //add Key Allocation document
    async createKeyAlloc(user_id, ref, state) {
        try {
            //check first if relationship exists
            const q = query(collection(this.db, "key-alloc"), where("user_id", "==", user_id), where("ref", "==", ref));
            const querySnapshot = await getDocs(q);

            console.log('Size:', querySnapshot.size)

            if (querySnapshot.size > 0) {
                return undefined;
            } else {
                //add new key allocation
                const docRef = await addDoc(collection(this.db, "key-alloc"), {
                    user_id: user_id,
                    ref: ref,
                    datetime: this.datetime,
                    state: state
                });

                console.log("Document written with ID: ", docRef.id);
                return docRef.id;
            }




        } catch (e) {
            console.error("Error adding document: ", e);
            return undefined;
        }
    }

    /**
     * 
     * GET METHODS
     */

    async getUsers() {
        const querySnapshot = await getDocs(collection(this.db, "user"));
        let Data = [];
        querySnapshot.forEach((doc) => {
            Data.push(doc.data())
        });
        return Data;
    }

    async getCompanys() {
        const querySnapshot = await getDocs(collection(this.db, "company"));
        let Data = [];
        querySnapshot.forEach((doc) => {
            Data.push(doc.data())
        });
        return Data;
    }

    async getDevices() {
        const querySnapshot = await getDocs(collection(this.db, "device"));
        let Data = [];
        querySnapshot.forEach((doc) => {
            Data.push(doc.data())
        });
        return Data;
    }

    async getKeys() {
        const querySnapshot = await getDocs(collection(this.db, "key"));
        let Data = [];
        querySnapshot.forEach((doc) => {
            Data.push(doc.data())
        });
        return Data;
    }

    async get_user_keys(user_id) {

        const q1 = query(collection(this.db, "key-alloc"), where("user_id", "==", user_id));
        const querySnapshot1 = await getDocs(q1);

        const q2 = query(collection(this.db, "key"));
        const querySnapshot2 = await getDocs(q2);

        let Data = [];
        querySnapshot1.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            querySnapshot2.forEach((doc1) => {
                // doc.data() is never undefined for query doc snapshots
                if (doc1.data().ref === doc.data().ref) {
                    Data.push(doc1.data());
                }
            });
        });

        return Data;
    }

    /**
     * UPLOAD FILES
     * 
     * @param path 'avater', 'key', 'company'
     * @param file dataURI
     */
    async upload_file(path, file, filename) {
        const storageRef = ref(this.storage, `${path}/${filename}` );

        // 'file' comes from the Blob or File API
        uploadString(storageRef, file, 'data_url').then((snapshot) => {
            console.log('Uploaded a blob or file!', snapshot);
        });
    }

}