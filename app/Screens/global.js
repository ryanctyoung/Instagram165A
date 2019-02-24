import React from 'react';
import SQLite from 'react-native-sqlite-storage';
export {Database, userTuple, currUser };

var db = SQLite.openDatabase({ name: 'users.db' });

var userTuple = {uid: -1,  user_name:'AGGIE', bio:'', followers: 0};
var currUser = -1;

