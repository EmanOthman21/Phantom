import axios from "axios";
const state = {
  homeCards: [],
  generating: false,
  generatedCount: 0,
  offset: 0,
  maxMore: false,
  inProgress: false,
  homeLoading: false,
  postImage: "",
  userImage: "",
  postTitle: "",
  postDescribtion: "",
  userFirstName: "",
  userLastName: "",
  numberofFollowers: 0,
  pinCreatorId: "",
  cardsGenerated: false,
  totalCards: 0,
  finishCalling: false,
  requestFinished: false,
  deletePin: false,
  cardImageId: "",
  CardId: "",
  reportPin: "",
  pinId: "",
  numReactHaha: 0,
  numReactWow: 0,
  numReactLove: 0,
  numReactGoodIdea: 0,
  numReactThanks: 0,
  reactThisPin: "",
  ChoosenBoardName: "",
  showToastState: false,
  pinType: "",
  showCreatedPinInfo: false,
  showSavedPinInfo: false,
  showUnSaveBtn: false,
  showDeleteBtn: false,
  boardId: "",
  sectionId: "",
  unsavePin: false,
  editpincase: false,
  imageDownloaded: false,
  postPageLoading: false,
  google: false,
  googleImage: "",
  phantomHomeCards: []
};

const mutations = {
  sethomeCards(state, cards) {
    for (let index = 0; index < cards.length; index++)
      state.homeCards.push(cards[index]);
  },
  homeGenerated(state, check) {
    state.cardsGenerated = check;
  },
  setpostImage(state, postImage) {
    state.postImage = postImage;
  },
  setpostTitle(state, postTitle) {
    state.postTitle = postTitle;
  },
  setpostDescribtion(state, postDescribtion) {
    state.postDescribtion = postDescribtion;
  },
  setuserImage(state, userImage) {
    state.userImage = userImage;
  },
  setuserFirstName(state, userFirstName) {
    state.userFirstName = userFirstName;
  },
  setuserLastName(state, userLastName) {
    state.userLastName = userLastName;
  },
  setnumberofFollowers(state, numberofFollowers) {
    state.numberofFollowers = numberofFollowers;
  },
  setpinCreatorId(state, pinCreatorId) {
    state.pinCreatorId = pinCreatorId;
  },
  totalNumCards(state, totalNum) {
    state.totalCards = totalNum;
  },
  finishCalling(state, value) {
    state.finishCalling = value;
  },
  setRequestFinished(state, check) {
    state.requestFinished = check;
  },
  deletePin(state, check) {
    state.deletePin = check;
  },
  setCardImageId(state, id) {
    state.cardImageId = id;
  },
  setCardId(state, id) {
    state.CardId = id;
  },
  reportPin(state, check) {
    state.reportPin = check;
  },
  setPinId(state, id) {
    state.pinId = id;
  },
  setNumReactHaha(state, react) {
    state.numReactHaha = react;
  },
  setNumReactWow(state, react) {
    state.numReactWow = react;
  },
  setNumReactLove(state, react) {
    state.numReactLove = react;
  },
  setNumReactGoodIdea(state, react) {
    state.numReactGoodIdea = react;
  },
  setNumReactThanks(state, react) {
    state.numReactThanks = react;
  },
  setReactThisPin(state, react) {
    if (react == "none") react = "black";
    else if (react == "Haha") react = "yellow";
    else if (react == "Wow") react = "green";
    else if (react == "Love") react = "red";
    else if (react == "Good Idea") react = "blue";
    else if (react == "Thanks") react = "pink";
    state.reactThisPin = react;
  },
  setChoosenBoardName(state, name) {
    state.ChoosenBoardName = name;
  },
  setShowToastState(state, toast) {
    state.showToastState = toast;
  },
  setPinType(state, type) {
    state.pinType = type;
  },
  setSavedPinInfo(state, value) {
    state.showSavedPinInfo = value;
  },
  setCreatedPinInfo(state, value) {
    state.showCreatedPinInfo = value;
  },
  setshowUnSaveBtn(state, value) {
    state.showUnSaveBtn = value;
  },
  setshowDeleteBtn(state, value) {
    state.showDeleteBtn = value;
  },
  setBoardId(state, id) {
    state.boardId = id;
  },
  setSectionId(state, id) {
    state.sectionId = id;
  },
  unsavePin(state, value) {
    state.unsavePin = value;
  },
  editPin(state, value) {
    state.editpincase = value;
  },
  imageDownloaded(state, value) {
    state.imageDownloaded = value;
  },
  resetHome(state) {
    state.homeCards = [];
    (state.generating = false),
      (state.generatedCount = 0),
      (state.offset = 0),
      (state.maxMore = false);
  },
  setGoogleFlag(state, flag) {
    state.google = flag;
  },
  setGoogleImage(state, image) {
    state.googleImage = image;
  },
  setPhantomHomeCards(state, array) {
    state.phantomHomeCards = array;
  }
};

