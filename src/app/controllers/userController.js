import { getFirebase } from "../db.js";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  getCountFromServer,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.js";
import { RequiredParamsException } from "../../../lib/exceptions.js";
import { query } from "express";

const { firestore } = getFirebase();

export async function addUser(req, res, next) {
  try {
    console.log("Adding new user");
    const data = req.body;
    const params = userParams(data);
    checkRequiredParams(params);
    console.log(params)

    await setAutoFields(params)
    setAutoLoadFields(params)

    const uuid = params['uuid']
    await setDoc(doc(firestore, "users", uuid), {
      params,
    });
    res.status(201).json({ message: "Record saved successfully" });
  } catch (error) {
    next(error);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    console.log("Getting all users");

    const usersQuery = await getDocs(collection(firestore, "users"));
    const userList = [];
    usersQuery.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      userList.push(doc.data());
    });

    if (userList.empty) {
      res.status(200).json({ message: "No users found" });
    } else {
      let total = 0;
      const arr = [];

      userList.forEach((userParams) => {
        const userHash = userParams["params"];
        const user = new User(
          userHash["fullName"],
          userHash["email"],
          userHash["uuid"]
        );
        arr.push(user);
        total = total + 1;
      });
      res.status(200).json({
        listing: arr,
        count: total,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function getUser(req, res, next) {
  try {
    const id = req.params.id;

    console.log("Getting user= %s", id);

    const docRef = doc(firestore, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());
      res.status(200).json(docSnap.data()["params"]);
    } else {
      // docSnap.data() will be undefined in this case
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = doc(firestore, "users", id);
    const params = userParams(data);
    console.log(params);

    setAutoLoadFields(params)
    
    await updateDoc(user, params);

    res.status(204).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;

    console.log(req.params);
    console.log("Deleting user= %s", id);

    await deleteDoc(doc(firestore, "users", id));
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
}

const userParams = (data) => {
  const params = {};
  Object.entries(data).forEach((keyValuePair) => {
    if (
      User.fields
        .filter((field) => !User.autoFields.includes(field))
        .includes(keyValuePair[0])
    ) {
      params[keyValuePair[0]] = keyValuePair[1];
    }
  });
  return params;
};

function checkRequiredParams(params_hash) {
  User.requiredFields.forEach((field) => {
    if (!Object.keys(params_hash).includes(field)) {
      throw new RequiredParamsException(
        "The following param was missing during user creation: " + field
      );
    }
  });
}

async function setAutoFields(params, req, res, next) {
  try {
    params['createdAt'] = new Date();
    params['uuid'] = uuidv4();

    // Get Seqential ID
    const users = collection(firestore, "users");
    const snapshot = await getCountFromServer(users);
    const count = snapshot.data().count

    console.log('count: ', count);
    params['seqId'] = count + 1;

  } catch(error) {
    throw new Error("Unable to count users collection.")
  }
}

function setAutoLoadFields(params) {
  params['updatedAt'] = new Date();
}

// todo - add delete all users
