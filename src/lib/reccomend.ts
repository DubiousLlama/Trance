import { checkEndConditions, resetEndTrigger } from "./checkendconditions";
import {goto} from "$app/navigation"

const REACTION_STRENGTH : Map<string, number>= new Map([
  ['like', 1],
  ["love", 3],
  ["haha", 1.5],
  ["wow", 2],
  ["angry", 4]
])

export class Video {
    url: string;
    tags: string[];
    reaction: string = "";
    hard_reqs: string[];
    insert_at: number;
    chance: number = 1;
    prominence: number = 1;
    min_time: number = 0;
    max_repeat: number = 0;
    
    constructor(url:string, 
      maxRepeat:number, 
      tags:string[], 
      insert_at:number = -1, 
      prominence:number = 1, 
      hard_reqs:string[] = [], 
      min_time=0) {
      this.url = url;
      this.tags = tags;

      if (prominence != 0.7) {
        this.chance = 1;
      } else {
        this.chance = 0;
      }
      this.prominence = prominence;

      this.insert_at = insert_at;
      this.hard_reqs = hard_reqs;
      this.min_time = min_time;
      this.max_repeat = maxRepeat;
    }

    public react(type:string):void {
      const end = checkEndConditions(this.url, type);
      if (end != "") {
        goto("/" + end);
      }
      
      if(this.reaction == type) {
        this.reaction = "";
        updateAlgorithm(type, this.tags, false)
      } else {
        updateAlgorithm(type, this.tags, true)
        this.reaction = type;
      }
      console.log(this.reaction)
    }
}

const videoConst: Video[] = [
  // Video 1
  new Video("static/videos/depressioncurememes.mp4", 1, ["empty"]), // Memes that will cure your depression

  new Video("static/videos/TranceAd.mp4", 4, ["trance", "ad", "depression", "capitalism"], 3, 1.5), //Trance Ad
  new Video("static/videos/Jake01.mp4", 2, ["minecraft", "outside", "empty"], 8, 0.2), //First Jake vid
  new Video("static/videos/Jake02.mp4", 2, ["minecraft", "outside"], -1, 1, ["static/videos/Jake01.mp4"], 14), // Second Jake vid
  new Video("static/videos/Jake03.mp4", 2, ["outside", "trance"], -1, 0.7, ["static/videos/Jake02.mp4"], 18), // Third Jake vid
  new Video("static/videos/Jake04.mp4", 2, ["outside", ], -1, 0.7, ["static/videos/Jake03.mp4"], 22), // Final Jake vid
  new Video("static/videos/Podcast 1.mp4", 2, ["trance", "podcast"], 12, 0.2), // First podcast
  new Video("static/videos/Podcast 2.mp4", 2, ["altright", "trance", "podcast", "conspiracy"], -1, 0.7, ["static/videos/Podcast 1.mp4"], 16), // Second podcast
  new Video("static/videos/Glitch.mp4", 1, ["trance"], -1, 0.7, [], 20),
  new Video("static/videos/tradwife.mp4", 1, ["altright", "podcast"], -1, 0.8),
  new Video("static/videos/tradwife2.mp4", 1, ["altright", "podcast"], -1, 0.8, ["static/videos/tradwife.mp4"]),

  // Self-referential
  new Video("static/videos/stopscrolling.mp4", 2, ["algorithm", "trance"], 29, 0.5, [], 16), // Stop scrolling
  new Video("static/videos/welcometotheinternet.mp4", 3, ["capitalism", "trance"]),

  // Advertisements
  new Video("static/videos/financepizza.mp4", 1, ["capitalism"], -1), //Finance a pizza
  new Video("static/videos/mailchimp.mp4", 2, ["ad", "algorithm", "capitalism"], 9, 1, [], 7), // Real time behavior
  new Video("static/videos/Replikaad.mp4", 1, ["altright", "ad", "capitalism"], -1, 1), //Replika
  new Video("static/videos/maya.mp4", 3, ["altright", "ad", "capitalism"], -1, 0.3, [], 11),

  //Random stuff
  new Video("static/videos/trickshots.mp4", 1, ["empty"], -1, 0.6), // Trick shots
  new Video("static/videos/suits.mp4", 1, ["empty"], -1, 0.25), // Suits
  new Video("static/videos/reddithorny.mp4", 1, ["minecraft", "empty"], -1, 0.5), // Horny
  new Video("static/videos/depressionskillissue.mp4", 2, ["empty", "altright", "minecraft", "depression"], -1, 2), // AITA for telling my GF depression is a skill issue
  new Video("static/videos/suntzu.mp4", 1, ["empty"], -1, 0.5),
  new Video("static/vidoes/dogs.mp4", 1, ["empty"], -1, 0.6),

  // Mental health
  new Video("static/videos/howknowdepression.mp4", 1, ["depression", "trance"], -1, 1.5),
  new Video("static/videos/selfdiagnose.mp4", 1, ["depression"], -1, 0.5),
  new Video("static/videos/niceguys.mp4", 1, ["depression"], -1, 1),
  new Video("static/videos/rockbottom.mp4", 1, ["depression"], -1, 0.75),
  new Video("static/videos/tasks.mp4", 2, ["depression"], -1, 1),

  // Alt Right
  new Video("static/videos/dawkin.mp4", 1, ["altright"], -1, 0.5, [], 8),
  new Video("static/videos/jp_depression.mp4", 2, ["altright", "depression", "outside"], -1, 1.5, [], 6),
  new Video("static/videos/joero.mp4", 2, ["altright", "conspiracy", "podcast"], -1, 0.75, [], 12),
  new Video("static/videos/marriage.mp4", 1, ["altright", "podcast"], -1, 0.5, [], 8),
  new Video("static/videos/femarmy.mp4", 1, ["altright"], -1, 0.5, [], 10)
]