const actions = {
  phantomHome({ commit }, index) {
    axios
      .get("Home/" + index)
      .then(response => {
        state.phantomHomeCards = [];
        commit("setPhantomHomeCards", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  userHome({ state }) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = token;
    state.homeCards = [];
    state.offset = 0;
    state.generating = true;
    state.maxMore = false;
    state.homeLoading = true;
    state.inProgress = false;
    axios
      .put("home/me")
      .then(response => {
        state.generating = false;
        state.generatedCount = response.data.total;
      })
      .catch(error => {
        console.log(error);
      });
  },
  async userGenerateCards({ state, commit, dispatch }, limit) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = token;
    if (!state.maxMore && !state.inProgress) {
      state.inProgress = true;
      try {
        let home = await axios.get(
          "me/home?limit=" + limit + "&offset=" + state.offset
        );
        state.homeLoading = false;
        state.inProgress = false;
        state.offset += 10;
        commit("sethomeCards", home.data);
      } catch (error) {
        state.inProgress = false;
        if (error.response.status == 404) {
          let remaining = state.generatedCount - state.offset;
          if (state.generating) {
            setTimeout(() => {
              dispatch("userGenerateCards", 10);
            }, 1000);
          } else if (remaining > 0) {
            dispatch("userGenerateCards", remaining);
          } else {
            state.homeLoading = false;
            state.maxMore = true;
          }
        }
        console.log(error);
      }
    }
  },
  async Postpage({ commit }, postPageID) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = token;
    state.postPageLoading = true;
    await axios
      .get("/pins/" + postPageID)
      .then(response => {
        let res = response.data;
        commit("setpostImage", res.pin.imageId);
        commit("setpinCreatorId", res.pin.creator.id);
        commit("setpostTitle", res.pin.title);
        commit("setpostDescribtion", res.pin.note);
        commit("setuserFirstName", res.pin.creator.firstName);
        commit("setuserLastName", res.pin.creator.lastName);
        commit("setuserImage", res.creatorInfo.creatorImage);
        commit("setnumberofFollowers", res.creatorInfo.followers);
        commit("setGoogleFlag", res.creatorInfo.google);
        commit("setGoogleImage", res.creatorInfo.googleImage);
        commit("setPinId", res.pin._id);
        commit("setReactThisPin", res.react);
        commit("setNumReactHaha", res.pin.counts.hahaReacts);
        commit("setNumReactWow", res.pin.counts.wowReacts);
        commit("setNumReactLove", res.pin.counts.loveReacts);
        commit("setNumReactGoodIdea", res.pin.counts.goodIdeaReacts);
        commit("setNumReactThanks", res.pin.counts.thanksReacts);
        commit("setPinType", res.type);
        state.postPageLoading = false;
      })
      .catch(error => {
        console.log(error);
        state.postPageLoading = false;
      });
  },
  deletePin({ commit }, pinId) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .delete("me/pins/" + pinId)
      .then(() => {
        commit("deletePin", true);
      })
      .catch(error => {
        console.log(error);
      });
  },
  reportPin({ commit }, { pinId, reportReason }) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .post("pins/" + pinId + "/report", reportReason)
      .then(() => {
        commit("reportPin", true);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async getPinType({ commit }, pinId) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = token;
    await axios
      .get("pins/status/" + pinId)
      .then(res => {
        commit("setPinType", res.data.type);
        commit("setChoosenBoardName", res.data.board);
        commit("setBoardId", res.data.boardId);
        commit("setSectionId", res.data.sectionId);
      })
      .catch(error => {
        console.log(error);
      });
  },
  unSavePinInSection({ commit }, { pinId, boardId, sectionId }) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .delete(
        "me/savedPins/" +
          pinId +
          "?sectionId=" +
          sectionId +
          "&boardId=" +
          boardId
      )
      .then(() => {
        commit("unsavePin", true);
      })
      .catch(error => {
        console.log(error);
      });
  },
  unSavePinInBoard({ commit }, { pinId, boardId }) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .delete("me/savedPins/" + pinId + "?boardId=" + boardId)
      .then(() => {
        commit("unsavePin", true);
      })
      .catch(error => {
        console.log(error);
      });
  },
  editSavedPin({ commit }, { pinId, info }) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .put("me/savedPins/" + pinId, info)
      .then(() => {
        commit("editPin", true);
      })
      .catch(error => {
        console.log(error);
      });
  },
  editCreatedPin({ commit }, { pinId, info }) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .put("me/pins/" + pinId, info)
      .then(() => {
        commit("editPin", true);
      })
      .catch(error => {
        console.log(error);
      });
  },
  downloadImage({ commit }, imageId) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = token;
    commit("imageDownloaded", true);
    axios({
      url: process.env.VUE_APP_baseURL + "/image/" + imageId,
      method: "GET",
      responseType: "blob"
    }).then(response => {
      var imageUrl = window.URL.createObjectURL(new Blob([response.data]));
      var imageLink = document.createElement("a");
      imageLink.href = imageUrl;
      imageLink.setAttribute("download", imageId + ".jpg");
      document.body.appendChild(imageLink);
      imageLink.click();
    });
  }
};

const getters = {
  userHomePage: state => state.homeCards,
  postImage: state => state.postImage,
  userImageId: state => state.userImage,
  postTitle: state => state.postTitle,
  postDescribtion: state => state.postDescribtion,
  userFirstName: state => state.userFirstName,
  userLastName: state => state.userLastName,
  numberofFollowers: state => state.numberofFollowers,
  pinCreatorId: state => state.pinCreatorId,
  finishCalling: state => state.finishCalling,
  pinId: state => state.pinId,
  homeLoading: state => state.homeLoading,
  postPageLoading: state => state.postPageLoading,
  google: state => state.google,
  googleImage: state => state.googleImage
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
