const REACTION_STRENGTH : Map<string, number>= new Map([
  ['like', 1],
  ["love", 3],
  ["haha", 1.5],
  ["wow", 3],
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
      console.log(this.reaction)
    }
}

export const videoList: Video[] = [
  new Video("https://www.youtube.com/shorts/MGCDps-C_a4", ["algorithm"], -1),
  new Video("https://www.youtube.com/shorts/Fu4AWHjeS_k", ["empty"], -1, 2),
  new Video("https://www.youtube.com/shorts/YkoueXZo4tk", ["algorithm"], -1, 1)
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

    if (add) {
      video.chance+=Math.sqrt(commonTags)*(REACTION_STRENGTH.get(type) ?? 1);
    } else {
      video.chance-=(Math.sqrt(commonTags)*(REACTION_STRENGTH.get(type) ?? 1));
    }

    console.log(video.url)
    console.log(video.tags)
    console.log(video.chance)
    }

}

export function reccomend(videos: Video[], currentVideo:string): string {
  for (const video of videos) {
    if (watchedList.length == video.insert_at) {
      console.log("Override detected")
      return video.url;
    }
  }
  
  // Step 0: Remove all videos whose hard prereqs are not met
  for (const video of videos) {
    if (video.url == currentVideo){
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
  console.log(random)
  console.log(totalChance)

  // Step 3: Iterate through the list and pick the video
  let cumulativeChance = 0;
  for (const video of videos) {
      cumulativeChance += video.chance;
      if (random <= cumulativeChance) {
        console.log(video.url)
        return video.url;
    }
  }
  return videoList[0].url; // Fail case
}