export let videoList: Video[] = videoConst;

let watchedList: string[] = [videoList[0].url];

export function altRightOnly() {
  const newVideoList : Video[] = [];
  for (const video of videoList) {
    if (video.tags.includes("altright")) {
        newVideoList.push(video)
    }
}
  videoList = newVideoList;
}

export function getWatchedList(): string[] {
  return watchedList;
}
export function addWatchItem(url :string) {
  watchedList.push(url);
}

export function resetWatchHistory() {
  watchedList = [videoList[0].url];
  videoList = videoConst;
  resetEndTrigger();
}

export function getVideoByUrl(url : string) {
  return videoList.find(v => v.url === url); 
}

function countCommonElements<T>(list1: T[], list2: T[]): number {
  // Convert one of the lists to a set for faster lookup
  const set1 = new Set(list1);
  
  // Use a counter to track the number of common elements
  let commonCount = 0;

  // Iterate over the second list and check if the element is in set1
  for (const element of list2) {
      if (set1.has(element)) {
          commonCount++;
      }
  }

  return commonCount;
} 

function updateAlgorithm(type:string, tags:string[], add:boolean) {
  for (let i = 0; i < videoList.length; i++) {
    const video: Video = videoList[i];
    const commonTags: number = countCommonElements(tags, video.tags);

    if (video.url == watchedList.at(-1)){
      video.chance = video.chance/2;
      continue;
    }

    if (add) {
      video.chance+=3*Math.sqrt(commonTags)*(REACTION_STRENGTH.get(type) ?? 1);
    } else {
      video.chance-=3*(Math.sqrt(commonTags)*(REACTION_STRENGTH.get(type) ?? 1));
    }
    }

}

export function reccomend(videos: Video[], currentVideo:string): string {
  for (const video of videos) {
    if (watchedList.length == video.insert_at) {
      if (!watchedList.includes(video.url)) {
        console.log("Override detected")
        video.chance = video.chance/20;
      }
      return video.url;
    }
  }
  
  // Remove all videos that have been played more than their maxRepeat
  for (const video of videos) {
    if (video.max_repeat <= watchedList.filter(elem => elem == video.url).length) {
      videos = videos.filter(elem => elem != video);
    }
  }

  // If we have removed too many this way, never mind.
  if (videos.length < 3) {
    videos = videoList;
  }

  // Now, remove all videos whose hard prereqs are not met
  for (const video of videos) {
    if (video.url == currentVideo || watchedList.length < video.min_time){
      videos = videos.filter(elem => elem != video);
    }
    for (const req of video.hard_reqs) {
      if (getVideoByUrl(req)?.reaction == "") {
        videos = videos.filter(elem => elem != video);
      }
    }
  }

  //Step 1: Calculate the total sum of chances
  let totalChance = 0;
  for (const video of videos) {
    totalChance += video.chance*video.prominence;
  }
  console.log(totalChance);
  // Step 2: Generate a random number between 0 and totalChance
  const random = Math.random() * totalChance;

  // Step 3: Iterate through the list and pick the video
  let cumulativeChance = 0;
  console.log(random)
  for (const video of videos) {
      console.log(video.url)
      console.log(video.chance*video.prominence)
      cumulativeChance += video.chance*video.prominence;
      console.log(cumulativeChance)
      if (random <= cumulativeChance) {
        console.log(video.url)
        video.chance = video.chance/10;
        return video.url;
    }
  }
  console.log("Fail case")
  return videoList[0].url; // Fail case
}

