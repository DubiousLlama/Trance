class Video {
    url: string;
    tags: string[];
    liked: boolean = false;
    timeAdd: number;
    hard_reqs: string[];
    prominence: number;
    

    constructor(url:string, tags:string[], prominence:number = 1, hard_reqs:string[] = [], timeAdd:number = 1) {
      this.url = url;
      this.tags = tags;

      this.timeAdd = timeAdd;
      this.prominence = prominence;

      this.hard_reqs = hard_reqs;
    }

    public like():void {
      this.liked = !this.liked;
    }
  }





