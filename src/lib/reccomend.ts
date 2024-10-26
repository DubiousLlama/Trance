const REACTION_STRENGTH : Map<string, number>= new Map([
  ['like', 1],
  ["love", 3],
  ["haha", 1.5],
  ["wow", 3],
  ["sad", 0.75],
  ["angry", 4]
])

export class Video {
    url: string;
    tags: string[];
    reaction: string = "";
    hard_reqs: string[];
    insert_at: number;
    chance: number = 1;
    
    constructor(url:string, tags:string[], insert_at:number = -1, prominence:number = 1, hard_reqs:string[] = []) {
      this.url = url;
      this.tags = tags;

      this.chance = prominence;

      this.insert_at = insert_at;
      this.hard_reqs = hard_reqs;
    }

    public react(type:string):void {
      if(this.reaction == type) {
        this.reaction = "";
        updateAlgorithm(type, this.tags, false)
      } else {
        updateAlgorithm(type, this.tags, true)
        this.reaction = type;
      }
    }
}

export const videoList: Video[] = [
  new Video("https://www.youtube.com/shorts/MGCDps-C_a4", ["algorithm"], 1),
  new Video("https://www.youtube.com/shorts/Fu4AWHjeS_k", ["empty"], -1, 1),
  new Video("https://www.youtube.com/shorts/YkoueXZo4tk", ["algorithm"], -1, 1)
]

const watchedList: Video[] = [];

export function getWatchedList(): Video[] {
  return watchedList;
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

function updateAlgorithm(type:string, tags:string[], reverse:boolean) {
  for (let i = 0; i < videoList.length; i++) {
    const video: Video = videoList[i];
    const commonTags: number = countCommonElements(tags, video.tags);
    
    if (reverse) {
      video.chance-=Math.sqrt(commonTags)*(REACTION_STRENGTH.get(type) ?? 1);
    } else {
      console.log(video.url)
      console.log(video.chance)
      video.chance+=Math.sqrt(commonTags)*(REACTION_STRENGTH.get(type) ?? 1);
    }
    }

}

export function reccomend(videos: Video[], currentVideo:Video): Video {
  for (const video of videos) {
    if (watchedList.length == video.insert_at) {
      watchedList.push(video) // IMPORTANT, videos are added to watchedList as they are reccomended
      console.log(video.url)
      return video;
    }
  }
  
  // Step 0: Remove all videos whose hard prereqs are not met
  for (const video of videos) {
    if (video == currentVideo){
      videos = videos.filter(elem => elem !== video);
    }
    for (const req of video.hard_reqs) {
      if (!(req in watchedList)) {
        videos = videos.filter(elem => elem !== video);
      }
    }
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
        watchedList.push(video)
        return video;
    }
  }
  return videoList[0]; // Fail case
}

