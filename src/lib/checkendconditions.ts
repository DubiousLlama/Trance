import {videoList, getWatchedList, altRightOnly} from '$lib/reccomend';

let altRightEndTrigger : number = 9999;
let jp_torrent_triggered : boolean = false;

function countReactedWithTag(tag : string) : number {
   
    let reactCount = 0;
    for (const video of videoList) {
        if (video.reaction != "") {
            if (video.tags.includes(tag)) {
                reactCount += 1
            }
        }
    }

    return reactCount;
}

export function resetEndTrigger() {
    altRightEndTrigger = 9999;
}


export function checkEndConditions(url : string, react : string = "") : string {
    
    // Check for alt-right end condition
    if (getWatchedList().length >= altRightEndTrigger) {
        return "altright"
    }

    // Check for alt-right only condition
    if (countReactedWithTag("altright") >= 3 && !jp_torrent_triggered) {
        altRightEndTrigger = getWatchedList().length + 7;
        jp_torrent_triggered = true;
        altRightOnly();
    }

    // Check for the friend end condition
    if (url == "static/videos/Jake04.mp4") {
        if (react == "wow") {
            return "friend"
        }
    }

    // Check for the trance end condition
    if (countReactedWithTag("trance") >= 4 ||  (getWatchedList().length > 35 && !jp_torrent_triggered)) {
        return "trancesurvey"
    }

    // Default case
    return ""


}