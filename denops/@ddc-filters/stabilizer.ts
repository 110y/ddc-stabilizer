import {
  BaseFilter,
  Candidate,
  Context,
} from "https://deno.land/x/ddc_vim@v0.13.0/types.ts#^";
import {
  Denops,
} from "https://deno.land/x/ddc_vim@v0.13.0/deps.ts#^";

export class Filter extends BaseFilter<{}> {
  async filter(args: {
    denops: Denops,
    context: Context,
    completeStr: string,
    candidates: Candidate[],
  }
  ): Promise<Candidate[]> {
    for (const candidate of args.candidates) {
      if (args.context.filetype === 'go') {
         candidate.word = candidate.word.replace(/[\s]*?\$\{\d+?.*?\}[,]?[\s]*?/, "");
         candidate.word = candidate.word.replace(/[\s]*?\$\d+?\s*?/, "");
         candidate.word = candidate.word.replace(/\\/, "");

         if (candidate.word.slice(-1) === ':') {
             candidate.word += ' '
         }
      }
    }

    return args.candidates;
  }

  params(): {} { return {}; }
}
