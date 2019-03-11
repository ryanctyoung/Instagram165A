import React, {Component} from 'react';

export const UserContext = React.createContext({
	user:{uid: -1,  user_name:'', followers: 0},
	LoginUser:() => {},
});