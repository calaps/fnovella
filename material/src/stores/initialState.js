let initialState = {

  auth: {
    user: null,
  },
  programs: {},
  catalogs: {},
  educators: {},
  privileges: [],
  participants: {},
  sedes: {},
  users: {},
  programActivations: {},
  participantContacts: {},
  courses: {},
  grades: {},
  workshops: {},
  divisions: {},
  dashboard: {},
  categories: [],
  sections: {},
  programLocations: {},
  programInstructors: {},
  indicators: {},
  progress: {
    requestInProgress: 0
  },
  snackBar: {
    open: false,
    message: '',
    autoHideDuration: 4000
  },
  programAdditionalFields:{},
  groups:{},
  participantAdditionalFields: {},
  inscriptions: {},
  inscriptionParticipants: {},
  assistance:{},
  assistanceParticipant:{}
};

export default initialState;
