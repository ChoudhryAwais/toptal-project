import { auth, db } from "./base"
import { doc, setDoc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
export const FirebaseCrud = async (collectionName, action, payload, id, callfrom) => {
    if (action === "setDoc") {
        setUpData(collectionName, payload, id, callfrom)
    } else if (action === "getDocById") {
        const result = await getById(collectionName, id)
        return result
    } else if (action === "addDoc") {
        const result = await AddUpData(collectionName, payload)
        return result
    } else if (action === "getDocAll") {
        const result = await getAll(collectionName)
        return result
    } else if (action === "updateDoc") {
        UpdateData(collectionName, payload, id)
    } else if (action === "deleteDoc") {
        DeleteData(collectionName, id)
    } else if (action === "deleteUserAcc") {
        const result = DeleteUserAcc(collectionName)
        return result
    }

}
// add data with customize ID
const setUpData = async (collectionName, payload, id, callfrom) => {
    const firebaseStoreRef = doc(db, collectionName, id)
    // Add a new document in collection
    await setDoc(firebaseStoreRef, payload);
    if (callfrom === "register") {
        auth.signOut()
    }
}
// Get the data from specific Id
const getById = async (collectionName, id,) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }
}
// Get all the data
const getAll = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    const docSnap = await getDocs(collectionRef);
    if (docSnap) {
        let dataArr = []
        docSnap.forEach((doc) => {
            let id = doc.id
            dataArr.push({ id, ...doc.data() })
        });
        return dataArr
    } else {
        return null
    }
}
// Add data using firebase Id
const AddUpData = async (collectionName, payload) => {
    const collectionRef = collection(db, collectionName)
    const result = await addDoc(collectionRef, payload);
    return result.id
}
// Update the doc
const UpdateData = async (collectionName, payload, id) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, payload);
}
// delete the do
const DeleteData = async (collectionName, id) => {
    const docRef = doc(db, collectionName, id)
    await deleteDoc(docRef);
}

// delete the do
const DeleteUserAcc = async (collectionName) => {
    const signIn = await auth.signInWithEmailAndPassword(collectionName.email, collectionName.password)
    if (signIn) {
        const user = auth.currentUser;
        const deleteUsers = deleteUser(user)
        if (deleteUsers) {
            const signInAgain = await auth.signInWithEmailAndPassword(collectionName.currentEmail, collectionName.currentPass)
            if (signInAgain) {
                return signInAgain
            }
        }
    }
}