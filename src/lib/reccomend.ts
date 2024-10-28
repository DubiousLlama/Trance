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
    min_time: number = 0;
    max_repeat: number = 0;
    
    constructor(url:string, maxRepeat:number, tags:string[], insert_at:number = -1, prominence:number = 1, hard_reqs:string[] = [], min_time=0) {
      this.url = url;
      this.tags = tags;

      this.chance = prominence;

      this.insert_at = insert_at;
      this.hard_reqs = hard_reqs;
      this.min_time = min_time;
      this.max_repeat = maxRepeat;
    }

    public react(type:string):void {
      
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

export const videoList: Video[] = [
  // Video 1
  new Video("static/videos/depressioncurememes.mp4", 1, ["empty"]), // Memes that will cure your depression

  new Video("static/videos/TranceAd.mp4", 4, ["trance", "ad", "depression", "capitalism"], 3, 1), //Trance Ad
  new Video("static/videos/Jake01.mp4", 2, ["minecraft", "outside", "empty"], 8, 0), //First Jake vid
  new Video("static/videos/Jake02.mp4", 2, ["minecraft", "outside"], -1, 0.5, ["static/videos/Jake01.mp4"], 14), // Second Jake vid
  new Video("static/videos/Jake03.mp4", 2, ["outside", "trance"], -1, 0.5, ["static/videos/Jake02.mp4"], 22), // Third Jake vid
  new Video("static/videos/Jake04.mp4", 2, ["outside", ], -1, 0.5, ["static/videos/Jake03.mp4"], 30), // Final Jake vid
  new Video("static/videos/Podcast 1.mp4", 2, ["altright", "trance", "podcast"], 12, 0), // First podcast
  new Video("static/videos/Podcast 2.mp4", 2, ["altright", "trance", "podcast", "conspiracy"], -1, 0.5, ["static/videos/Podcast 1.mp4"], 14), // Second podcast
  new Video("static/videos/Glitch.mp4", 1, ["trance"], -1, 1, ["static/videos/TranceAd.mp4", "static/videos/Podcast 2.mp4"], 24),

  // Self-referential
  new Video("static/videos/stopscrolling.mp4", 2, ["algorithm", "trance"], 29, 0.5, [], 28), // Stop scrolling
  new Video("static/videos/welcometotheinternet.mp4", 3, ["capitalism", "trance"]),

  // Advertisements
  new Video("static/videos/financepizza.mp4", 1, ["ad", "capitalism"]), //Finance a pizza
  new Video("static/videos/mailchimp.mp4", 3, ["ad", "algorithm", "capitalism"], 9, 2, [], 7), // Real time behavior
  new Video("static/videos/Replikaad.mp4", 3, ["altright", "ad", "capitalism"], -1, 0.5), //Replika

  //Random stuff
  new Video("static/videos/trickshots.mp4", 1, ["empty"], -1, 2), // Trick shots
  new Video("static/videos/suits.mp4", 1, ["empty"], -1, 0.5), // Suits
  new Video("static/videos/reddithorny.mp4", 1, ["minecraft", "empty"]), // Horny
  new Video("static/videos/depressionskillissue.mp4", 1, ["empty", "altright", "minecraft", "depression"]), // AITA for telling my GF depression is a skill issue


  // Mental health
  new Video("static/videos/howknowdepression.mp4", 1, ["depression"]),
  new Video("static/videos/selfdiagnose.mp4", 1, ["depression"]),
  new Video("static/videos/niceguys.mp4", 1, ["altright", "depression"]),
  new Video("static/videos/rockbottom.mp4", 1, ["depression"]),


  // Alt Right
  new Video("static/videos/dawkin.mp4", 1, ["altright"], -1, 0.5, [], 10),
  new Video("static/videos/jp_depression.mp4", 2, ["altright", "depression", "outside"], -1, 0.5, [], 8),
  new Video("static/videos/joero.mp4", 2, ["altright", "conspiracy", "podcast"], -1, 0.5, [], 14),
  new Video("static/videos/marriage.mp4", 1, ["altright", "podcast"], -1, 0.5, [], 10),
  new Video("static/videos/femarmy.mp4", 1, ["altright"], -1, 0.5, [], 12)
]

let watchedList: string[] = [videoList[0].url];

export function getWatchedList(): string[] {
  return watchedList;
}
export function addWatchItem(url :string) {
  watchedList.push(url);
}

export function resetWatchHistory() {
  watchedList = [videoList[0].url];
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
      video.chance+=2*Math.sqrt(commonTags)*(REACTION_STRENGTH.get(type) ?? 1);
    } else {
      video.chance-=2*(Math.sqrt(commonTags)*(REACTION_STRENGTH.get(type) ?? 1));
    }
    }

}

export function reccomend(videos: Video[], currentVideo:string): string {
  for (const video of videos) {
    if (watchedList.length == video.insert_at) {
      console.log("Override detected")
      video.chance = video.chance/10;
      return video.url;
    }
  }
  
  // Step 1: Remove all videos whose hard prereqs are not met
  for (const video of videos) {
    if (video.url == currentVideo || watchedList.length < video.min_time){
      videos = videos.filter(elem => elem != video);
    }
    for (const req of video.hard_reqs) {
      if (!watchedList.includes(req)) {
        videos = videos.filter(elem => elem != video);
      }
    }
  }

  // Step 2: Remove all videos that have been played more than their maxRepeat
  for (const video of videos) {
    if (video.max_repeat <= watchedList.filter(elem => elem == video.url).length) {
      videos = videos.filter(elem => elem != video);
    }
  }

  for (const video of videos) {
    console.log(video.url);
    console.log(video.chance);
  }

  // Step 1: Calculate the total sum of chances
  const totalChance = videos.reduce((sum, video) => sum + video.chance, 0);

  // Step 2: Generate a random number between 0 and totalChance
  const random = Math.random() * totalChance;

  // Step 3: Iterate through the list and pick the video
  let cumulativeChance = 0;
  for (const video of videos) {
      cumulativeChance += video.chance;
      if (random <= cumulativeChance) {
        console.log(video.url)
        video.chance = video.chance/5;
        return video.url;
    }
  }
  return videoList[0].url; // Fail case
}

