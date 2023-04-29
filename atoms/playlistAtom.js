import { atom } from "recoil";

export const playlistState = atom({
    key: "playlistState",
    default: null,
})



export const playlistIdState = atom({
    key: "playlistIdState", //This need to be unique because it will be referce in global memory...two same reference makes you trouble
    default: '1wSqUPF3q58mIgXR2Lq8FX'
});