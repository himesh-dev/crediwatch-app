import { put, takeEvery, call } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

import { axiosInstance } from "./apiModule";

function* fetchDataSaga() {
  yield put(actions.fetchDataStart());
  const urlTeam = "teams.json";
  const urlMatch = "matches.json";
  try {

    const responseTeam = yield call(axiosInstance.get, urlTeam);
    const responseMatch = yield call(axiosInstance.get, urlMatch);
    const updatedData = formatData(
      responseTeam.data.clubs,
      responseMatch.data.rounds
    );
    yield put(actions.fetchDataSuccess(updatedData));
  } catch (err) {
    yield put(actions.fetchDataFail());
  }
}
function formatData(teams, sessions) {
  let updatedData = [];
  let clubs = [...teams];
  let rounds = [...sessions];
  for (let club of clubs) {
    if (!club.code) {
      continue;
    }
    let obj = {
      key: club.key,
      code: club.code,
      name: club.name,
      totalMatches: 0,
      won: 0,
      lost: 0,
      tie: 0,
      totalGoalFor: 0,
      totalGoalAgainst: 0
    };
    // let key = updatedData[club.key];
    for (let round of rounds) {
      let { matches } = round;
      for (let match of matches) {
        if (match.team1.code === club.code) {
          obj["totalMatches"] = obj["totalMatches"] + 1;
          obj["totalGoalFor"] = obj["totalGoalFor"] + match.score1;
          obj["totalGoalAgainst"] = obj["totalGoalAgainst"] + match.score2;
          if (match.score1 > match.score2) {
            obj["won"] = obj["won"] + 1;
          } else if (match.score1 < match.score2) {
            obj["lost"] = obj["lost"] + 1;
          } else if (match.score1 === match.score2) {
            obj["tie"] = obj["tie"] + 1;
          }
        } else if (match.team2.code === club.code) {
          obj["totalMatches"] = obj["totalMatches"] + 1;

          obj["totalGoalFor"] = obj["totalGoalFor"] + match.score2;
          obj["totalGoalAgainst"] = obj["totalGoalAgainst"] + match.score2;
          if (match.score2 > match.score1) {
            obj["won"] = obj["won"] + 1;
          } else if (match.score2 < match.score1) {
            obj["lost"] = obj["lost"] + 1;
          } else if (match.score1 === match.score2) {
            obj["tie"] = obj["tie"] + 1;
          }
        }
      }
    }
    updatedData.push(obj);
  }
  return updatedData;
}

export function* watchFetchData() {
  yield takeEvery(actionTypes.FETCH_DATA, fetchDataSaga);
}
