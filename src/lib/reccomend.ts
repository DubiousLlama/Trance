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
    min_time: number = 0;
    
    constructor(url:string, tags:string[], insert_at:number = -1, prominence:number = 1, hard_reqs:string[] = [], min_time=0) {
      this.url = url;
      this.tags = tags;

      this.chance = prominence;

      this.insert_at = insert_at;
      this.hard_reqs = hard_reqs;
      this.min_time = min_time;
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
  new Video("https://www.youtube.com/shorts/ZfE-HzH8iO0", ["empty", "depression"]), // Memes that will cure your depression

  new Video("https://youtube.com/shorts/6PBoD1dDdfE", ["trance", "ad", "depression", "capitalism"], 3, 1), //Trance Ad
  new Video("https://youtube.com/shorts/eFcl2UUoEuM", ["minecraft", "outside", "empty"], 8, 0), //First Jake vid
  new Video("https://youtube.com/shorts/kL7207F_su4", ["minecraft", "outside"], -1, 0.5, ["https://youtube.com/shorts/eFcl2UUoEuM"], 14), // Second Jake vid
  new Video("https://youtube.com/shorts/NkB6KhhXZS0", ["outside", "trance"], -1, 0.5, ["https://youtube.com/shorts/kL7207F_su4"], 22), // Third Jake vid
  new Video("https://youtube.com/shorts/qBdk00HcKhY", ["outside", ], -1, 0.5, ["https://youtube.com/shorts/NkB6KhhXZS0"], 30), // Final Jake vid
  new Video("https://youtube.com/shorts/C7Q8wlSX7Co", ["altright", "trance", "podcast"], 12, 0), // First podcast
  new Video("https://youtube.com/shorts/s4As7yCp6j0", ["altright", "trance", "podcast", "conspiracy"], -1, 0.5, ["https://youtube.com/shorts/C7Q8wlSX7Co"], 14), // Second podcast
  new Video("https://youtube.com/shorts/rZCPgfdMvGA", ["trance"], -1, 1, ["https://youtube.com/shorts/6PBoD1dDdfE", "https://youtube.com/shorts/s4As7yCp6j0"], 24),

  // Self-referential
  new Video("https://www.youtube.com/shorts/MGCDps-C_a4", ["algorithm", "trance"], 29, 0.5, [], 28), // Stop scrolling
  new Video("https://www.youtube.com/shorts/6oF5p-za8zg", ["capitalism", "trance"]),

  // Advertisements
  new Video("https://www.youtube.com/shorts/k-H7Xfih6eA", ["ad", "capitalism"]), //Finance a pizza
  new Video("https://www.youtube.com/shorts/cqORf9PgluA", ["ad", "algorithm", "capitalism"], 9, 2, [], 7), // Real time behavior
  new Video("https://youtube.com/shorts/wlDXkGvy9gY", ["altright", "ad", "capitalism"], -1, 0.5), //Replika

  //Random stuff
  new Video("https://www.youtube.com/shorts/LLo9u8GYUU0", ["empty"], -1, 2), // Trick shots
  new Video("https://www.youtube.com/shorts/LLo9u8GYUU0", ["altright"], -1, 0.5), // guns
  new Video("https://www.youtube.com/shorts/Fu4AWHjeS_k", ["empty"], -1, 0.5), // Suits
  new Video("https://www.youtube.com/shorts/uG-8F_z7U1c", ["minecraft", "empty"]), // Horny
  new Video("https://www.youtube.com/shorts/vAyUt7AIPFU", ["empty", "altright", "minecraft", "depression"]), // AITA for telling my GF depression is a skill issue


  // Mental health
  new Video("https://www.youtube.com/shorts/WDiLJJ753ww", ["depression"]),
  new Video("https://www.youtube.com/shorts/G_iSpWw_K4c", ["depression"]),
  new Video("https://www.youtube.com/shorts/4Gr4BWXhqOQ", ["altright", "depression"]),
  new Video("https://www.youtube.com/shorts/ZIAspOd7sEc", ["depression"]),


  // Alt Right
  new Video("https://www.youtube.com/shorts/l62gTnHaGL8", ["altright"], -1, 0.5, [], 10),
  new Video("https://www.youtube.com/shorts/vraRt6dj-wE", ["altright", "depression", "outside"], -1, 0.5, [], 8),
  new Video("https://www.youtube.com/shorts/l9UWpLr9NEM", ["altright", "conspiracy"], -1, 0.5, [], 14),
  new Video("https://www.youtube.com/shorts/0XxBKEA4XD4", ["altright", "podcast"], -1, 0.5, [], 10),
  new Video("https://www.youtube.com/shorts/eOmnmma25gE", ["altright"], -1, 0.5, [], 12)
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
      video.chance+=Math.sqrt(commonTags)*(REACTION_STRENGTH.get(type) ?? 1);
    } else {
      video.chance-=(Math.sqrt(commonTags)*(REACTION_STRENGTH.get(type) ?? 1));
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
  
  // Step 0: Remove all videos whose hard prereqs are not met
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

