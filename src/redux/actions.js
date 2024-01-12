export const SET_QUESTIONS = 'SET_QUESTIONS';

export const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  payload: questions,
});
export const SET_SYSTEMS = 'SET_SYSTEMS';

export const setSystems = (systems) => ({
  type: SET_SYSTEMS,
  payload: systems,
});
export const SET_INSTALLATIONS = 'SET_INSTALLATIONS';

export const setInstallations = (installations) => ({
  type: SET_INSTALLATIONS,
  payload: installations,
});

export const SET_PARTNERS = 'SET_PARTNERS';

export const setPartners = (partners) => ({
  type: SET_PARTNERS,
  payload: partners,
});

export const SET_REVIEWS = 'SET_REVIEWS';

export const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  payload: reviews,
});

export const SET_USERS = 'SET_USERS';

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const CLEAR_USERS = 'CLEAR_USERS';

export const clearUser = () => ({
  type: CLEAR_USERS,
});

