import * as actionTypes from './actiontypes';
import _ from 'lodash';

// const initialState = {
//     accessToken: '',
//     userData: {},
// };

const initialState = {
    accessToken: "eyJhbGciOiJFUzI1NiIsIng1dCI6IkQ0QUU4MjQ2RDYyNTBFMTY5Njg4NDFCREY4Nzc2MTI4NUMwNUJCMUYifQ.eyJvYWEiOiI3Nzc3NyIsImlzcyI6Im9hIiwiYWlkIjoiMTEwIiwidWlkIjoiSXlERjVicGJkRTRhTEtObGUxU2RCZz09IiwiY2lkIjoiSXlERjVicGJkRTRhTEtObGUxU2RCZz09IiwiaXNhIjoiVHJ1ZSIsInRpZCI6IjIwMDIiLCJzaWQiOiI5NWVhNTEwMzg4YzI0NzNlOTExOTFjZGE1Mjc4MGFiNyIsImRnaSI6IjgyIiwiZXhwIjoiMTUxMDM5OTE4NCJ9.9Jd2nARatA6ZWMmHqTfRTiJHd5iDp3FNF3YAJWNUw7oypRiDmaXdHedv-OeNcvxozNmV9cAGgePwKU_62HeyyQ",
    userData: {
        ClientKey: "IyDF5bpbdE4aLKNle1SdBg==",
        Culture: "en-GB",
        Language: "en",
        LastLoginStatus: "Successful",
        LastLoginTime: "2017-11-02T11:53:30.663000Z",
        Name: "vinay gosain",
        TimeZoneId: 26,
        UserId: "8248538",
        UserKey: "IyDF5bpbdE4aLKNle1SdBg==",
        LegalAssetTypes: ["FxSpot", "FxForwards", "FxVanillaOption", "FxKnockInOption", "FxKnockOutOption", "FxOneTouchOption", "FxNoTouchOption", "ContractFutures", "FuturesStrategy", "Stock", "Bond", "FuturesOption", "StockIndexOption", "StockOption", "CfdOnStock", "CfdOnIndex", "CfdOnFutures", "StockIndex"]

    },
};

function _updateUserInfo(state, data) {
    return _.defaults({ ...data }, state);
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_USER_INFO:
            return _updateUserInfo(state, action);

        default:
            return state;
    }
}


// "IyDF5bpbdE4aLKNle1SdBg=="
// Culture
// :
// "en-GB"
// Language
// :
// "en"
// LastLoginStatus
// :
// "Successful"
// LastLoginTime
// :
// "2017-11-02T11:53:30.663000Z"
// LegalAssetTypes
// :
// Array(18)
// 0
// :
// "FxSpot"
// 1
// :
// "FxForwards"
// 2
// :
// "FxVanillaOption"
// 3
// :
// "FxKnockInOption"
// 4
// :
// "FxKnockOutOption"
// 5
// :
// "FxOneTouchOption"
// 6
// :
// "FxNoTouchOption"
// 7
// :
// "ContractFutures"
// 8
// :
// "FuturesStrategy"
// 9
// :
// "Stock"
// 10
// :
// "Bond"
// 11
// :
// "FuturesOption"
// 12
// :
// "StockIndexOption"
// 13
// :
// "StockOption"
// 14
// :
// "CfdOnStock"
// 15
// :
// "CfdOnIndex"
// 16
// :
// "CfdOnFutures"
// 17
// :
// "StockIndex"
// length
// :
// 18
// __proto__
// :
// Array(0)
// Name
// :
// "vinay gosain"
// TimeZoneId
// :
// 26
// UserId
// :
// "8248538"
// UserKey
// :
// "IyDF5bpbdE4aLKNle1SdBg=="