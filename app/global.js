var db = openDatabase({ name: 'users.db' });

var userTuple = {uid: -1,  user_name:'AGGIE', bio:'', followers: 0};
var currUser = -1;